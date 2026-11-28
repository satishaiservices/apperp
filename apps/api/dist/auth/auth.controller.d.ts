import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { StorageService } from '../storage/storage.service';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto, RefreshTokenDto, ChangePasswordDto } from './dto/auth.dto';
import type { AuthenticatedUser } from './jwt-auth.guard';
export declare class AuthController {
    private readonly authService;
    private readonly storage;
    constructor(authService: AuthService, storage: StorageService);
    private wantsCookieSession;
    private deliverSession;
    register(body: RegisterDto): Promise<{
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
    login(body: LoginDto, req: Request, res: Response): Promise<Omit<{
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
    }, "refreshToken">>;
    logout(res: Response): {
        success: boolean;
    };
    changePassword(body: ChangePasswordDto, req: Request & {
        user: AuthenticatedUser;
    }, res: Response): Promise<Omit<{
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
    }, "refreshToken">>;
    forgotPassword(body: ForgotPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(body: ResetPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    refresh(body: RefreshTokenDto, req: Request, res: Response): Promise<Omit<{
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
    }, "refreshToken">>;
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
