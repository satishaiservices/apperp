"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MIN_JWT_SECRET_LENGTH = exports.REFRESH_TOKEN_TTL_SECONDS = exports.ACCESS_TOKEN_TTL_SECONDS = exports.PLATFORM_CONTEXT_ID = void 0;
exports.getAccessSecret = getAccessSecret;
exports.getRefreshSecret = getRefreshSecret;
const node_crypto_1 = require("node:crypto");
exports.PLATFORM_CONTEXT_ID = '00000000-0000-0000-0000-000000000000';
exports.ACCESS_TOKEN_TTL_SECONDS = 15 * 60;
exports.REFRESH_TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;
exports.MIN_JWT_SECRET_LENGTH = 32;
function getAccessSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is missing');
    }
    if (secret.length < exports.MIN_JWT_SECRET_LENGTH) {
        throw new Error(`JWT_SECRET must be at least ${exports.MIN_JWT_SECRET_LENGTH} characters (generate one with: openssl rand -hex 32)`);
    }
    return secret;
}
function getRefreshSecret() {
    const explicit = process.env.JWT_REFRESH_SECRET;
    if (explicit && explicit.length >= exports.MIN_JWT_SECRET_LENGTH) {
        return explicit;
    }
    return (0, node_crypto_1.createHmac)('sha256', getAccessSecret()).update('vyhir-refresh-token-v1').digest('hex');
}
//# sourceMappingURL=auth-tokens.js.map