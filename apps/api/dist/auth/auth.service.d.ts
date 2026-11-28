import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
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
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    private readonly logger;
    private readonly passwordResetTokens;
    constructor(prisma: PrismaService, jwt: JwtService);
    register(input: RegisterInput): Promise<{
        accessToken: string;
        refreshToken: string;
        tokenType: string;
        expiresIn: number;
        user: {
            id: string;
            fullName: string;
            email: string | null;
            username: string | null;
            phone: string | null;
            emergencyPhone: string | null;
            avatarUrl: string | null;
            isPlatformAdmin: boolean;
        };
        tenant: {
            id: string;
            name: string;
            slug: string;
        };
        roles: string[];
    }>;
    login(input: LoginInput): Promise<{
        accessToken: string;
        refreshToken: string;
        tokenType: string;
        expiresIn: number;
        user: {
            id: string;
            fullName: string;
            email: string | null;
            username: string | null;
            isPlatformAdmin: boolean;
        };
        tenant: {
            id: string;
            name: string;
            slug: string;
        };
        roles: string[];
        availableTenants: never[];
    } | {
        availableTenants: {
            id: string;
            name: string;
            slug: string;
        }[];
        accessToken: string;
        refreshToken: string;
        tokenType: string;
        expiresIn: number;
        user: {
            id: string;
            fullName: string;
            email: string | null;
            username: string | null;
            phone: string | null;
            emergencyPhone: string | null;
            avatarUrl: string | null;
            isPlatformAdmin: boolean;
        };
        tenant: {
            id: string;
            name: string;
            slug: string;
        };
        roles: string[];
    }>;
    forgotPassword(input: ForgotPasswordInput): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(input: ResetPasswordInput): Promise<{
        success: boolean;
        message: string;
    }>;
    getMe(auth: {
        sub: string;
        tenantId: string;
        membershipId: string;
    }): Promise<{
        user: {
            id: string;
            fullName: string;
            email: string | null;
            phone: string | null;
            emergencyPhone: string | null;
            avatarUrl: string | null;
        };
        tenant: {
            id: string;
            name: string;
            slug: string;
        };
        membershipId: string;
        roles: string[];
        permissions: string[];
    }>;
    updateProfile(auth: {
        sub: string;
    }, input: {
        fullName?: string;
        phone?: string;
        emergencyPhone?: string;
        avatarUrl?: string;
    }): Promise<{
        message: string;
        user: {
            id: string;
            fullName: string;
            email: string | null;
            phone: string | null;
            emergencyPhone: string | null;
            avatarUrl: string | null;
        };
    }>;
    private createSession;
    refresh(input: {
        refreshToken: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
        tokenType: string;
        expiresIn: number;
        user: {
            id: string;
            fullName: string;
            email: string | null;
            username: string | null;
            phone: string | null;
            emergencyPhone: string | null;
            avatarUrl: string | null;
            isPlatformAdmin: boolean;
        };
        tenant: {
            id: string;
            name: string;
            slug: string;
        };
        roles: string[];
    } | {
        accessToken: string;
        refreshToken: string;
        tokenType: string;
        expiresIn: number;
        user: {
            id: string;
            fullName: string;
            email: string | null;
            username: string | null;
            isPlatformAdmin: boolean;
        };
        tenant: {
            id: string;
            name: string;
            slug: string;
        };
        roles: string[];
    }>;
}
