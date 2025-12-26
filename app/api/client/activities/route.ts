import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export interface Activity {
  id: string
  type:
    | 'quote_created'
    | 'quote_approved'
    | 'quote_rejected'
    | 'rental_created'
    | 'rental_completed'
    | 'payment_made'
    | 'rental_updated'
  title: string
  description: string
  timestamp: Date
  link?: string
  metadata?: {
    amount?: number
    status?: string
    itemCount?: number
  }
}

// GET - Obter atividades recentes do cliente
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10', 10)

    const userId = session.user.id
    const activities: Activity[] = []

    // Executar todas as queries em paralelo para melhor performance
    const [quotes, rentals, payments] = await Promise.all([
      // Buscar orçamentos recentes
      prisma.quote.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit * 2, // Buscar mais para ter variedade
        include: {
          items: {
            include: {
              equipment: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      }),
      // Buscar locações recentes
      prisma.rentals.findMany({
        where: {
          userid: userId,
        },
        orderBy: {
          createdat: 'desc',
        },
        take: limit * 2,
        include: {
          rental_items: {
            include: {
              equipments: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      }),
      // Buscar pagamentos recentes
      prisma.payment.findMany({
        where: {
          rental: {
            userid: userId,
          },
          status: 'PAID',
        },
        orderBy: {
          paidAt: 'desc',
        },
        take: limit,
        include: {
          rental: {
            select: {
              id: true,
            },
          },
        },
      }),
    ])

    // Adicionar atividades de orçamentos
    for (const quote of quotes) {
      // Orçamento criado
      activities.push({
        id: `quote-created-${quote.id}`,
        type: 'quote_created',
        title: 'Orçamento criado',
        description: `Orçamento #${quote.id.slice(-8).toUpperCase()} com ${quote.items.length} item(ns)`,
        timestamp: quote.createdAt,
        link: `/area-cliente/orcamentos`,
        metadata: {
          amount: Number(quote.total),
          itemCount: quote.items.length,
        },
      })

      // Orçamento aprovado
      if (quote.approvedAt) {
        activities.push({
          id: `quote-approved-${quote.id}`,
          type: 'quote_approved',
          title: 'Orçamento aprovado',
          description: `Orçamento #${quote.id.slice(-8).toUpperCase()} foi aprovado`,
          timestamp: quote.approvedAt,
          link: `/area-cliente/orcamentos`,
          metadata: {
            amount: Number(quote.finalTotal || quote.total),
          },
        })
      }

      // Orçamento rejeitado
      if (quote.rejectedAt) {
        activities.push({
          id: `quote-rejected-${quote.id}`,
          type: 'quote_rejected',
          title: 'Orçamento rejeitado',
          description: `Orçamento #${quote.id.slice(-8).toUpperCase()} foi rejeitado`,
          timestamp: quote.rejectedAt,
          link: `/area-cliente/orcamentos`,
          metadata: {
            amount: Number(quote.total),
          },
        })
      }
    }

    // Adicionar atividades de locações
    for (const rental of rentals) {
      // Locação criada
      activities.push({
        id: `rental-created-${rental.id}`,
        type: 'rental_created',
        title: 'Locação iniciada',
        description: `Locação #${rental.id.slice(-8).toUpperCase()} com ${rental.rental_items.length} equipamento(s)`,
        timestamp: rental.createdat || new Date(),
        link: `/area-cliente/historico/${rental.id}`,
        metadata: {
          amount: Number(rental.total),
          status: rental.status || 'PENDING',
          itemCount: rental.rental_items.length,
        },
      })

      // Locação concluída
      if (rental.status === 'COMPLETED' && rental.updatedat) {
        activities.push({
          id: `rental-completed-${rental.id}`,
          type: 'rental_completed',
          title: 'Locação concluída',
          description: `Locação #${rental.id.slice(-8).toUpperCase()} foi finalizada`,
          timestamp: rental.updatedat,
          link: `/area-cliente/historico/${rental.id}`,
          metadata: {
            amount: Number(rental.total),
          },
        })
      }

      // Atualizações de status (exceto criação e conclusão)
      if (
        rental.updatedat &&
        rental.status &&
        rental.status !== 'COMPLETED' &&
        rental.createdat &&
        rental.updatedat.getTime() !== rental.createdat.getTime()
      ) {
        activities.push({
          id: `rental-updated-${rental.id}-${rental.updatedat.getTime()}`,
          type: 'rental_updated',
          title: 'Locação atualizada',
          description: `Status da locação #${rental.id.slice(-8).toUpperCase()} alterado para ${rental.status}`,
          timestamp: rental.updatedat,
          link: `/area-cliente/historico/${rental.id}`,
          metadata: {
            status: rental.status,
          },
        })
      }
    }

    // Adicionar atividades de pagamentos
    for (const payment of payments) {
      if (payment.paidAt) {
        activities.push({
          id: `payment-${payment.id}`,
          type: 'payment_made',
          title: 'Pagamento realizado',
          description: `Pagamento de ${new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(payment.amount))} via ${payment.method}`,
          timestamp: payment.paidAt,
          link: payment.rentalId
            ? `/area-cliente/historico/${payment.rentalId}`
            : undefined,
          metadata: {
            amount: Number(payment.amount),
            status: payment.status,
          },
        })
      }
    }

    // Ordenar por timestamp (mais recente primeiro) e limitar
    const sortedActivities = activities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit)

    return NextResponse.json({ activities: sortedActivities })
  } catch (error) {
    console.error('Error fetching client activities:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
