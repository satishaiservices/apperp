import { UsersService } from './users.service';
import { type AuthenticatedUser } from '../auth/jwt-auth.guard';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: {
        user: AuthenticatedUser;
    }): Promise<{
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
    list(req: {
        user: AuthenticatedUser;
    }): Promise<{
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
    getMember(membershipId: string, req: {
        user: AuthenticatedUser;
    }): Promise<{
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
    provision(body: {
        fullName: string;
        username: string;
        phone?: string;
        email?: string;
        password?: string;
        roleName?: string;
    }, req: {
        user: AuthenticatedUser;
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
    resetPassword(membershipId: string, body: {
        newPassword?: string;
    }, req: {
        user: AuthenticatedUser;
    }): Promise<{
        success: boolean;
        message: string;
        username: string | null;
        temporaryPassword: string;
    }>;
    addMember(body: {
        email: string;
        roleIds?: string[];
    }, req: {
        user: AuthenticatedUser;
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
    deactivate(membershipId: string, req: {
        user: AuthenticatedUser;
    }): Promise<{
        membershipId: string;
        status: "ACTIVE" | "INACTIVE";
        message: string;
    } | {
        membershipId: string;
        status: "ACTIVE" | "INACTIVE";
        message?: undefined;
    }>;
    activate(membershipId: string, req: {
        user: AuthenticatedUser;
    }): Promise<{
        membershipId: string;
        status: "ACTIVE" | "INACTIVE";
        message: string;
    } | {
        membershipId: string;
        status: "ACTIVE" | "INACTIVE";
        message?: undefined;
    }>;
    removeMember(membershipId: string, req: {
        user: AuthenticatedUser;
    }): Promise<{
        membershipId: string;
        status: "ACTIVE" | "INACTIVE";
        message: string;
    } | {
        membershipId: string;
        status: "ACTIVE" | "INACTIVE";
        message?: undefined;
    }>;
}
