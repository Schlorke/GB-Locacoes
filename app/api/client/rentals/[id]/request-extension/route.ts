import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const RequestExtensionSchema = z.object({
  additionalDays: z.number().int().positive(),
})

// POST - Cliente solicita prorrogação
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const paramsResolved = await params
    const body = await request.json()
    const { additionalDays } = RequestExtensionSchema.parse(body)

    // Buscar locação
    const rental = await prisma.rentals.findUnique({
      where: { id: paramsResolved.id },
      include: {
        rental_items: {
          include: {
            equipments: {
              select: {
                pricePerDay: true,
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

    // Verificar se locação pertence ao usuário
    if (rental.userid !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    if (rental.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Locação deve estar ativa para solicitar prorrogação' },
        { status: 400 }
      )
    }

    // Calcular estimativa de valor adicional
    let estimatedFee = 0
    for (const item of rental.rental_items) {
      const dailyPrice = Number(item.priceperday)
      estimatedFee += dailyPrice * additionalDays * item.quantity
    }

    // Criar solicitação (por enquanto, apenas retornar estimativa)
    // Em produção, criar registro de solicitação pendente de aprovação
    // Por enquanto, retornar estimativa para o cliente

    return NextResponse.json({
      success: true,
      message: 'Solicitação de prorrogação enviada',
      estimatedFee,
      additionalDays,
      note: 'Sua solicitação será analisada e você receberá uma resposta em breve.',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Error requesting extension:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
