import { createHmac } from 'node:crypto';

export const PLATFORM_CONTEXT_ID = '00000000-0000-0000-0000-000000000000';

export const ACCESS_TOKEN_TTL_SECONDS = 15 * 60;
export const REFRESH_TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;

export type TokenType = 'access' | 'refresh';

export interface TokenClaims {
  sub: string;
  tenantId: string;
  membershipId: string;
  roles?: string[];
  isPlatformAdmin?: boolean;
  tokenType: TokenType;
  /** users.token_version at issue time; a mismatch means the token was revoked */
  tv: number;
}

export const MIN_JWT_SECRET_LENGTH = 32;

export function getAccessSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is missing');
  }
  if (secret.length < MIN_JWT_SECRET_LENGTH) {
    throw new Error(
      `JWT_SECRET must be at least ${MIN_JWT_SECRET_LENGTH} characters (generate one with: openssl rand -hex 32)`,
    );
  }
  return secret;
}

/**
 * Refresh tokens are signed with a different key than access tokens, so one can
 * never be verified as the other. JWT_REFRESH_SECRET is used when set; otherwise a
 * key is derived from JWT_SECRET so existing deployments need no new variable.
 */
export function getRefreshSecret(): string {
  const explicit = process.env.JWT_REFRESH_SECRET;
  if (explicit && explicit.length >= MIN_JWT_SECRET_LENGTH) {
    return explicit;
  }
  return createHmac('sha256', getAccessSecret()).update('vyhir-refresh-token-v1').digest('hex');
}
