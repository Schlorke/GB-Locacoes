import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Estatísticas de notificações do cliente
export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Verificar se o modelo existe
    if (!prisma.notification) {
      console.error(
        'Prisma Client não contém o modelo Notification. Execute: pnpm db:generate'
      )
      return NextResponse.json({
        total: 0,
        unread: 0,
        byType: {},
        byPriority: {},
      })
    }

    // Construir filtro de expiresAt uma vez
    const expiresAtFilter = {
      OR: [{ expiresAt: null }, { expiresAt: { gte: new Date() } }],
    }

    // Buscar estatísticas em paralelo
    const [total, unread, byType, byPriority] = await Promise.all([
      // Total de notificações
      prisma.notification.count({
        where: {
          userId,
          AND: [expiresAtFilter],
        },
      }),

      // Não lidas
      prisma.notification.count({
        where: {
          userId,
          isRead: false,
          AND: [expiresAtFilter],
        },
      }),

      // Por tipo
      prisma.notification.groupBy({
        by: ['type'],
        where: {
          userId,
          isRead: false,
          AND: [expiresAtFilter],
        },
        _count: {
          id: true,
        },
      }),

      // Por prioridade
      prisma.notification.groupBy({
        by: ['priority'],
        where: {
          userId,
          isRead: false,
          AND: [expiresAtFilter],
        },
        _count: {
          id: true,
        },
      }),
    ])

    // Transformar resultados
    const byTypeMap: Record<string, number> = {}
    byType.forEach((item) => {
      byTypeMap[item.type] = item._count.id
    })

    const byPriorityMap: Record<string, number> = {}
    byPriority.forEach((item) => {
      byPriorityMap[item.priority] = item._count.id
    })

    return NextResponse.json({
      total,
      unread,
      byType: byTypeMap,
      byPriority: byPriorityMap,
    })
  } catch (error) {
    console.error('Error fetching notification stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
