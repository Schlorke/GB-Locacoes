import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  requireAdmin,
  requireAdminOrOperator,
} from '@/middlewares/require-admin'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Decimal from 'decimal.js'
import type { Prisma } from '@prisma/client'

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
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  try {
    // Verificar autenticação de admin ou operator
    const authResult = await requireAdminOrOperator()
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      )
    }

    const prisma = await getPrisma()
    const quote = await prisma.quote.findUnique({
      where: { id: params.id },
      include: {
        items: {
          include: {
            equipment: {
              select: {
                id: true,
                name: true,
                description: true,
                pricePerDay: true,
                images: true,
                category: {
                  select: {
                    name: true,
                    iconColor: true,
                    bgColor: true,
                    fontColor: true,
                  },
                },
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 })
    }

    return NextResponse.json(quote)
  } catch (error) {
    console.error('Error fetching quote:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  try {
    // Verificar autenticação de admin ou operator
    const authResult = await requireAdminOrOperator()
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      )
    }

    const session = await getServerSession(authOptions)
    const body = await request.json()
    const { status, ...updateData } = body

    const prisma = await getPrisma()

    // Buscar orçamento atual para verificar se já foi convertido
    const currentQuote = await prisma.quote.findUnique({
      where: { id: params.id },
      include: {
        items: {
          include: {
            equipment: true,
          },
        },
        user: true,
      },
    })

    if (!currentQuote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 })
    }

    // Preparar dados de atualização
    const updateQuoteData: Prisma.QuoteUncheckedUpdateInput = {
      ...updateData,
      updatedAt: new Date(),
    }

    // Se está aprovando o orçamento
    if (status === 'APPROVED' && currentQuote.status !== 'APPROVED') {
      updateQuoteData.status = 'APPROVED'
      updateQuoteData.approvedAt = new Date()
      if (session?.user?.id) {
        updateQuoteData.approvedBy = session.user.id
      } else {
        // Remover approvedBy se não houver usuário
        delete updateQuoteData.approvedBy
      }

      // Se já não foi convertido, converter automaticamente para locação
      if (
        !currentQuote.convertedToRentalId &&
        currentQuote.startDate &&
        currentQuote.endDate &&
        currentQuote.userId
      ) {
        try {
          // Verificar disponibilidade dos equipamentos
          for (const item of currentQuote.items) {
            const equipment = item.equipment
            if (!equipment) continue

            // Verificar disponibilidade no período
            const conflictingRentals = await prisma.rental_items.findMany({
              where: {
                equipmentid: item.equipmentId,
                rentals: {
                  status: {
                    in: ['PENDING', 'ACTIVE', 'OVERDUE'],
                  },
                  OR: [
                    {
                      AND: [
                        { startdate: { lte: currentQuote.endDate! } },
                        { enddate: { gte: currentQuote.startDate! } },
                      ],
                    },
                  ],
                },
              },
              include: {
                rentals: true,
              },
            })

            const totalRented = conflictingRentals.reduce(
              (sum, ri) => sum + ri.quantity,
              0
            )
            const available = (equipment.maxStock || 1) - totalRented

            if (available < item.quantity) {
              return NextResponse.json(
                {
                  error: `Equipamento ${equipment.name} não tem estoque suficiente. Disponível: ${available}, Solicitado: ${item.quantity}`,
                },
                { status: 400 }
              )
            }
          }

          // Calcular total
          let total = new Decimal(0)
          for (const item of currentQuote.items) {
            const pricePerDay = new Decimal(item.pricePerDay)
            const days = item.days || 1
            const quantity = item.quantity || 1
            const itemTotal = pricePerDay.times(days).times(quantity)
            total = total.plus(itemTotal)
          }

          // Criar locação
          const rental = await prisma.rentals.create({
            data: {
              id: `rental_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              userid: currentQuote.userId,
              quoteId: currentQuote.id,
              startdate: currentQuote.startDate,
              enddate: currentQuote.endDate,
              total: total.toNumber(),
              status: 'PENDING',
              notes: `Gerado automaticamente do orçamento ${currentQuote.id}`,
              rental_items: {
                create: currentQuote.items.map((item) => ({
                  id: `rental_item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                  equipmentid: item.equipmentId,
                  quantity: item.quantity || 1,
                  priceperday: Number(item.pricePerDay),
                  totaldays: item.days || 1,
                  totalprice: new Decimal(item.pricePerDay)
                    .times(item.days || 1)
                    .times(item.quantity || 1)
                    .toNumber(),
                })),
              },
            },
          })

          // Atualizar orçamento com ID da locação
          updateQuoteData.convertedToRentalId = rental.id
          updateQuoteData.status = 'COMPLETED' // Marcar como completado após conversão
        } catch (conversionError) {
          console.error('Error converting quote to rental:', conversionError)
          // Continuar com a aprovação mesmo se a conversão falhar
          // (pode ser convertido manualmente depois)
        }
      }
    }

    // Se está rejeitando o orçamento
    if (status === 'REJECTED' && currentQuote.status !== 'REJECTED') {
      updateQuoteData.status = 'REJECTED'
      updateQuoteData.rejectedAt = new Date()
      if (session?.user?.id) {
        updateQuoteData.rejectedBy = session.user.id
      } else {
        // Remover rejectedBy se não houver usuário
        delete updateQuoteData.rejectedBy
      }
    }

    // Construir objeto de update de forma explícita e segura
    const cleanUpdateData: Prisma.QuoteUncheckedUpdateInput = {
      updatedAt: new Date(),
    }

    // Adicionar campos do updateData se existirem
    if (updateData && typeof updateData === 'object') {
      Object.assign(cleanUpdateData, updateData)
    }

    // Adicionar campos específicos se foram definidos
    if (updateQuoteData.status) {
      cleanUpdateData.status = updateQuoteData.status
    }
    if (updateQuoteData.approvedAt) {
      cleanUpdateData.approvedAt = updateQuoteData.approvedAt
    }
    if (updateQuoteData.approvedBy) {
      cleanUpdateData.approvedBy = updateQuoteData.approvedBy
    }
    if (updateQuoteData.rejectedAt) {
      cleanUpdateData.rejectedAt = updateQuoteData.rejectedAt
    }
    if (updateQuoteData.rejectedBy) {
      cleanUpdateData.rejectedBy = updateQuoteData.rejectedBy
    }
    if (updateQuoteData.convertedToRentalId) {
      cleanUpdateData.convertedToRentalId = updateQuoteData.convertedToRentalId
    }

    const quote = await prisma.quote.update({
      where: { id: params.id },
      data: cleanUpdateData,
      include: {
        items: {
          include: {
            equipment: {
              select: {
                id: true,
                name: true,
                pricePerDay: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(quote)
  } catch (error) {
    console.error('Error updating quote:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  try {
    // DELETE requer apenas ADMIN (não OPERATOR)
    const authResult = await requireAdmin()
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      )
    }

    const prisma = await getPrisma()
    await prisma.quote.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Quote deleted successfully' })
  } catch (error) {
    console.error('Error deleting quote:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
