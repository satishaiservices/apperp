import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { StorageService } from '../storage/storage.service';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';
import type { Express } from 'express';
import { existsSync, unlinkSync } from 'node:fs';

@Injectable()
export class SiteSubmissionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
  ) { }

  private async verifyMembership(auth: AuthenticatedUser) {
    const membership = await this.prisma.tenantMembership.findFirst({
      where: {
        id: auth.membershipId,
        tenantId: auth.tenantId,
        userId: auth.sub,
        membershipStatus: 'ACTIVE',
        tenant: { is: { status: 'ACTIVE' } },
        user: { is: { status: 'ACTIVE' } },
      },
      select: { id: true },
    });

    if (!membership) {
      throw new ForbiddenException('Active supervisor membership required');
    }
  }

  private isOwner(auth: AuthenticatedUser): boolean {
    return auth.roles.includes('OWNER');
  }

  private async verifySubmissionAccess(
    auth: AuthenticatedUser,
    submissionId: string,
  ) {
    const submission = await this.prisma.siteSubmission.findFirst({
      where: { id: submissionId, tenantId: auth.tenantId },
      include: { activities: { select: { activityId: true } } },
    });

    if (!submission) {
      throw new NotFoundException('Site submission not found');
    }

    if (this.isOwner(auth) || submission.supervisorMembershipId === auth.membershipId) {
      return submission;
    }

    const hasExplicitAssignments = await this.prisma.activityAssignment.count({
      where: {
        tenantId: auth.tenantId,
        tenantMembershipId: auth.membershipId,
      },
    });

    if (hasExplicitAssignments > 0) {
      const activityIds = submission.activities.map(a => a.activityId);

      const assignedCount = await this.prisma.activityAssignment.count({
        where: {
          tenantId: auth.tenantId,
          tenantMembershipId: auth.membershipId,
          activityId: { in: activityIds },
        },
      });

      if (assignedCount !== activityIds.length) {
        throw new ForbiddenException('You are not assigned to this submission');
      }
    }

    return submission;
  }

  async create(auth: AuthenticatedUser, projectId: string, input: any) {
    await this.verifyMembership(auth);

    if (!input || typeof input !== 'object' || Array.isArray(input)) {
      throw new BadRequestException('Invalid request body');
    }

    const { activityIds, latitude, longitude, locationAccuracyM, locationCapturedAt, remarks, startChainage, endChainage } = input;

    if (
      typeof startChainage !== 'string' ||
      !startChainage.trim() ||
      startChainage.trim().length > 50
    ) {
      throw new BadRequestException('Invalid startChainage');
    }

    if (
      typeof endChainage !== 'string' ||
      !endChainage.trim() ||
      endChainage.trim().length > 50
    ) {
      throw new BadRequestException('Invalid endChainage');
    }

    if (!Array.isArray(activityIds) || activityIds.length === 0) {
      throw new BadRequestException('Select at least one project activity');
    }

    if (
      activityIds.some((id: unknown) => typeof id !== 'string') ||
      new Set(activityIds).size !== activityIds.length
    ) {
      throw new BadRequestException('activityIds must contain unique IDs');
    }

    if (
      typeof latitude !== 'number' ||
      !Number.isFinite(latitude) ||
      latitude < -90 || latitude > 90
    ) {
      throw new BadRequestException('Invalid GPS latitude');
    }

    if (
      typeof longitude !== 'number' ||
      !Number.isFinite(longitude) ||
      longitude < -180 || longitude > 180
    ) {
      throw new BadRequestException('Invalid GPS longitude');
    }

    if (
      locationAccuracyM !== undefined &&
      locationAccuracyM !== null &&
      (typeof locationAccuracyM !== 'number' ||
        !Number.isFinite(locationAccuracyM) ||
        locationAccuracyM < 0)
    ) {
      throw new BadRequestException('Invalid GPS accuracy');
    }

    if (remarks !== undefined && remarks !== null && typeof remarks !== 'string') {
      throw new BadRequestException('remarks must be a string');
    }

    if (typeof remarks === 'string' && remarks.length > 5000) {
      throw new BadRequestException('remarks cannot exceed 5000 characters');
    }

    let capturedAt: Date | null = null;
    if (locationCapturedAt !== undefined && locationCapturedAt !== null) {
      if (typeof locationCapturedAt !== 'string' || Number.isNaN(Date.parse(locationCapturedAt))) {
        throw new BadRequestException('Invalid locationCapturedAt');
      }
      capturedAt = new Date(locationCapturedAt);
    }

    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        tenantId: auth.tenantId,
        status: { not: 'ARCHIVED' },
      },
      select: { id: true },
    });

    if (!project) throw new NotFoundException('Project not found');

    const activities = await this.prisma.activity.findMany({
      where: {
        tenantId: auth.tenantId,
        projectId,
        id: { in: activityIds },
      },
      select: { id: true },
    });

    if (activities.length !== activityIds.length) {
      throw new BadRequestException('One or more activities do not belong to this project');
    }

    return this.prisma.$transaction(async (tx) => {
      const submission = await tx.siteSubmission.create({
        data: {
          tenantId: auth.tenantId,
          projectId,
          supervisorMembershipId: auth.membershipId,
          latitude,
          longitude,
          startChainage: startChainage.trim(),
          endChainage: endChainage.trim(),
          locationAccuracyM: locationAccuracyM ?? null,
          locationCapturedAt: capturedAt,
          remarks: typeof remarks === 'string' ? remarks.trim() : null,
        },
      });

      await tx.siteSubmissionActivity.createMany({
        data: activityIds.map((activityId: string) => ({
          tenantId: auth.tenantId,
          submissionId: submission.id,
          activityId,
        })),
      });

      return tx.siteSubmission.findFirst({
        where: {
          id: submission.id,
          tenantId: auth.tenantId,
        },
        include: {
          activities: {
            include: {
              activity: {
                select: { id: true, parentId: true, activityCode: true, name: true, unit: true },
              },
            },
          },
          photos: true,
          supervisor: {
            include: {
              user: { select: { id: true, fullName: true } },
            },
          },
        },
      });
    });
  }

  async findAll(auth: AuthenticatedUser, projectId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, tenantId: auth.tenantId },
      select: { id: true },
    });
    if (!project) throw new NotFoundException('Project not found');

    const hasExplicitAssignments = await this.prisma.activityAssignment.count({
      where: {
        tenantId: auth.tenantId,
        tenantMembershipId: auth.membershipId,
      },
    });

    return this.prisma.siteSubmission.findMany({
      where: {
        tenantId: auth.tenantId,
        projectId,
        ...(this.isOwner(auth) || hasExplicitAssignments === 0
          ? {}
          : {
            OR: [
              { supervisorMembershipId: auth.membershipId },
              {
                activities: {
                  some: {
                    activity: {
                      assignments: {
                        some: {
                          tenantId: auth.tenantId,
                          tenantMembershipId: auth.membershipId,
                        },
                      },
                    },
                  },
                },
              },
            ],
          }),
      },
      include: {
        activities: { include: { activity: { select: { id: true, parentId: true, activityCode: true, name: true, unit: true } } } },
        photos: true,
        supervisor: { include: { user: { select: { id: true, fullName: true } } } },
      },
      orderBy: { submittedAt: 'desc' },
    });
  }

  async listAll(
    auth: AuthenticatedUser,
    options: {
      projectId?: string;
      search?: string;
      limit?: number;
      offset?: number;
    },
  ) {
    const isOwner = this.isOwner(auth);
    const where: any = {
      tenantId: auth.tenantId,
      ...(options.projectId ? { projectId: options.projectId } : {}),
      ...(isOwner
        ? {}
        : {
          supervisorMembershipId: auth.membershipId,
        }),
    };

    if (options.search && options.search.trim()) {
      const q = options.search.trim();
      where.OR = [
        { startChainage: { contains: q } },
        { endChainage: { contains: q } },
        { remarks: { contains: q } },
        { project: { name: { contains: q } } },
        { project: { projectCode: { contains: q } } },
      ];
    }

    const [total, items] = await Promise.all([
      this.prisma.siteSubmission.count({ where }),
      this.prisma.siteSubmission.findMany({
        where,
        include: {
          project: {
            select: { id: true, projectCode: true, name: true },
          },
          activities: {
            include: {
              activity: {
                select: { id: true, parentId: true, activityCode: true, name: true, unit: true },
              },
            },
          },
          photos: true,
          supervisor: {
            include: {
              user: { select: { id: true, fullName: true, email: true } },
            },
          },
        },
        orderBy: { submittedAt: 'desc' },
        take: options.limit ?? 50,
        skip: options.offset ?? 0,
      }),
    ]);

    return {
      total,
      limit: options.limit ?? 50,
      offset: options.offset ?? 0,
      items,
    };
  }

  async findOne(auth: AuthenticatedUser, id: string) {
    await this.verifySubmissionAccess(auth, id);
    const submission = await this.prisma.siteSubmission.findFirst({
      where: { id, tenantId: auth.tenantId },
      include: {
        activities: { include: { activity: true } },
        photos: true,
        supervisor: { include: { user: { select: { id: true, fullName: true, email: true } } } },
        project: { select: { id: true, projectCode: true, name: true } },
      },
    });

    if (!submission) throw new NotFoundException('Site submission not found');
    return submission;
  }

  async addPhoto(auth: AuthenticatedUser, id: string, file: Express.Multer.File) {
    const submission = await this.prisma.siteSubmission.findFirst({
      where: { id, tenantId: auth.tenantId },
      select: { id: true, supervisorMembershipId: true },
    });

    if (!submission) {
      if (existsSync(file.path)) unlinkSync(file.path);
      throw new NotFoundException('Site submission not found');
    }

    if (submission.supervisorMembershipId !== auth.membershipId) {
      if (existsSync(file.path)) unlinkSync(file.path);
      throw new ForbiddenException('Only the submitting supervisor can upload photographs');
    }

    const count = await this.prisma.siteSubmissionPhoto.count({
      where: { tenantId: auth.tenantId, submissionId: id },
    });

    if (count >= 5) {
      if (existsSync(file.path)) unlinkSync(file.path);
      throw new ConflictException('Maximum 5 photographs per submission');
    }

    try {
      return await this.prisma.siteSubmissionPhoto.create({
        data: {
          tenantId: auth.tenantId,
          submissionId: id,
          storageKey: file.filename,
          mimeType: file.mimetype,
          fileSize: file.size,
        },
      });
    } catch (error) {
      if (existsSync(file.path)) unlinkSync(file.path);
      throw error;
    }
  }

  async getPhoto(auth: AuthenticatedUser, id: string, photoId: string) {
    await this.verifySubmissionAccess(auth, id);
    const photo = await this.prisma.siteSubmissionPhoto.findFirst({
      where: {
        id: photoId,
        tenantId: auth.tenantId,
        submissionId: id,
      },
    });

    if (!photo) throw new NotFoundException('Photograph not found');

    const filePath = this.storage.getFilePath('site-submissions', photo.storageKey);
    return { photo, filePath };
  }
}
