import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import Decimal from 'decimal.js'
import type { Prisma } from '@prisma/client'

const CreateRentalSchema = z.object({
  userId: z.string(),
  quoteId: z.string().optional(),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
  items: z.array(
    z.object({
      equipmentId: z.string(),
      quantity: z.number().int().positive(),
      days: z.number().int().positive(),
      pricePerDay: z
        .number()
        .or(z.string())
        .transform((val) => new Decimal(val)),
    })
  ),
  notes: z.string().optional(),
})

// GET - Listar locações com filtros
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const userId = searchParams.get('userId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit
    const includeOrphans = searchParams.get('includeOrphans') === 'true'

    // Construir condições de filtro
    const whereConditions: Prisma.rentalsWhereInput = {}

    // Aplicar filtro de status se fornecido
    if (status) {
      whereConditions.status = status
    } else {
      // Se não há filtro de status, excluir locações canceladas por padrão
      whereConditions.status = {
        not: 'CANCELLED',
      }
    }

    // Excluir locações vinculadas a orçamentos rejeitados
    whereConditions.NOT = {
      quote: {
        status: 'REJECTED',
      },
    }

    // Ocultar locações órfãs (sem quoteId) por padrão para evitar pendências
    // criadas antes da vinculação correta do orçamento. Para depuração, usar
    // `?includeOrphans=true`.
    if (!includeOrphans) {
      whereConditions.quoteId = {
        not: null,
      }
    }

    if (userId) whereConditions.userid = userId
    if (startDate || endDate) {
      whereConditions.startdate = {}
      if (startDate) whereConditions.startdate.gte = new Date(startDate)
      if (endDate) whereConditions.startdate.lte = new Date(endDate)
    }

    const where = whereConditions

    const [allRentals, total] = await Promise.all([
      prisma.rentals.findMany({
        where,
        include: {
          users: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
          rental_items: {
            include: {
              equipments: {
                select: {
                  id: true,
                  name: true,
                  images: true,
                },
              },
            },
          },
          quote: {
            select: {
              id: true,
              name: true,
              email: true,
              status: true, // Incluir status para filtrar no frontend
            },
          },
          payments: {
            select: {
              id: true,
              amount: true,
              status: true,
              method: true,
              paidAt: true,
            },
          },
          contract: {
            select: {
              id: true,
              status: true,
              signedAt: true,
              pdfUrl: true,
            },
          },
        },
        orderBy: {
          createdat: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.rentals.count({ where }),
    ])

    // Filtro adicional no código para garantir que locações de orçamentos rejeitados/ou órfãs sejam excluídas
    // Isso serve como fallback caso a query Prisma não funcione corretamente
    const rentals = allRentals.filter((rental) => {
      if (rental.quote?.status === 'REJECTED') return false
      if (!includeOrphans && !rental.quoteId) return false
      return true
    })

    return NextResponse.json({
      rentals,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching rentals:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Criar nova locação
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = CreateRentalSchema.parse(body)

    // Verificar disponibilidade dos equipamentos
    for (const item of validatedData.items) {
      const equipment = await prisma.equipment.findUnique({
        where: { id: item.equipmentId },
      })

      if (!equipment) {
        return NextResponse.json(
          { error: `Equipamento não encontrado: ${item.equipmentId}` },
          { status: 400 }
        )
      }

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
                  { startdate: { lte: validatedData.endDate } },
                  { enddate: { gte: validatedData.startDate } },
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
    for (const item of validatedData.items) {
      const itemTotal = item.pricePerDay.times(item.days).times(item.quantity)
      total = total.plus(itemTotal)
    }

    // Criar locação
    const rental = await prisma.rentals.create({
      data: {
        id: `rental_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userid: validatedData.userId,
        quoteId: validatedData.quoteId,
        startdate: validatedData.startDate,
        enddate: validatedData.endDate,
        total: total.toNumber(),
        status: 'PENDING',
        notes: validatedData.notes,
        rental_items: {
          create: validatedData.items.map((item) => ({
            id: `rental_item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            equipmentid: item.equipmentId,
            quantity: item.quantity,
            priceperday: item.pricePerDay.toNumber(),
            totaldays: item.days,
            totalprice: item.pricePerDay
              .times(item.days)
              .times(item.quantity)
              .toNumber(),
          })),
        },
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        rental_items: {
          include: {
            equipments: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        contract: {
          select: {
            id: true,
            status: true,
            signedAt: true,
            pdfUrl: true,
          },
        },
      },
    })

    // Se veio de um orçamento, atualizar o orçamento
    if (validatedData.quoteId) {
      await prisma.quote.update({
        where: { id: validatedData.quoteId },
        data: {
          convertedToRentalId: rental.id,
          status: 'COMPLETED',
        },
      })
    }

    return NextResponse.json({ rental }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Error creating rental:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
