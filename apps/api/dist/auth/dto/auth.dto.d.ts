export declare class LoginDto {
    email?: string;
    username?: string;
    identifier?: string;
    password: string;
    tenantId?: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class ResetPasswordDto {
    email: string;
    token: string;
    newPassword: string;
}
export declare class RegisterDto {
    fullName: string;
    email: string;
    password: string;
    tenantName: string;
}
export declare class RefreshTokenDto {
    refreshToken: string;
}
