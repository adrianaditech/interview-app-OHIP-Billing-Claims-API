import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OhipRepository {
  constructor(private prisma: PrismaService) {}

  findByCode(code: string) {
    return this.prisma.oHIPCode.findUnique({
      where: { code },
    });
  }
  // Retrieve all OHIP codes with description and pricing
  async findAll() {
    return this.prisma.oHIPCode.findMany({
      select: {
        id: true,
        code: true,
        description: true,
        amount: true,  // OMA pricing
      },
      orderBy: {
        code: 'asc',
      },
    });
  }
}