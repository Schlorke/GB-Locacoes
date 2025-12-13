import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { VehicleType, VehicleStatus } from '@prisma/client'

const CreateVehicleSchema = z.object({
  plate: z.string().min(1, 'Placa é obrigatória'),
  brand: z.string().optional(),
  model: z.string().optional(),
  year: z.number().int().positive().optional(),
  type: z.enum(['TRUCK', 'VAN', 'PICKUP', 'MOTORCYCLE']).optional(),
  status: z
    .enum(['AVAILABLE', 'IN_USE', 'MAINTENANCE', 'OUT_OF_SERVICE'])
    .optional(),
})

// UpdateVehicleSchema removed - not used in current implementation

// GET - Listar veículos
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const type = searchParams.get('type')

    const where: {
      status?: VehicleStatus
      type?: VehicleType
    } = {}

    if (status) where.status = status as VehicleStatus
    if (type) where.type = type as VehicleType

    const vehicles = await prisma.vehicle.findMany({
      where,
      orderBy: {
        plate: 'asc',
      },
    })

    return NextResponse.json({ vehicles })
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Criar veículo
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = CreateVehicleSchema.parse(body)

    // Verificar se placa já existe
    const existing = await prisma.vehicle.findUnique({
      where: { plate: validatedData.plate },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Placa já cadastrada' },
        { status: 400 }
      )
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        plate: validatedData.plate,
        brand: validatedData.brand,
        model: validatedData.model,
        year: validatedData.year,
        type: validatedData.type || 'TRUCK',
        status: validatedData.status || 'AVAILABLE',
      },
    })

    return NextResponse.json({ vehicle }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Error creating vehicle:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
