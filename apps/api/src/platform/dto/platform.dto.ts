import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
  IsEmail,
  IsIn,
} from 'class-validator';

export class CreateSuperadminDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  fullName!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(60)
  username!: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(254)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(32)
  phone!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;
}

export class UpdateSuperadminDto {
  @IsString()
  @IsOptional()
  @MaxLength(160)
  fullName?: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(254)
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(32)
  phone?: string;

  @IsString()
  @IsOptional()
  @IsIn(['ACTIVE', 'INACTIVE', 'SUSPENDED'])
  status?: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  newPassword?: string;
}

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  name!: string;

  @IsString()
  @IsOptional()
  @MaxLength(80)
  slug?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  adminFullName!: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(254)
  adminEmail!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(32)
  adminPhone!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(60)
  adminUsername!: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  adminPassword?: string;
}

export class UpdateTenantDto {
  @IsString()
  @IsOptional()
  @MaxLength(160)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(80)
  slug?: string;

  @IsString()
  @IsOptional()
  @IsIn(['ACTIVE', 'SUSPENDED'])
  status?: string;
}

export class AddTenantUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  fullName!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(60)
  username!: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(254)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(32)
  phone!: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  password?: string;

  @IsString()
  @IsOptional()
  roleName?: string;
}
