import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
export interface AuthenticatedUser {
    sub: string;
    tenantId: string;
    membershipId: string;
    roles: string[];
    isPlatformAdmin?: boolean;
}
export declare class JwtAuthGuard implements CanActivate {
    private readonly jwt;
    private readonly prisma;
    private static readonly statusCache;
    constructor(jwt: JwtService, prisma: PrismaService);
    static invalidateUser(userId: string): void;
    canActivate(context: ExecutionContext): Promise<boolean>;
    private assertAccountActive;
}
