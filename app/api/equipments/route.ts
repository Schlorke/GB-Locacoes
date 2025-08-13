import type { Decimal } from '@prisma/client/runtime/library'
import { NextResponse } from 'next/server'

// FIX: Dynamic imports to avoid Prisma initialization at build time
// This prevents the "@prisma/client did not initialize yet" error during
// Vercel's "Collecting page data" phase with Next.js 15 + Prisma 6
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

// Tipo para equipamento com categoria incluída
type EquipmentWithCategory = {
  id: string
  name: string
  description: string | null
  pricePerDay: Decimal
  images: string[]
  available: boolean
  categoryId: string
  createdAt: Date
  updatedAt: Date
  category: {
    id: string
    name: string
    description: string | null
    icon: string | null
    iconColor: string
    bgColor: string
    fontColor: string
    slug: string
    createdAt: Date
    updatedAt: Date
  }
}

export async function GET() {
  try {
    // Dynamic imports - only load at runtime, never during build
    const { prisma } = await import('@/lib/prisma')

    await prisma.$connect()

    const equipments = await prisma.equipment.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (equipments.length === 0) {
      const mockEquipments = [
        {
          id: 'mock-1',
          name: 'Betoneira',
          description: 'Betoneira para construção civil',
          pricePerDay: 60,
          imageUrl: '/placeholder.svg?height=200&width=300&text=Betoneira',
          images: ['/placeholder.svg?height=200&width=300&text=Betoneira'],
          isAvailable: true,
          category: {
            id: 'mock-cat-1',
            name: 'Equipamentos',
            icon: 'Wrench',
            iconColor: '#3B82F6',
            bgColor: '#EFF6FF',
            fontColor: '#1E40AF',
          },
          reviews: [],
        },
      ]
      return NextResponse.json(mockEquipments)
    }

    // Formatar os dados do banco garantindo que as imagens sejam incluídas
    const formattedEquipments = equipments.map(
      (equipment: EquipmentWithCategory) => {
        // Priorizar primeira imagem do array ou usar placeholder
        let primaryImage = null
        if (equipment.images && equipment.images.length > 0) {
          primaryImage = equipment.images[0]
        }

        const formattedEquipment = {
          id: equipment.id,
          name: equipment.name,
          description: equipment.description,
          pricePerDay: Number(equipment.pricePerDay), // Converter Decimal para number
          imageUrl: primaryImage, // Campo principal para imagem
          images:
            equipment.images && equipment.images.length > 0
              ? equipment.images
              : primaryImage
                ? [primaryImage]
                : [],
          isAvailable: equipment.available ?? true,
          category: {
            id: equipment.category.id,
            name: equipment.category.name,
            icon: equipment.category.icon,
            iconColor: equipment.category.iconColor,
            bgColor: equipment.category.bgColor,
            fontColor: equipment.category.fontColor,
          },
          reviews: [],
        }

        return formattedEquipment
      }
    )

    return NextResponse.json(formattedEquipments)
  } catch (error) {
    console.error('Erro ao buscar equipamentos:', error)

    const mockEquipments = [
      {
        id: 'fallback-1',
        name: 'Betoneira (Dados de Teste)',
        description: 'Betoneira para construção civil - dados de teste',
        pricePerDay: 60,
        imageUrl: '/placeholder.svg?height=200&width=300&text=Betoneira',
        images: ['/placeholder.svg?height=200&width=300&text=Betoneira'],
        isAvailable: true,
        category: {
          id: 'fallback-cat-1',
          name: 'Equipamentos',
          icon: 'Wrench',
          iconColor: '#3B82F6',
          bgColor: '#EFF6FF',
          fontColor: '#1E40AF',
        },
        reviews: [],
      },
    ]

    return NextResponse.json(mockEquipments)
  }
}
