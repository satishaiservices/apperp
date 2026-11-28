import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class PlatformGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
