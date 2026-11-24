import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  private async verifySupervisor(auth: AuthenticatedUser) {
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
      throw new ForbiddenException('Active supervisor membership required');
    }
  }

  async checkIn(
    auth: AuthenticatedUser,
    input: {
      projectId?: string;
      latitude?: number;
      longitude?: number;
      locationAccuracyM?: number;
      remarks?: string;
    },
  ) {
    await this.verifySupervisor(auth);

    let projectId = input.projectId;
    if (!projectId) {
      const defaultProject = await this.prisma.project.findFirst({
        where: { tenantId: auth.tenantId, status: { not: 'ARCHIVED' } },
        select: { id: true },
      });
      if (!defaultProject) {
        throw new BadRequestException('No active project found in organization');
      }
      projectId = defaultProject.id;
    }

    const project = await this.prisma.project.findFirst({
      where: { id: projectId, tenantId: auth.tenantId, status: { not: 'ARCHIVED' } },
      select: { id: true, name: true, projectCode: true },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    // If there is already an open session, check if same or return current
    const openSession = await this.prisma.attendanceSession.findFirst({
      where: {
        tenantId: auth.tenantId,
        supervisorMembershipId: auth.membershipId,
        status: 'OPEN',
      },
      include: {
        project: { select: { id: true, projectCode: true, name: true } },
      },
    });

    if (openSession) {
      // Auto-close previous open session if checking in anew
      await this.prisma.attendanceSession.update({
        where: { id: openSession.id },
        data: {
          status: 'CLOSED',
          checkOutAt: new Date(),
          remarks: 'Auto-closed on subsequent check-in',
        },
      });
    }

    const session = await this.prisma.attendanceSession.create({
      data: {
        tenantId: auth.tenantId,
        supervisorMembershipId: auth.membershipId,
        projectId,
        checkInAt: new Date(),
        status: 'OPEN',
        latitude: input.latitude !== undefined ? input.latitude : null,
        longitude: input.longitude !== undefined ? input.longitude : null,
        locationAccuracyM: input.locationAccuracyM !== undefined ? input.locationAccuracyM : null,
        remarks: input.remarks?.trim() || null,
      },
      include: {
        project: { select: { id: true, projectCode: true, name: true } },
        supervisor: {
          include: {
            user: { select: { id: true, fullName: true, email: true } },
          },
        },
      },
    });

    return {
      message: 'Check-in recorded successfully',
      session,
    };
  }

  async checkOut(
    auth: AuthenticatedUser,
    input: {
      sessionId?: string;
      latitude?: number;
      longitude?: number;
      locationAccuracyM?: number;
      remarks?: string;
    },
  ) {
    await this.verifySupervisor(auth);

    const session = await this.prisma.attendanceSession.findFirst({
      where: {
        tenantId: auth.tenantId,
        supervisorMembershipId: auth.membershipId,
        ...(input.sessionId ? { id: input.sessionId } : { status: 'OPEN' }),
      },
      include: {
        project: { select: { id: true, projectCode: true, name: true } },
      },
      orderBy: { checkInAt: 'desc' },
    });

    if (!session || session.status === 'CLOSED') {
      throw new BadRequestException('No active open check-in session found to punch out');
    }

    const checkOutAt = new Date();
    const durationMs = checkOutAt.getTime() - session.checkInAt.getTime();
    const durationMinutes = Math.max(1, Math.round(durationMs / (1000 * 60)));

    const updated = await this.prisma.attendanceSession.update({
      where: { id: session.id },
      data: {
        status: 'CLOSED',
        checkOutAt,
        checkOutLatitude: input.latitude !== undefined ? input.latitude : null,
        checkOutLongitude: input.longitude !== undefined ? input.longitude : null,
        checkOutAccuracyM: input.locationAccuracyM !== undefined ? input.locationAccuracyM : null,
        remarks: input.remarks?.trim() || session.remarks,
      },
      include: {
        project: { select: { id: true, projectCode: true, name: true } },
        supervisor: {
          include: {
            user: { select: { id: true, fullName: true, email: true } },
          },
        },
      },
    });

    return {
      message: 'Punch-out recorded successfully',
      durationMinutes,
      session: updated,
    };
  }

  async getCurrentSession(auth: AuthenticatedUser) {
    await this.verifySupervisor(auth);

    const openSession = await this.prisma.attendanceSession.findFirst({
      where: {
        tenantId: auth.tenantId,
        supervisorMembershipId: auth.membershipId,
        status: 'OPEN',
      },
      include: {
        project: { select: { id: true, projectCode: true, name: true } },
        supervisor: {
          include: {
            user: { select: { id: true, fullName: true, email: true } },
          },
        },
      },
    });

    if (openSession) {
      const elapsedMs = Date.now() - openSession.checkInAt.getTime();
      const elapsedMinutes = Math.floor(elapsedMs / (1000 * 60));
      return {
        active: true,
        elapsedMinutes,
        session: openSession,
      };
    }

    // When not currently on duty, return the most recent session so in/out times are visible
    const lastSession = await this.prisma.attendanceSession.findFirst({
      where: {
        tenantId: auth.tenantId,
        supervisorMembershipId: auth.membershipId,
      },
      include: {
        project: { select: { id: true, projectCode: true, name: true } },
        supervisor: {
          include: {
            user: { select: { id: true, fullName: true, email: true } },
          },
        },
      },
      orderBy: { checkInAt: 'desc' },
    });

    let elapsedMinutes = 0;
    if (lastSession?.checkInAt && lastSession.checkOutAt) {
      elapsedMinutes = Math.round(
        (lastSession.checkOutAt.getTime() - lastSession.checkInAt.getTime()) /
          (1000 * 60),
      );
    }

    return {
      active: false,
      elapsedMinutes,
      session: lastSession,
    };
  }

  async getHistory(
    auth: AuthenticatedUser,
    options: { limit?: number; offset?: number; projectId?: string } = {},
  ) {
    await this.verifySupervisor(auth);

    const where: any = {
      tenantId: auth.tenantId,
    };

    const isAdmin =
      auth.roles?.some((r) => ['OWNER', 'ADMIN', 'ORG_ADMIN', 'PROJECT_MANAGER'].includes(r)) ||
      auth.isPlatformAdmin;
    if (!isAdmin) {
      where.supervisorMembershipId = auth.membershipId;
    }

    if (options.projectId) {
      where.projectId = options.projectId;
    }

    const [total, items] = await Promise.all([
      this.prisma.attendanceSession.count({ where }),
      this.prisma.attendanceSession.findMany({
        where,
        include: {
          project: { select: { id: true, projectCode: true, name: true } },
          supervisor: {
            include: {
              user: { select: { id: true, fullName: true, username: true, email: true, phone: true } },
            },
          },
        },
        orderBy: { checkInAt: 'desc' },
        take: options.limit ?? 50,
        skip: options.offset ?? 0,
      }),
    ]);

    return {
      total,
      items,
    };
  }
}
