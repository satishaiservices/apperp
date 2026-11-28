import { ActivitiesService } from './activities.service';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';
import { CreateActivityDto, UpdateActivityDto, SetAssignmentsDto } from './dto/activity.dto';
export declare class ActivitiesController {
    private readonly activitiesService;
    constructor(activitiesService: ActivitiesService);
    create(req: {
        user: AuthenticatedUser;
    }, projectId: string, body: CreateActivityDto): Promise<{
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
    getActivityTree(req: {
        user: AuthenticatedUser;
    }, projectId: string): Promise<({
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
    findAll(req: {
        user: AuthenticatedUser;
    }, projectId: string): Promise<{
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
    findOne(req: {
        user: AuthenticatedUser;
    }, id: string): Promise<{
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
    update(req: {
        user: AuthenticatedUser;
    }, id: string, body: UpdateActivityDto): Promise<{
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
    remove(req: {
        user: AuthenticatedUser;
    }, id: string): Promise<{
        message: string;
    }>;
    getAssignments(req: {
        user: AuthenticatedUser;
    }, id: string): Promise<({
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
    setAssignments(req: {
        user: AuthenticatedUser;
    }, id: string, body: SetAssignmentsDto): Promise<({
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
}
