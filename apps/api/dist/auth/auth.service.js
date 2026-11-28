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
exports.AuthService = exports.MIN_PASSWORD_LENGTH = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const argon2_1 = require("@node-rs/argon2");
const crypto_1 = require("crypto");
const prisma_service_1 = require("../database/prisma.service");
const mail_service_1 = require("../common/services/mail.service");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const auth_tokens_1 = require("./auth-tokens");
const MAX_FAILED_LOGINS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;
const RESET_CODE_TTL_MS = 15 * 60 * 1000;
const MAX_RESET_CODE_ATTEMPTS = 5;
exports.MIN_PASSWORD_LENGTH = 10;
let AuthService = AuthService_1 = class AuthService {
    prisma;
    jwt;
    mail;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(prisma, jwt, mail) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.mail = mail;
    }
    isRegistrationEnabled() {
        return process.env.ALLOW_REGISTRATION === 'true';
    }
    async register(input) {
        if (!this.isRegistrationEnabled()) {
            throw new common_1.ForbiddenException('Self-registration is disabled. Ask your administrator for an account.');
        }
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
            await (0, argon2_1.verify)(await getDummyHash(), input.password).catch(() => false);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (user.lockedUntil && user.lockedUntil.getTime() > Date.now()) {
            throw new common_1.HttpException('Too many failed login attempts. Try again in a few minutes or ask an administrator to reset your password.', common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
        const validPassword = await (0, argon2_1.verify)(user.passwordHash, input.password).catch(() => false);
        if (!validPassword) {
            const failed = user.failedLoginCount + 1;
            const lock = failed >= MAX_FAILED_LOGINS;
            await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    failedLoginCount: lock ? 0 : failed,
                    lockedUntil: lock ? new Date(Date.now() + LOCKOUT_MS) : user.lockedUntil,
                },
            });
            if (lock) {
                this.logger.warn(`Account ${user.id} locked after ${MAX_FAILED_LOGINS} failed logins`);
            }
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (user.failedLoginCount > 0 || user.lockedUntil) {
            await this.prisma.user.update({
                where: { id: user.id },
                data: { failedLoginCount: 0, lockedUntil: null },
            });
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
                return {
                    ...(await this.createPlatformSession(user)),
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
        if (!this.mail.isConfigured()) {
            throw new common_1.ServiceUnavailableException('Password reset by email is not available. Please ask your administrator to reset your password.');
        }
        const genericResponse = {
            success: true,
            message: 'If this email is associated with an active account, a verification code has been sent.',
        };
        const user = await this.prisma.user.findFirst({
            where: { email, status: 'ACTIVE' },
        });
        if (!user) {
            return genericResponse;
        }
        const code = (0, crypto_1.randomInt)(100000, 1000000).toString();
        await this.prisma.passwordResetCode.deleteMany({ where: { userId: user.id } });
        await this.prisma.passwordResetCode.create({
            data: {
                userId: user.id,
                codeHash: await (0, argon2_1.hash)(code),
                expiresAt: new Date(Date.now() + RESET_CODE_TTL_MS),
            },
        });
        try {
            await this.mail.send({
                to: email,
                subject: 'Your password reset code',
                text: `Your verification code is ${code}.\n\n` +
                    'It expires in 15 minutes. If you did not request a password reset, ignore this email.',
            });
        }
        catch (error) {
            this.logger.error(`Failed to send password reset email: ${error.message}`);
            throw new common_1.ServiceUnavailableException('Could not send the verification email. Try again later.');
        }
        return genericResponse;
    }
    async resetPassword(input) {
        const email = input.email?.trim().toLowerCase();
        const token = input.token?.trim();
        const newPassword = input.newPassword;
        if (!email || !token || !newPassword) {
            throw new common_1.BadRequestException('Email, verification code, and new password are required');
        }
        this.assertPasswordStrength(newPassword);
        const invalid = new common_1.BadRequestException('Invalid or expired verification code');
        const user = await this.prisma.user.findFirst({
            where: { email, status: 'ACTIVE' },
        });
        if (!user)
            throw invalid;
        const entry = await this.prisma.passwordResetCode.findFirst({
            where: { userId: user.id, usedAt: null },
            orderBy: { createdAt: 'desc' },
        });
        if (!entry || entry.expiresAt.getTime() < Date.now() || entry.attempts >= MAX_RESET_CODE_ATTEMPTS) {
            throw invalid;
        }
        const matches = await (0, argon2_1.verify)(entry.codeHash, token).catch(() => false);
        if (!matches) {
            await this.prisma.passwordResetCode.update({
                where: { id: entry.id },
                data: { attempts: { increment: 1 } },
            });
            throw invalid;
        }
        await this.prisma.$transaction([
            this.prisma.passwordResetCode.update({
                where: { id: entry.id },
                data: { usedAt: new Date() },
            }),
            this.prisma.user.update({
                where: { id: user.id },
                data: {
                    passwordHash: await (0, argon2_1.hash)(newPassword),
                    tokenVersion: { increment: 1 },
                    mustChangePassword: false,
                    failedLoginCount: 0,
                    lockedUntil: null,
                },
            }),
        ]);
        jwt_auth_guard_1.JwtAuthGuard.invalidateUser(user.id);
        return {
            success: true,
            message: 'Password reset successfully. You may now log in.',
        };
    }
    async changePassword(auth, input) {
        if (!input.currentPassword || !input.newPassword) {
            throw new common_1.BadRequestException('Current and new password are required');
        }
        this.assertPasswordStrength(input.newPassword);
        if (input.currentPassword === input.newPassword) {
            throw new common_1.BadRequestException('The new password must be different from the current one');
        }
        const user = await this.prisma.user.findFirst({
            where: { id: auth.sub, status: 'ACTIVE' },
        });
        if (!user)
            throw new common_1.UnauthorizedException('Session is no longer valid');
        const valid = await (0, argon2_1.verify)(user.passwordHash, input.currentPassword).catch(() => false);
        if (!valid) {
            throw new common_1.BadRequestException('Current password is incorrect');
        }
        const updated = await this.prisma.user.update({
            where: { id: user.id },
            data: {
                passwordHash: await (0, argon2_1.hash)(input.newPassword),
                tokenVersion: { increment: 1 },
                mustChangePassword: false,
                failedLoginCount: 0,
                lockedUntil: null,
            },
        });
        jwt_auth_guard_1.JwtAuthGuard.invalidateUser(user.id);
        if (auth.isPlatformAdmin && auth.tenantId === auth_tokens_1.PLATFORM_CONTEXT_ID) {
            return { message: 'Password changed successfully', ...(await this.createPlatformSession(updated)) };
        }
        const membership = await this.prisma.tenantMembership.findFirst({
            where: {
                id: auth.membershipId,
                tenantId: auth.tenantId,
                userId: user.id,
                membershipStatus: 'ACTIVE',
                tenant: { status: 'ACTIVE' },
            },
            include: { tenant: true, membershipRoles: { include: { role: true } } },
        });
        if (!membership)
            throw new common_1.UnauthorizedException('Organization membership is no longer active');
        return {
            message: 'Password changed successfully',
            ...(await this.createSession(updated, membership.tenant, membership, membership.membershipRoles.map((r) => r.role.name))),
        };
    }
    assertPasswordStrength(password) {
        if (password.length < exports.MIN_PASSWORD_LENGTH) {
            throw new common_1.BadRequestException(`Password must contain at least ${exports.MIN_PASSWORD_LENGTH} characters`);
        }
        if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
            throw new common_1.BadRequestException('Password must contain both letters and numbers');
        }
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
    async signTokens(user, context) {
        const base = {
            sub: user.id,
            tenantId: context.tenantId,
            membershipId: context.membershipId,
            isPlatformAdmin: context.isPlatformAdmin,
            tv: user.tokenVersion,
        };
        const accessToken = await this.jwt.signAsync({ ...base, roles: context.roles, tokenType: 'access' }, { expiresIn: auth_tokens_1.ACCESS_TOKEN_TTL_SECONDS });
        const refreshToken = await this.jwt.signAsync({ ...base, tokenType: 'refresh' }, { secret: (0, auth_tokens_1.getRefreshSecret)(), expiresIn: auth_tokens_1.REFRESH_TOKEN_TTL_SECONDS });
        return { accessToken, refreshToken };
    }
    publicUser(user) {
        return {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            username: user.username ?? null,
            phone: user.phone ?? null,
            emergencyPhone: user.emergencyPhone ?? null,
            avatarUrl: user.avatarUrl ?? null,
            isPlatformAdmin: user.isPlatformAdmin ?? false,
            mustChangePassword: user.mustChangePassword ?? false,
        };
    }
    async createPlatformSession(user) {
        const roles = ['PLATFORM_ADMIN'];
        const tokens = await this.signTokens(user, {
            tenantId: auth_tokens_1.PLATFORM_CONTEXT_ID,
            membershipId: auth_tokens_1.PLATFORM_CONTEXT_ID,
            roles,
            isPlatformAdmin: true,
        });
        return {
            ...tokens,
            tokenType: 'Bearer',
            expiresIn: auth_tokens_1.ACCESS_TOKEN_TTL_SECONDS,
            user: { ...this.publicUser(user), isPlatformAdmin: true },
            tenant: {
                id: auth_tokens_1.PLATFORM_CONTEXT_ID,
                name: 'Platform Operator',
                slug: 'platform-operator',
            },
            roles,
        };
    }
    async createSession(user, tenant, membership, roles) {
        const tokens = await this.signTokens(user, {
            tenantId: tenant.id,
            membershipId: membership.id,
            roles,
            isPlatformAdmin: user.isPlatformAdmin ?? false,
        });
        return {
            ...tokens,
            tokenType: 'Bearer',
            expiresIn: auth_tokens_1.ACCESS_TOKEN_TTL_SECONDS,
            user: this.publicUser(user),
            tenant: {
                id: tenant.id,
                name: tenant.name,
                slug: tenant.slug,
            },
            roles,
        };
    }
    async refresh(input) {
        const raw = input.refreshToken?.trim();
        if (!raw) {
            throw new common_1.UnauthorizedException('Refresh token is required');
        }
        let payload;
        try {
            payload = await this.jwt.verifyAsync(raw, { secret: (0, auth_tokens_1.getRefreshSecret)() });
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
        if (payload.tokenType !== 'refresh' || !payload.sub || typeof payload.tv !== 'number') {
            throw new common_1.UnauthorizedException('Invalid token type');
        }
        const user = await this.prisma.user.findFirst({
            where: { id: payload.sub, status: 'ACTIVE' },
        });
        if (!user || user.tokenVersion !== payload.tv) {
            throw new common_1.UnauthorizedException('Session is no longer valid');
        }
        if (user.isPlatformAdmin && payload.tenantId === auth_tokens_1.PLATFORM_CONTEXT_ID) {
            return this.createPlatformSession(user);
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
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
let dummyHash;
function getDummyHash() {
    dummyHash ??= (0, argon2_1.hash)((0, crypto_1.randomUUID)());
    return dummyHash;
}
//# sourceMappingURL=auth.service.js.map