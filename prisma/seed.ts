import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.oHIPCode.createMany({
    data: [
      { code: 'A001', description: 'General Consultation', amount: 50 },
      { code: 'B002', description: 'Specialist Consultation', amount: 100 },
      { code: 'C003', description: 'X-Ray', amount: 75 },
      { code: 'D004', description: 'Blood Test', amount: 30 },
      { code: 'E005', description: 'MRI Scan', amount: 500 },
      { code: 'F006', description: 'Ultrasound', amount: 120 },
      { code: 'G007', description: 'Vaccination', amount: 40 },
      { code: 'H008', description: 'Physical Therapy', amount: 60 },
      { code: 'I009', description: 'Surgery Consultation', amount: 150 },
      { code: 'J010', description: 'Mental Health Assessment', amount: 80 },
    ],
    });
  console.log('Seed data inserted');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());