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

  // Seed equipments
  await seedEquipments();

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

async function seedEquipments() {
  console.error('Seeding equipments...');

  // Buscar categorias existentes
  const categories = await prisma.category.findMany();

  if (categories.length === 0) {
    console.error('No categories found. Please run category seed first.');
    return;
  }

  const equipments = [
    {
      name: 'Betoneira 320L',
      description:
        'Betoneira profissional com capacidade de 320 litros, ideal para obras de médio porte. Motor potente e estrutura robusta.',
      pricePerDay: 65.0,
      images: [
        '/placeholder.svg?height=400&width=600&text=Betoneira+320L',
        '/placeholder.svg?height=400&width=600&text=Betoneira+320L+2',
      ],
      available: true,
      categorySlug: 'betoneiras',
    },
    {
      name: 'Andaime Suspenso Elétrico',
      description:
        'Andaime suspenso elétrico para trabalhos em altura, com capacidade para 2 pessoas e carga de até 300kg.',
      pricePerDay: 180.0,
      images: [
        '/placeholder.svg?height=400&width=600&text=Andaime+Suspenso',
        '/placeholder.svg?height=400&width=600&text=Andaime+Suspenso+2',
      ],
      available: true,
      categorySlug: 'andaimes-suspensos',
    },
    {
      name: 'Cadeira Elétrica Unipessoal',
      description:
        'Cadeira elétrica individual para serviços em altura, com controles de segurança e capacidade para 150kg.',
      pricePerDay: 120.0,
      images: [
        '/placeholder.svg?height=400&width=600&text=Cadeira+Eletrica',
        '/placeholder.svg?height=400&width=600&text=Cadeira+Eletrica+2',
      ],
      available: true,
      categorySlug: 'cadeiras-eletricas',
    },
    {
      name: 'Rompedor Pneumático 30kg',
      description:
        'Rompedor pneumático pesado para demolições e quebra de concreto. Requer compressor.',
      pricePerDay: 95.0,
      images: [
        '/placeholder.svg?height=400&width=600&text=Rompedor+Pneumatico',
        '/placeholder.svg?height=400&width=600&text=Rompedor+Pneumatico+2',
      ],
      available: true,
      categorySlug: 'rompedores',
    },
    {
      name: 'Compressor de Ar 10PCM',
      description:
        'Compressor de ar portátil com capacidade de 10 pés cúbicos por minuto. Ideal para ferramentas pneumáticas.',
      pricePerDay: 75.0,
      images: [
        '/placeholder.svg?height=400&width=600&text=Compressor+10PCM',
        '/placeholder.svg?height=400&width=600&text=Compressor+10PCM+2',
      ],
      available: true,
      categorySlug: 'compressores',
    },
    {
      name: 'Andaime Tubular H=2m',
      description:
        'Torre de andaime tubular com altura de 2 metros, inclui base, travessas e plataforma de trabalho.',
      pricePerDay: 45.0,
      images: [
        '/placeholder.svg?height=400&width=600&text=Andaime+Tubular+2m',
        '/placeholder.svg?height=400&width=600&text=Andaime+Tubular+2m+2',
      ],
      available: true,
      categorySlug: 'andaimes-tubulares',
    },
    {
      name: 'Betoneira 400L',
      description:
        'Betoneira industrial com capacidade de 400 litros, motor trifásico e basculante lateral.',
      pricePerDay: 85.0,
      images: [
        '/placeholder.svg?height=400&width=600&text=Betoneira+400L',
        '/placeholder.svg?height=400&width=600&text=Betoneira+400L+2',
      ],
      available: true,
      categorySlug: 'betoneiras',
    },
    {
      name: 'Rompedor Elétrico 15kg',
      description: 'Rompedor elétrico mais leve para trabalhos de precisão e quebra de pisos.',
      pricePerDay: 65.0,
      images: [
        '/placeholder.svg?height=400&width=600&text=Rompedor+Eletrico',
        '/placeholder.svg?height=400&width=600&text=Rompedor+Eletrico+2',
      ],
      available: false, // Alguns indisponíveis para teste
      categorySlug: 'rompedores',
    },
  ];

  for (const equipment of equipments) {
    const category = categories.find(
      (cat: { slug: string; id: string; name: string }) => cat.slug === equipment.categorySlug,
    );

    if (!category) {
      console.error(`Category not found for slug: ${equipment.categorySlug}`);
      continue;
    }

    const existingEquipment = await prisma.equipment.findFirst({
      where: { name: equipment.name },
    });

    if (!existingEquipment) {
      await prisma.equipment.create({
        data: {
          name: equipment.name,
          description: equipment.description,
          pricePerDay: equipment.pricePerDay,
          images: equipment.images,
          available: equipment.available,
          categoryId: category.id,
        },
      });
      console.error(`✅ Equipment created: ${equipment.name}`);
    } else {
      console.error(`⚠️ Equipment already exists: ${equipment.name}`);
    }
  }

  console.warn('Equipments seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
