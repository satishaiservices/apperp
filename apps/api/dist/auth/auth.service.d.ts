import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import { MailService } from '../common/services/mail.service';
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
export declare const MIN_PASSWORD_LENGTH = 10;
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    private readonly mail;
    private readonly logger;
    constructor(prisma: PrismaService, jwt: JwtService, mail: MailService);
    isRegistrationEnabled(): boolean;
    register(input: RegisterInput): Promise<{
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
            mustChangePassword: boolean;
        };
        tenant: {
            id: string;
            name: string;
            slug: string;
        };
        roles: string[];
        accessToken: string;
        refreshToken: string;
    }>;
    login(input: LoginInput): Promise<{
        availableTenants: {
            id: string;
            name: string;
            slug: string;
        }[];
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
            mustChangePassword: boolean;
        };
        tenant: {
            id: string;
            name: string;
            slug: string;
        };
        roles: string[];
        accessToken: string;
        refreshToken: string;
    }>;
    forgotPassword(input: ForgotPasswordInput): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(input: ResetPasswordInput): Promise<{
        success: boolean;
        message: string;
    }>;
    changePassword(auth: {
        sub: string;
        tenantId: string;
        membershipId: string;
        isPlatformAdmin?: boolean;
    }, input: {
        currentPassword: string;
        newPassword: string;
    }): Promise<{
        tokenType: string;
        expiresIn: number;
        user: {
            isPlatformAdmin: boolean;
            id: string;
            fullName: string;
            email: string | null;
            username: string | null;
            phone: string | null;
            emergencyPhone: string | null;
            avatarUrl: string | null;
            mustChangePassword: boolean;
        };
        tenant: {
            id: string;
            name: string;
            slug: string;
        };
        roles: string[];
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    private assertPasswordStrength;
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
    private signTokens;
    private publicUser;
    private createPlatformSession;
    private createSession;
    refresh(input: {
        refreshToken?: string;
    }): Promise<{
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
            mustChangePassword: boolean;
        };
        tenant: {
            id: string;
            name: string;
            slug: string;
        };
        roles: string[];
        accessToken: string;
        refreshToken: string;
    }>;
}
