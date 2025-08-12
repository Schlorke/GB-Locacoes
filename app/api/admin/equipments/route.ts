import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/middlewares/require-admin'
import type { Decimal } from '@prisma/client/runtime/library'
import { NextResponse, type NextRequest } from 'next/server'

// Tipo para equipamento com categoria incluída
type EquipmentWithCategory = {
  id: string
  name: string
  description: string | null
  pricePerDay: Decimal // Prisma Decimal
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
  _count: {
    quoteItems: number
    rental_items: number
  }
}

// GET /api/admin/equipments - List all equipments with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação de admin
    const adminResult = await requireAdmin(request)
    if (!adminResult.success) {
      return NextResponse.json(
        { error: adminResult.error },
        { status: adminResult.status }
      )
    }
    // Verifica se as variáveis de ambiente para o banco estão configuradas
    if (!process.env.DATABASE_URL) {
      console.error('[API GET /admin/equipments] DATABASE_URL não definido')
      return NextResponse.json(
        {
          error: 'Configuração do banco de dados ausente.',
        },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get('page') || '1')
    const limit = Number.parseInt(searchParams.get('limit') || '100')
    const search = searchParams.get('search')
    const categoryId = searchParams.get('categoryId')
    const isAvailableParam = searchParams.get('isAvailable')

    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: "Parâmetro 'page' inválido." },
        { status: 400 }
      )
    }
    if (isNaN(limit) || limit < 1) {
      return NextResponse.json(
        { error: "Parâmetro 'limit' inválido." },
        { status: 400 }
      )
    }

    const skip = (page - 1) * limit
    const where: {
      OR?: Array<{
        name?: { contains: string; mode: 'insensitive' }
        description?: { contains: string; mode: 'insensitive' }
      }>
      categoryId?: string
      available?: boolean
    } = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (categoryId && categoryId !== 'all') {
      where.categoryId = categoryId
    }

    if (
      isAvailableParam !== null &&
      isAvailableParam !== undefined &&
      isAvailableParam !== 'all'
    ) {
      where.available = isAvailableParam === 'true'
    }

    // Teste de conexão com o banco
    await prisma.$connect()

    const equipments = await prisma.equipment.findMany({
      where,
      skip,
      take: limit,
      include: {
        category: true,
        _count: {
          select: {
            quoteItems: true,
            rental_items: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const equipmentsFormatted = equipments.map(
      (equip: EquipmentWithCategory) => ({
        ...equip,
        pricePerDay: Number(equip.pricePerDay), // Converter Decimal para number
        isAvailable: equip.available,
      })
    )

    const totalItems = await prisma.equipment.count({ where })
    const totalPages = Math.ceil(totalItems / limit)

    const response = {
      equipments: equipmentsFormatted,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('[API GET /admin/equipments] ERRO CRÍTICO:', error)

    // Log detalhado do erro
    if (error instanceof Error) {
      console.error(
        '[API GET /admin/equipments] Mensagem do erro:',
        error.message
      )
      console.error('[API GET /admin/equipments] Stack trace:', error.stack)
    }

    if (error instanceof Error && 'code' in error) {
      const prismaError = error as Error & { code: string; meta?: unknown }
      console.error(
        '[API GET /admin/equipments] Erro do Prisma - Código:',
        prismaError.code
      )
      console.error(
        '[API GET /admin/equipments] Erro do Prisma - Meta:',
        prismaError.meta
      )
    }

    return NextResponse.json(
      {
        error: 'Erro interno do servidor ao buscar equipamentos.',
        details:
          process.env.NODE_ENV === 'development'
            ? error instanceof Error
              ? error.message
              : String(error)
            : undefined,
      },
      { status: 500 }
    )
  }
}

// POST /api/admin/equipments - Create new equipment
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação de admin
    const adminResult = await requireAdmin(request)
    if (!adminResult.success) {
      return NextResponse.json(
        { error: adminResult.error },
        { status: adminResult.status }
      )
    }

    const body = await request.json()
    const { name, description, pricePerDay, categoryId, images, isAvailable } =
      body

    // Validações
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { error: 'Nome do equipamento é obrigatório.' },
        { status: 400 }
      )
    }
    if (
      !description ||
      typeof description !== 'string' ||
      description.trim() === ''
    ) {
      return NextResponse.json(
        { error: 'Descrição do equipamento é obrigatória.' },
        { status: 400 }
      )
    }
    if (!categoryId || typeof categoryId !== 'string') {
      return NextResponse.json(
        { error: 'ID da categoria é obrigatório.' },
        { status: 400 }
      )
    }
    if (pricePerDay === undefined || pricePerDay === null) {
      return NextResponse.json(
        { error: 'Preço por dia é obrigatório.' },
        { status: 400 }
      )
    }

    const parsedPrice = Number.parseFloat(String(pricePerDay))
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      return NextResponse.json(
        { error: 'Preço por dia inválido. Deve ser um número positivo.' },
        { status: 400 }
      )
    }

    // Verificar se a categoria existe
    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId },
    })
    if (!categoryExists) {
      return NextResponse.json(
        { error: 'Categoria não encontrada.' },
        { status: 404 }
      )
    }

    const equipment = await prisma.equipment.create({
      data: {
        name: name.trim(),
        description: description.trim(),
        pricePerDay: parsedPrice,
        categoryId,
        images: Array.isArray(images)
          ? images.filter((img) => typeof img === 'string' && img.trim() !== '')
          : [],
        available: typeof isAvailable === 'boolean' ? isAvailable : true,
      },
      include: {
        category: true,
      },
    })

    // Converter Decimal para number para compatibilidade com o frontend
    const equipmentResponse = {
      ...equipment,
      pricePerDay: Number(equipment.pricePerDay),
      isAvailable: equipment.available,
    }

    return NextResponse.json(equipmentResponse, { status: 201 })
  } catch (error) {
    console.error(
      '[API POST /admin/equipments] ERRO ao criar equipamento:',
      error
    )

    if (error instanceof Error && 'code' in error) {
      const prismaError = error as Error & { code: string; meta?: unknown }
      console.error(
        '[API POST /admin/equipments] Erro do Prisma - Código:',
        prismaError.code
      )
      return NextResponse.json(
        {
          error: 'Erro ao processar dados do equipamento.',
          details:
            process.env.NODE_ENV === 'development'
              ? `Prisma Error ${prismaError.code}: ${error.message}`
              : undefined,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error: 'Erro interno do servidor ao criar equipamento.',
        details:
          process.env.NODE_ENV === 'development'
            ? error instanceof Error
              ? error.message
              : String(error)
            : undefined,
      },
      { status: 500 }
    )
  }
}
