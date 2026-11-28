"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let RolesService = class RolesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findRole(tenantId, id) {
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
        if (!role)
            throw new common_1.NotFoundException('Role not found');
        return role;
    }
    validateName(name) {
        if (typeof name !== 'string' || !name.trim() || name.trim().length > 80) {
            throw new common_1.BadRequestException('Role name must contain 1–80 characters');
        }
        return name.trim().toUpperCase();
    }
    async list(auth) {
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
    async get(auth, id) {
        return this.findRole(auth.tenantId, id);
    }
    async create(auth, body) {
        const name = this.validateName(body?.name);
        const existing = await this.prisma.role.findFirst({
            where: {
                tenantId: auth.tenantId,
                name,
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Role already exists');
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
    async update(auth, id, body) {
        const role = await this.findRole(auth.tenantId, id);
        if (role.isSystemRole || role.name === 'OWNER') {
            throw new common_1.ForbiddenException('System roles cannot be modified');
        }
        const data = {};
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
                throw new common_1.ConflictException('Role name already exists');
            }
            data.name = name;
        }
        if (body.description !== undefined) {
            if (body.description !== null &&
                (typeof body.description !== 'string' ||
                    body.description.length > 255)) {
                throw new common_1.BadRequestException('Invalid description');
            }
            data.description = body.description?.trim() || null;
        }
        if (!Object.keys(data).length) {
            throw new common_1.BadRequestException('No fields provided');
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
    async remove(auth, id) {
        const role = await this.findRole(auth.tenantId, id);
        if (role.isSystemRole || role.name === 'OWNER') {
            throw new common_1.ForbiddenException('System roles cannot be deleted');
        }
        if (role._count.membershipRoles > 0) {
            throw new common_1.ConflictException('Remove all member assignments before deleting this role');
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
    async setPermissions(auth, id, permissionKeys) {
        const role = await this.findRole(auth.tenantId, id);
        if (role.isSystemRole || role.name === 'OWNER') {
            throw new common_1.ForbiddenException('System role permissions cannot be modified');
        }
        if (!Array.isArray(permissionKeys) ||
            permissionKeys.some((key) => typeof key !== 'string' || !key.trim())) {
            throw new common_1.BadRequestException('Invalid permissionKeys');
        }
        const keys = [...new Set(permissionKeys)];
        const permissions = await this.prisma.permission.findMany({
            where: {
                permissionKey: { in: keys },
            },
            select: { id: true, permissionKey: true },
        });
        if (permissions.length !== keys.length) {
            throw new common_1.BadRequestException('One or more permissions are invalid');
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
    async assign(auth, roleId, membershipId) {
        const role = await this.findRole(auth.tenantId, roleId);
        if (role.name === 'OWNER') {
            throw new common_1.ForbiddenException('OWNER assignment is restricted to initial organization creation');
        }
        const membership = await this.prisma.tenantMembership.findFirst({
            where: {
                id: membershipId,
                tenantId: auth.tenantId,
                membershipStatus: 'ACTIVE',
            },
        });
        if (!membership) {
            throw new common_1.NotFoundException('Active membership not found');
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
    async revoke(auth, roleId, membershipId) {
        const role = await this.findRole(auth.tenantId, roleId);
        if (role.name === 'OWNER') {
            throw new common_1.ForbiddenException('OWNER cannot be revoked');
        }
        const result = await this.prisma.membershipRole.deleteMany({
            where: {
                tenantId: auth.tenantId,
                tenantMembershipId: membershipId,
                roleId,
            },
        });
        if (result.count === 0) {
            throw new common_1.NotFoundException('Role assignment not found');
        }
        return {
            status: 'revoked',
            roleId,
            membershipId,
        };
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RolesService);
//# sourceMappingURL=roles.service.js.map