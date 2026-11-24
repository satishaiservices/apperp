import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsInt,
  Min,
  Max,
  IsArray,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDprDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'reportDate must follow YYYY-MM-DD format',
  })
  reportDate!: string;

  @IsString()
  @IsOptional()
  @MaxLength(120)
  weather?: string;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  siteConditions?: string;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  delays?: string;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  issues?: string;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  remarks?: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(100000)
  @Type(() => Number)
  workforceCount?: number;

  @IsArray()
  @IsOptional()
  quantities?: any[];

  @IsArray()
  @IsOptional()
  equipment?: any[];

  @IsArray()
  @IsOptional()
  labor?: any[];
}

export class UpdateDprDto {
  @IsString()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'reportDate must follow YYYY-MM-DD format',
  })
  reportDate?: string;

  @IsString()
  @IsOptional()
  @MaxLength(120)
  weather?: string;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  siteConditions?: string;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  delays?: string;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  issues?: string;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  remarks?: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(100000)
  @Type(() => Number)
  workforceCount?: number;

  @IsArray()
  @IsOptional()
  quantities?: any[];

  @IsArray()
  @IsOptional()
  equipment?: any[];

  @IsArray()
  @IsOptional()
  labor?: any[];
}

export class ReviewDprDto {
  @IsString()
  @IsOptional()
  @MaxLength(2000)
  reviewRemarks?: string;
}
