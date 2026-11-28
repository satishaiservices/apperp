import { AttendanceService } from './attendance.service';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';
export declare class AttendanceController {
    private readonly service;
    constructor(service: AttendanceService);
    checkIn(req: {
        user: AuthenticatedUser;
    }, body: {
        projectId: string;
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
    checkOut(req: {
        user: AuthenticatedUser;
    }, body: {
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
    getCurrentSession(req: {
        user: AuthenticatedUser;
    }): Promise<{
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
    getHistory(req: {
        user: AuthenticatedUser;
    }, limit?: string, offset?: string, projectId?: string): Promise<{
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
