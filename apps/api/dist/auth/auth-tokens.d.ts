export declare const PLATFORM_CONTEXT_ID = "00000000-0000-0000-0000-000000000000";
export declare const ACCESS_TOKEN_TTL_SECONDS: number;
export declare const REFRESH_TOKEN_TTL_SECONDS: number;
export type TokenType = 'access' | 'refresh';
export interface TokenClaims {
    sub: string;
    tenantId: string;
    membershipId: string;
    roles?: string[];
    isPlatformAdmin?: boolean;
    tokenType: TokenType;
    tv: number;
}
export declare const MIN_JWT_SECRET_LENGTH = 32;
export declare function getAccessSecret(): string;
export declare function getRefreshSecret(): string;
