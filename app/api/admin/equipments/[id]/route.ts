import { NextRequest, NextResponse } from 'next/server'

// FIX: Dynamic imports to avoid Prisma initialization at build time
// This prevents the "@prisma/client did not initialize yet" error during
// Vercel's "Collecting page data" phase with Next.js 15 + Prisma 6
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Dynamic imports - only load at runtime, never during build
    const { requireAdmin } = await import('@/middlewares/require-admin')
    const { prisma } = await import('@/lib/prisma')

    const adminResult = await requireAdmin(request)
    if (!adminResult.success) {
      return NextResponse.json(
        { error: adminResult.error },
        { status: adminResult.status }
      )
    }

    const { id } = await params
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
    // Dynamic imports - only load at runtime, never during build
    const { requireAdmin } = await import('@/middlewares/require-admin')
    const { prisma } = await import('@/lib/prisma')

    const adminResult = await requireAdmin(request)
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
    } = body

    console.error('Dados recebidos:', {
      name,
      description,
      pricePerDay,
      categoryId,
      images,
      isAvailable,
    })

    const { id } = await params

    // Preparar dados para atualização
    const updateData: Record<string, unknown> = {}

    if (name) updateData.name = name
    if (description) updateData.description = description
    if (specifications) updateData.specifications = specifications
    if (pricePerDay) updateData.pricePerDay = parseFloat(pricePerDay)
    if (categoryId) updateData.categoryId = categoryId
    if (images && images.length > 0) updateData.images = { set: images }
    if (isAvailable !== undefined) updateData.available = isAvailable

    console.error('Dados para update:', updateData)

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
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Dynamic imports - only load at runtime, never during build
    const { requireAdmin } = await import('@/middlewares/require-admin')
    const { prisma } = await import('@/lib/prisma')

    const adminResult = await requireAdmin(request)
    if (!adminResult.success) {
      return NextResponse.json(
        { error: adminResult.error },
        { status: adminResult.status }
      )
    }

    const { id } = await params
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
