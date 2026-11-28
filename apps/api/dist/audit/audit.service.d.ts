import { PrismaService } from '../database/prisma.service';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';
export interface AuditRecordInput {
    tenantId?: string;
    actorMembershipId?: string;
    action: string;
    entityType: string;
    entityId?: string;
    metadata?: Record<string, any>;
}
export declare class AuditService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    log(auth: AuthenticatedUser, action: string, entityType: string, entityId?: string, metadata?: Record<string, any>): Promise<{
        id: string;
        tenantId: string;
        actorMembershipId: string | null;
        action: string;
        entityType: string;
        entityId: string | null;
        occurredAt: Date;
        correlationId: string | null;
        metadata: import("@prisma/client/runtime/client").JsonValue;
    } | null>;
    record(input: AuditRecordInput): Promise<{
        id: string;
        tenantId: string;
        actorMembershipId: string | null;
        action: string;
        entityType: string;
        entityId: string | null;
        occurredAt: Date;
        correlationId: string | null;
        metadata: import("@prisma/client/runtime/client").JsonValue;
    } | null>;
    getTenantAuditLogs(auth: AuthenticatedUser, options?: {
        limit?: number;
        offset?: number;
        action?: string;
    }): Promise<{
        items: ({
            actorMembership: ({
                user: {
                    id: string;
                    fullName: string;
                    username: string | null;
                    email: string | null;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                tenantId: string;
                userId: string;
                membershipStatus: string;
                joinedAt: Date | null;
            }) | null;
        } & {
            id: string;
            tenantId: string;
            actorMembershipId: string | null;
            action: string;
            entityType: string;
            entityId: string | null;
            occurredAt: Date;
            correlationId: string | null;
            metadata: import("@prisma/client/runtime/client").JsonValue;
        })[];
        total: number;
        limit: number;
        offset: number;
    }>;
    getPlatformAuditLogs(options?: {
        limit?: number;
        offset?: number;
        tenantId?: string;
        action?: string;
    }): Promise<{
        items: ({
            tenant: {
                id: string;
                name: string;
                slug: string;
            };
            actorMembership: ({
                user: {
                    id: string;
                    fullName: string;
                    username: string | null;
                    email: string | null;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                tenantId: string;
                userId: string;
                membershipStatus: string;
                joinedAt: Date | null;
            }) | null;
        } & {
            id: string;
            tenantId: string;
            actorMembershipId: string | null;
            action: string;
            entityType: string;
            entityId: string | null;
            occurredAt: Date;
            correlationId: string | null;
            metadata: import("@prisma/client/runtime/client").JsonValue;
        })[];
        total: number;
        limit: number;
        offset: number;
    }>;
}
