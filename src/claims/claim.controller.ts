import {
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Body,
    Query,
    ParseIntPipe,
  } from '@nestjs/common';
  import { ClaimsService } from "./claim.service";
  import { CreateClaimDto } from './dto/create-claim.dto';
  import { UpdateClaimStatusDto } from "./dto/update-claim.dto";
  import { FilterClaimsDto } from "./dto/filter-claims.dto";
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClaimDto } from './dto/claim.dto';
import { ClaimSummaryDto } from './dto/claimSummery.dto';
//import { ClaimStatus } from '@prisma/client';
  
  @ApiTags('Claims')
  @Controller('claims')
  export class ClaimsController {
    constructor(private readonly claimsService: ClaimsService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new claim' })
    @ApiResponse({ status: 201, description: 'Claim created successfully', type: [ClaimDto] })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    createClaim(@Body() dto: CreateClaimDto) {
      return this.claimsService.createClaim(dto);
    }
  
    @ApiOperation({ summary: 'Filter claims' })
    @ApiResponse({ status: 201, description: 'Filter returned successfully', type: [ClaimDto] })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    @Get()
    listClaims(@Query() filters: FilterClaimsDto) {
      return this.claimsService.listClaims(filters);
    }
  
    @ApiOperation({ summary: 'Update claim status' })
    @ApiResponse({ status: 201, description: 'Update claim status successfully', type: [ClaimDto] })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    @Patch(':id/status')
    updateStatus(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: UpdateClaimStatusDto
    ) {
      return this.claimsService.updateStatus(id, dto);
    }
    
    @ApiOperation({ summary: 'Update claim status' })
    @ApiResponse({ status: 201, description: 'Update claim status successfully', type: [ClaimSummaryDto] })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    @Get('/reports/summary')
    getSummary(
      @Query('doctorId') doctorId: string,
      @Query('date') date: string
    ) {
      return this.claimsService.getSummary(doctorId, new Date(date));
    }
  }