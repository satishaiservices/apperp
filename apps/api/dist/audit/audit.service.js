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
var AuditService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let AuditService = AuditService_1 = class AuditService {
    prisma;
    logger = new common_1.Logger(AuditService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async log(auth, action, entityType, entityId, metadata) {
        try {
            const tenantId = auth.tenantId;
            if (!tenantId || tenantId === '00000000-0000-0000-0000-000000000000') {
                return null;
            }
            const actorMembershipId = auth.membershipId && auth.membershipId !== '00000000-0000-0000-0000-000000000000'
                ? auth.membershipId
                : null;
            return await this.prisma.auditLog.create({
                data: {
                    tenantId,
                    actorMembershipId,
                    action,
                    entityType,
                    entityId: entityId || null,
                    metadata: metadata || {},
                },
            });
        }
        catch (err) {
            this.logger.warn(`Failed to record audit log for action ${action} on ${entityType}:`, err);
            return null;
        }
    }
    async record(input) {
        try {
            if (!input.tenantId || input.tenantId === '00000000-0000-0000-0000-000000000000') {
                return null;
            }
            return await this.prisma.auditLog.create({
                data: {
                    tenantId: input.tenantId,
                    actorMembershipId: input.actorMembershipId || null,
                    action: input.action,
                    entityType: input.entityType,
                    entityId: input.entityId || null,
                    metadata: input.metadata || {},
                },
            });
        }
        catch (err) {
            this.logger.warn(`Failed to record system audit log:`, err);
            return null;
        }
    }
    async getTenantAuditLogs(auth, options) {
        const tenantId = auth.tenantId;
        const limit = options?.limit || 50;
        const offset = options?.offset || 0;
        const where = { tenantId };
        if (options?.action) {
            where.action = options.action;
        }
        const [items, total] = await Promise.all([
            this.prisma.auditLog.findMany({
                where,
                take: limit,
                skip: offset,
                orderBy: { occurredAt: 'desc' },
                include: {
                    actorMembership: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    fullName: true,
                                    username: true,
                                    email: true,
                                },
                            },
                        },
                    },
                },
            }),
            this.prisma.auditLog.count({ where }),
        ]);
        return { items, total, limit, offset };
    }
    async getPlatformAuditLogs(options) {
        const limit = options?.limit || 50;
        const offset = options?.offset || 0;
        const where = {};
        if (options?.tenantId) {
            where.tenantId = options.tenantId;
        }
        if (options?.action) {
            where.action = options.action;
        }
        const [items, total] = await Promise.all([
            this.prisma.auditLog.findMany({
                where,
                take: limit,
                skip: offset,
                orderBy: { occurredAt: 'desc' },
                include: {
                    tenant: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                        },
                    },
                    actorMembership: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    fullName: true,
                                    username: true,
                                    email: true,
                                },
                            },
                        },
                    },
                },
            }),
            this.prisma.auditLog.count({ where }),
        ]);
        return { items, total, limit, offset };
    }
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = AuditService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuditService);
//# sourceMappingURL=audit.service.js.map