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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const argon2_1 = require("@node-rs/argon2");
const crypto_1 = require("crypto");
const prisma_service_1 = require("../database/prisma.service");
let AuthService = AuthService_1 = class AuthService {
    prisma;
    jwt;
    logger = new common_1.Logger(AuthService_1.name);
    passwordResetTokens = new Map();
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async register(input) {
        const fullName = input.fullName?.trim();
        const email = input.email?.trim().toLowerCase();
        const password = input.password;
        const tenantName = input.tenantName?.trim();
        if (!fullName || !email || !password || !tenantName) {
            throw new common_1.BadRequestException('All fields are required');
        }
        if (password.length < 10) {
            throw new common_1.BadRequestException('Password must contain at least 10 characters');
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new common_1.BadRequestException('Invalid email address');
        }
        if (fullName.length > 160 || tenantName.length > 160) {
            throw new common_1.BadRequestException('Name is too long');
        }
        const existing = await this.prisma.user.findFirst({
            where: { email },
        });
        if (existing) {
            throw new common_1.ConflictException('Email already registered');
        }
        const passwordHash = await (0, argon2_1.hash)(password);
        const baseSlug = tenantName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 65);
        const slug = `${baseSlug || 'organization'}-${(0, crypto_1.randomUUID)().slice(0, 8)}`;
        const result = await this.prisma.$transaction(async (tx) => {
            const tenant = await tx.tenant.create({
                data: {
                    name: tenantName,
                    slug,
                },
            });
            const user = await tx.user.create({
                data: {
                    fullName,
                    email,
                    passwordHash,
                },
            });
            const role = await tx.role.create({
                data: {
                    tenantId: tenant.id,
                    name: 'OWNER',
                    description: 'Organization owner',
                    isSystemRole: true,
                },
            });
            const membership = await tx.tenantMembership.create({
                data: {
                    tenantId: tenant.id,
                    userId: user.id,
                    membershipStatus: 'ACTIVE',
                },
            });
            await tx.membershipRole.create({
                data: {
                    tenantId: tenant.id,
                    tenantMembershipId: membership.id,
                    roleId: role.id,
                },
            });
            return { tenant, user, membership };
        });
        return this.createSession(result.user, result.tenant, result.membership, ['OWNER']);
    }
    async login(input) {
        const rawIdentifier = input.identifier || input.email || input.username;
        const identifier = rawIdentifier?.trim();
        if (!identifier || !input.password) {
            throw new common_1.BadRequestException('Email/Username and password are required');
        }
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { email: { equals: identifier } },
                    { username: { equals: identifier } },
                ],
                status: 'ACTIVE',
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const validPassword = await (0, argon2_1.verify)(user.passwordHash, input.password).catch(() => false);
        if (!validPassword) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const activeMemberships = await this.prisma.tenantMembership.findMany({
            where: {
                userId: user.id,
                ...(input.tenantId ? { tenantId: input.tenantId } : {}),
                membershipStatus: 'ACTIVE',
                tenant: { status: 'ACTIVE' },
            },
            include: {
                tenant: true,
                membershipRoles: {
                    include: {
                        role: true,
                    },
                },
            },
        });
        if (activeMemberships.length === 0) {
            if (user.isPlatformAdmin) {
                const payload = {
                    sub: user.id,
                    tenantId: '00000000-0000-0000-0000-000000000000',
                    membershipId: '00000000-0000-0000-0000-000000000000',
                    roles: ['PLATFORM_ADMIN'],
                    isPlatformAdmin: true,
                };
                const accessToken = await this.jwt.signAsync(payload);
                const refreshToken = await this.jwt.signAsync({
                    sub: user.id,
                    tokenType: 'refresh',
                    tenantId: '00000000-0000-0000-0000-000000000000',
                    membershipId: '00000000-0000-0000-0000-000000000000',
                    isPlatformAdmin: true,
                }, { expiresIn: '7d' });
                return {
                    accessToken,
                    refreshToken,
                    tokenType: 'Bearer',
                    expiresIn: 3600,
                    user: {
                        id: user.id,
                        fullName: user.fullName,
                        email: user.email,
                        username: user.username,
                        isPlatformAdmin: true,
                    },
                    tenant: {
                        id: '00000000-0000-0000-0000-000000000000',
                        name: 'Platform Operator',
                        slug: 'platform-operator',
                    },
                    roles: ['PLATFORM_ADMIN'],
                    availableTenants: [],
                };
            }
            throw new common_1.UnauthorizedException(input.tenantId
                ? 'No active membership in this organization'
                : 'No active organization memberships found for this user');
        }
        const membership = activeMemberships[0];
        const roles = membership.membershipRoles.map((item) => item.role.name);
        const session = await this.createSession(user, membership.tenant, membership, roles);
        return {
            ...session,
            availableTenants: activeMemberships.map((m) => ({
                id: m.tenant.id,
                name: m.tenant.name,
                slug: m.tenant.slug,
            })),
        };
    }
    async forgotPassword(input) {
        const email = input.email?.trim().toLowerCase();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new common_1.BadRequestException('A valid email address is required');
        }
        const user = await this.prisma.user.findFirst({
            where: { email, status: 'ACTIVE' },
        });
        if (!user) {
            return {
                success: true,
                message: 'If this email is associated with an active account, verification instructions have been dispatched.',
            };
        }
        const code = (0, crypto_1.randomInt)(100000, 1000000).toString();
        this.passwordResetTokens.set(email, {
            email,
            code,
            expiresAt: Date.now() + 15 * 60 * 1000,
        });
        if (process.env.NODE_ENV !== 'production') {
            this.logger.log(`[PASSWORD RESET OTP] Dispatched code for ${email}: ${code}`);
        }
        return {
            success: true,
            message: `If this email is associated with an active account, verification instructions have been dispatched.`,
        };
    }
    async resetPassword(input) {
        const email = input.email?.trim().toLowerCase();
        const token = input.token?.trim();
        const newPassword = input.newPassword;
        if (!email || !token || !newPassword) {
            throw new common_1.BadRequestException('Email, verification code, and new password are required');
        }
        if (newPassword.length < 10) {
            throw new common_1.BadRequestException('Password must contain at least 10 characters');
        }
        const resetEntry = this.passwordResetTokens.get(email);
        if (!resetEntry || resetEntry.code !== token || Date.now() > resetEntry.expiresAt) {
            throw new common_1.BadRequestException('Invalid or expired verification code');
        }
        const user = await this.prisma.user.findFirst({
            where: { email, status: 'ACTIVE' },
        });
        if (!user) {
            throw new common_1.BadRequestException('Unable to reset password for this user');
        }
        const passwordHash = await (0, argon2_1.hash)(newPassword);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { passwordHash },
        });
        this.passwordResetTokens.delete(email);
        return {
            success: true,
            message: 'Password reset successfully. You may now log in.',
        };
    }
    async getMe(auth) {
        const membership = await this.prisma.tenantMembership.findFirst({
            where: {
                id: auth.membershipId,
                tenantId: auth.tenantId,
                userId: auth.sub,
                membershipStatus: 'ACTIVE',
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        phone: true,
                        emergencyPhone: true,
                        avatarUrl: true,
                    },
                },
                tenant: {
                    select: { id: true, name: true, slug: true },
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
        if (!membership) {
            throw new common_1.UnauthorizedException('Session membership is no longer active');
        }
        const roles = membership.membershipRoles.map((mr) => mr.role.name);
        const permissions = Array.from(new Set(membership.membershipRoles.flatMap((mr) => mr.role.rolePermissions.map((rp) => rp.permission.permissionKey))));
        return {
            user: membership.user,
            tenant: membership.tenant,
            membershipId: membership.id,
            roles,
            permissions,
        };
    }
    async updateProfile(auth, input) {
        const data = {};
        if (input.fullName && input.fullName.trim()) {
            data.fullName = input.fullName.trim();
        }
        if (input.phone !== undefined) {
            data.phone = input.phone?.trim() || null;
        }
        if (input.emergencyPhone !== undefined) {
            data.emergencyPhone = input.emergencyPhone?.trim() || null;
        }
        if (input.avatarUrl !== undefined) {
            data.avatarUrl = input.avatarUrl?.trim() || null;
        }
        const updated = await this.prisma.user.update({
            where: { id: auth.sub },
            data,
            select: {
                id: true,
                fullName: true,
                email: true,
                phone: true,
                emergencyPhone: true,
                avatarUrl: true,
            },
        });
        return {
            message: 'Profile updated successfully',
            user: updated,
        };
    }
    async createSession(user, tenant, membership, roles) {
        const payload = {
            sub: user.id,
            tenantId: tenant.id,
            membershipId: membership.id,
            roles,
            isPlatformAdmin: user.isPlatformAdmin ?? false,
        };
        const accessToken = await this.jwt.signAsync(payload);
        const refreshToken = await this.jwt.signAsync({
            sub: user.id,
            tokenType: 'refresh',
            tenantId: tenant.id,
            membershipId: membership.id,
        }, { expiresIn: '7d' });
        return {
            accessToken,
            refreshToken,
            tokenType: 'Bearer',
            expiresIn: 3600,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                username: user.username ?? null,
                phone: user.phone ?? null,
                emergencyPhone: user.emergencyPhone ?? null,
                avatarUrl: user.avatarUrl ?? null,
                isPlatformAdmin: user.isPlatformAdmin ?? false,
            },
            tenant: {
                id: tenant.id,
                name: tenant.name,
                slug: tenant.slug,
            },
            roles,
        };
    }
    async refresh(input) {
        if (!input.refreshToken?.trim()) {
            throw new common_1.BadRequestException('Refresh token is required');
        }
        let payload;
        try {
            payload = await this.jwt.verifyAsync(input.refreshToken.trim());
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
        if (payload.tokenType !== 'refresh' || !payload.sub) {
            throw new common_1.UnauthorizedException('Invalid token type');
        }
        const user = await this.prisma.user.findFirst({
            where: { id: payload.sub, status: 'ACTIVE' },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User account is no longer active');
        }
        if (user.isPlatformAdmin && payload.tenantId === '00000000-0000-0000-0000-000000000000') {
            const newAccessPayload = {
                sub: user.id,
                tenantId: '00000000-0000-0000-0000-000000000000',
                membershipId: '00000000-0000-0000-0000-000000000000',
                roles: ['PLATFORM_ADMIN'],
                isPlatformAdmin: true,
            };
            const accessToken = await this.jwt.signAsync(newAccessPayload);
            const newRefreshToken = await this.jwt.signAsync({
                sub: user.id,
                tokenType: 'refresh',
                tenantId: '00000000-0000-0000-0000-000000000000',
                membershipId: '00000000-0000-0000-0000-000000000000',
                isPlatformAdmin: true,
            }, { expiresIn: '7d' });
            return {
                accessToken,
                refreshToken: newRefreshToken,
                tokenType: 'Bearer',
                expiresIn: 3600,
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    username: user.username,
                    isPlatformAdmin: true,
                },
                tenant: {
                    id: '00000000-0000-0000-0000-000000000000',
                    name: 'Platform Operator',
                    slug: 'platform-operator',
                },
                roles: ['PLATFORM_ADMIN'],
            };
        }
        const membership = await this.prisma.tenantMembership.findFirst({
            where: {
                id: payload.membershipId,
                tenantId: payload.tenantId,
                userId: user.id,
                membershipStatus: 'ACTIVE',
                tenant: { status: 'ACTIVE' },
            },
            include: {
                tenant: true,
                membershipRoles: {
                    include: { role: true },
                },
            },
        });
        if (!membership) {
            throw new common_1.UnauthorizedException('Organization membership is no longer active');
        }
        const roles = membership.membershipRoles.map((r) => r.role.name);
        return this.createSession(user, membership.tenant, membership, roles);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map