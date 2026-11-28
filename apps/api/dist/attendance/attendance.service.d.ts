import { PrismaService } from '../database/prisma.service';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';
export declare class AttendanceService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private verifySupervisor;
    checkIn(auth: AuthenticatedUser, input: {
        projectId?: string;
        latitude?: number;
        longitude?: number;
        locationAccuracyM?: number;
        remarks?: string;
    }): Promise<{
        message: string;
        session: {
            project: {
                id: string;
                name: string;
                projectCode: string;
            };
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
        } & {
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            projectId: string;
            remarks: string | null;
            supervisorMembershipId: string;
            latitude: import("@prisma/client-runtime-utils").Decimal | null;
            longitude: import("@prisma/client-runtime-utils").Decimal | null;
            locationAccuracyM: import("@prisma/client-runtime-utils").Decimal | null;
            checkInAt: Date;
            checkOutAt: Date | null;
            checkOutLatitude: import("@prisma/client-runtime-utils").Decimal | null;
            checkOutLongitude: import("@prisma/client-runtime-utils").Decimal | null;
            checkOutAccuracyM: import("@prisma/client-runtime-utils").Decimal | null;
        };
    }>;
    checkOut(auth: AuthenticatedUser, input: {
        sessionId?: string;
        latitude?: number;
        longitude?: number;
        locationAccuracyM?: number;
        remarks?: string;
    }): Promise<{
        message: string;
        durationMinutes: number;
        session: {
            project: {
                id: string;
                name: string;
                projectCode: string;
            };
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
        } & {
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            projectId: string;
            remarks: string | null;
            supervisorMembershipId: string;
            latitude: import("@prisma/client-runtime-utils").Decimal | null;
            longitude: import("@prisma/client-runtime-utils").Decimal | null;
            locationAccuracyM: import("@prisma/client-runtime-utils").Decimal | null;
            checkInAt: Date;
            checkOutAt: Date | null;
            checkOutLatitude: import("@prisma/client-runtime-utils").Decimal | null;
            checkOutLongitude: import("@prisma/client-runtime-utils").Decimal | null;
            checkOutAccuracyM: import("@prisma/client-runtime-utils").Decimal | null;
        };
    }>;
    getCurrentSession(auth: AuthenticatedUser): Promise<{
        active: boolean;
        elapsedMinutes: number;
        session: ({
            project: {
                id: string;
                name: string;
                projectCode: string;
            };
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
        } & {
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            projectId: string;
            remarks: string | null;
            supervisorMembershipId: string;
            latitude: import("@prisma/client-runtime-utils").Decimal | null;
            longitude: import("@prisma/client-runtime-utils").Decimal | null;
            locationAccuracyM: import("@prisma/client-runtime-utils").Decimal | null;
            checkInAt: Date;
            checkOutAt: Date | null;
            checkOutLatitude: import("@prisma/client-runtime-utils").Decimal | null;
            checkOutLongitude: import("@prisma/client-runtime-utils").Decimal | null;
            checkOutAccuracyM: import("@prisma/client-runtime-utils").Decimal | null;
        }) | null;
    }>;
    getHistory(auth: AuthenticatedUser, options?: {
        limit?: number;
        offset?: number;
        projectId?: string;
    }): Promise<{
        total: number;
        items: ({
            project: {
                id: string;
                name: string;
                projectCode: string;
            };
            supervisor: {
                user: {
                    id: string;
                    fullName: string;
                    username: string | null;
                    email: string | null;
                    phone: string | null;
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
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            projectId: string;
            remarks: string | null;
            supervisorMembershipId: string;
            latitude: import("@prisma/client-runtime-utils").Decimal | null;
            longitude: import("@prisma/client-runtime-utils").Decimal | null;
            locationAccuracyM: import("@prisma/client-runtime-utils").Decimal | null;
            checkInAt: Date;
            checkOutAt: Date | null;
            checkOutLatitude: import("@prisma/client-runtime-utils").Decimal | null;
            checkOutLongitude: import("@prisma/client-runtime-utils").Decimal | null;
            checkOutAccuracyM: import("@prisma/client-runtime-utils").Decimal | null;
        })[];
    }>;
}
