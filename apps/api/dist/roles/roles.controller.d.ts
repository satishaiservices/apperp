import { type AuthenticatedUser } from '../auth/jwt-auth.guard';
import { RolesService } from './roles.service';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    list(req: {
        user: AuthenticatedUser;
    }): Promise<({
        _count: {
            membershipRoles: number;
        };
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
    })[]>;
    permissions(): Promise<{
        permissionKey: string;
        description: string | null;
    }[]>;
    get(id: string, req: {
        user: AuthenticatedUser;
    }): Promise<{
        _count: {
            membershipRoles: number;
        };
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
    }>;
    create(body: {
        name: string;
        description?: string;
    }, req: {
        user: AuthenticatedUser;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        tenantId: string;
        description: string | null;
        isSystemRole: boolean;
    }>;
    update(id: string, body: {
        name?: string;
        description?: string | null;
    }, req: {
        user: AuthenticatedUser;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        tenantId: string;
        description: string | null;
        isSystemRole: boolean;
    }>;
    remove(id: string, req: {
        user: AuthenticatedUser;
    }): Promise<{
        status: string;
        roleId: string;
    }>;
    setPermissions(id: string, body: {
        permissionKeys: string[];
    }, req: {
        user: AuthenticatedUser;
    }): Promise<{
        status: string;
        roleId: string;
        permissions: string[];
    }>;
    assign(id: string, membershipId: string, req: {
        user: AuthenticatedUser;
    }): Promise<{
        status: string;
        roleId: string;
        membershipId: string;
    }>;
    revoke(id: string, membershipId: string, req: {
        user: AuthenticatedUser;
    }): Promise<{
        status: string;
        roleId: string;
        membershipId: string;
    }>;
}
