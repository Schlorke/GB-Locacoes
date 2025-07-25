'use client';
// ...existing code...

import { prisma } from '@/lib/prisma';

interface Equipment {
  id: string;
  name: string;
  description: string;
  category: string;
  dailyPrice: number;
  weeklyPrice?: number;
  monthlyPrice?: number;
  status: 'available' | 'rented' | 'maintenance';
  imageUrl?: string;
  images?: string[];
  specifications?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

interface EquipamentosPageProps {
  params: { categoria?: string };
}

import EquipamentosClient from './EquipamentosClient';

export default async function AdminEquipmentsPage({ params }: EquipamentosPageProps) {
  const categoria = params.categoria ?? 'todas';
  let where = {};
  if (categoria !== 'todas') {
    // You may need to fetch the categoryId by name if categoria is a slug or name
    const cat = await prisma.category.findFirst({ where: { name: categoria } });
    if (cat) {
      where = { categoryId: cat.id };
    }
  }
  const prismaEquipments = await prisma.equipment.findMany({
    where,
    include: {
      category: true,
    },
  });
  const equipments: Equipment[] = prismaEquipments.map((eq) => ({
    id: eq.id,
    name: eq.name,
    description: eq.description ?? '',
    category: eq.category?.name ?? '',
    dailyPrice: Number(eq.pricePerDay ?? 0),
    status: eq.available ? 'available' : 'rented',
    imageUrl: eq.images?.[0],
    images: eq.images ?? [],
    createdAt: eq.createdAt.toISOString(),
    updatedAt: eq.updatedAt.toISOString(),
  }));
  return <EquipamentosClient equipments={equipments} />;
}
