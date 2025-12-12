import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import Decimal from 'decimal.js'
import { DeliveryType, DeliveryStatus } from '@prisma/client'
import { Prisma } from '@prisma/client'

const CreateDeliverySchema = z.object({
  rentalId: z.string(),
  type: z.enum(['DELIVERY', 'PICKUP']),
  scheduledAt: z.string().transform((str) => new Date(str)),
  address: z.object({
    street: z.string(),
    number: z.string(),
    complement: z.string().optional(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
  }),
  distance: z.number().optional(),
  vehicleId: z.string().optional(),
  driverId: z.string().optional(),
  driverName: z.string().optional(),
  notes: z.string().optional(),
})

// GET - Listar entregas e coletas
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const where: Prisma.DeliveryWhereInput = {}
    if (status) where.status = status as DeliveryStatus
    if (type) where.type = type as DeliveryType
    if (startDate || endDate) {
      where.scheduledAt = {}
      if (startDate) where.scheduledAt.gte = new Date(startDate)
      if (endDate) where.scheduledAt.lte = new Date(endDate)
    }

    const deliveries = await prisma.delivery.findMany({
      where,
      include: {
        rental: {
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
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        scheduledAt: 'asc',
      },
    })

    return NextResponse.json({ deliveries })
  } catch (error) {
    console.error('Error fetching deliveries:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Criar entrega/coleta
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = CreateDeliverySchema.parse(body)

    // Verificar se locação existe
    const rental = await prisma.rentals.findUnique({
      where: { id: validatedData.rentalId },
    })

    if (!rental) {
      return NextResponse.json(
        { error: 'Locação não encontrada' },
        { status: 404 }
      )
    }

    // Criar entrega/coleta
    const delivery = await prisma.delivery.create({
      data: {
        rentalId: validatedData.rentalId,
        type: validatedData.type,
        scheduledAt: validatedData.scheduledAt,
        address: validatedData.address as Prisma.InputJsonValue,
        distance: validatedData.distance
          ? new Decimal(validatedData.distance)
          : null,
        vehicleId: validatedData.vehicleId,
        driverId: validatedData.driverId,
        driverName: validatedData.driverName,
        notes: validatedData.notes,
        status: 'SCHEDULED',
        photos: [],
      },
      include: {
        rental: {
          include: {
            users: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json({ delivery }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Error creating delivery:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

