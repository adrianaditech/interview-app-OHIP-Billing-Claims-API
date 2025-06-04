import { ApiProperty } from '@nestjs/swagger';
import { ClaimStatus } from '@prisma/client';

export class ClaimDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  patientId: string;

  @ApiProperty()
  doctorId: string;

  @ApiProperty()
  visitDate: string;

  @ApiProperty()
  serviceCodeId: number;

  @ApiProperty()
  location: string;

  @ApiProperty({ nullable: true })
  diagnosisCode: string | null;

  @ApiProperty({ nullable: true })
  notes: string | null;

  @ApiProperty({ enum: ClaimStatus })
  status: ClaimStatus;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}