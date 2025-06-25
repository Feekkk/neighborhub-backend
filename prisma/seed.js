const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.reportEmergency.createMany({
    data: [
      {
        title: 'emergency-test-title',
        description: 'emergency-test-description',
        latitude: 10.0,
        longitude: 10.0,
        time: '12:00',
        resolvedAt: '12:00',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    skipDuplicates: true,
  });
  console.log('Seed data inserted!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });