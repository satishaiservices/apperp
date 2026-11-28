import { PlatformService } from './platform.service';
import { AuditService } from '../audit/audit.service';
import { type AuthenticatedUser } from '../auth/jwt-auth.guard';
import { CreateSuperadminDto, UpdateSuperadminDto, CreateTenantDto, UpdateTenantDto, AddTenantUserDto } from './dto/platform.dto';
export declare class PlatformController {
    private readonly platformService;
    private readonly auditService;
    constructor(platformService: PlatformService, auditService: AuditService);
    getPlatformAudit(limit?: string, offset?: string, tenantId?: string, action?: string): Promise<{
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
    getStats(): Promise<{
        clientOrgsCount: number;
        activeSitesCount: number;
        fieldTerminalsCount: number;
        systemHealth: string;
        syncLatencyMs: number;
        activeRTKStreams: number;
    }>;
    getPlatformAdmins(): Promise<{
        id: string;
        status: string;
        createdAt: Date;
        fullName: string;
        username: string | null;
        email: string | null;
        phone: string | null;
    }[]>;
    createPlatformAdmin(req: {
        user: AuthenticatedUser;
    }, body: CreateSuperadminDto): Promise<{
        success: boolean;
        user: {
            id: string;
            status: string;
            createdAt: Date;
            fullName: string;
            username: string | null;
            email: string | null;
            phone: string | null;
        };
    }>;
    updatePlatformAdmin(req: {
        user: AuthenticatedUser;
    }, id: string, body: UpdateSuperadminDto): Promise<{
        success: boolean;
        user: {
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            username: string | null;
            email: string | null;
            phone: string | null;
        };
    }>;
    deletePlatformAdmin(req: {
        user: AuthenticatedUser;
    }, id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getTenants(): Promise<{
        id: string;
        name: string;
        slug: string;
        status: string;
        createdAt: Date;
        projectsCount: number;
        usersCount: number;
    }[]>;
    getTenantDetails(id: string): Promise<{
        id: string;
        name: string;
        slug: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        projectsCount: number;
        usersCount: number;
        submissionsCount: number;
        activitiesCount: number;
        projects: {
            id: string;
            name: string;
            status: string;
            createdAt: Date;
            projectCode: string;
            startChainage: string | null;
            endChainage: string | null;
            budget: import("@prisma/client-runtime-utils").Decimal | null;
        }[];
        users: {
            membershipId: string;
            membershipStatus: string;
            joinedAt: Date | null;
            userId: string;
            fullName: string;
            username: string | null;
            email: string | null;
            phone: string | null;
            userStatus: string;
            roles: string[];
        }[];
    }>;
    createTenant(body: CreateTenantDto): Promise<{
        success: boolean;
        tenant: {
            id: string;
            name: string;
            slug: string;
        };
        adminUser: {
            id: string;
            fullName: string;
            username: string | null;
            email: string | null;
            temporaryPassword: string;
        };
    }>;
    updateTenant(id: string, body: UpdateTenantDto): Promise<{
        id: string;
        name: string;
        slug: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    resetUserPassword(id: string, userId: string, body: {
        newPassword?: string;
    }): Promise<{
        message: string;
        temporaryPassword: string;
        userId: string;
        username: string | null;
    }>;
    addUserToTenant(id: string, body: AddTenantUserDto): Promise<{
        success: boolean;
        membershipId: string;
        user: {
            id: string;
            fullName: string;
            username: string | null;
            email: string | null;
            phone: string | null;
            role: string;
        };
        temporaryPassword: string;
    }>;
}
