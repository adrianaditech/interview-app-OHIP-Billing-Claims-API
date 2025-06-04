import { Module } from '@nestjs/common';
import { ClaimsController } from './claims/claim.controller';
import { PrismaService } from './prisma/prisma.service';
import { ClaimsService } from './claims/claim.service';
import { ClaimsRepository } from './claims/claims.repository';
import { OhipService } from './ohip/ohip.service';
import { OhipRepository } from './ohip/ohip.repository';
import { OhipController } from './ohip/ohip.controller';

@Module({
  controllers: [ClaimsController, OhipController],
  providers: [
    PrismaService,
    ClaimsService,
    ClaimsRepository,
    OhipService,
    OhipRepository,
  ],
})
export class AppModule {}
