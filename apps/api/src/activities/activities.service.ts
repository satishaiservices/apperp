import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { AuditService } from '../audit/audit.service';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';

const STATUSES = ['NOT_STARTED', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED'];
const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

@Injectable()
export class ActivitiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  private async getProject(auth: AuthenticatedUser, projectId: string) {
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        tenantId: auth.tenantId,
        status: { not: 'ARCHIVED' },
      },
    });

    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async create(auth: AuthenticatedUser, projectId: string, input: any) {
    await this.getProject(auth, projectId);

    const activityCode = input.activityCode?.trim();
    const name = input.name?.trim();

    if (!activityCode || !name) {
      throw new BadRequestException('Activity code and name are required');
    }

    if (activityCode.length > 40 || name.length > 160) {
      throw new BadRequestException('Input exceeds maximum length');
    }

    this.validate(input);

    try {
      const activity = await this.prisma.activity.create({
        data: {
          tenantId: auth.tenantId,
          projectId,
          parentId: input.parentId || null,
          activityCode,
          name,
          description: input.description,
          unit: input.unit?.trim() || null,
          status: input.status ?? 'NOT_STARTED',
          priority: input.priority ?? 'MEDIUM',
          progress: input.progress ?? 0,
          startDate: input.startDate ? this.parseDate(input.startDate) : undefined,
          dueDate: input.dueDate ? this.parseDate(input.dueDate) : undefined,
          estimatedCost: input.estimatedCost,
          actualCost: input.actualCost,
        },
      });

      await this.audit.log(auth, 'ACTIVITY_CREATED', 'Activity', activity.id, {
        activityCode,
        name,
        projectId,
        parentId: input.parentId || null,
      });

      return activity;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Activity code already exists in this project');
      }
      throw error;
    }
  }

  async findAll(auth: AuthenticatedUser, projectId: string) {
    await this.getProject(auth, projectId);

    const hasExplicitAssignments = await this.prisma.activityAssignment.count({
      where: {
        tenantId: auth.tenantId,
        tenantMembershipId: auth.membershipId,
      },
    });

    return this.prisma.activity.findMany({
      where: {
        tenantId: auth.tenantId,
        projectId,
        ...(auth.roles.includes('OWNER') || hasExplicitAssignments === 0
          ? {}
          : {
              assignments: {
                some: {
                  tenantId: auth.tenantId,
                  tenantMembershipId: auth.membershipId,
                },
              },
            }),
      },
      select: {
        id: true,
        parentId: true,
        activityCode: true,
        name: true,
        description: true,
        unit: true,
        status: true,
        priority: true,
        progress: true,
        startDate: true,
        dueDate: true,
      },
      orderBy: { activityCode: 'asc' },
    });
  }

  async getActivityTree(auth: AuthenticatedUser, projectId: string) {
    await this.getProject(auth, projectId);

    return this.prisma.activity.findMany({
      where: {
        tenantId: auth.tenantId,
        projectId,
        parentId: null,
      },
      include: {
        subactivities: {
          orderBy: { activityCode: 'asc' },
        },
      },
      orderBy: { activityCode: 'asc' },
    });
  }

  async findOne(auth: AuthenticatedUser, id: string) {
    const activity = await this.prisma.activity.findFirst({
      where: { id, tenantId: auth.tenantId },
      include: {
        assignments: {
          include: {
            membership: {
              include: { user: { select: { id: true, fullName: true, email: true } } },
            },
          },
        },
      },
    });

    if (!activity) throw new NotFoundException('Activity not found');
    return activity;
  }

  async update(auth: AuthenticatedUser, id: string, input: any) {
    await this.findOne(auth, id);
    this.validate(input);

    const data: any = { ...input };

    delete data.id;
    delete data.tenantId;
    delete data.projectId;

    if (input.activityCode?.trim()) {
      data.activityCode = input.activityCode.trim();
    } else {
      delete data.activityCode;
    }

    if (input.name?.trim()) {
      data.name = input.name.trim();
    }

    if (input.unit !== undefined) {
      data.unit = input.unit?.trim() || null;
    }

    if (input.description !== undefined) {
      data.description = input.description?.trim() || null;
    }

    for (const field of ['startDate', 'dueDate']) {
      if (data[field] !== undefined) {
        data[field] = data[field] ? this.parseDate(data[field]) : null;
      }
    }

    try {
      const result = await this.prisma.activity.updateMany({
        where: { id, tenantId: auth.tenantId },
        data,
      });

      if (!result.count) throw new NotFoundException('Activity not found');
      const updated = await this.findOne(auth, id);
      await this.audit.log(auth, 'ACTIVITY_UPDATED', 'Activity', id, { ...data });
      return updated;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Activity code already exists in this project');
      }
      throw error;
    }
  }

  async remove(auth: AuthenticatedUser, id: string) {
    await this.findOne(auth, id);

    // Find any subactivities under this activity
    const children = await this.prisma.activity.findMany({
      where: { parentId: id, tenantId: auth.tenantId },
      select: { id: true },
    });
    const idsToDelete = [id, ...children.map((c) => c.id)];

    // 1. Delete assignments
    await this.prisma.activityAssignment.deleteMany({
      where: { activityId: { in: idsToDelete }, tenantId: auth.tenantId },
    });

    // 2. Delete submission activity references
    await this.prisma.siteSubmissionActivity.deleteMany({
      where: { activityId: { in: idsToDelete }, tenantId: auth.tenantId },
    });

    // 3. Delete children then parent
    await this.prisma.activity.deleteMany({
      where: { id: { in: idsToDelete }, tenantId: auth.tenantId },
    });

    await this.audit.log(auth, 'ACTIVITY_DELETED', 'Activity', id, {
      deletedIds: idsToDelete,
    });

    return { message: 'Activity deleted successfully' };
  }

  async getAssignments(auth: AuthenticatedUser, id: string) {
    await this.findOne(auth, id);

    return this.prisma.activityAssignment.findMany({
      where: { tenantId: auth.tenantId, activityId: id },
      include: {
        membership: {
          include: {
            user: { select: { id: true, fullName: true, email: true } },
          },
        },
      },
    });
  }

  async setAssignments(auth: AuthenticatedUser, id: string, input: any) {
    await this.findOne(auth, id);

    const membershipIds = input.membershipIds;

    if (
      !Array.isArray(membershipIds) ||
      membershipIds.some((item) => typeof item !== 'string') ||
      new Set(membershipIds).size !== membershipIds.length
    ) {
      throw new BadRequestException('membershipIds must be an array of unique membership IDs');
    }

    const memberships = membershipIds.length
      ? await this.prisma.tenantMembership.findMany({
          where: {
            tenantId: auth.tenantId,
            id: { in: membershipIds },
            membershipStatus: 'ACTIVE',
            user: { status: 'ACTIVE' },
          },
          select: { id: true },
        })
      : [];

    if (memberships.length !== membershipIds.length) {
      throw new BadRequestException('One or more memberships are invalid or inactive');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.activityAssignment.deleteMany({
        where: { tenantId: auth.tenantId, activityId: id },
      });

      if (membershipIds.length) {
        await tx.activityAssignment.createMany({
          data: membershipIds.map((tenantMembershipId: string) => ({
            tenantId: auth.tenantId,
            activityId: id,
            tenantMembershipId,
          })),
        });
      }
    });

    await this.audit.log(auth, 'ACTIVITY_ASSIGNMENTS_UPDATED', 'Activity', id, {
      membershipIds,
    });

    return this.getAssignments(auth, id);
  }

  private validate(input: any) {
    if (input.status !== undefined && !STATUSES.includes(input.status)) {
      throw new BadRequestException('Invalid activity status');
    }

    if (input.priority !== undefined && !PRIORITIES.includes(input.priority)) {
      throw new BadRequestException('Invalid activity priority');
    }

    if (
      input.progress !== undefined &&
      (!Number.isInteger(input.progress) || input.progress < 0 || input.progress > 100)
    ) {
      throw new BadRequestException('Progress must be an integer between 0 and 100');
    }

    for (const field of ['estimatedCost', 'actualCost']) {
      if (
        input[field] !== undefined &&
        (!Number.isFinite(Number(input[field])) || Number(input[field]) < 0)
      ) {
        throw new BadRequestException(`Invalid ${field}`);
      }
    }

    for (const field of ['name', 'description']) {
      if (input[field] !== undefined && input[field] !== null && typeof input[field] !== 'string') {
        throw new BadRequestException(`Invalid ${field}`);
      }
    }
  }

  private parseDate(value: string): Date {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date');
    }
    return date;
  }
}
