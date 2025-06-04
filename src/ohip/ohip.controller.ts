import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { OhipService } from './ohip.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OhipCodeDto } from './dto/ohip-code.dto';

@ApiTags('OHIP')
@Controller('service-codes')
export class OhipController {
  constructor(private readonly ohipService: OhipService) {}

  @Get()
  @ApiOperation({ summary: 'Get all OHIP service codes' })
  @ApiResponse({ status: 200, type: [OhipCodeDto] })
  async getAllCodes(): Promise<OhipCodeDto[]> {
    return this.ohipService.getAllCodes();
  }

  @Get(':code')
  @ApiOperation({ summary: 'Get OHIP service code by code' })
  @ApiResponse({ status: 200, type: OhipCodeDto })
  @ApiResponse({ status: 404, description: 'Service code not found' })
  async findByCode(@Param('code') code: string): Promise<OhipCodeDto> {
    const result = await this.ohipService.findByCode(code);
    if (!result) {
      throw new NotFoundException(`Service code ${code} not found`);
    }
    return result;
  }
}