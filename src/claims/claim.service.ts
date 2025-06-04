// src/claims/claims.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { ClaimsRepository } from "./claims.repository";
import { OhipRepository } from "../ohip/ohip.repository";
import { ClaimStatus } from '@prisma/client';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimStatusDto } from './dto/update-claim.dto';
import { FilterClaimsDto } from './dto/filter-claims.dto';

@Injectable()
export class ClaimsService {
  constructor(
    private readonly claimsRepo: ClaimsRepository,
    private readonly ohipRepo: OhipRepository,
  ) {}

  async createClaim(dto: CreateClaimDto) {
    // Validate serviceCode and get pricing
    const serviceCode = await this.ohipRepo.findByCode(dto.serviceCode);
    if (!serviceCode) {
      throw new NotFoundException('Invalid service code');
    }

    // Map DTO + data from OHIPCode to Prisma input
    return this.claimsRepo.create({
      patientId: dto.patientId,
      doctorId: dto.doctorId,
      visitDate: new Date(dto.visitDate),
      serviceCode: {
        connect: { id: serviceCode.id }, 
      },
      location: dto.location,
      diagnosisCode: dto.diagnosisCode,
      notes: dto.notes,
      status: ClaimStatus.DRAFT,
      amount: serviceCode.amount,
    });
  }

  listClaims(dto: FilterClaimsDto) {
    const where: any = {};
  
    if (dto.doctorId) {
      where.doctorId = dto.doctorId;
    }
    if (dto.status) {
      where.status = dto.status;
    }
    if (dto.visitDateFrom || dto.visitDateTo) {
      where.visitDate = {};
      if (dto.visitDateFrom) {
        where.visitDate.gte = dto.visitDateFrom;
      }
      if (dto.visitDateTo) {
        where.visitDate.lte = dto.visitDateTo;
      }
    }
  
    return this.claimsRepo.findMany(where);
  }

  async updateStatus(id: number, dto: UpdateClaimStatusDto) {
    const existingClaim = await this.claimsRepo.findUnique(id);
    if (!existingClaim) {
        throw new NotFoundException(`Claim with ID ${id} not found`);
      }
    
      return this.claimsRepo.updateStatus(id, dto.status, dto.notes);
  }

  getSummary(doctorId: string, date: Date) {
    return this.claimsRepo.getSummary(doctorId, date);
  }
}