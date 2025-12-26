import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const ExtendRentalSchema = z.object({
  extensionDays: z.number().int().positive().max(30), // Máximo 30 dias
})

// POST - Solicitar prorrogação de locação
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const validatedData = ExtendRentalSchema.parse(body)

    // Verificar se a locação pertence ao cliente
    const rental = await prisma.rentals.findFirst({
      where: {
        id,
        userid: session.user.id,
        status: {
          in: ['ACTIVE', 'OVERDUE'], // Só pode prorrogar locações ativas ou atrasadas
        },
      },
    })

    if (!rental) {
      return NextResponse.json(
        { error: 'Rental not found or cannot be extended' },
        { status: 404 }
      )
    }

    // Calcular nova data de término
    const currentEndDate = new Date(rental.enddate)
    const newEndDate = new Date(currentEndDate)
    newEndDate.setDate(newEndDate.getDate() + validatedData.extensionDays)

    // Calcular taxa de prorrogação (exemplo: 10% do valor diário por dia adicional)
    // Em produção, isso deve vir de configurações
    const dailyRate =
      Number(rental.total) /
      Math.ceil(
        (new Date(rental.enddate).getTime() -
          new Date(rental.startdate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    const extensionFee = dailyRate * validatedData.extensionDays * 0.1 // 10% do valor diário

    // Atualizar locação
    const updatedRental = await prisma.rentals.update({
      where: { id },
      data: {
        enddate: newEndDate,
        extensionDays: validatedData.extensionDays,
        extensionFee: extensionFee,
      },
    })

    // Criar pagamento para a prorrogação
    await prisma.payment.create({
      data: {
        rentalId: id,
        amount: extensionFee,
        method: 'PIX',
        status: 'PENDING',
        type: 'LATE_FEE',
        dueDate: new Date(), // Vencimento imediato
      },
    })

    return NextResponse.json({
      rental: updatedRental,
      extensionFee,
      message: 'Prorrogação solicitada com sucesso',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Error extending rental:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
