import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsNumber,
  IsIn,
  Min,
  Max,
  IsArray,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateActivityDto {
  @IsString()
  @IsOptional()
  @IsUUID()
  parentId?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  activityCode!: string;

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
  @MaxLength(40)
  unit?: string;

  @IsString()
  @IsOptional()
  @IsIn(['NOT_STARTED', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED'])
  status?: string;

  @IsString()
  @IsOptional()
  @IsIn(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
  priority?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  progress?: number;

  @IsString()
  @IsOptional()
  startDate?: string;

  @IsString()
  @IsOptional()
  dueDate?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  estimatedCost?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  actualCost?: number;
}

export class UpdateActivityDto {
  @IsString()
  @IsOptional()
  @MaxLength(40)
  activityCode?: string;

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
  @MaxLength(40)
  unit?: string;

  @IsString()
  @IsOptional()
  @IsIn(['NOT_STARTED', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED'])
  status?: string;

  @IsString()
  @IsOptional()
  @IsIn(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
  priority?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  progress?: number;

  @IsString()
  @IsOptional()
  startDate?: string;

  @IsString()
  @IsOptional()
  dueDate?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  estimatedCost?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  actualCost?: number;
}

export class SetAssignmentsDto {
  @IsArray()
  @IsUUID('all', { each: true })
  membershipIds!: string[];
}
