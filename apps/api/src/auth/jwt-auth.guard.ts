import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import type { TokenClaims } from './auth-tokens';

export interface AuthenticatedUser {
  sub: string;
  tenantId: string;
  membershipId: string;
  roles: string[];
  isPlatformAdmin?: boolean;
}

/** How long a successful account-status lookup is reused (per user + membership + version). */
const STATUS_CACHE_TTL_MS = 30_000;
const STATUS_CACHE_MAX = 5_000;

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private static readonly statusCache = new Map<string, number>();

  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  /** Drop cached status so revocations (deactivate, password reset) apply immediately. */
  static invalidateUser(userId: string) {
    for (const key of JwtAuthGuard.statusCache.keys()) {
      if (key.startsWith(`${userId}|`)) {
        JwtAuthGuard.statusCache.delete(key);
      }
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Tokens are accepted only from the Authorization header. Query-string tokens
    // (?token=) leak into proxy access logs and browser history.
    const [scheme, token] = request.headers.authorization?.split(' ') ?? [];
    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Authentication required');
    }

    let payload: TokenClaims;
    try {
      payload = await this.jwt.verifyAsync<TokenClaims>(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    // Refresh tokens (and any legacy token without a type) must never act as access tokens.
    if (payload.tokenType !== 'access' || !payload.sub || typeof payload.tv !== 'number') {
      throw new UnauthorizedException('Invalid token');
    }

    if (!payload.isPlatformAdmin && (!payload.tenantId || !payload.membershipId)) {
      throw new UnauthorizedException('Invalid token: missing tenant context');
    }

    await this.assertAccountActive(payload);

    request.user = {
      sub: payload.sub,
      tenantId: payload.tenantId,
      membershipId: payload.membershipId,
      roles: payload.roles ?? [],
      isPlatformAdmin: payload.isPlatformAdmin ?? false,
    } satisfies AuthenticatedUser;

    return true;
  }

  private async assertAccountActive(payload: TokenClaims) {
    const key = `${payload.sub}|${payload.membershipId}|${payload.tv}`;
    const now = Date.now();
    const cachedUntil = JwtAuthGuard.statusCache.get(key);
    if (cachedUntil && cachedUntil > now) {
      return;
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { status: true, tokenVersion: true, isPlatformAdmin: true },
    });

    if (!user || user.status !== 'ACTIVE' || user.tokenVersion !== payload.tv) {
      throw new UnauthorizedException('Session is no longer valid');
    }

    if (payload.isPlatformAdmin) {
      if (!user.isPlatformAdmin) {
        throw new UnauthorizedException('Session is no longer valid');
      }
    } else {
      const membership = await this.prisma.tenantMembership.findFirst({
        where: {
          id: payload.membershipId,
          tenantId: payload.tenantId,
          userId: payload.sub,
          membershipStatus: 'ACTIVE',
          tenant: { status: 'ACTIVE' },
        },
        select: { id: true },
      });
      if (!membership) {
        throw new UnauthorizedException('Organization membership is no longer active');
      }
    }

    if (JwtAuthGuard.statusCache.size >= STATUS_CACHE_MAX) {
      JwtAuthGuard.statusCache.clear();
    }
    JwtAuthGuard.statusCache.set(key, now + STATUS_CACHE_TTL_MS);
  }
}
