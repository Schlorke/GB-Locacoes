import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import Decimal from 'decimal.js'
import { markEquipmentAvailableAfterMaintenance } from '@/lib/maintenance-automation'

const CompleteMaintenanceSchema = z.object({
  completedAt: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
  cost: z.number().optional(),
  laborCost: z.number().optional(),
  partsCost: z.number().optional(),
  notes: z.string().optional(),
  hourMeter: z.number().optional(), // Horímetro após manutenção
  odometer: z.number().optional(), // Odômetro após manutenção
})

// POST - Completar manutenção
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const paramsResolved = await params
    const body = await request.json()
    const validatedData = CompleteMaintenanceSchema.parse(body)

    // Buscar manutenção
    const maintenance = await prisma.maintenance.findUnique({
      where: { id: paramsResolved.id },
      include: {
        equipment: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    if (!maintenance) {
      return NextResponse.json(
        { error: 'Manutenção não encontrada' },
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

    // Atualizar manutenção
    const updateData: {
      status: 'COMPLETED'
      completedAt: Date
      cost?: Decimal
      laborCost?: Decimal
      partsCost?: Decimal
      notes?: string
    } = {
      status: 'COMPLETED',
      completedAt: validatedData.completedAt || new Date(),
    }

    if (totalCost) {
      updateData.cost = new Decimal(totalCost)
    }
    if (validatedData.laborCost !== undefined) {
      updateData.laborCost = new Decimal(validatedData.laborCost)
    }
    if (validatedData.partsCost !== undefined) {
      updateData.partsCost = new Decimal(validatedData.partsCost)
    }
    if (validatedData.notes !== undefined) {
      updateData.notes = validatedData.notes
    }

    // Atualizar manutenção e equipamento em transação
    const [updatedMaintenance] = await prisma.$transaction([
      prisma.maintenance.update({
        where: { id: paramsResolved.id },
        data: updateData,
        include: {
          equipment: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      // Atualizar horímetro/odômetro se fornecido
      ...(validatedData.hourMeter !== undefined ||
      validatedData.odometer !== undefined
        ? [
            prisma.equipment.update({
              where: { id: maintenance.equipmentId },
              data: {
                ...(validatedData.hourMeter !== undefined && {
                  hourMeter: new Decimal(validatedData.hourMeter),
                }),
                ...(validatedData.odometer !== undefined && {
                  odometer: new Decimal(validatedData.odometer),
                }),
              },
            }),
          ]
        : []),
    ])

    // Marcar equipamento como disponível (se não houver outras manutenções ativas)
    await markEquipmentAvailableAfterMaintenance(maintenance.equipmentId)

    return NextResponse.json({ maintenance: updatedMaintenance })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Error completing maintenance:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
