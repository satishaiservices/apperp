import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';

export interface AuditRecordInput {
  tenantId?: string;
  actorMembershipId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Record<string, any>;
}

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(private readonly prisma: PrismaService) {}

  async log(
    auth: AuthenticatedUser,
    action: string,
    entityType: string,
    entityId?: string,
    metadata?: Record<string, any>,
  ) {
    try {
      const tenantId = auth.tenantId;
      if (!tenantId || tenantId === '00000000-0000-0000-0000-000000000000') {
        return null;
      }

      const actorMembershipId =
        auth.membershipId && auth.membershipId !== '00000000-0000-0000-0000-000000000000'
          ? auth.membershipId
          : null;

      return await this.prisma.auditLog.create({
        data: {
          tenantId,
          actorMembershipId,
          action,
          entityType,
          entityId: entityId || null,
          metadata: metadata || {},
        },
      });
    } catch (err) {
      this.logger.warn(`Failed to record audit log for action ${action} on ${entityType}:`, err);
      return null;
    }
  }

  async record(input: AuditRecordInput) {
    try {
      if (!input.tenantId || input.tenantId === '00000000-0000-0000-0000-000000000000') {
        return null;
      }

      return await this.prisma.auditLog.create({
        data: {
          tenantId: input.tenantId,
          actorMembershipId: input.actorMembershipId || null,
          action: input.action,
          entityType: input.entityType,
          entityId: input.entityId || null,
          metadata: input.metadata || {},
        },
      });
    } catch (err) {
      this.logger.warn(`Failed to record system audit log:`, err);
      return null;
    }
  }

  async getTenantAuditLogs(
    auth: AuthenticatedUser,
    options?: { limit?: number; offset?: number; action?: string },
  ) {
    const tenantId = auth.tenantId;
    const limit = options?.limit || 50;
    const offset = options?.offset || 0;

    const where: any = { tenantId };
    if (options?.action) {
      where.action = options.action;
    }

    const [items, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { occurredAt: 'desc' },
        include: {
          actorMembership: {
            include: {
              user: {
                select: {
                  id: true,
                  fullName: true,
                  username: true,
                  email: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return { items, total, limit, offset };
  }

  async getPlatformAuditLogs(options?: {
    limit?: number;
    offset?: number;
    tenantId?: string;
    action?: string;
  }) {
    const limit = options?.limit || 50;
    const offset = options?.offset || 0;

    const where: any = {};
    if (options?.tenantId) {
      where.tenantId = options.tenantId;
    }
    if (options?.action) {
      where.action = options.action;
    }

    const [items, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { occurredAt: 'desc' },
        include: {
          tenant: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          actorMembership: {
            include: {
              user: {
                select: {
                  id: true,
                  fullName: true,
                  username: true,
                  email: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return { items, total, limit, offset };
  }
}
