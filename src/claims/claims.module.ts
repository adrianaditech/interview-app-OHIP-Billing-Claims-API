// src/claims/claims.module.ts
import { Module } from '@nestjs/common';
import { ClaimsService } from "./claim.service";
import { ClaimsRepository } from "./claims.repository";
import { PrismaService } from '../prisma/prisma.service';
import { ClaimsController } from "./claim.controller";

@Module({
  imports: [],
  controllers: [ClaimsController],
  providers: [ClaimsService, ClaimsRepository, PrismaService],
  exports: [ClaimsService], // export if used outside this module
})
export class ClaimsModule {}