import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import Decimal from 'decimal.js'
import { MaintenanceStatus } from '@prisma/client'
import { Prisma } from '@prisma/client'

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

    // Se manutenção foi completada, verificar se equipamento pode voltar ao estoque
    if (validatedData.status === 'COMPLETED') {
      // Aqui você pode adicionar lógica para verificar outras manutenções pendentes
      // e atualizar disponibilidade do equipamento
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
