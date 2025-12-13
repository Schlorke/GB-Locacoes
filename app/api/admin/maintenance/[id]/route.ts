import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import Decimal from 'decimal.js'
import { MaintenanceStatus } from '@prisma/client'
import { Prisma } from '@prisma/client'
import {
  markEquipmentUnavailableForMaintenance,
  markEquipmentAvailableAfterMaintenance,
  canStartMaintenance,
} from '@/lib/maintenance-automation'

const UpdateMaintenanceSchema = z.object({
  status: z
    .enum(['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'])
    .optional(),
  completedAt: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
  cost: z.number().optional(),
  laborCost: z.number().optional(),
  partsCost: z.number().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
  technician: z.string().optional(),
})

// PATCH - Atualizar manutenção
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = UpdateMaintenanceSchema.parse(body)

    const updateData: Prisma.MaintenanceUpdateInput = {}
    if (validatedData.status)
      updateData.status = validatedData.status as MaintenanceStatus
    if (validatedData.completedAt)
      updateData.completedAt = validatedData.completedAt
    if (validatedData.cost !== undefined) {
      updateData.cost = new Decimal(validatedData.cost)
      // Recalcular se laborCost ou partsCost não foram fornecidos
      if (!validatedData.laborCost && !validatedData.partsCost) {
        // Manter custo total
      }
    }
    if (validatedData.laborCost !== undefined) {
      updateData.laborCost = new Decimal(validatedData.laborCost)
    }
    if (validatedData.partsCost !== undefined) {
      updateData.partsCost = new Decimal(validatedData.partsCost)
    }
    if (validatedData.description !== undefined) {
      updateData.description = validatedData.description
    }
    if (validatedData.notes !== undefined)
      updateData.notes = validatedData.notes
    if (validatedData.technician !== undefined) {
      updateData.technician = validatedData.technician
    }

    // Se foi completada, atualizar data de conclusão
    if (validatedData.status === 'COMPLETED' && !validatedData.completedAt) {
      updateData.completedAt = new Date()
    }

    // Se status está mudando para IN_PROGRESS, validar se pode iniciar
    if (validatedData.status === 'IN_PROGRESS') {
      const maintenance = await prisma.maintenance.findUnique({
        where: { id: params.id },
        select: { equipmentId: true },
      })

      if (maintenance) {
        const validation = await canStartMaintenance(maintenance.equipmentId)
        if (!validation.canStart) {
          return NextResponse.json(
            { error: validation.reason },
            { status: 400 }
          )
        }
      }
    }

    const maintenance = await prisma.maintenance.update({
      where: { id: params.id },
      data: updateData,
      include: {
        equipment: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    // Atualizar disponibilidade do equipamento baseado no status
    if (validatedData.status === 'IN_PROGRESS') {
      await markEquipmentUnavailableForMaintenance(maintenance.equipment.id)
    } else if (validatedData.status === 'COMPLETED') {
      await markEquipmentAvailableAfterMaintenance(maintenance.equipment.id)
    }

    return NextResponse.json({ maintenance })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Error updating maintenance:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
