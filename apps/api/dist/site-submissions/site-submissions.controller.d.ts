import type { Response } from 'express';
import { SiteSubmissionsService } from './site-submissions.service';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';
import { ImageProcessorService } from '../common/services/image-processor.service';
import { CreateSubmissionDto } from './dto/submission.dto';
export declare class SiteSubmissionsController {
    private readonly service;
    private readonly imageProcessor;
    constructor(service: SiteSubmissionsService, imageProcessor: ImageProcessorService);
    create(req: {
        user: AuthenticatedUser;
    }, projectId: string, body: CreateSubmissionDto): Promise<({
        activities: ({
            activity: {
                id: string;
                name: string;
                parentId: string | null;
                activityCode: string;
                unit: string | null;
            };
        } & {
            tenantId: string;
            activityId: string;
            submissionId: string;
        })[];
        supervisor: {
            user: {
                id: string;
                fullName: string;
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
        photos: {
            storageKey: string;
            id: string;
            tenantId: string;
            submissionId: string;
            mimeType: string;
            fileSize: number;
            capturedAt: Date | null;
            uploadedAt: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        tenantId: string;
        startChainage: string;
        endChainage: string;
        projectId: string;
        remarks: string | null;
        submittedAt: Date;
        supervisorMembershipId: string;
        latitude: import("@prisma/client-runtime-utils").Decimal;
        longitude: import("@prisma/client-runtime-utils").Decimal;
        locationAccuracyM: import("@prisma/client-runtime-utils").Decimal | null;
        locationCapturedAt: Date | null;
    }) | null>;
    findAll(req: {
        user: AuthenticatedUser;
    }, projectId: string): Promise<({
        activities: ({
            activity: {
                id: string;
                name: string;
                parentId: string | null;
                activityCode: string;
                unit: string | null;
            };
        } & {
            tenantId: string;
            activityId: string;
            submissionId: string;
        })[];
        supervisor: {
            user: {
                id: string;
                fullName: string;
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
        photos: {
            storageKey: string;
            id: string;
            tenantId: string;
            submissionId: string;
            mimeType: string;
            fileSize: number;
            capturedAt: Date | null;
            uploadedAt: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        tenantId: string;
        startChainage: string;
        endChainage: string;
        projectId: string;
        remarks: string | null;
        submittedAt: Date;
        supervisorMembershipId: string;
        latitude: import("@prisma/client-runtime-utils").Decimal;
        longitude: import("@prisma/client-runtime-utils").Decimal;
        locationAccuracyM: import("@prisma/client-runtime-utils").Decimal | null;
        locationCapturedAt: Date | null;
    })[]>;
    listAll(req: {
        user: AuthenticatedUser;
    }, projectId?: string, search?: string, limit?: string, offset?: string): Promise<{
        total: number;
        limit: number;
        offset: number;
        items: ({
            project: {
                id: string;
                name: string;
                projectCode: string;
            };
            activities: ({
                activity: {
                    id: string;
                    name: string;
                    parentId: string | null;
                    activityCode: string;
                    unit: string | null;
                };
            } & {
                tenantId: string;
                activityId: string;
                submissionId: string;
            })[];
            supervisor: {
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
            photos: {
                storageKey: string;
                id: string;
                tenantId: string;
                submissionId: string;
                mimeType: string;
                fileSize: number;
                capturedAt: Date | null;
                uploadedAt: Date;
            }[];
        } & {
            id: string;
            createdAt: Date;
            tenantId: string;
            startChainage: string;
            endChainage: string;
            projectId: string;
            remarks: string | null;
            submittedAt: Date;
            supervisorMembershipId: string;
            latitude: import("@prisma/client-runtime-utils").Decimal;
            longitude: import("@prisma/client-runtime-utils").Decimal;
            locationAccuracyM: import("@prisma/client-runtime-utils").Decimal | null;
            locationCapturedAt: Date | null;
        })[];
    }>;
    findOne(req: {
        user: AuthenticatedUser;
    }, id: string): Promise<{
        project: {
            id: string;
            name: string;
            projectCode: string;
        };
        activities: ({
            activity: {
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
            };
        } & {
            tenantId: string;
            activityId: string;
            submissionId: string;
        })[];
        supervisor: {
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
        photos: {
            storageKey: string;
            id: string;
            tenantId: string;
            submissionId: string;
            mimeType: string;
            fileSize: number;
            capturedAt: Date | null;
            uploadedAt: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        tenantId: string;
        startChainage: string;
        endChainage: string;
        projectId: string;
        remarks: string | null;
        submittedAt: Date;
        supervisorMembershipId: string;
        latitude: import("@prisma/client-runtime-utils").Decimal;
        longitude: import("@prisma/client-runtime-utils").Decimal;
        locationAccuracyM: import("@prisma/client-runtime-utils").Decimal | null;
        locationCapturedAt: Date | null;
    }>;
    uploadPhoto(req: {
        user: AuthenticatedUser;
    }, id: string, file: Express.Multer.File): Promise<{
        storageKey: string;
        id: string;
        tenantId: string;
        submissionId: string;
        mimeType: string;
        fileSize: number;
        capturedAt: Date | null;
        uploadedAt: Date;
    }>;
    getPhoto(req: {
        user: AuthenticatedUser;
    }, id: string, photoId: string, res: Response): Promise<void>;
}
