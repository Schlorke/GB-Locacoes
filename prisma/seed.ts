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

  // Seed categories
  await seedCategories();

  console.warn('Seeding finished.');
}

async function seedCategories() {
  console.error('Seeding categories...');

  const categories = [
    {
      name: 'Andaimes Suspensos',
      description: 'Andaimes suspensos elétricos e manuais para trabalhos em altura',
      icon: 'Building',
      bgColor: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Cadeiras Elétricas',
      description: 'Cadeiras elétricas e manuais para serviços em altura',
      icon: 'Zap',
      bgColor: 'from-yellow-500 to-yellow-600',
    },
    {
      name: 'Andaimes Tubulares',
      description: 'Andaimes tubulares para diversas alturas e aplicações',
      icon: 'Wrench',
      bgColor: 'from-red-500 to-red-600',
    },
    {
      name: 'Betoneiras',
      description: 'Betoneiras de diversos tamanhos e capacidades',
      icon: 'Truck',
      bgColor: 'from-green-500 to-green-600',
    },
    {
      name: 'Rompedores',
      description: 'Rompedores pneumáticos e elétricos',
      icon: 'Hammer',
      bgColor: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Compressores',
      description: 'Compressores de ar para obras',
      icon: 'Container',
      bgColor: 'from-indigo-500 to-indigo-600',
    },
  ];

  for (const category of categories) {
    const category_with_slug = {
      ...category,
      slug: category.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, ''),
    };

    await prisma.category.upsert({
      where: { slug: category_with_slug.slug },
      create: category_with_slug,
      update: category_with_slug,
    });
  }

  console.warn('Categories seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
