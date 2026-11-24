import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';

@Injectable()
export class PlatformGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user as AuthenticatedUser | undefined;

    if (!user || !user.isPlatformAdmin) {
      throw new ForbiddenException(
        'Platform Operator / Super Admin privileges required',
      );
    }

    return true;
  }
}
