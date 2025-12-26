import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Obter detalhes de uma locação específica do cliente
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rental = await prisma.rentals.findFirst({
      where: {
        id: id,
        userid: session.user.id, // Garantir que é do cliente logado
      },
      include: {
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
        contract: {
          select: {
            id: true,
            pdfUrl: true,
            status: true,
            signedAt: true,
            zapSignId: true,
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

// DELETE - Remover locação do histórico do cliente
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verificar se a locação pertence ao cliente logado
    const rental = await prisma.rentals.findFirst({
      where: {
        id: id,
        userid: session.user.id,
      },
    })

    if (!rental) {
      return NextResponse.json(
        { error: 'Rental not found or unauthorized' },
        { status: 404 }
      )
    }

    // Deletar a locação (isso também remove os itens relacionados por cascade)
    await prisma.rentals.delete({
      where: { id: id },
    })

    return NextResponse.json({
      message: 'Locação removida do histórico com sucesso',
    })
  } catch (error) {
    console.error('Error deleting rental:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
