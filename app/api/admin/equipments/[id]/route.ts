import { requireAdmin } from '@/middlewares/require-admin'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Runtime-only Prisma import
async function getPrisma() {
  // Prisma importado estaticamente
  return prisma
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminResult = await requireAdmin()
    if (!adminResult.success) {
      return NextResponse.json(
        { error: adminResult.error },
        { status: adminResult.status }
      )
    }

    const { id } = await params
    const prisma = await getPrisma()
    const equipment = await prisma.equipment.findUnique({
      where: { id },
      include: {
        category: true,
        _count: {
          select: {
            quoteItems: true,
            rental_items: true,
          },
        },
      },
    })

    if (!equipment) {
      return NextResponse.json(
        { error: 'Equipamento não encontrado' },
        { status: 404 }
      )
    }

    // Converter Decimal para number para compatibilidade com o frontend
    const equipmentResponse = {
      ...equipment,
      pricePerDay: Number(equipment.pricePerDay),
      isAvailable: equipment.available, // Mapear available para isAvailable
      _count: {
        quoteItems: equipment._count.quoteItems,
        reviews: 0, // Campo não implementado ainda, usar 0 como padrão
      },
    }

    return NextResponse.json(equipmentResponse)
  } catch (error) {
    console.error('Erro ao buscar equipamento:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminResult = await requireAdmin()
    if (!adminResult.success) {
      return NextResponse.json(
        { error: adminResult.error },
        { status: adminResult.status }
      )
    }

    const body = await request.json()

    // Log completo dos dados recebidos
    console.log('Body completo recebido:', JSON.stringify(body, null, 2))

    const {
      name,
      description,
      specifications,
      pricePerDay,
      categoryId,
      images,
      isAvailable,
      maxStock,
      dailyDiscount,
      weeklyDiscount,
      biweeklyDiscount,
      monthlyDiscount,
      popularPeriod,
    } = body

    // Validação básica dos dados obrigatórios
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Nome é obrigatório e deve ser uma string' },
        { status: 400 }
      )
    }

    if (!description || typeof description !== 'string') {
      return NextResponse.json(
        { error: 'Descrição é obrigatória e deve ser uma string' },
        { status: 400 }
      )
    }

    if (!pricePerDay || isNaN(parseFloat(pricePerDay))) {
      return NextResponse.json(
        { error: 'Preço por dia é obrigatório e deve ser um número válido' },
        { status: 400 }
      )
    }

    if (!categoryId || typeof categoryId !== 'string') {
      return NextResponse.json(
        { error: 'ID da categoria é obrigatório' },
        { status: 400 }
      )
    }

    console.log('Dados recebidos validados:', {
      name,
      description,
      pricePerDay,
      categoryId,
      images: images?.length || 0,
      isAvailable,
      maxStock,
      dailyDiscount,
      weeklyDiscount,
      biweeklyDiscount,
      monthlyDiscount,
      popularPeriod,
    })

    const { id } = await params

    // Preparar dados para atualização
    const updateData: Record<string, unknown> = {}

    // Dados obrigatórios (já validados)
    updateData.name = name
    updateData.description = description
    updateData.pricePerDay = parseFloat(pricePerDay)

    // Usar relação category em vez de categoryId direto
    if (categoryId) {
      updateData.category = {
        connect: { id: categoryId },
      }
    }

    // Dados opcionais
    if (specifications !== undefined) {
      updateData.specifications = specifications || {}
    }

    if (images !== undefined) {
      if (Array.isArray(images)) {
        updateData.images = { set: images }
      } else {
        console.warn('Images não é um array:', images)
        updateData.images = { set: [] }
      }
    }

    if (isAvailable !== undefined) {
      updateData.available = Boolean(isAvailable)
    }

    // Inventory management
    if (maxStock !== undefined) {
      const maxStockNum = parseInt(String(maxStock))
      if (!isNaN(maxStockNum) && maxStockNum > 0) {
        updateData.maxStock = maxStockNum
      }
    }

    // Rental period configurations
    if (dailyDiscount !== undefined) {
      const dailyDiscountNum = parseInt(String(dailyDiscount))
      if (
        !isNaN(dailyDiscountNum) &&
        dailyDiscountNum >= 0 &&
        dailyDiscountNum <= 100
      ) {
        updateData.dailyDiscount = dailyDiscountNum
      }
    }

    if (weeklyDiscount !== undefined) {
      const weeklyDiscountNum = parseInt(String(weeklyDiscount))
      if (
        !isNaN(weeklyDiscountNum) &&
        weeklyDiscountNum >= 0 &&
        weeklyDiscountNum <= 100
      ) {
        updateData.weeklyDiscount = weeklyDiscountNum
      }
    }

    if (biweeklyDiscount !== undefined) {
      const biweeklyDiscountNum = parseInt(String(biweeklyDiscount))
      if (
        !isNaN(biweeklyDiscountNum) &&
        biweeklyDiscountNum >= 0 &&
        biweeklyDiscountNum <= 100
      ) {
        updateData.biweeklyDiscount = biweeklyDiscountNum
      }
    }

    if (monthlyDiscount !== undefined) {
      const monthlyDiscountNum = parseInt(String(monthlyDiscount))
      if (
        !isNaN(monthlyDiscountNum) &&
        monthlyDiscountNum >= 0 &&
        monthlyDiscountNum <= 100
      ) {
        updateData.monthlyDiscount = monthlyDiscountNum
      }
    }

    if (popularPeriod !== undefined) {
      const validPeriods = ['daily', 'weekly', 'biweekly', 'monthly']
      if (validPeriods.includes(popularPeriod)) {
        updateData.popularPeriod = popularPeriod
      }
    }

    console.log(
      'Dados preparados para update:',
      JSON.stringify(updateData, null, 2)
    )

    const prisma = await getPrisma()

    // Verificar se o equipamento existe antes de atualizar
    const existingEquipment = await prisma.equipment.findUnique({
      where: { id },
    })

    if (!existingEquipment) {
      return NextResponse.json(
        { error: 'Equipamento não encontrado' },
        { status: 404 }
      )
    }

    console.log('Equipamento encontrado, iniciando update...')

    const equipment = await prisma.equipment.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        _count: {
          select: {
            quoteItems: true,
            rental_items: true,
          },
        },
      },
    })

    // Converter Decimal para number para compatibilidade com o frontend
    const equipmentResponse = {
      ...equipment,
      pricePerDay: Number(equipment.pricePerDay),
      isAvailable: equipment.available, // Mapear available para isAvailable
      _count: {
        quoteItems: equipment._count.quoteItems,
        reviews: 0, // Campo não implementado ainda, usar 0 como padrão
      },
    }

    return NextResponse.json(equipmentResponse)
  } catch (error) {
    console.error('Erro ao atualizar equipamento:', error)

    // Capturar detalhes específicos do erro
    let errorMessage = 'Erro interno do servidor'
    if (error instanceof Error) {
      errorMessage = error.message
      console.error('Stack trace:', error.stack)
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminResult = await requireAdmin()
    if (!adminResult.success) {
      return NextResponse.json(
        { error: adminResult.error },
        { status: adminResult.status }
      )
    }

    const { id } = await params
    const prisma = await getPrisma()
    await prisma.equipment.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Equipamento removido com sucesso' })
  } catch (error) {
    console.error('Erro ao remover equipamento:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
