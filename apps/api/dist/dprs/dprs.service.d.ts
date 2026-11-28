import { PrismaService } from '../database/prisma.service';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';
export declare class DprsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private parseReportDate;
    private validateInput;
    private getProject;
    create(auth: AuthenticatedUser, projectId: string, input: any): Promise<{
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        projectId: string;
        reportDate: Date;
        weather: string | null;
        siteConditions: string | null;
        workforceCount: number;
        labour: import("@prisma/client/runtime/client").JsonValue;
        equipment: import("@prisma/client/runtime/client").JsonValue;
        materials: import("@prisma/client/runtime/client").JsonValue;
        workProgress: import("@prisma/client/runtime/client").JsonValue;
        attachments: import("@prisma/client/runtime/client").JsonValue;
        delays: string | null;
        issues: string | null;
        remarks: string | null;
        preparedByMembershipId: string;
        reviewedByMembershipId: string | null;
        reviewRemarks: string | null;
        submittedAt: Date | null;
        reviewedAt: Date | null;
    }>;
    findAll(auth: AuthenticatedUser, projectId: string): Promise<({
        preparedBy: {
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
        reviewedBy: ({
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
        }) | null;
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        projectId: string;
        reportDate: Date;
        weather: string | null;
        siteConditions: string | null;
        workforceCount: number;
        labour: import("@prisma/client/runtime/client").JsonValue;
        equipment: import("@prisma/client/runtime/client").JsonValue;
        materials: import("@prisma/client/runtime/client").JsonValue;
        workProgress: import("@prisma/client/runtime/client").JsonValue;
        attachments: import("@prisma/client/runtime/client").JsonValue;
        delays: string | null;
        issues: string | null;
        remarks: string | null;
        preparedByMembershipId: string;
        reviewedByMembershipId: string | null;
        reviewRemarks: string | null;
        submittedAt: Date | null;
        reviewedAt: Date | null;
    })[]>;
    findOne(auth: AuthenticatedUser, id: string): Promise<{
        project: {
            id: string;
            name: string;
            projectCode: string;
        };
        preparedBy: {
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
        reviewedBy: ({
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
        }) | null;
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        projectId: string;
        reportDate: Date;
        weather: string | null;
        siteConditions: string | null;
        workforceCount: number;
        labour: import("@prisma/client/runtime/client").JsonValue;
        equipment: import("@prisma/client/runtime/client").JsonValue;
        materials: import("@prisma/client/runtime/client").JsonValue;
        workProgress: import("@prisma/client/runtime/client").JsonValue;
        attachments: import("@prisma/client/runtime/client").JsonValue;
        delays: string | null;
        issues: string | null;
        remarks: string | null;
        preparedByMembershipId: string;
        reviewedByMembershipId: string | null;
        reviewRemarks: string | null;
        submittedAt: Date | null;
        reviewedAt: Date | null;
    }>;
    update(auth: AuthenticatedUser, id: string, input: any): Promise<{
        project: {
            id: string;
            name: string;
            projectCode: string;
        };
        preparedBy: {
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
        reviewedBy: ({
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
        }) | null;
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        projectId: string;
        reportDate: Date;
        weather: string | null;
        siteConditions: string | null;
        workforceCount: number;
        labour: import("@prisma/client/runtime/client").JsonValue;
        equipment: import("@prisma/client/runtime/client").JsonValue;
        materials: import("@prisma/client/runtime/client").JsonValue;
        workProgress: import("@prisma/client/runtime/client").JsonValue;
        attachments: import("@prisma/client/runtime/client").JsonValue;
        delays: string | null;
        issues: string | null;
        remarks: string | null;
        preparedByMembershipId: string;
        reviewedByMembershipId: string | null;
        reviewRemarks: string | null;
        submittedAt: Date | null;
        reviewedAt: Date | null;
    }>;
    submit(auth: AuthenticatedUser, id: string): Promise<{
        project: {
            id: string;
            name: string;
            projectCode: string;
        };
        preparedBy: {
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
        reviewedBy: ({
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
        }) | null;
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        projectId: string;
        reportDate: Date;
        weather: string | null;
        siteConditions: string | null;
        workforceCount: number;
        labour: import("@prisma/client/runtime/client").JsonValue;
        equipment: import("@prisma/client/runtime/client").JsonValue;
        materials: import("@prisma/client/runtime/client").JsonValue;
        workProgress: import("@prisma/client/runtime/client").JsonValue;
        attachments: import("@prisma/client/runtime/client").JsonValue;
        delays: string | null;
        issues: string | null;
        remarks: string | null;
        preparedByMembershipId: string;
        reviewedByMembershipId: string | null;
        reviewRemarks: string | null;
        submittedAt: Date | null;
        reviewedAt: Date | null;
    }>;
    approve(auth: AuthenticatedUser, id: string, input: any): Promise<{
        project: {
            id: string;
            name: string;
            projectCode: string;
        };
        preparedBy: {
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
        reviewedBy: ({
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
        }) | null;
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        projectId: string;
        reportDate: Date;
        weather: string | null;
        siteConditions: string | null;
        workforceCount: number;
        labour: import("@prisma/client/runtime/client").JsonValue;
        equipment: import("@prisma/client/runtime/client").JsonValue;
        materials: import("@prisma/client/runtime/client").JsonValue;
        workProgress: import("@prisma/client/runtime/client").JsonValue;
        attachments: import("@prisma/client/runtime/client").JsonValue;
        delays: string | null;
        issues: string | null;
        remarks: string | null;
        preparedByMembershipId: string;
        reviewedByMembershipId: string | null;
        reviewRemarks: string | null;
        submittedAt: Date | null;
        reviewedAt: Date | null;
    }>;
    reject(auth: AuthenticatedUser, id: string, input: any): Promise<{
        project: {
            id: string;
            name: string;
            projectCode: string;
        };
        preparedBy: {
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
        reviewedBy: ({
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
        }) | null;
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        projectId: string;
        reportDate: Date;
        weather: string | null;
        siteConditions: string | null;
        workforceCount: number;
        labour: import("@prisma/client/runtime/client").JsonValue;
        equipment: import("@prisma/client/runtime/client").JsonValue;
        materials: import("@prisma/client/runtime/client").JsonValue;
        workProgress: import("@prisma/client/runtime/client").JsonValue;
        attachments: import("@prisma/client/runtime/client").JsonValue;
        delays: string | null;
        issues: string | null;
        remarks: string | null;
        preparedByMembershipId: string;
        reviewedByMembershipId: string | null;
        reviewRemarks: string | null;
        submittedAt: Date | null;
        reviewedAt: Date | null;
    }>;
}
