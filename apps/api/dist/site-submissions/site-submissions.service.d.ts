import { PrismaService } from '../database/prisma.service';
import { StorageService } from '../storage/storage.service';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';
export declare class SiteSubmissionsService {
    private readonly prisma;
    private readonly storage;
    constructor(prisma: PrismaService, storage: StorageService);
    private verifyMembership;
    private isOwner;
    private verifySubmissionAccess;
    create(auth: AuthenticatedUser, projectId: string, input: any): Promise<({
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
    findAll(auth: AuthenticatedUser, projectId: string): Promise<({
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
    listAll(auth: AuthenticatedUser, options: {
        projectId?: string;
        search?: string;
        limit?: number;
        offset?: number;
    }): Promise<{
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
    findOne(auth: AuthenticatedUser, id: string): Promise<{
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
    addPhoto(auth: AuthenticatedUser, id: string, file: Express.Multer.File): Promise<{
        storageKey: string;
        id: string;
        tenantId: string;
        submissionId: string;
        mimeType: string;
        fileSize: number;
        capturedAt: Date | null;
        uploadedAt: Date;
    }>;
    getPhoto(auth: AuthenticatedUser, id: string, photoId: string): Promise<{
        photo: {
            storageKey: string;
            id: string;
            tenantId: string;
            submissionId: string;
            mimeType: string;
            fileSize: number;
            capturedAt: Date | null;
            uploadedAt: Date;
        };
        filePath: string;
    }>;
}
