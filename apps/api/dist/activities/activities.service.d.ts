import { PrismaService } from '../database/prisma.service';
import { AuditService } from '../audit/audit.service';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';
export declare class ActivitiesService {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    private getProject;
    create(auth: AuthenticatedUser, projectId: string, input: any): Promise<{
        id: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        description: string | null;
        startDate: Date | null;
        projectId: string;
        parentId: string | null;
        activityCode: string;
        unit: string | null;
        priority: string;
        progress: number;
        dueDate: Date | null;
        completedAt: Date | null;
        estimatedCost: import("@prisma/client-runtime-utils").Decimal | null;
        actualCost: import("@prisma/client-runtime-utils").Decimal | null;
    }>;
    findAll(auth: AuthenticatedUser, projectId: string): Promise<{
        id: string;
        name: string;
        status: string;
        description: string | null;
        startDate: Date | null;
        parentId: string | null;
        activityCode: string;
        unit: string | null;
        priority: string;
        progress: number;
        dueDate: Date | null;
    }[]>;
    getActivityTree(auth: AuthenticatedUser, projectId: string): Promise<({
        subactivities: {
            id: string;
            name: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            description: string | null;
            startDate: Date | null;
            projectId: string;
            parentId: string | null;
            activityCode: string;
            unit: string | null;
            priority: string;
            progress: number;
            dueDate: Date | null;
            completedAt: Date | null;
            estimatedCost: import("@prisma/client-runtime-utils").Decimal | null;
            actualCost: import("@prisma/client-runtime-utils").Decimal | null;
        }[];
    } & {
        id: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        description: string | null;
        startDate: Date | null;
        projectId: string;
        parentId: string | null;
        activityCode: string;
        unit: string | null;
        priority: string;
        progress: number;
        dueDate: Date | null;
        completedAt: Date | null;
        estimatedCost: import("@prisma/client-runtime-utils").Decimal | null;
        actualCost: import("@prisma/client-runtime-utils").Decimal | null;
    })[]>;
    findOne(auth: AuthenticatedUser, id: string): Promise<{
        assignments: ({
            membership: {
                user: {
                    id: string;
                    fullName: string;
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
            };
        } & {
            tenantId: string;
            tenantMembershipId: string;
            assignedAt: Date;
            activityId: string;
        })[];
    } & {
        id: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        description: string | null;
        startDate: Date | null;
        projectId: string;
        parentId: string | null;
        activityCode: string;
        unit: string | null;
        priority: string;
        progress: number;
        dueDate: Date | null;
        completedAt: Date | null;
        estimatedCost: import("@prisma/client-runtime-utils").Decimal | null;
        actualCost: import("@prisma/client-runtime-utils").Decimal | null;
    }>;
    update(auth: AuthenticatedUser, id: string, input: any): Promise<{
        assignments: ({
            membership: {
                user: {
                    id: string;
                    fullName: string;
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
            };
        } & {
            tenantId: string;
            tenantMembershipId: string;
            assignedAt: Date;
            activityId: string;
        })[];
    } & {
        id: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        description: string | null;
        startDate: Date | null;
        projectId: string;
        parentId: string | null;
        activityCode: string;
        unit: string | null;
        priority: string;
        progress: number;
        dueDate: Date | null;
        completedAt: Date | null;
        estimatedCost: import("@prisma/client-runtime-utils").Decimal | null;
        actualCost: import("@prisma/client-runtime-utils").Decimal | null;
    }>;
    remove(auth: AuthenticatedUser, id: string): Promise<{
        message: string;
    }>;
    getAssignments(auth: AuthenticatedUser, id: string): Promise<({
        membership: {
            user: {
                id: string;
                fullName: string;
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
        };
    } & {
        tenantId: string;
        tenantMembershipId: string;
        assignedAt: Date;
        activityId: string;
    })[]>;
    setAssignments(auth: AuthenticatedUser, id: string, input: any): Promise<({
        membership: {
            user: {
                id: string;
                fullName: string;
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
        };
    } & {
        tenantId: string;
        tenantMembershipId: string;
        assignedAt: Date;
        activityId: string;
    })[]>;
    private validate;
    private parseDate;
}
