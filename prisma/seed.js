const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.event.createMany({
    data: [
      {
        title: 'event-test-title',
        description: 'event-test-description',
        date: '2025-01-01T12:00:00.000Z',
        time: '12:00',
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