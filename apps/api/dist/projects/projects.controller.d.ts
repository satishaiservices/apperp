import { ProjectsService } from './projects.service';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';
import { CreateProjectDto, UpdateProjectDto, DuplicateProjectDto } from './dto/project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(req: {
        user: AuthenticatedUser;
    }, body: CreateProjectDto): Promise<{
        id: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        description: string | null;
        projectCode: string;
        clientName: string | null;
        siteAddress: string | null;
        startChainage: string | null;
        endChainage: string | null;
        startLatitude: import("@prisma/client-runtime-utils").Decimal | null;
        startLongitude: import("@prisma/client-runtime-utils").Decimal | null;
        endLatitude: import("@prisma/client-runtime-utils").Decimal | null;
        endLongitude: import("@prisma/client-runtime-utils").Decimal | null;
        budget: import("@prisma/client-runtime-utils").Decimal | null;
        startDate: Date | null;
        endDate: Date | null;
    }>;
    findAll(req: {
        user: AuthenticatedUser;
    }): Promise<({
        _count: {
            siteSubmissions: number;
            activities: number;
        };
    } & {
        id: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        description: string | null;
        projectCode: string;
        clientName: string | null;
        siteAddress: string | null;
        startChainage: string | null;
        endChainage: string | null;
        startLatitude: import("@prisma/client-runtime-utils").Decimal | null;
        startLongitude: import("@prisma/client-runtime-utils").Decimal | null;
        endLatitude: import("@prisma/client-runtime-utils").Decimal | null;
        endLongitude: import("@prisma/client-runtime-utils").Decimal | null;
        budget: import("@prisma/client-runtime-utils").Decimal | null;
        startDate: Date | null;
        endDate: Date | null;
    })[]>;
    findOne(req: {
        user: AuthenticatedUser;
    }, id: string): Promise<{
        id: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        description: string | null;
        projectCode: string;
        clientName: string | null;
        siteAddress: string | null;
        startChainage: string | null;
        endChainage: string | null;
        startLatitude: import("@prisma/client-runtime-utils").Decimal | null;
        startLongitude: import("@prisma/client-runtime-utils").Decimal | null;
        endLatitude: import("@prisma/client-runtime-utils").Decimal | null;
        endLongitude: import("@prisma/client-runtime-utils").Decimal | null;
        budget: import("@prisma/client-runtime-utils").Decimal | null;
        startDate: Date | null;
        endDate: Date | null;
    }>;
    update(req: {
        user: AuthenticatedUser;
    }, id: string, body: UpdateProjectDto): Promise<{
        id: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        description: string | null;
        projectCode: string;
        clientName: string | null;
        siteAddress: string | null;
        startChainage: string | null;
        endChainage: string | null;
        startLatitude: import("@prisma/client-runtime-utils").Decimal | null;
        startLongitude: import("@prisma/client-runtime-utils").Decimal | null;
        endLatitude: import("@prisma/client-runtime-utils").Decimal | null;
        endLongitude: import("@prisma/client-runtime-utils").Decimal | null;
        budget: import("@prisma/client-runtime-utils").Decimal | null;
        startDate: Date | null;
        endDate: Date | null;
    }>;
    duplicate(req: {
        user: AuthenticatedUser;
    }, id: string, body: DuplicateProjectDto): Promise<{
        id: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        description: string | null;
        projectCode: string;
        clientName: string | null;
        siteAddress: string | null;
        startChainage: string | null;
        endChainage: string | null;
        startLatitude: import("@prisma/client-runtime-utils").Decimal | null;
        startLongitude: import("@prisma/client-runtime-utils").Decimal | null;
        endLatitude: import("@prisma/client-runtime-utils").Decimal | null;
        endLongitude: import("@prisma/client-runtime-utils").Decimal | null;
        budget: import("@prisma/client-runtime-utils").Decimal | null;
        startDate: Date | null;
        endDate: Date | null;
    }>;
    archive(req: {
        user: AuthenticatedUser;
    }, id: string): Promise<{
        message: string;
    }>;
}
