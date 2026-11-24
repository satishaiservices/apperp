import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  private async findRole(tenantId: string, id: string) {
    const role = await this.prisma.role.findFirst({
      where: { id, tenantId },
      include: {
        rolePermissions: {
          include: { permission: true },
        },
        _count: {
          select: { membershipRoles: true },
        },
      },
    });

    if (!role) throw new NotFoundException('Role not found');

    return role;
  }

  private validateName(name: unknown): string {
    if (typeof name !== 'string' || !name.trim() || name.trim().length > 80) {
      throw new BadRequestException('Role name must contain 1–80 characters');
    }

    return name.trim().toUpperCase();
  }

  async list(auth: AuthenticatedUser) {
    return this.prisma.role.findMany({
      where: { tenantId: auth.tenantId },
      include: {
        rolePermissions: {
          include: { permission: true },
        },
        _count: {
          select: { membershipRoles: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async listPermissions() {
    return this.prisma.permission.findMany({
      select: {
        permissionKey: true,
        description: true,
      },
      orderBy: { permissionKey: 'asc' },
    });
  }

  async get(auth: AuthenticatedUser, id: string) {
    return this.findRole(auth.tenantId, id);
  }

  async create(
    auth: AuthenticatedUser,
    body: { name: string; description?: string },
  ) {
    const name = this.validateName(body?.name);

    const existing = await this.prisma.role.findFirst({
      where: {
        tenantId: auth.tenantId,
        name,
      },
    });

    if (existing) {
      throw new ConflictException('Role already exists');
    }

    return this.prisma.role.create({
      data: {
        tenantId: auth.tenantId,
        name,
        description: body.description?.trim() || null,
        isSystemRole: false,
      },
    });
  }

  async update(
    auth: AuthenticatedUser,
    id: string,
    body: { name?: string; description?: string | null },
  ) {
    const role = await this.findRole(auth.tenantId, id);

    if (role.isSystemRole || role.name === 'OWNER') {
      throw new ForbiddenException('System roles cannot be modified');
    }

    const data: { name?: string; description?: string | null } = {};

    if (body.name !== undefined) {
      const name = this.validateName(body.name);

      const duplicate = await this.prisma.role.findFirst({
        where: {
          tenantId: auth.tenantId,
          name,
          NOT: { id },
        },
      });

      if (duplicate) {
        throw new ConflictException('Role name already exists');
      }

      data.name = name;
    }

    if (body.description !== undefined) {
      if (
        body.description !== null &&
        (typeof body.description !== 'string' ||
          body.description.length > 255)
      ) {
        throw new BadRequestException('Invalid description');
      }

      data.description = body.description?.trim() || null;
    }

    if (!Object.keys(data).length) {
      throw new BadRequestException('No fields provided');
    }

    return this.prisma.role.update({
      where: {
        tenantId_id: {
          tenantId: auth.tenantId,
          id,
        },
      },
      data,
    });
  }

  async remove(auth: AuthenticatedUser, id: string) {
    const role = await this.findRole(auth.tenantId, id);

    if (role.isSystemRole || role.name === 'OWNER') {
      throw new ForbiddenException('System roles cannot be deleted');
    }

    if (role._count.membershipRoles > 0) {
      throw new ConflictException(
        'Remove all member assignments before deleting this role',
      );
    }

    await this.prisma.role.delete({
      where: {
        tenantId_id: {
          tenantId: auth.tenantId,
          id,
        },
      },
    });

    return { status: 'deleted', roleId: id };
  }

  async setPermissions(
    auth: AuthenticatedUser,
    id: string,
    permissionKeys: string[],
  ) {
    const role = await this.findRole(auth.tenantId, id);

    if (role.isSystemRole || role.name === 'OWNER') {
      throw new ForbiddenException(
        'System role permissions cannot be modified',
      );
    }

    if (
      !Array.isArray(permissionKeys) ||
      permissionKeys.some(
        (key) => typeof key !== 'string' || !key.trim(),
      )
    ) {
      throw new BadRequestException('Invalid permissionKeys');
    }

    const keys = [...new Set(permissionKeys)];

    const permissions = await this.prisma.permission.findMany({
      where: {
        permissionKey: { in: keys },
      },
      select: { id: true, permissionKey: true },
    });

    if (permissions.length !== keys.length) {
      throw new BadRequestException('One or more permissions are invalid');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.rolePermission.deleteMany({
        where: {
          tenantId: auth.tenantId,
          roleId: id,
        },
      });

      if (permissions.length) {
        await tx.rolePermission.createMany({
          data: permissions.map((permission) => ({
            tenantId: auth.tenantId,
            roleId: id,
            permissionId: permission.id,
          })),
        });
      }
    });

    return {
      status: 'updated',
      roleId: id,
      permissions: keys,
    };
  }

  async assign(
    auth: AuthenticatedUser,
    roleId: string,
    membershipId: string,
  ) {
    const role = await this.findRole(auth.tenantId, roleId);

    if (role.name === 'OWNER') {
      throw new ForbiddenException(
        'OWNER assignment is restricted to initial organization creation',
      );
    }

    const membership = await this.prisma.tenantMembership.findFirst({
      where: {
        id: membershipId,
        tenantId: auth.tenantId,
        membershipStatus: 'ACTIVE',
      },
    });

    if (!membership) {
      throw new NotFoundException('Active membership not found');
    }

    await this.prisma.membershipRole.upsert({
      where: {
        tenantId_tenantMembershipId_roleId: {
          tenantId: auth.tenantId,
          tenantMembershipId: membershipId,
          roleId,
        },
      },
      create: {
        tenantId: auth.tenantId,
        tenantMembershipId: membershipId,
        roleId,
      },
      update: {},
    });

    return {
      status: 'assigned',
      roleId,
      membershipId,
    };
  }

  async revoke(
    auth: AuthenticatedUser,
    roleId: string,
    membershipId: string,
  ) {
    const role = await this.findRole(auth.tenantId, roleId);

    if (role.name === 'OWNER') {
      throw new ForbiddenException('OWNER cannot be revoked');
    }

    const result = await this.prisma.membershipRole.deleteMany({
      where: {
        tenantId: auth.tenantId,
        tenantMembershipId: membershipId,
        roleId,
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Role assignment not found');
    }

    return {
      status: 'revoked',
      roleId,
      membershipId,
    };
  }
}