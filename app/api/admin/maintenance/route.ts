import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import Decimal from 'decimal.js'
import { MaintenanceType, MaintenanceStatus } from '@prisma/client'
import { Prisma } from '@prisma/client'

const CreateMaintenanceSchema = z.object({
  equipmentId: z.string(),
  type: z.enum(['PREVENTIVE', 'CORRECTIVE', 'INSPECTION']),
  scheduledAt: z.string().transform((str) => new Date(str)),
  cost: z.number().optional(),
  laborCost: z.number().optional(),
  partsCost: z.number().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
  technician: z.string().optional(),
})

// GET - Listar manutenções
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const equipmentId = searchParams.get('equipmentId')
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const where: Prisma.MaintenanceWhereInput = {}
    if (equipmentId) where.equipmentId = equipmentId
    if (status) where.status = status as MaintenanceStatus
    if (type) where.type = type as MaintenanceType
    if (startDate || endDate) {
      where.scheduledAt = {}
      if (startDate) where.scheduledAt.gte = new Date(startDate)
      if (endDate) where.scheduledAt.lte = new Date(endDate)
    }

    const maintenances = await prisma.maintenance.findMany({
      where,
      include: {
        equipment: {
          select: {
            id: true,
            name: true,
            images: true,
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        scheduledAt: 'desc',
      },
    })

    return NextResponse.json({ maintenances })
  } catch (error) {
    console.error('Error fetching maintenances:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Criar manutenção
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = CreateMaintenanceSchema.parse(body)

    // Verificar se equipamento existe
    const equipment = await prisma.equipment.findUnique({
      where: { id: validatedData.equipmentId },
    })

    if (!equipment) {
      return NextResponse.json(
        { error: 'Equipamento não encontrado' },
        { status: 404 }
      )
    }

    // Calcular custo total se não fornecido
    let totalCost = validatedData.cost
    if (!totalCost) {
      const labor = validatedData.laborCost || 0
      const parts = validatedData.partsCost || 0
      totalCost = labor + parts
    }

    // Criar manutenção
    const maintenance = await prisma.maintenance.create({
      data: {
        equipmentId: validatedData.equipmentId,
        type: validatedData.type,
        scheduledAt: validatedData.scheduledAt,
        cost: totalCost ? new Decimal(totalCost) : null,
        laborCost: validatedData.laborCost
          ? new Decimal(validatedData.laborCost)
          : null,
        partsCost: validatedData.partsCost
          ? new Decimal(validatedData.partsCost)
          : null,
        description: validatedData.description,
        notes: validatedData.notes,
        technician: validatedData.technician,
        status: 'SCHEDULED',
      },
      include: {
        equipment: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    // Se for manutenção preventiva agendada, marcar equipamento como indisponível
    // (isso pode ser feito via cron job ou quando a manutenção começar)

    return NextResponse.json({ maintenance }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Error creating maintenance:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
