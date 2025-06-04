import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString } from 'class-validator';

export class OhipCodeDto {
    @ApiProperty({ example: 1, description: 'Unique identifier for the OHIP code' })
    @IsInt()
    id: number;
  
    @ApiProperty({ example: 'A001', description: 'OHIP service code' })
    @IsString()
    code: string;
  
    @ApiProperty({ example: 'General Consultation', description: 'Description of the OHIP service' })
    @IsString()
    description: string;
  
    @ApiProperty({ example: 50.0, description: 'OMA-approved pricing amount' })
    @IsNumber()
    amount: number;
  }