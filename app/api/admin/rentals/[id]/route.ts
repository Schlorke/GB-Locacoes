import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import Decimal from 'decimal.js'

const UpdateRentalSchema = z.object({
  status: z
    .enum([
      'PENDING',
      'ACTIVE',
      'COMPLETED',
      'CANCELLED',
      'OVERDUE',
      'PENDING_RETURN',
    ])
    .optional(),
  startDate: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
  endDate: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
  extensionDays: z.number().int().positive().optional(),
  lateFee: z
    .number()
    .or(z.string())
    .transform((val) => new Decimal(val))
    .optional(),
  checkInAt: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
  checkOutAt: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
  notes: z.string().optional(),
})

// GET - Obter locação específica
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rental = await prisma.rentals.findUnique({
      where: { id: params.id },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            cpf: true,
            cnpj: true,
          },
        },
        rental_items: {
          include: {
            equipments: {
              include: {
                category: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
        quote: {
          include: {
            items: {
              include: {
                equipment: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
        payments: {
          orderBy: {
            dueDate: 'asc',
          },
        },
        deliveries: {
          orderBy: {
            scheduledAt: 'asc',
          },
        },
      },
    })

    if (!rental) {
      return NextResponse.json({ error: 'Rental not found' }, { status: 404 })
    }

    return NextResponse.json({ rental })
  } catch (error) {
    console.error('Error fetching rental:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH - Atualizar locação
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
    const validatedData = UpdateRentalSchema.parse(body)

    // Buscar locação atual
    const currentRental = await prisma.rentals.findUnique({
      where: { id: params.id },
    })

    if (!currentRental) {
      return NextResponse.json({ error: 'Rental not found' }, { status: 404 })
    }

    // Preparar dados de atualização
    const updateData: {
      status?: string
      startdate?: Date
      enddate?: Date
      extensionDays?: number
      lateFee?: number
      checkInAt?: Date
      checkOutAt?: Date
      notes?: string
    } = {}
    if (validatedData.status) updateData.status = validatedData.status
    if (validatedData.startDate) updateData.startdate = validatedData.startDate
    if (validatedData.endDate) updateData.enddate = validatedData.endDate
    if (validatedData.extensionDays !== undefined) {
      updateData.extensionDays = validatedData.extensionDays
      // Recalcular endDate se houver prorrogação
      if (currentRental.enddate) {
        const newEndDate = new Date(currentRental.enddate)
        newEndDate.setDate(newEndDate.getDate() + validatedData.extensionDays)
        updateData.enddate = newEndDate
      }
    }
    if (validatedData.lateFee !== undefined) {
      updateData.lateFee = validatedData.lateFee.toNumber()
    }
    if (validatedData.checkInAt) updateData.checkInAt = validatedData.checkInAt
    if (validatedData.checkOutAt)
      updateData.checkOutAt = validatedData.checkOutAt
    if (validatedData.notes !== undefined)
      updateData.notes = validatedData.notes

    // Atualizar locação
    const rental = await prisma.rentals.update({
      where: { id: params.id },
      data: updateData,
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
      },
    })

    return NextResponse.json({ rental })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Error updating rental:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Cancelar locação
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rental = await prisma.rentals.findUnique({
      where: { id: params.id },
    })

    if (!rental) {
      return NextResponse.json({ error: 'Rental not found' }, { status: 404 })
    }

    // Atualizar status para CANCELLED em vez de deletar
    await prisma.rentals.update({
      where: { id: params.id },
      data: { status: 'CANCELLED' },
    })

    return NextResponse.json({ message: 'Rental cancelled successfully' })
  } catch (error) {
    console.error('Error cancelling rental:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

