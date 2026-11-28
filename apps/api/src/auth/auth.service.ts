import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  ServiceUnavailableException,
  Logger,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { hash, verify } from '@node-rs/argon2';
import { randomUUID, randomInt } from 'crypto';
import { PrismaService } from '../database/prisma.service';
import { MailService } from '../common/services/mail.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import {
  ACCESS_TOKEN_TTL_SECONDS,
  PLATFORM_CONTEXT_ID,
  REFRESH_TOKEN_TTL_SECONDS,
  TokenClaims,
  getRefreshSecret,
} from './auth-tokens';

export interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  tenantName: string;
}

export interface LoginInput {
  email?: string;
  username?: string;
  identifier?: string;
  password: string;
  tenantId?: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  email: string;
  token: string;
  newPassword: string;
}

/** Failed logins before an account is temporarily locked. */
const MAX_FAILED_LOGINS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;
const RESET_CODE_TTL_MS = 15 * 60 * 1000;
const MAX_RESET_CODE_ATTEMPTS = 5;
export const MIN_PASSWORD_LENGTH = 10;

interface SessionUser {
  id: string;
  fullName: string;
  email: string | null;
  username?: string | null;
  phone?: string | null;
  emergencyPhone?: string | null;
  avatarUrl?: string | null;
  isPlatformAdmin?: boolean;
  tokenVersion: number;
  mustChangePassword?: boolean;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly mail: MailService,
  ) { }

  /** Self-service sign-up creates a brand-new organization; off unless explicitly enabled. */
  isRegistrationEnabled(): boolean {
    return process.env.ALLOW_REGISTRATION === 'true';
  }

  async register(input: RegisterInput) {
    if (!this.isRegistrationEnabled()) {
      throw new ForbiddenException(
        'Self-registration is disabled. Ask your administrator for an account.',
      );
    }

    const fullName = input.fullName?.trim();
    const email = input.email?.trim().toLowerCase();
    const password = input.password;
    const tenantName = input.tenantName?.trim();

    if (!fullName || !email || !password || !tenantName) {
      throw new BadRequestException('All fields are required');
    }

    if (password.length < 10) {
      throw new BadRequestException(
        'Password must contain at least 10 characters',
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new BadRequestException('Invalid email address');
    }

    if (fullName.length > 160 || tenantName.length > 160) {
      throw new BadRequestException('Name is too long');
    }

    const existing = await this.prisma.user.findFirst({
      where: { email },
    });

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await hash(password);

    const baseSlug = tenantName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 65);

    const slug = `${baseSlug || 'organization'}-${randomUUID().slice(0, 8)}`;

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

    return this.createSession(
      result.user,
      result.tenant,
      result.membership,
      ['OWNER'],
    );
  }


  async login(input: LoginInput) {
    const rawIdentifier = input.identifier || input.email || input.username;
    const identifier = rawIdentifier?.trim();

    if (!identifier || !input.password) {
      throw new BadRequestException('Email/Username and password are required');
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
      // Spend comparable time to a real check so response timing does not reveal usernames.
      await verify(await getDummyHash(), input.password).catch(() => false);
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.lockedUntil && user.lockedUntil.getTime() > Date.now()) {
      throw new HttpException(
        'Too many failed login attempts. Try again in a few minutes or ask an administrator to reset your password.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    const validPassword = await verify(
      user.passwordHash,
      input.password,
    ).catch(() => false);

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
      throw new UnauthorizedException('Invalid credentials');
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

      throw new UnauthorizedException(
        input.tenantId
          ? 'No active membership in this organization'
          : 'No active organization memberships found for this user',
      );
    }

    const membership = activeMemberships[0];
    const roles = membership.membershipRoles.map((item) => item.role.name);

    const session = await this.createSession(
      user,
      membership.tenant,
      membership,
      roles,
    );

    return {
      ...session,
      availableTenants: activeMemberships.map((m) => ({
        id: m.tenant.id,
        name: m.tenant.name,
        slug: m.tenant.slug,
      })),
    };
  }

  async forgotPassword(input: ForgotPasswordInput) {
    const email = input.email?.trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new BadRequestException('A valid email address is required');
    }

    if (!this.mail.isConfigured()) {
      throw new ServiceUnavailableException(
        'Password reset by email is not available. Please ask your administrator to reset your password.',
      );
    }

    const genericResponse = {
      success: true,
      message:
        'If this email is associated with an active account, a verification code has been sent.',
    };

    const user = await this.prisma.user.findFirst({
      where: { email, status: 'ACTIVE' },
    });

    if (!user) {
      return genericResponse;
    }

    const code = randomInt(100000, 1000000).toString();
    // Only one live code per user: older unused codes are discarded.
    await this.prisma.passwordResetCode.deleteMany({ where: { userId: user.id } });
    await this.prisma.passwordResetCode.create({
      data: {
        userId: user.id,
        codeHash: await hash(code),
        expiresAt: new Date(Date.now() + RESET_CODE_TTL_MS),
      },
    });

    try {
      await this.mail.send({
        to: email,
        subject: 'Your password reset code',
        text:
          `Your verification code is ${code}.\n\n` +
          'It expires in 15 minutes. If you did not request a password reset, ignore this email.',
      });
    } catch (error) {
      this.logger.error(`Failed to send password reset email: ${(error as Error).message}`);
      throw new ServiceUnavailableException('Could not send the verification email. Try again later.');
    }

    return genericResponse;
  }

  async resetPassword(input: ResetPasswordInput) {
    const email = input.email?.trim().toLowerCase();
    const token = input.token?.trim();
    const newPassword = input.newPassword;

    if (!email || !token || !newPassword) {
      throw new BadRequestException('Email, verification code, and new password are required');
    }

    this.assertPasswordStrength(newPassword);

    const invalid = new BadRequestException('Invalid or expired verification code');

    const user = await this.prisma.user.findFirst({
      where: { email, status: 'ACTIVE' },
    });
    if (!user) throw invalid;

    const entry = await this.prisma.passwordResetCode.findFirst({
      where: { userId: user.id, usedAt: null },
      orderBy: { createdAt: 'desc' },
    });

    if (!entry || entry.expiresAt.getTime() < Date.now() || entry.attempts >= MAX_RESET_CODE_ATTEMPTS) {
      throw invalid;
    }

    const matches = await verify(entry.codeHash, token).catch(() => false);
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
          passwordHash: await hash(newPassword),
          tokenVersion: { increment: 1 },
          mustChangePassword: false,
          failedLoginCount: 0,
          lockedUntil: null,
        },
      }),
    ]);
    JwtAuthGuard.invalidateUser(user.id);

    return {
      success: true,
      message: 'Password reset successfully. You may now log in.',
    };
  }

  /** Signed-in user changes their own password; every other session is revoked. */
  async changePassword(
    auth: { sub: string; tenantId: string; membershipId: string; isPlatformAdmin?: boolean },
    input: { currentPassword: string; newPassword: string },
  ) {
    if (!input.currentPassword || !input.newPassword) {
      throw new BadRequestException('Current and new password are required');
    }
    this.assertPasswordStrength(input.newPassword);
    if (input.currentPassword === input.newPassword) {
      throw new BadRequestException('The new password must be different from the current one');
    }

    const user = await this.prisma.user.findFirst({
      where: { id: auth.sub, status: 'ACTIVE' },
    });
    if (!user) throw new UnauthorizedException('Session is no longer valid');

    const valid = await verify(user.passwordHash, input.currentPassword).catch(() => false);
    if (!valid) {
      throw new BadRequestException('Current password is incorrect');
    }

    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: await hash(input.newPassword),
        tokenVersion: { increment: 1 },
        mustChangePassword: false,
        failedLoginCount: 0,
        lockedUntil: null,
      },
    });
    JwtAuthGuard.invalidateUser(user.id);

    // Re-issue a session for the current device (old tokens now carry a stale version).
    if (auth.isPlatformAdmin && auth.tenantId === PLATFORM_CONTEXT_ID) {
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
    if (!membership) throw new UnauthorizedException('Organization membership is no longer active');

    return {
      message: 'Password changed successfully',
      ...(await this.createSession(
        updated,
        membership.tenant,
        membership,
        membership.membershipRoles.map((r) => r.role.name),
      )),
    };
  }

  private assertPasswordStrength(password: string) {
    if (password.length < MIN_PASSWORD_LENGTH) {
      throw new BadRequestException(
        `Password must contain at least ${MIN_PASSWORD_LENGTH} characters`,
      );
    }
    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      throw new BadRequestException('Password must contain both letters and numbers');
    }
  }

  async getMe(auth: { sub: string; tenantId: string; membershipId: string }) {
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
      throw new UnauthorizedException('Session membership is no longer active');
    }

    const roles = membership.membershipRoles.map((mr) => mr.role.name);
    const permissions = Array.from(
      new Set(
        membership.membershipRoles.flatMap((mr) =>
          mr.role.rolePermissions.map((rp) => rp.permission.permissionKey),
        ),
      ),
    );

    return {
      user: membership.user,
      tenant: membership.tenant,
      membershipId: membership.id,
      roles,
      permissions,
    };
  }

  async updateProfile(
    auth: { sub: string },
    input: {
      fullName?: string;
      phone?: string;
      emergencyPhone?: string;
      avatarUrl?: string;
    },
  ) {
    const data: {
      fullName?: string;
      phone?: string | null;
      emergencyPhone?: string | null;
      avatarUrl?: string | null;
    } = {};
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


  private async signTokens(
    user: SessionUser,
    context: { tenantId: string; membershipId: string; roles: string[]; isPlatformAdmin: boolean },
  ) {
    const base = {
      sub: user.id,
      tenantId: context.tenantId,
      membershipId: context.membershipId,
      isPlatformAdmin: context.isPlatformAdmin,
      tv: user.tokenVersion,
    };
    const accessToken = await this.jwt.signAsync(
      { ...base, roles: context.roles, tokenType: 'access' } satisfies TokenClaims,
      { expiresIn: ACCESS_TOKEN_TTL_SECONDS },
    );
    const refreshToken = await this.jwt.signAsync(
      { ...base, tokenType: 'refresh' } satisfies TokenClaims,
      { secret: getRefreshSecret(), expiresIn: REFRESH_TOKEN_TTL_SECONDS },
    );
    return { accessToken, refreshToken };
  }

  private publicUser(user: SessionUser) {
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

  private async createPlatformSession(user: SessionUser) {
    const roles = ['PLATFORM_ADMIN'];
    const tokens = await this.signTokens(user, {
      tenantId: PLATFORM_CONTEXT_ID,
      membershipId: PLATFORM_CONTEXT_ID,
      roles,
      isPlatformAdmin: true,
    });
    return {
      ...tokens,
      tokenType: 'Bearer',
      expiresIn: ACCESS_TOKEN_TTL_SECONDS,
      user: { ...this.publicUser(user), isPlatformAdmin: true },
      tenant: {
        id: PLATFORM_CONTEXT_ID,
        name: 'Platform Operator',
        slug: 'platform-operator',
      },
      roles,
    };
  }

  private async createSession(
    user: SessionUser,
    tenant: { id: string; name: string; slug: string },
    membership: { id: string },
    roles: string[],
  ) {
    const tokens = await this.signTokens(user, {
      tenantId: tenant.id,
      membershipId: membership.id,
      roles,
      isPlatformAdmin: user.isPlatformAdmin ?? false,
    });

    return {
      ...tokens,
      tokenType: 'Bearer',
      expiresIn: ACCESS_TOKEN_TTL_SECONDS,
      user: this.publicUser(user),
      tenant: {
        id: tenant.id,
        name: tenant.name,
        slug: tenant.slug,
      },
      roles,
    };
  }

  async refresh(input: { refreshToken?: string }) {
    const raw = input.refreshToken?.trim();
    if (!raw) {
      throw new UnauthorizedException('Refresh token is required');
    }

    let payload: TokenClaims;
    try {
      payload = await this.jwt.verifyAsync<TokenClaims>(raw, { secret: getRefreshSecret() });
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    if (payload.tokenType !== 'refresh' || !payload.sub || typeof payload.tv !== 'number') {
      throw new UnauthorizedException('Invalid token type');
    }

    const user = await this.prisma.user.findFirst({
      where: { id: payload.sub, status: 'ACTIVE' },
    });

    if (!user || user.tokenVersion !== payload.tv) {
      throw new UnauthorizedException('Session is no longer valid');
    }

    if (user.isPlatformAdmin && payload.tenantId === PLATFORM_CONTEXT_ID) {
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
      throw new UnauthorizedException('Organization membership is no longer active');
    }

    const roles = membership.membershipRoles.map((r) => r.role.name);
    return this.createSession(user, membership.tenant, membership, roles);
  }
}

/** Real Argon2 hash of a random value, used to equalize timing for unknown users. */
let dummyHash: Promise<string> | undefined;
function getDummyHash(): Promise<string> {
  dummyHash ??= hash(randomUUID());
  return dummyHash;
}
