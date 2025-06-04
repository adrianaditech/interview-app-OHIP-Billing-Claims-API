import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ClaimStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateClaimStatusDto {
  @ApiProperty({ enum: ClaimStatus })
  @IsEnum(ClaimStatus)
  status: ClaimStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}