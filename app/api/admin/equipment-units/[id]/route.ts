import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { EquipmentUnitStatus } from '@prisma/client'

// Schema de validação para atualizar unidade
const updateUnitSchema = z.object({
  uniqueCode: z.string().min(1).optional(),
  status: z
    .enum(['AVAILABLE', 'RESERVED', 'RENTED', 'MAINTENANCE', 'RETIRED'])
    .optional(),
  hourMeter: z.number().min(0).optional(),
  odometer: z.number().min(0).optional(),
  serialNumber: z.string().optional(),
  notes: z.string().optional(),
})

// GET - Buscar unidade específica
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { id } = await params

    const unit = await prisma.equipmentUnit.findUnique({
      where: { id },
      include: {
        equipment: {
          select: {
            id: true,
            name: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    if (!unit) {
      return NextResponse.json(
        { error: 'Unidade não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(unit)
  } catch (error) {
    console.error('Erro ao buscar unidade:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar unidade' },
      { status: 500 }
    )
  }
}

// PATCH - Atualizar unidade
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const validatedData = updateUnitSchema.parse(body)

    // Se estiver atualizando o código único, verificar se já existe
    if (validatedData.uniqueCode) {
      const existingUnit = await prisma.equipmentUnit.findUnique({
        where: { uniqueCode: validatedData.uniqueCode },
      })

      if (existingUnit && existingUnit.id !== id) {
        return NextResponse.json(
          { error: 'Código único já existe' },
          { status: 400 }
        )
      }
    }

    const updateData: {
      uniqueCode?: string
      status?: EquipmentUnitStatus
      hourMeter?: number
      odometer?: number
      serialNumber?: string | null
      notes?: string | null
    } = {}

    if (validatedData.uniqueCode !== undefined) {
      updateData.uniqueCode = validatedData.uniqueCode
    }

    if (validatedData.status !== undefined) {
      updateData.status = validatedData.status as EquipmentUnitStatus
    }

    if (validatedData.hourMeter !== undefined) {
      updateData.hourMeter = validatedData.hourMeter
    }

    if (validatedData.odometer !== undefined) {
      updateData.odometer = validatedData.odometer
    }

    if (validatedData.serialNumber !== undefined) {
      updateData.serialNumber = validatedData.serialNumber || null
    }

    if (validatedData.notes !== undefined) {
      updateData.notes = validatedData.notes || null
    }

    const unit = await prisma.equipmentUnit.update({
      where: { id },
      data: updateData,
      include: {
        equipment: {
          select: {
            id: true,
            name: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(unit)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Erro ao atualizar unidade:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar unidade' },
      { status: 500 }
    )
  }
}

// DELETE - Deletar unidade
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { id } = await params

    // Verificar se a unidade está em uso (RENTED ou RESERVED)
    const unit = await prisma.equipmentUnit.findUnique({
      where: { id },
    })

    if (!unit) {
      return NextResponse.json(
        { error: 'Unidade não encontrada' },
        { status: 404 }
      )
    }

    if (unit.status === 'RENTED' || unit.status === 'RESERVED') {
      return NextResponse.json(
        { error: 'Não é possível deletar unidade em uso' },
        { status: 400 }
      )
    }

    await prisma.equipmentUnit.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Unidade deletada com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar unidade:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar unidade' },
      { status: 500 }
    )
  }
}
