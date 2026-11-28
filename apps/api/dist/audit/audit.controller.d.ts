import { AuditService } from './audit.service';
import { type AuthenticatedUser } from '../auth/jwt-auth.guard';
export declare class AuditController {
    private readonly auditService;
    constructor(auditService: AuditService);
    getTenantAuditLogs(req: {
        user: AuthenticatedUser;
    }, limit?: string, offset?: string, action?: string): Promise<{
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
}
