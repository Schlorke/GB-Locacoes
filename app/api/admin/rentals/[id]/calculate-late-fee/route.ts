import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Decimal from 'decimal.js'

// POST - Calcular multa por atraso automaticamente
export async function POST(
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
        rental_items: {
          include: {
            equipments: true,
          },
        },
      },
    })

    if (!rental) {
      return NextResponse.json({ error: 'Rental not found' }, { status: 404 })
    }

    const now = new Date()
    const endDate = new Date(rental.enddate)

    // Só calcula multa se a locação estiver atrasada
    if (now <= endDate) {
      return NextResponse.json({
        lateFee: 0,
        daysOverdue: 0,
        message: 'Rental is not overdue',
      })
    }

    // Calcular dias de atraso
    const daysOverdue = Math.ceil(
      (now.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    // Calcular multa: 5% do valor diário por dia de atraso
    const totalDays = Math.ceil(
      (endDate.getTime() - new Date(rental.startdate).getTime()) /
        (1000 * 60 * 60 * 24)
    )
    const dailyRate = new Decimal(rental.total).div(totalDays || 1)
    const lateFee = dailyRate
      .times(daysOverdue)
      .times(0.05) // 5% por dia de atraso
      .toNumber()

    // Atualizar locação com multa e status
    const updatedRental = await prisma.rentals.update({
      where: { id: params.id },
      data: {
        lateFee: lateFee,
        status: 'OVERDUE',
      },
    })

    // Criar pagamento para a multa se ainda não existir
    const existingLateFeePayment = await prisma.payment.findFirst({
      where: {
        rentalId: params.id,
        type: 'LATE_FEE',
        status: {
          in: ['PENDING', 'OVERDUE'],
        },
      },
    })

    if (!existingLateFeePayment && lateFee > 0) {
      await prisma.payment.create({
        data: {
          rentalId: params.id,
          amount: lateFee,
          method: 'PIX',
          status: 'OVERDUE',
          type: 'LATE_FEE',
          dueDate: now,
        },
      })
    }

    return NextResponse.json({
      rental: updatedRental,
      lateFee,
      daysOverdue,
      message: 'Late fee calculated and applied successfully',
    })
  } catch (error) {
    console.error('Error calculating late fee:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
