import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { hash } from '@node-rs/argon2';
import { generateTemporaryPassword } from '../common/utils/temporary-password.util';

import { PrismaService } from '../database/prisma.service';
import { AuditService } from '../audit/audit.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  async getProfile(auth: AuthenticatedUser) {
    const membership = await this.prisma.tenantMembership.findFirst({
      where: {
        id: auth.membershipId,
        userId: auth.sub,
        tenantId: auth.tenantId,
        membershipStatus: 'ACTIVE',
        tenant: { is: { status: 'ACTIVE' } },
        user: { is: { status: 'ACTIVE' } },
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            username: true,
            email: true,
            phone: true,
            status: true,
          },
        },
        tenant: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        membershipRoles: {
          include: { role: true },
        },
      },
    });

    if (!membership) {
      throw new NotFoundException('Active membership not found');
    }

    return {
      user: membership.user,
      tenant: membership.tenant,
      membership: {
        id: membership.id,
        status: membership.membershipStatus,
        joinedAt: membership.joinedAt,
      },
      roles: membership.membershipRoles.map((item) => item.role.name),
    };
  }

  async list(auth: AuthenticatedUser) {
    return this.prisma.tenantMembership.findMany({
      where: { tenantId: auth.tenantId },
      select: {
        id: true,
        membershipStatus: true,
        joinedAt: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            fullName: true,
            username: true,
            email: true,
            phone: true,
            status: true,
          },
        },
        membershipRoles: {
          select: {
            role: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getMember(auth: AuthenticatedUser, membershipId: string) {
    const member = await this.prisma.tenantMembership.findFirst({
      where: {
        id: membershipId,
        tenantId: auth.tenantId,
      },
      select: {
        id: true,
        membershipStatus: true,
        joinedAt: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            fullName: true,
            username: true,
            email: true,
            phone: true,
            status: true,
          },
        },
        membershipRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: { permission: true },
                },
              },
            },
          },
        },
      },
    });

    if (!member) throw new NotFoundException('Member not found');

    return member;
  }

  async addMember(
    auth: AuthenticatedUser,
    input: { email: string; roleIds?: string[] },
  ) {
    const email = input.email?.trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new BadRequestException('Valid email is required');
    }

    const requestedRoleIds = input.roleIds ?? [];

    if (!Array.isArray(requestedRoleIds)) {
      throw new BadRequestException('roleIds must be an array');
    }

    const roleIds = [...new Set(requestedRoleIds)];

    if (
      roleIds.some((id) => typeof id !== 'string' ||
        !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id))
    ) {
      throw new BadRequestException('Invalid role IDs');
    }

    const user = await this.prisma.user.findFirst({
      where: { email, status: 'ACTIVE' },
    });

    if (!user) {
      throw new NotFoundException(
        'Active registered user not found. New-user invitations are not yet supported.',
      );
    }

    const existing = await this.prisma.tenantMembership.findFirst({
      where: {
        tenantId: auth.tenantId,
        userId: user.id,
      },
    });

    if (existing) {
      throw new ConflictException('User already belongs to this organization');
    }

    const roles = roleIds.length
      ? await this.prisma.role.findMany({
          where: {
            tenantId: auth.tenantId,
            id: { in: roleIds },
          },
        })
      : [];

    if (roles.length !== roleIds.length) {
      throw new BadRequestException(
        'One or more roles do not belong to this organization',
      );
    }

    if (roles.some((role) => role.name === 'OWNER')) {
      throw new ForbiddenException(
        'OWNER assignment is restricted to organization creation',
      );
    }

    const result = await this.prisma.$transaction(async (tx) => {
      const membership = await tx.tenantMembership.create({
        data: {
          tenantId: auth.tenantId,
          userId: user.id,
          membershipStatus: 'ACTIVE',
          joinedAt: new Date(),
        },
      });

      if (roleIds.length) {
        await tx.membershipRole.createMany({
          data: roleIds.map((roleId) => ({
            tenantId: auth.tenantId,
            tenantMembershipId: membership.id,
            roleId,
          })),
        });
      }

      return {
        membershipId: membership.id,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
        },
        roles: roles.map((role) => ({
          id: role.id,
          name: role.name,
        })),
        status: 'ACTIVE',
      };
    });

    await this.audit.log(auth, 'MEMBER_ADDED', 'TenantMembership', result.membershipId, {
      email: result.user.email,
      roleIds,
    });

    return result;
  }

  async setMembershipStatus(
    auth: AuthenticatedUser,
    membershipId: string,
    status: 'ACTIVE' | 'INACTIVE',
  ) {
    const result = await this.setMembershipStatusTx(auth, membershipId, status);
    const member = await this.prisma.tenantMembership.findFirst({
      where: { id: membershipId, tenantId: auth.tenantId },
      select: { userId: true },
    });
    if (member) JwtAuthGuard.invalidateUser(member.userId);
    return result;
  }

  private async setMembershipStatusTx(
    auth: AuthenticatedUser,
    membershipId: string,
    status: 'ACTIVE' | 'INACTIVE',
  ) {
    const result = await this.prisma.$transaction(async (tx) => {
      const membership = await tx.tenantMembership.findFirst({
        where: {
          id: membershipId,
          tenantId: auth.tenantId,
        },
        include: {
          membershipRoles: {
            include: { role: true },
          },
        },
      });

      if (!membership) {
        throw new NotFoundException('Member not found');
      }

      if (membership.membershipStatus === status) {
        return {
          membershipId,
          status,
          message: 'Membership already has this status',
        };
      }

      if (status === 'INACTIVE') {
        const isOwner = membership.membershipRoles.some(
          (item) => item.role.name === 'OWNER',
        );

        if (isOwner) {
          const activeOwners = await tx.tenantMembership.count({
            where: {
              tenantId: auth.tenantId,
              membershipStatus: 'ACTIVE',
              membershipRoles: {
                some: {
                  role: { name: 'OWNER' },
                },
              },
            },
          });

          if (activeOwners <= 1) {
            throw new ForbiddenException(
              'Cannot deactivate the last active organization owner',
            );
          }
        }
      }

      await tx.tenantMembership.update({
        where: {
          tenantId_id: {
            tenantId: auth.tenantId,
            id: membershipId,
          },
        },
        data: { membershipStatus: status },
      });

      return {
        membershipId,
        status,
      };
    });

    await this.audit.log(auth, 'MEMBER_STATUS_UPDATED', 'TenantMembership', membershipId, {
      status,
    });

    return result;
  }

  async provisionEmployee(
    auth: AuthenticatedUser,
    input: {
      fullName: string;
      username: string;
      phone?: string;
      email?: string;
      password?: string;
      roleName?: string;
    },
  ) {
    const fullName = input.fullName?.trim();
    const username = input.username?.trim().toLowerCase();
    const email = input.email?.trim().toLowerCase();
    const phone = input.phone?.trim();
    const password = input.password || 'VyhirEmp@2026';
    const roleName = input.roleName || 'SUPERVISOR';

    if (!fullName || !username || !email || !phone) {
      throw new BadRequestException('Full name, username, email, and phone number are required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Please provide a valid email address');
    }

    if (phone.length < 5) {
      throw new BadRequestException('Please provide a valid phone number');
    }

    if (password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters');
    }

    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email },
        ],
      },
    });

    if (existing) {
      throw new ConflictException('Username or email is already in use');
    }

    let role = await this.prisma.role.findFirst({
      where: { tenantId: auth.tenantId, name: roleName },
    });

    if (!role) {
      role = await this.prisma.role.create({
        data: {
          tenantId: auth.tenantId,
          name: roleName,
          description: `${roleName} Role`,
          isSystemRole: true,
        },
      });
    }

    const passwordHash = await hash(password);

    const result = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          fullName,
          username,
          email,
          phone,
          passwordHash,
          status: 'ACTIVE',
        },
      });

      const membership = await tx.tenantMembership.create({
        data: {
          tenantId: auth.tenantId,
          userId: user.id,
          membershipStatus: 'ACTIVE',
          joinedAt: new Date(),
        },
      });

      await tx.membershipRole.create({
        data: {
          tenantId: auth.tenantId,
          tenantMembershipId: membership.id,
          roleId: role.id,
        },
      });

      return { user, membership, role };
    });

    await this.audit.log(auth, 'USER_PROVISIONED', 'User', result.user.id, {
      email: result.user.email,
      username: result.user.username,
      phone: result.user.phone,
      role: result.role.name,
      membershipId: result.membership.id,
    });

    return {
      success: true,
      membershipId: result.membership.id,
      user: {
        id: result.user.id,
        fullName: result.user.fullName,
        username: result.user.username,
        email: result.user.email,
        phone: result.user.phone,
        role: result.role.name,
      },
      temporaryPassword: password,
    };
  }

  async resetPassword(
    auth: AuthenticatedUser,
    membershipId: string,
    newPassword?: string,
  ) {
    const member = await this.prisma.tenantMembership.findFirst({
      where: { id: membershipId, tenantId: auth.tenantId },
      include: { user: true },
    });

    if (!member) throw new NotFoundException('Employee not found');

    const passwordToSet = newPassword?.trim() || generateTemporaryPassword();
    if (passwordToSet.length < 10) {
      throw new BadRequestException('Password must be at least 10 characters');
    }

    const passwordHash = await hash(passwordToSet);

    // Admin-set passwords are temporary: the user must choose a new one at next
    // login, and all of the user's existing sessions are revoked.
    await this.prisma.user.update({
      where: { id: member.userId },
      data: {
        passwordHash,
        mustChangePassword: true,
        tokenVersion: { increment: 1 },
        failedLoginCount: 0,
        lockedUntil: null,
      },
    });
    JwtAuthGuard.invalidateUser(member.userId);

    await this.audit.log(auth, 'USER_PASSWORD_RESET', 'User', member.userId, {
      membershipId,
      username: member.user.username,
    });

    return {
      success: true,
      message: 'Password reset successfully',
      username: member.user.username,
      temporaryPassword: passwordToSet,
    };
  }
}
