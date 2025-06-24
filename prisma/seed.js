const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        username: 'testuser1',
        email: 'test1@example.com',
        password: 'hashedpassword1',
      },
    ],
    skipDuplicates: true, // Optional: skips if email/username already exists
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