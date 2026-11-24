import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';

const ARRAY_FIELDS = [
  'labour',
  'equipment',
  'materials',
  'workProgress',
  'attachments',
] as const;

const TEXT_FIELDS = [
  'weather',
  'siteConditions',
  'delays',
  'issues',
  'remarks',
] as const;

@Injectable()
export class DprsService {
  constructor(private readonly prisma: PrismaService) {}

  private parseReportDate(value: unknown): Date {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      throw new BadRequestException('reportDate must use YYYY-MM-DD format');
    }

    const date = new Date(`${value}T00:00:00.000Z`);

    if (
      Number.isNaN(date.getTime()) ||
      date.toISOString().slice(0, 10) !== value
    ) {
      throw new BadRequestException('Invalid reportDate');
    }

    return date;
  }

  private validateInput(input: any, creating = false) {
    if (!input || typeof input !== 'object' || Array.isArray(input)) {
      throw new BadRequestException('Invalid request body');
    }

    if (creating && input.reportDate === undefined) {
      throw new BadRequestException('reportDate is required');
    }

    if (
      input.workforceCount !== undefined &&
      (!Number.isInteger(input.workforceCount) ||
        input.workforceCount < 0 ||
        input.workforceCount > 100000)
    ) {
      throw new BadRequestException(
        'workforceCount must be a non-negative integer',
      );
    }

    for (const field of ARRAY_FIELDS) {
      if (input[field] !== undefined && !Array.isArray(input[field])) {
        throw new BadRequestException(`${field} must be an array`);
      }
    }

    for (const field of TEXT_FIELDS) {
      if (
        input[field] !== undefined &&
        input[field] !== null &&
        typeof input[field] !== 'string'
      ) {
        throw new BadRequestException(`${field} must be a string`);
      }
    }

    if (
      input.weather !== undefined &&
      typeof input.weather === 'string' &&
      input.weather.length > 120
    ) {
      throw new BadRequestException('weather exceeds 120 characters');
    }
  }

  private async getProject(auth: AuthenticatedUser, projectId: string) {
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        tenantId: auth.tenantId,
        status: { not: 'ARCHIVED' },
      },
      select: { id: true },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async create(auth: AuthenticatedUser, projectId: string, input: any) {
    await this.getProject(auth, projectId);
    this.validateInput(input, true);

    const membership = await this.prisma.tenantMembership.findFirst({
      where: {
        id: auth.membershipId,
        tenantId: auth.tenantId,
        userId: auth.sub,
        membershipStatus: 'ACTIVE',
      },
      select: { id: true },
    });

    if (!membership) {
      throw new ForbiddenException('Active membership required');
    }

    const data: any = {
      tenantId: auth.tenantId,
      projectId,
      reportDate: this.parseReportDate(input.reportDate),
      preparedByMembershipId: auth.membershipId,
      workforceCount: input.workforceCount ?? 0,
    };

    for (const field of TEXT_FIELDS) {
      if (input[field] !== undefined) {
        data[field] = input[field];
      }
    }

    for (const field of ARRAY_FIELDS) {
      if (input[field] !== undefined) {
        data[field] = input[field];
      }
    }

    try {
      return await this.prisma.dailyProgressReport.create({ data });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'A DPR already exists for this project and date',
        );
      }
      throw error;
    }
  }

  async findAll(auth: AuthenticatedUser, projectId: string) {
    await this.getProject(auth, projectId);

    return this.prisma.dailyProgressReport.findMany({
      where: {
        tenantId: auth.tenantId,
        projectId,
      },
      include: {
        preparedBy: {
          include: {
            user: {
              select: { id: true, fullName: true, email: true },
            },
          },
        },
        reviewedBy: {
          include: {
            user: {
              select: { id: true, fullName: true, email: true },
            },
          },
        },
      },
      orderBy: [{ reportDate: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async findOne(auth: AuthenticatedUser, id: string) {
    const report = await this.prisma.dailyProgressReport.findFirst({
      where: {
        id,
        tenantId: auth.tenantId,
      },
      include: {
        preparedBy: {
          include: {
            user: {
              select: { id: true, fullName: true, email: true },
            },
          },
        },
        reviewedBy: {
          include: {
            user: {
              select: { id: true, fullName: true, email: true },
            },
          },
        },
        project: {
          select: {
            id: true,
            projectCode: true,
            name: true,
          },
        },
      },
    });

    if (!report) {
      throw new NotFoundException('DPR not found');
    }

    return report;
  }

  async update(auth: AuthenticatedUser, id: string, input: any) {
    this.validateInput(input);

    const existing = await this.findOne(auth, id);

    if (!['DRAFT', 'REJECTED'].includes(existing.status)) {
      throw new ConflictException('Only draft or rejected DPRs can be edited');
    }

    const data: any = {};

    if (input.reportDate !== undefined) {
      data.reportDate = this.parseReportDate(input.reportDate);
    }

    if (input.workforceCount !== undefined) {
      data.workforceCount = input.workforceCount;
    }

    for (const field of TEXT_FIELDS) {
      if (input[field] !== undefined) {
        data[field] = input[field];
      }
    }

    for (const field of ARRAY_FIELDS) {
      if (input[field] !== undefined) {
        data[field] = input[field];
      }
    }

    if (Object.keys(data).length === 0) {
      throw new BadRequestException('No editable fields supplied');
    }

    try {
      const result = await this.prisma.dailyProgressReport.updateMany({
        where: {
          id,
          tenantId: auth.tenantId,
          status: { in: ['DRAFT', 'REJECTED'] },
        },
        data: {
          ...data,
          reviewedByMembershipId: null,
          reviewedAt: null,
          reviewRemarks: null,
          submittedAt: null,
        },
      });

      if (!result.count) {
        throw new ConflictException(
          'DPR status changed; reload before editing',
        );
      }

      return this.findOne(auth, id);
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'A DPR already exists for this project and date',
        );
      }
      throw error;
    }
  }

  async submit(auth: AuthenticatedUser, id: string) {
    await this.findOne(auth, id);

    const result = await this.prisma.dailyProgressReport.updateMany({
      where: {
        id,
        tenantId: auth.tenantId,
        status: { in: ['DRAFT', 'REJECTED'] },
      },
      data: {
        status: 'SUBMITTED',
        submittedAt: new Date(),
        reviewedByMembershipId: null,
        reviewedAt: null,
        reviewRemarks: null,
      },
    });

    if (!result.count) {
      throw new ConflictException(
        'Only draft or rejected DPRs can be submitted',
      );
    }

    return this.findOne(auth, id);
  }

  async approve(auth: AuthenticatedUser, id: string, input: any) {
    await this.findOne(auth, id);

    const reviewRemarks =
      input?.reviewRemarks === undefined ? null : input.reviewRemarks;

    if (reviewRemarks !== null && typeof reviewRemarks !== 'string') {
      throw new BadRequestException('reviewRemarks must be a string');
    }

    const result = await this.prisma.dailyProgressReport.updateMany({
      where: {
        id,
        tenantId: auth.tenantId,
        status: 'SUBMITTED',
      },
      data: {
        status: 'APPROVED',
        reviewedByMembershipId: auth.membershipId,
        reviewedAt: new Date(),
        reviewRemarks,
      },
    });

    if (!result.count) {
      throw new ConflictException('Only submitted DPRs can be approved');
    }

    return this.findOne(auth, id);
  }

  async reject(auth: AuthenticatedUser, id: string, input: any) {
    await this.findOne(auth, id);

    const rawRemarks = input?.reviewRemarks;

    if (typeof rawRemarks !== 'string' || !rawRemarks.trim()) {
      throw new BadRequestException(
        'reviewRemarks is required when rejecting a DPR',
      );
    }

    const reviewRemarks = rawRemarks.trim();

    const result = await this.prisma.dailyProgressReport.updateMany({
      where: {
        id,
        tenantId: auth.tenantId,
        status: 'SUBMITTED',
      },
      data: {
        status: 'REJECTED',
        reviewedByMembershipId: auth.membershipId,
        reviewedAt: new Date(),
        reviewRemarks,
      },
    });

    if (!result.count) {
      throw new ConflictException('Only submitted DPRs can be rejected');
    }

    return this.findOne(auth, id);
  }
}
