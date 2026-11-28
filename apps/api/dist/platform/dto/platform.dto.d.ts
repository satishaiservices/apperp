export declare class CreateSuperadminDto {
    fullName: string;
    username: string;
    email: string;
    phone: string;
    password: string;
}
export declare class UpdateSuperadminDto {
    fullName?: string;
    email?: string;
    phone?: string;
    status?: string;
    newPassword?: string;
}
export declare class CreateTenantDto {
    name: string;
    slug?: string;
    adminFullName: string;
    adminEmail: string;
    adminPhone: string;
    adminUsername: string;
    adminPassword?: string;
}
export declare class UpdateTenantDto {
    name?: string;
    slug?: string;
    status?: string;
}
export declare class AddTenantUserDto {
    fullName: string;
    username: string;
    email: string;
    phone: string;
    password?: string;
    roleName?: string;
}
