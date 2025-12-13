import { prisma } from '@/lib/prisma'
import Decimal from 'decimal.js'

/**
 * Calcula e aplica multa por atraso em todas as locações vencidas
 * Deve ser executado periodicamente (cron job ou scheduled task)
 */
export async function calculateAndApplyLateFees() {
  try {
    const now = new Date()

    // Buscar locações ativas ou pendentes que estão vencidas
    const overdueRentals = await prisma.rentals.findMany({
      where: {
        status: {
          in: ['ACTIVE', 'PENDING'],
        },
        enddate: {
          lt: now,
        },
      },
      include: {
        rental_items: {
          include: {
            equipments: true,
          },
        },
      },
    })

    const results = []

    for (const rental of overdueRentals) {
      const endDate = new Date(rental.enddate)
      const daysOverdue = Math.ceil(
        (now.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24)
      )

      if (daysOverdue <= 0) continue

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

      // Verificar se já existe pagamento de multa pendente
      const existingLateFeePayment = await prisma.payment.findFirst({
        where: {
          rentalId: rental.id,
          type: 'LATE_FEE',
          status: {
            in: ['PENDING', 'OVERDUE'],
          },
        },
      })

      // Atualizar locação com multa e status
      await prisma.rentals.update({
        where: { id: rental.id },
        data: {
          lateFee: lateFee,
          status: 'OVERDUE',
        },
      })

      // Criar pagamento para a multa se ainda não existir
      if (!existingLateFeePayment && lateFee > 0) {
        await prisma.payment.create({
          data: {
            rentalId: rental.id,
            amount: lateFee,
            method: 'PIX',
            status: 'OVERDUE',
            type: 'LATE_FEE',
            dueDate: now,
          },
        })
      }

      results.push({
        rentalId: rental.id,
        daysOverdue,
        lateFee,
        updated: true,
      })
    }

    return {
      processedCount: results.length,
      results,
    }
  } catch (error) {
    console.error('Error calculating and applying late fees:', error)
    throw error
  }
}

/**
 * Calcula multa por atraso para uma locação específica
 */
export async function calculateLateFeeForRental(rentalId: string) {
  const rental = await prisma.rentals.findUnique({
    where: { id: rentalId },
    include: {
      rental_items: {
        include: {
          equipments: true,
        },
      },
    },
  })

  if (!rental) {
    throw new Error('Rental not found')
  }

  const now = new Date()
  const endDate = new Date(rental.enddate)

  if (now <= endDate) {
    return {
      lateFee: 0,
      daysOverdue: 0,
      message: 'Rental is not overdue',
    }
  }

  const daysOverdue = Math.ceil(
    (now.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  const totalDays = Math.ceil(
    (endDate.getTime() - new Date(rental.startdate).getTime()) /
      (1000 * 60 * 60 * 24)
  )
  const dailyRate = new Decimal(rental.total).div(totalDays || 1)
  const lateFee = dailyRate
    .times(daysOverdue)
    .times(0.05) // 5% por dia de atraso
    .toNumber()

  return {
    lateFee,
    daysOverdue,
    message: 'Late fee calculated successfully',
  }
}
