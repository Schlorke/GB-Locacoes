import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/client/notifications/stats
 * Retorna estatísticas de notificações do usuário
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const [total, unread, byType, byPriority] = await Promise.all([
      // Total de notificações
      prisma.notification.count({
        where: { userId: session.user.id },
      }),
      // Não lidas
      prisma.notification.count({
        where: { userId: session.user.id, isRead: false },
      }),
      // Por tipo (não lidas)
      prisma.notification.groupBy({
        by: ['type'],
        where: { userId: session.user.id, isRead: false },
        _count: { type: true },
      }),
      // Por prioridade (não lidas)
      prisma.notification.groupBy({
        by: ['priority'],
        where: { userId: session.user.id, isRead: false },
        _count: { priority: true },
      }),
    ])

    return NextResponse.json({
      total,
      unread,
      byType: byType.reduce(
        (acc, item) => {
          acc[item.type.toLowerCase()] = item._count.type
          return acc
        },
        {} as Record<string, number>
      ),
      byPriority: byPriority.reduce(
        (acc, item) => {
          acc[item.priority.toLowerCase()] = item._count.priority
          return acc
        },
        {} as Record<string, number>
      ),
    })
  } catch (error) {
    console.error('[GET /api/client/notifications/stats] Erro:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
