import { PrismaService } from '../database/prisma.service';
import { AuditService } from '../audit/audit.service';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';
export interface CreateTenantInput {
    name: string;
    slug?: string;
    taxId?: string;
    tier?: string;
    adminFullName: string;
    adminUsername: string;
    adminEmail: string;
    adminPhone: string;
    adminPassword?: string;
}
export interface AddTenantUserInput {
    fullName: string;
    username: string;
    email: string;
    phone: string;
    roleName?: string;
    password?: string;
}
export declare class PlatformService {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    getStats(): Promise<{
        clientOrgsCount: number;
        activeSitesCount: number;
        fieldTerminalsCount: number;
        systemHealth: string;
        syncLatencyMs: number;
        activeRTKStreams: number;
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
    createTenantWithAdmin(input: CreateTenantInput): Promise<{
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
    resetUserPassword(tenantId: string, userId: string, newPassword?: string): Promise<{
        message: string;
        temporaryPassword: string;
        userId: string;
        username: string | null;
    }>;
    updateTenant(id: string, input: {
        name?: string;
        status?: string;
        slug?: string;
    }): Promise<{
        id: string;
        name: string;
        slug: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    addUserToTenant(tenantId: string, input: AddTenantUserInput): Promise<{
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
    listPlatformAdmins(): Promise<{
        id: string;
        status: string;
        createdAt: Date;
        fullName: string;
        username: string | null;
        email: string | null;
        phone: string | null;
    }[]>;
    createPlatformAdmin(input: {
        fullName: string;
        username: string;
        email: string;
        phone: string;
        password: string;
    }): Promise<{
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
    updatePlatformAdmin(auth: AuthenticatedUser, id: string, input: {
        fullName?: string;
        email?: string;
        phone?: string;
        status?: string;
        newPassword?: string;
    }): Promise<{
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
    deletePlatformAdmin(auth: AuthenticatedUser, id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
