import { ApiProperty } from '@nestjs/swagger';

export class ClaimStatusBreakdownDto {
  @ApiProperty({ example: 'DRAFT' })
  status: string;

  @ApiProperty({ example: 1 })
  count: number;

  @ApiProperty({ example: 50 })
  amount: number;
}

export class ClaimSummaryDto {
  @ApiProperty({ example: 1 })
  totalClaims: number;

  @ApiProperty({ example: 50 })
  totalAmount: number;

  @ApiProperty({ type: [ClaimStatusBreakdownDto] })
  statusBreakdown: ClaimStatusBreakdownDto[];
}