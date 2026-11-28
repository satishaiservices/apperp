import { DprsService } from './dprs.service';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';
import { CreateDprDto, UpdateDprDto, ReviewDprDto } from './dto/dpr.dto';
export declare class DprsController {
    private readonly dprsService;
    constructor(dprsService: DprsService);
    create(req: {
        user: AuthenticatedUser;
    }, projectId: string, body: CreateDprDto): Promise<{
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
    findAll(req: {
        user: AuthenticatedUser;
    }, projectId: string): Promise<({
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
    findOne(req: {
        user: AuthenticatedUser;
    }, id: string): Promise<{
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
    update(req: {
        user: AuthenticatedUser;
    }, id: string, body: UpdateDprDto): Promise<{
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
    submit(req: {
        user: AuthenticatedUser;
    }, id: string): Promise<{
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
    approve(req: {
        user: AuthenticatedUser;
    }, id: string, body: ReviewDprDto): Promise<{
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
    reject(req: {
        user: AuthenticatedUser;
    }, id: string, body: ReviewDprDto): Promise<{
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
