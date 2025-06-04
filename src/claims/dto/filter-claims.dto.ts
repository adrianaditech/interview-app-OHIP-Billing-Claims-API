import { IsOptional, IsEnum, IsISO8601, IsString, IsDateString } from 'class-validator';
import { ClaimStatus } from '@prisma/client';
//import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FilterClaimsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  doctorId?: string;

  @ApiPropertyOptional({ enum: ClaimStatus })
  @IsOptional()
  @IsEnum(ClaimStatus)
  status?: ClaimStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  visitDateFrom?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  visitDateTo?: string;
}