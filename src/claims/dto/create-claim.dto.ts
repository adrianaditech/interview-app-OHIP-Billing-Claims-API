import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
export class CreateClaimDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  patientId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  doctorId: string;

  @ApiProperty({ example: '2024-06-01' })
  @IsNotEmpty()
  @IsDateString()
  visitDate: string;

  @ApiProperty({ description: 'e.g. A001, B002...' })
  @IsNotEmpty()
  @IsString()
  serviceCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  diagnosisCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
 