import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { isEquipmentAvailableForRental } from '@/lib/equipment-availability'

// POST - Check-out (saída do equipamento)
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

    // Buscar locação
    const rental = await prisma.rentals.findUnique({
      where: { id: paramsResolved.id },
      include: {
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

    if (!rental) {
      return NextResponse.json(
        { error: 'Locação não encontrada' },
        { status: 404 }
      )
    }

    if (rental.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Locação deve estar pendente para fazer check-out' },
        { status: 400 }
      )
    }

    // Verificar disponibilidade dos equipamentos
    for (const item of rental.rental_items) {
      const availability = await isEquipmentAvailableForRental(
        item.equipmentid,
        new Date(rental.startdate),
        new Date(rental.enddate),
        item.quantity
      )

      if (!availability.available) {
        return NextResponse.json(
          {
            error: `Equipamento ${item.equipments.name}: ${availability.reason}`,
          },
          { status: 400 }
        )
      }
    }

    // Atualizar locação para ACTIVE e registrar check-out
    const updatedRental = await prisma.rentals.update({
      where: { id: paramsResolved.id },
      data: {
        status: 'ACTIVE',
        checkOutAt: new Date(),
      },
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

    return NextResponse.json({ rental: updatedRental })
  } catch (error) {
    console.error('Error checking out rental:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
