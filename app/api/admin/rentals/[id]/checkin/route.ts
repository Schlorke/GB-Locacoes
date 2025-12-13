import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import Decimal from 'decimal.js'

const CheckInSchema = z.object({
  damageFee: z.number().optional(), // Multa por danos
  notes: z.string().optional(), // Notas sobre estado do equipamento
})

// POST - Check-in (devolução do equipamento)
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
    const { damageFee, notes } = CheckInSchema.parse(body)

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
        payments: {
          where: {
            status: 'PAID',
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

    if (rental.status === 'COMPLETED') {
      return NextResponse.json(
        { error: 'Locação já foi finalizada' },
        { status: 400 }
      )
    }

    // Calcular multa por atraso se aplicável
    const now = new Date()
    const endDate = new Date(rental.enddate)
    let lateFee: Decimal | null = null

    if (now > endDate) {
      const daysLate = Math.ceil(
        (now.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24)
      )
      // Calcular multa (exemplo: 10% do valor diário por dia de atraso)
      const dailyValue = new Decimal(rental.total.toString()).dividedBy(
        rental.rental_items.reduce((sum, item) => sum + item.totaldays, 0) || 1
      )
      lateFee = dailyValue.times(0.1).times(daysLate) // 10% por dia
    }

    // Atualizar locação em transação
    const result = await prisma.$transaction(async (tx) => {
      // Atualizar locação
      const updatedRental = await tx.rentals.update({
        where: { id: paramsResolved.id },
        data: {
          status: 'COMPLETED',
          checkInAt: now,
          lateFee: lateFee ? lateFee.toNumber() : null,
          notes: notes || rental.notes,
        },
      })

      // Criar pagamento para multa de atraso se houver
      if (lateFee && lateFee.toNumber() > 0) {
        await tx.payment.create({
          data: {
            rentalId: rental.id,
            amount: lateFee,
            method: 'BOLETO', // Pode ser alterado conforme necessário
            status: 'PENDING',
            type: 'LATE_FEE',
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 dias
          },
        })
      }

      // Criar pagamento para multa de danos se houver
      if (damageFee && damageFee > 0) {
        await tx.payment.create({
          data: {
            rentalId: rental.id,
            amount: new Decimal(damageFee),
            method: 'BOLETO',
            status: 'PENDING',
            type: 'DAMAGE',
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 dias
          },
        })
      }

      return updatedRental
    })

    return NextResponse.json({
      rental: result,
      lateFee: lateFee ? lateFee.toNumber() : null,
      damageFee: damageFee || null,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Error checking in rental:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
