import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { EquipmentUnitStatus } from '@prisma/client'

// Schema de validação para criar unidade
const createUnitSchema = z.object({
  equipmentId: z.string(),
  uniqueCode: z.string().min(1, 'Código único é obrigatório'),
  serialNumber: z.string().optional(),
  notes: z.string().optional(),
  hourMeter: z.number().min(0).optional(),
  odometer: z.number().min(0).optional(),
})

// GET - Listar unidades (com filtros opcionais)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const equipmentId = searchParams.get('equipmentId')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    const where: {
      equipmentId?: string
      status?: EquipmentUnitStatus
      OR?: Array<{
        uniqueCode?: { contains: string; mode: 'insensitive' }
        serialNumber?: { contains: string; mode: 'insensitive' }
      }>
    } = {}

    if (equipmentId) {
      where.equipmentId = equipmentId
    }

    if (status) {
      where.status = status as EquipmentUnitStatus
    }

    if (search) {
      where.OR = [
        { uniqueCode: { contains: search, mode: 'insensitive' } },
        { serialNumber: { contains: search, mode: 'insensitive' } },
      ]
    }

    const units = await prisma.equipmentUnit.findMany({
      where,
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
      orderBy: {
        uniqueCode: 'asc',
      },
    })

    return NextResponse.json(units)
  } catch (error) {
    console.error('Erro ao buscar unidades:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar unidades' },
      { status: 500 }
    )
  }
}

// POST - Criar nova unidade
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createUnitSchema.parse(body)

    // Verificar se o código único já existe
    const existingUnit = await prisma.equipmentUnit.findUnique({
      where: { uniqueCode: validatedData.uniqueCode },
    })

    if (existingUnit) {
      return NextResponse.json(
        { error: 'Código único já existe' },
        { status: 400 }
      )
    }

    // Verificar se o equipamento existe
    const equipment = await prisma.equipment.findUnique({
      where: { id: validatedData.equipmentId },
    })

    if (!equipment) {
      return NextResponse.json(
        { error: 'Equipamento não encontrado' },
        { status: 404 }
      )
    }

    const unit = await prisma.equipmentUnit.create({
      data: {
        equipmentId: validatedData.equipmentId,
        uniqueCode: validatedData.uniqueCode,
        serialNumber: validatedData.serialNumber,
        notes: validatedData.notes,
        hourMeter: validatedData.hourMeter
          ? validatedData.hourMeter
          : undefined,
        odometer: validatedData.odometer ? validatedData.odometer : undefined,
        status: 'AVAILABLE',
      },
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

    return NextResponse.json(unit, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Erro ao criar unidade:', error)
    return NextResponse.json(
      { error: 'Erro ao criar unidade' },
      { status: 500 }
    )
  }
}
