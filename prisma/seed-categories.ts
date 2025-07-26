import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedCategories() {
  console.error('Seeding categories...');

  const categories = [
    {
      name: 'Andaimes Suspensos',
      description: 'Andaimes suspensos elétricos e manuais para trabalhos em altura',
      icon: 'Building',
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Cadeiras Elétricas',
      description: 'Cadeiras elétricas e manuais para serviços em altura',
      icon: 'Zap',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      name: 'Andaimes Tubulares',
      description: 'Andaimes tubulares para diversas alturas e aplicações',
      icon: 'Wrench',
      color: 'from-red-500 to-red-600',
    },
    {
      name: 'Betoneiras',
      description: 'Betoneiras de diversos tamanhos e capacidades',
      icon: 'Truck',
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'Rompedores',
      description: 'Rompedores pneumáticos e elétricos',
      icon: 'Hammer',
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Compressores',
      description: 'Compressores de ar para obras',
      icon: 'Container',
      color: 'from-indigo-500 to-indigo-600',
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

seedCategories()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
