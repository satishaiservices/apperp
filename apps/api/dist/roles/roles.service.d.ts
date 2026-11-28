import { PrismaService } from '../database/prisma.service';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';
export declare class RolesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private findRole;
    private validateName;
    list(auth: AuthenticatedUser): Promise<({
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
    listPermissions(): Promise<{
        permissionKey: string;
        description: string | null;
    }[]>;
    get(auth: AuthenticatedUser, id: string): Promise<{
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
    create(auth: AuthenticatedUser, body: {
        name: string;
        description?: string;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        tenantId: string;
        description: string | null;
        isSystemRole: boolean;
    }>;
    update(auth: AuthenticatedUser, id: string, body: {
        name?: string;
        description?: string | null;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        tenantId: string;
        description: string | null;
        isSystemRole: boolean;
    }>;
    remove(auth: AuthenticatedUser, id: string): Promise<{
        status: string;
        roleId: string;
    }>;
    setPermissions(auth: AuthenticatedUser, id: string, permissionKeys: string[]): Promise<{
        status: string;
        roleId: string;
        permissions: string[];
    }>;
    assign(auth: AuthenticatedUser, roleId: string, membershipId: string): Promise<{
        status: string;
        roleId: string;
        membershipId: string;
    }>;
    revoke(auth: AuthenticatedUser, roleId: string, membershipId: string): Promise<{
        status: string;
        roleId: string;
        membershipId: string;
    }>;
}
