const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.announcement.createMany({
    data: [
      {
        title: 'announcement-test-title',
        description: 'announcement-test-description',
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