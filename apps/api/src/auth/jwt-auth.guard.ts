import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

export interface AuthenticatedUser {
  sub: string;
  tenantId: string;
  membershipId: string;
  roles: string[];
  isPlatformAdmin?: boolean;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    let token: string | undefined;
    const [scheme, bearerToken] =
      request.headers.authorization?.split(' ') ?? [];

    if (scheme === 'Bearer' && bearerToken) {
      token = bearerToken;
    } else if (
      request.query?.token &&
      typeof request.query.token === 'string' &&
      request.query.token.trim().length > 0
    ) {
      token = request.query.token.trim();
    }

    if (!token) {
      throw new UnauthorizedException('Authentication required');
    }

    try {
      const payload =
        await this.jwt.verifyAsync<AuthenticatedUser>(token);

      if (!payload.sub) {
        throw new UnauthorizedException('Invalid token');
      }

      if (!payload.isPlatformAdmin && (!payload.tenantId || !payload.membershipId)) {
        throw new UnauthorizedException('Invalid token: missing tenant context');
      }

      request.user = payload;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}