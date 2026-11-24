import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsNumber,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  projectCode!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  name!: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @IsString()
  @IsOptional()
  @MaxLength(160)
  clientName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  siteAddress?: string;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  startChainage?: string;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  endChainage?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  startLatitude?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  startLongitude?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  endLatitude?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  endLongitude?: number;

  @IsString()
  @IsOptional()
  @IsIn(['PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'ARCHIVED'])
  status?: string;

  @IsOptional()
  budget?: any;

  @IsString()
  @IsOptional()
  startDate?: string;

  @IsString()
  @IsOptional()
  endDate?: string;
}

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  @MaxLength(40)
  projectCode?: string;

  @IsString()
  @IsOptional()
  @MaxLength(160)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @IsString()
  @IsOptional()
  @MaxLength(160)
  clientName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  siteAddress?: string;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  startChainage?: string;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  endChainage?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  startLatitude?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  startLongitude?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  endLatitude?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  endLongitude?: number;

  @IsString()
  @IsOptional()
  @IsIn(['PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'ARCHIVED'])
  status?: string;

  @IsOptional()
  budget?: any;

  @IsString()
  @IsOptional()
  startDate?: string;

  @IsString()
  @IsOptional()
  endDate?: string;
}

export class DuplicateProjectDto {
  @IsString()
  @IsOptional()
  @MaxLength(40)
  projectCode?: string;

  @IsString()
  @IsOptional()
  @MaxLength(160)
  name?: string;
}
