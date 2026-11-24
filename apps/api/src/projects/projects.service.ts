import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { AuditService } from '../audit/audit.service';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';

const STATUSES = [
  'PLANNING',
  'ACTIVE',
  'ON_HOLD',
  'COMPLETED',
  'CANCELLED',
  'ARCHIVED',
];

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  async create(auth: AuthenticatedUser, input: any) {
    const projectCode = input.projectCode?.trim();
    const name = input.name?.trim();

    if (!projectCode || !name) {
      throw new BadRequestException(
        'Project code and name are required',
      );
    }

    if (projectCode.length > 40 || name.length > 160) {
      throw new BadRequestException('Input exceeds maximum length');
    }

    if (
      input.status &&
      !STATUSES.includes(input.status)
    ) {
      throw new BadRequestException('Invalid project status');
    }

    const hasBudgetValue =
      input.budget !== undefined &&
      input.budget !== null &&
      input.budget !== '';

    if (
      hasBudgetValue &&
      (!Number.isFinite(Number(input.budget)) ||
        Number(input.budget) < 0)
    ) {
      throw new BadRequestException('Invalid project budget');
    }

    const budgetToSave = hasBudgetValue ? Number(input.budget) : null;

    try {
      const project = await this.prisma.project.create({
        data: {
          tenantId: auth.tenantId,
          projectCode,
          name,
          description: input.description,
          clientName: input.clientName,
          siteAddress: input.siteAddress,
          startChainage: input.startChainage?.trim() || null,
          endChainage: input.endChainage?.trim() || null,
          startLatitude: input.startLatitude !== undefined && input.startLatitude !== null ? input.startLatitude : null,
          startLongitude: input.startLongitude !== undefined && input.startLongitude !== null ? input.startLongitude : null,
          endLatitude: input.endLatitude !== undefined && input.endLatitude !== null ? input.endLatitude : null,
          endLongitude: input.endLongitude !== undefined && input.endLongitude !== null ? input.endLongitude : null,
          status: input.status ?? 'PLANNING',
          budget: budgetToSave,
          startDate: input.startDate
            ? this.parseDate(input.startDate)
            : undefined,
          endDate: input.endDate
            ? this.parseDate(input.endDate)
            : undefined,
        },
      });

      await this.audit.log(auth, 'PROJECT_CREATED', 'Project', project.id, {
        projectCode: project.projectCode,
        name: project.name,
      });

      return project;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Project code already exists');
      }
      throw error;
    }
  }

  async findAll(auth: AuthenticatedUser) {
    return this.prisma.project.findMany({
      where: {
        tenantId: auth.tenantId,
        status: { not: 'ARCHIVED' },
      },
      include: {
        _count: {
          select: {
            activities: true,
            siteSubmissions: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(auth: AuthenticatedUser, id: string) {
    const project = await this.prisma.project.findFirst({
      where: {
        id,
        tenantId: auth.tenantId,
        status: { not: 'ARCHIVED' },
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(
    auth: AuthenticatedUser,
    id: string,
    input: any,
  ) {
    await this.findOne(auth, id);

    if (
      input.status &&
      !STATUSES.includes(input.status)
    ) {
      throw new BadRequestException('Invalid project status');
    }

    if (input.budget !== undefined) {
      if (input.budget === null || input.budget === '') {
        input.budget = null;
      } else if (!Number.isFinite(Number(input.budget)) || Number(input.budget) < 0) {
        throw new BadRequestException('Invalid project budget');
      } else {
        input.budget = Number(input.budget);
      }
    }

    if (input.startDate !== undefined) {
      input.startDate = input.startDate
        ? this.parseDate(input.startDate)
        : null;
    }

    if (input.endDate !== undefined) {
      input.endDate = input.endDate
        ? this.parseDate(input.endDate)
        : null;
    }

    delete input.tenantId;
    delete input.id;

    try {
      const result = await this.prisma.project.updateMany({
        where: {
          id,
          tenantId: auth.tenantId,
        },
        data: input,
      });

      if (result.count === 0) {
        throw new NotFoundException('Project not found');
      }

      return this.findOne(auth, id);
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Project code already exists');
      }
      throw error;
    }
  }

  async archive(auth: AuthenticatedUser, id: string) {
    await this.findOne(auth, id);

    const result = await this.prisma.project.updateMany({
      where: {
        id,
        tenantId: auth.tenantId,
      },
      data: { status: 'ARCHIVED' },
    });

    if (result.count === 0) {
      throw new NotFoundException('Project not found');
    }

    return { message: 'Project archived successfully' };
  }

  async duplicate(
    auth: AuthenticatedUser,
    id: string,
    body?: { projectCode?: string; name?: string },
  ) {
    const sourceProject = await this.prisma.project.findFirst({
      where: { id, tenantId: auth.tenantId },
      include: {
        activities: {
          orderBy: { activityCode: 'asc' },
        },
      },
    });

    if (!sourceProject) {
      throw new NotFoundException('Source project not found');
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000).toString();
    const newCode =
      body?.projectCode?.trim() || `${sourceProject.projectCode}-COPY-${randomSuffix}`;
    const newName =
      body?.name?.trim() || `${sourceProject.name} (Copy)`;

    const existing = await this.prisma.project.findFirst({
      where: { tenantId: auth.tenantId, projectCode: newCode },
    });
    if (existing) {
      throw new ConflictException(`Project code "${newCode}" already exists`);
    }

    const result = await this.prisma.$transaction(async (tx) => {
      // 1. Create duplicate project record
      const duplicatedProject = await tx.project.create({
        data: {
          tenantId: auth.tenantId,
          projectCode: newCode,
          name: newName,
          description: sourceProject.description,
          clientName: sourceProject.clientName,
          siteAddress: sourceProject.siteAddress,
          startChainage: sourceProject.startChainage,
          endChainage: sourceProject.endChainage,
          startLatitude: sourceProject.startLatitude,
          startLongitude: sourceProject.startLongitude,
          endLatitude: sourceProject.endLatitude,
          endLongitude: sourceProject.endLongitude,
          budget: sourceProject.budget,
          status: 'PLANNING',
          startDate: new Date(),
        },
      });

      // 2. Clone activities hierarchy
      const parentActivities = sourceProject.activities.filter((a) => !a.parentId);
      const subactivities = sourceProject.activities.filter((a) => !!a.parentId);

      const oldToNewParentMap = new Map<string, string>();

      // 2a. Duplicate Parents
      for (const parent of parentActivities) {
        const newParent = await tx.activity.create({
          data: {
            tenantId: auth.tenantId,
            projectId: duplicatedProject.id,
            parentId: null,
            activityCode: parent.activityCode,
            name: parent.name,
            description: parent.description,
            unit: parent.unit,
            status: 'NOT_STARTED',
            priority: parent.priority,
            progress: 0,
          },
        });
        oldToNewParentMap.set(parent.id, newParent.id);
      }

      // 2b. Duplicate Subactivities
      for (const sub of subactivities) {
        const newParentId = sub.parentId ? oldToNewParentMap.get(sub.parentId) : null;
        await tx.activity.create({
          data: {
            tenantId: auth.tenantId,
            projectId: duplicatedProject.id,
            parentId: newParentId,
            activityCode: sub.activityCode,
            name: sub.name,
            description: sub.description,
            unit: sub.unit,
            status: 'NOT_STARTED',
            priority: sub.priority,
            progress: 0,
          },
        });
      }

      return duplicatedProject;
    });

    await this.audit.log(auth, 'PROJECT_DUPLICATED', 'Project', result.id, {
      sourceProjectId: id,
      newProjectCode: result.projectCode,
      newName: result.name,
    });

    return result;
  }

  private parseDate(value: string): Date {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date');
    }

    return date;
  }
}
