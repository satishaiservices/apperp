import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export interface AuthenticatedUser {
    sub: string;
    tenantId: string;
    membershipId: string;
    roles: string[];
    isPlatformAdmin?: boolean;
}
export declare class JwtAuthGuard implements CanActivate {
    private readonly jwt;
    constructor(jwt: JwtService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
