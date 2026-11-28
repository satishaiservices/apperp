"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var JwtAuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../database/prisma.service");
const STATUS_CACHE_TTL_MS = 30_000;
const STATUS_CACHE_MAX = 5_000;
let JwtAuthGuard = class JwtAuthGuard {
    static { JwtAuthGuard_1 = this; }
    jwt;
    prisma;
    static statusCache = new Map();
    constructor(jwt, prisma) {
        this.jwt = jwt;
        this.prisma = prisma;
    }
    static invalidateUser(userId) {
        for (const key of JwtAuthGuard_1.statusCache.keys()) {
            if (key.startsWith(`${userId}|`)) {
                JwtAuthGuard_1.statusCache.delete(key);
            }
        }
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const [scheme, token] = request.headers.authorization?.split(' ') ?? [];
        if (scheme !== 'Bearer' || !token) {
            throw new common_1.UnauthorizedException('Authentication required');
        }
        let payload;
        try {
            payload = await this.jwt.verifyAsync(token);
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
        if (payload.tokenType !== 'access' || !payload.sub || typeof payload.tv !== 'number') {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        if (!payload.isPlatformAdmin && (!payload.tenantId || !payload.membershipId)) {
            throw new common_1.UnauthorizedException('Invalid token: missing tenant context');
        }
        await this.assertAccountActive(payload);
        request.user = {
            sub: payload.sub,
            tenantId: payload.tenantId,
            membershipId: payload.membershipId,
            roles: payload.roles ?? [],
            isPlatformAdmin: payload.isPlatformAdmin ?? false,
        };
        return true;
    }
    async assertAccountActive(payload) {
        const key = `${payload.sub}|${payload.membershipId}|${payload.tv}`;
        const now = Date.now();
        const cachedUntil = JwtAuthGuard_1.statusCache.get(key);
        if (cachedUntil && cachedUntil > now) {
            return;
        }
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
            select: { status: true, tokenVersion: true, isPlatformAdmin: true },
        });
        if (!user || user.status !== 'ACTIVE' || user.tokenVersion !== payload.tv) {
            throw new common_1.UnauthorizedException('Session is no longer valid');
        }
        if (payload.isPlatformAdmin) {
            if (!user.isPlatformAdmin) {
                throw new common_1.UnauthorizedException('Session is no longer valid');
            }
        }
        else {
            const membership = await this.prisma.tenantMembership.findFirst({
                where: {
                    id: payload.membershipId,
                    tenantId: payload.tenantId,
                    userId: payload.sub,
                    membershipStatus: 'ACTIVE',
                    tenant: { status: 'ACTIVE' },
                },
                select: { id: true },
            });
            if (!membership) {
                throw new common_1.UnauthorizedException('Organization membership is no longer active');
            }
        }
        if (JwtAuthGuard_1.statusCache.size >= STATUS_CACHE_MAX) {
            JwtAuthGuard_1.statusCache.clear();
        }
        JwtAuthGuard_1.statusCache.set(key, now + STATUS_CACHE_TTL_MS);
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = JwtAuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map