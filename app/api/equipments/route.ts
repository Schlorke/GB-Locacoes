import type { Decimal } from '@prisma/client/runtime/library'
import { NextResponse } from 'next/server'
import { getPrismaClient } from '@/lib/prisma'

// Ensure this route always runs on Node.js with no caching
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
    const prisma = getPrismaClient()

    const equipments = await prisma.equipment.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

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
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
