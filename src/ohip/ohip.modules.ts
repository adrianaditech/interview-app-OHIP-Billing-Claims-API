import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OhipRepository } from "./ohip.repository";
import { OhipService } from "./ohip.service";
import { OhipController } from './ohip.controller';

@Module({
  imports: [],
  controllers: [OhipController],
  providers: [PrismaService, OhipRepository, OhipService],
  exports: [OhipService],
})
export class OhipModule {}