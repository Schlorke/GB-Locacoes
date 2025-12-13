import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST - Cliente solicita coleta
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

    // Buscar locação
    const rental = await prisma.rentals.findUnique({
      where: { id: paramsResolved.id },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
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
        { error: 'Locação deve estar ativa para solicitar coleta' },
        { status: 400 }
      )
    }

    // Criar solicitação de coleta (por enquanto, apenas retornar sucesso)
    // Em produção, criar registro de Delivery com status SCHEDULED
    // Por enquanto, apenas retornar confirmação

    return NextResponse.json({
      success: true,
      message: 'Solicitação de coleta enviada',
      note: 'Nossa equipe entrará em contato para agendar a coleta do equipamento.',
    })
  } catch (error) {
    console.error('Error requesting pickup:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
