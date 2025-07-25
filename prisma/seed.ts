import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// Se UserRole não existir, defina manualmente:
enum UserRole {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
}

const prisma = new PrismaClient();

async function main() {
  console.error('Start seeding...');

  const adminEmail = 'admin@gblocacoes.com.br';
  const adminPassword = 'admin123'; // Use a strong password in production!

  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.error('Admin user already exists. Skipping...');
  } else {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await prisma.user.create({
      data: {
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: UserRole.ADMIN,
        emailVerified: new Date(), // Pre-verify the admin email
      },
    });
    console.error(`✅ Admin user created with email: ${adminEmail}`);
    console.error(`🤫 Password: ${adminPassword}`);
  }

  console.warn('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
