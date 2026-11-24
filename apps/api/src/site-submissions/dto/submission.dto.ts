import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsArray,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSubmissionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  startChainage!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  endChainage!: string;

  @IsArray()
  @IsUUID('all', { each: true })
  activityIds!: string[];

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  latitude?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  longitude?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  locationAccuracyM?: number;

  @IsString()
  @IsOptional()
  locationCapturedAt?: string;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  remarks?: string;
}
