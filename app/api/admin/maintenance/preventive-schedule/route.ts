import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import {
  calculateNextPreventiveMaintenanceDate,
  type PreventiveMaintenanceRules,
} from '@/lib/maintenance-automation'

const SchedulePreventiveSchema = z.object({
  equipmentId: z.string(),
  rules: z.object({
    daysInterval: z.number().optional(),
    hoursInterval: z.number().optional(),
    rentalsInterval: z.number().optional(),
  }),
  description: z.string().optional(),
  notes: z.string().optional(),
  technician: z.string().optional(),
})

// POST - Agendar manutenção preventiva automática
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = SchedulePreventiveSchema.parse(body)

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

    // Calcular próxima data de manutenção
    const scheduledAt = await calculateNextPreventiveMaintenanceDate(
      validatedData.equipmentId,
      validatedData.rules as PreventiveMaintenanceRules
    )

    if (!scheduledAt) {
      return NextResponse.json(
        { error: 'Não foi possível calcular data de manutenção' },
        { status: 400 }
      )
    }

    // Criar manutenção preventiva
    const maintenance = await prisma.maintenance.create({
      data: {
        equipmentId: validatedData.equipmentId,
        type: 'PREVENTIVE',
        scheduledAt,
        description:
          validatedData.description ||
          'Manutenção preventiva agendada automaticamente',
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

    return NextResponse.json({ maintenance }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Error scheduling preventive maintenance:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
