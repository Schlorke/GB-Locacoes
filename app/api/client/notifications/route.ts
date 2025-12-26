import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Schema para query params
const querySchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(100).optional().default(20),
  type: z
    .enum([
      'QUOTE',
      'ORDER',
      'PAYMENT',
      'EQUIPMENT',
      'SYSTEM',
      'RENTAL',
      'DELIVERY',
      'CONTRACT',
    ])
    .optional(),
  isRead: z.enum(['true', 'false']).optional(),
})

/**
 * GET /api/client/notifications
 * Lista notificações do usuário autenticado
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)

    // Tratar valores null do searchParams
    const pageParam = searchParams.get('page')
    const limitParam = searchParams.get('limit')

    const parsed = querySchema.safeParse({
      page: pageParam ? parseInt(pageParam, 10) : undefined,
      limit: limitParam ? parseInt(limitParam, 10) : undefined,
      type: searchParams.get('type') || undefined,
      isRead: searchParams.get('isRead') || undefined,
    })

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Parâmetros inválidos', details: parsed.error.issues },
        { status: 400 }
      )
    }

    const { page, limit, type, isRead } = parsed.data
    const skip = (page - 1) * limit

    // Construir where clause
    const where: Record<string, unknown> = {
      userId: session.user.id,
    }

    if (type) {
      where.type = type
    }

    if (isRead !== undefined) {
      where.isRead = isRead === 'true'
    }

    // Buscar notificações e contagem total
    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.notification.count({ where }),
    ])

    // Estatísticas
    const [unreadCount, byType] = await Promise.all([
      prisma.notification.count({
        where: { userId: session.user.id, isRead: false },
      }),
      prisma.notification.groupBy({
        by: ['type'],
        where: { userId: session.user.id, isRead: false },
        _count: { type: true },
      }),
    ])

    const stats = {
      total,
      unread: unreadCount,
      byType: byType.reduce(
        (acc, item) => {
          acc[item.type.toLowerCase()] = item._count.type
          return acc
        },
        {} as Record<string, number>
      ),
    }

    return NextResponse.json({
      notifications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats,
    })
  } catch (error) {
    console.error('[GET /api/client/notifications] Erro:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
