import { PrismaService } from '../database/prisma.service';
import { AuditService } from '../audit/audit.service';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';
export declare class UsersService {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    getProfile(auth: AuthenticatedUser): Promise<{
        user: {
            id: string;
            status: string;
            fullName: string;
            username: string | null;
            email: string | null;
            phone: string | null;
        };
        tenant: {
            id: string;
            name: string;
            slug: string;
        };
        membership: {
            id: string;
            status: string;
            joinedAt: Date | null;
        };
        roles: string[];
    }>;
    list(auth: AuthenticatedUser): Promise<{
        id: string;
        createdAt: Date;
        membershipStatus: string;
        joinedAt: Date | null;
        user: {
            id: string;
            status: string;
            fullName: string;
            username: string | null;
            email: string | null;
            phone: string | null;
        };
        membershipRoles: {
            role: {
                id: string;
                name: string;
            };
        }[];
    }[]>;
    getMember(auth: AuthenticatedUser, membershipId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        membershipStatus: string;
        joinedAt: Date | null;
        user: {
            id: string;
            status: string;
            fullName: string;
            username: string | null;
            email: string | null;
            phone: string | null;
        };
        membershipRoles: ({
            role: {
                rolePermissions: ({
                    permission: {
                        id: string;
                        permissionKey: string;
                        description: string | null;
                    };
                } & {
                    createdAt: Date;
                    tenantId: string;
                    roleId: string;
                    permissionId: string;
                })[];
            } & {
                id: string;
                name: string;
                createdAt: Date;
                tenantId: string;
                description: string | null;
                isSystemRole: boolean;
            };
        } & {
            tenantId: string;
            roleId: string;
            tenantMembershipId: string;
            assignedAt: Date;
        })[];
    }>;
    addMember(auth: AuthenticatedUser, input: {
        email: string;
        roleIds?: string[];
    }): Promise<{
        membershipId: string;
        user: {
            id: string;
            fullName: string;
            email: string | null;
        };
        roles: {
            id: string;
            name: string;
        }[];
        status: string;
    }>;
    setMembershipStatus(auth: AuthenticatedUser, membershipId: string, status: 'ACTIVE' | 'INACTIVE'): Promise<{
        membershipId: string;
        status: "ACTIVE" | "INACTIVE";
        message: string;
    } | {
        membershipId: string;
        status: "ACTIVE" | "INACTIVE";
        message?: undefined;
    }>;
    private setMembershipStatusTx;
    provisionEmployee(auth: AuthenticatedUser, input: {
        fullName: string;
        username: string;
        phone?: string;
        email?: string;
        password?: string;
        roleName?: string;
    }): Promise<{
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
    resetPassword(auth: AuthenticatedUser, membershipId: string, newPassword?: string): Promise<{
        success: boolean;
        message: string;
        username: string | null;
        temporaryPassword: string;
    }>;
}
