import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { PrismaService } from '../database/prisma.service';
import { PERMISSIONS_KEY } from './permissions.decorator';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required =
      this.reflector.getAllAndOverride<string[]>(
        PERMISSIONS_KEY,
        [context.getHandler(), context.getClass()],
      ) ?? [];

    if (required.length === 0) return true;

    const request = context.switchToHttp().getRequest<{
      user?: AuthenticatedUser;
    }>();

    const auth = request.user;

    if (!auth?.sub || !auth.tenantId || !auth.membershipId) {
      throw new UnauthorizedException();
    }

    const membership =
      await this.prisma.tenantMembership.findFirst({
        where: {
          id: auth.membershipId,
          tenantId: auth.tenantId,
          userId: auth.sub,
          membershipStatus: 'ACTIVE',
          tenant: {
            is: { status: 'ACTIVE' },
          },
          user: {
            is: { status: 'ACTIVE' },
          },
        },
        include: {
          membershipRoles: {
            include: {
              role: {
                include: {
                  rolePermissions: {
                    include: {
                      permission: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

    if (!membership) {
      throw new UnauthorizedException('Inactive membership');
    }

    const roles = membership.membershipRoles.map(
      (item) => item.role.name,
    );

    // OWNER has unrestricted organization access.
    if (roles.includes('OWNER')) return true;

    const granted = new Set(
      membership.membershipRoles.flatMap((item) =>
        item.role.rolePermissions.map(
          (rp) => rp.permission.permissionKey,
        ),
      ),
    );

    const missing = required.filter(
      (permission) => !granted.has(permission),
    );

    if (missing.length) {
      throw new ForbiddenException(
        `Missing permissions: ${missing.join(', ')}`,
      );
    }

    return true;
  }
}