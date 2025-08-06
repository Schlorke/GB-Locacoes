import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerCompany,
      message,
      items,
    } = body

    // Validação básica
    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !items ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: 'Campos obrigatórios não preenchidos' },
        { status: 400 }
      )
    }

    // Calcular total
    let totalAmount = 0
    const quoteItems = []

    for (const item of items) {
      const equipment = await prisma.equipment.findUnique({
        where: { id: item.equipmentId },
      })

      if (!equipment) {
        return NextResponse.json(
          { error: `Equipamento não encontrado: ${item.equipmentId}` },
          { status: 400 }
        )
      }

      const pricePerDay = Number(equipment.pricePerDay)
      const itemTotal = pricePerDay * item.quantity * (item.days || 1)
      totalAmount += itemTotal

      quoteItems.push({
        equipmentId: item.equipmentId,
        quantity: item.quantity,
        days: item.days || 1,
        pricePerDay: equipment.pricePerDay,
        priceAtTime: equipment.pricePerDay,
        total: itemTotal,
      })
    }

    // Criar orçamento
    const quote = await prisma.quote.create({
      data: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        company: customerCompany,
        message,
        total: totalAmount,
        status: 'PENDING', // Fixed: using correct enum value
        items: {
          create: quoteItems,
        },
      },
      include: {
        items: {
          include: {
            equipment: {
              select: {
                name: true,
                category: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    return NextResponse.json(quote, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar orçamento:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
