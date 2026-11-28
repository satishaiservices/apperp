import type { Response } from 'express';
import { AuthService } from './auth.service';
import { StorageService } from '../storage/storage.service';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto, RefreshTokenDto } from './dto/auth.dto';
import type { AuthenticatedUser } from './jwt-auth.guard';
export declare class AuthController {
    private readonly authService;
    private readonly storage;
    constructor(authService: AuthService, storage: StorageService);
    register(body: RegisterDto): Promise<{
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
    login(body: LoginDto): Promise<{
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
    forgotPassword(body: ForgotPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(body: ResetPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    refresh(body: RefreshTokenDto): Promise<{
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
    getMe(req: {
        user: AuthenticatedUser;
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
    updateProfile(req: {
        user: AuthenticatedUser;
    }, body: {
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
    uploadAvatar(req: {
        user: AuthenticatedUser;
    }, file?: Express.Multer.File): Promise<{
        message: string;
        avatarUrl: string;
        user: {
            id: string;
            fullName: string;
            email: string | null;
            phone: string | null;
            emergencyPhone: string | null;
            avatarUrl: string | null;
        };
    }>;
    getAvatar(filename: string, res: Response): void;
}
