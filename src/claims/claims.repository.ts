import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, ClaimStatus } from '@prisma/client';

@Injectable()
export class ClaimsRepository {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ClaimCreateInput) {
    return this.prisma.claim.create({ data });
  }

  findUnique(id: number) {
    return this.prisma.claim.findUnique({
      where: { id },
    });
  }

  findMany(filters: {
    doctorId?: string;
    status?: ClaimStatus;
    visitDateFrom?: Date;
    visitDateTo?: Date;
  }) {
    const where: Prisma.ClaimWhereInput = {};

    if (filters.doctorId) {
      where.doctorId = filters.doctorId;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.visitDateFrom || filters.visitDateTo) {
      where.visitDate = {};
      if (filters.visitDateFrom) {
        where.visitDate.gte = filters.visitDateFrom;
      }
      if (filters.visitDateTo) {
        where.visitDate.lte = filters.visitDateTo;
      }
    }

    return this.prisma.claim.findMany({ where });
  }

  updateStatus(id: number, status: ClaimStatus, notes?: string) {
    return this.prisma.claim.update({
      where: { id },
      data: { status, notes },
    });
  }

  async getSummary(doctorId: string, date: Date) {
    const start = new Date(date.setHours(0, 0, 0, 0));
    const end = new Date(date.setHours(24, 0, 0, 0));
  
    // Total claims and total amount
    const totals = await this.prisma.claim.aggregate({
      where: { doctorId, visitDate: { gte: start, lt: end } },
      _count: true,
      _sum: { amount: true },
    });
  
    // Breakdown by status
    const breakdown = await this.prisma.claim.groupBy({
      by: ['status'],
      where: { doctorId, visitDate: { gte: start, lt: end } },
      _count: true,
      _sum: { amount: true },
    });
  
    return {
      totalClaims: totals._count,
      totalAmount: totals._sum.amount ?? 0,
      statusBreakdown: breakdown.map(b => ({
        status: b.status,
        count: b._count,
        amount: b._sum.amount ?? 0,
      })),
    };
  }
}