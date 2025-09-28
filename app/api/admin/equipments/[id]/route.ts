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
      // Direct value pricing configurations
      dailyDirectValue,
      weeklyDirectValue,
      biweeklyDirectValue,
      monthlyDirectValue,
      // Pricing method control (percentage or direct value)
      dailyUseDirectValue,
      weeklyUseDirectValue,
      biweeklyUseDirectValue,
      monthlyUseDirectValue,
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
      if (!isNaN(dailyDiscountNum)) {
        updateData.dailyDiscount = Math.min(Math.max(dailyDiscountNum, 0), 100)
      }
    }

    if (weeklyDiscount !== undefined) {
      const weeklyDiscountNum = parseInt(String(weeklyDiscount))
      if (!isNaN(weeklyDiscountNum)) {
        updateData.weeklyDiscount = Math.min(
          Math.max(weeklyDiscountNum, 0),
          100
        )
      }
    }

    if (biweeklyDiscount !== undefined) {
      const biweeklyDiscountNum = parseInt(String(biweeklyDiscount))
      if (!isNaN(biweeklyDiscountNum)) {
        updateData.biweeklyDiscount = Math.min(
          Math.max(biweeklyDiscountNum, 0),
          100
        )
      }
    }

    if (monthlyDiscount !== undefined) {
      const monthlyDiscountNum = parseInt(String(monthlyDiscount))
      if (!isNaN(monthlyDiscountNum)) {
        updateData.monthlyDiscount = Math.min(
          Math.max(monthlyDiscountNum, 0),
          100
        )
      }
    }

    if (popularPeriod !== undefined) {
      const validPeriods = ['daily', 'weekly', 'biweekly', 'monthly']
      if (validPeriods.includes(popularPeriod)) {
        updateData.popularPeriod = popularPeriod
      }
    }

    // Direct value pricing configurations
    if (dailyDirectValue !== undefined) {
      const dailyDirectValueNum = parseFloat(String(dailyDirectValue))
      if (!isNaN(dailyDirectValueNum) && dailyDirectValueNum >= 0) {
        updateData.dailyDirectValue = dailyDirectValueNum
      }
    }

    if (weeklyDirectValue !== undefined) {
      const weeklyDirectValueNum = parseFloat(String(weeklyDirectValue))
      if (!isNaN(weeklyDirectValueNum) && weeklyDirectValueNum >= 0) {
        updateData.weeklyDirectValue = weeklyDirectValueNum
      }
    }

    if (biweeklyDirectValue !== undefined) {
      const biweeklyDirectValueNum = parseFloat(String(biweeklyDirectValue))
      if (!isNaN(biweeklyDirectValueNum) && biweeklyDirectValueNum >= 0) {
        updateData.biweeklyDirectValue = biweeklyDirectValueNum
      }
    }

    if (monthlyDirectValue !== undefined) {
      const monthlyDirectValueNum = parseFloat(String(monthlyDirectValue))
      if (!isNaN(monthlyDirectValueNum) && monthlyDirectValueNum >= 0) {
        updateData.monthlyDirectValue = monthlyDirectValueNum
      }
    }

    // Pricing method control (percentage or direct value)
    if (dailyUseDirectValue !== undefined) {
      updateData.dailyUseDirectValue = Boolean(dailyUseDirectValue)
    }

    if (weeklyUseDirectValue !== undefined) {
      updateData.weeklyUseDirectValue = Boolean(weeklyUseDirectValue)
    }

    if (biweeklyUseDirectValue !== undefined) {
      updateData.biweeklyUseDirectValue = Boolean(biweeklyUseDirectValue)
    }

    if (monthlyUseDirectValue !== undefined) {
      updateData.monthlyUseDirectValue = Boolean(monthlyUseDirectValue)
    }

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
