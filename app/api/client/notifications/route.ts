import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NotificationType, NotificationPriority, Prisma } from '@prisma/client'

// GET - Listar notificações do cliente
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') as NotificationType | null
    const isRead = searchParams.get('isRead')
    const priority = searchParams.get('priority') as NotificationPriority | null
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)

    // Construir query where de forma mais segura
    const whereConditions: Prisma.NotificationWhereInput[] = [
      { userId: session.user.id },
      // Filtrar notificações expiradas (apenas não expiradas)
      {
        OR: [{ expiresAt: null }, { expiresAt: { gte: new Date() } }],
      },
    ]

    // Filtrar por tipo
    if (type) {
      whereConditions.push({ type })
    }

    // Filtrar por status de leitura
    if (isRead !== null) {
      whereConditions.push({ isRead: isRead === 'true' })
    }

    // Filtrar por prioridade
    if (priority) {
      whereConditions.push({ priority })
    }

    // Busca por título ou mensagem
    if (search) {
      whereConditions.push({
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { message: { contains: search, mode: 'insensitive' } },
        ],
      })
    }

    const where =
      whereConditions.length > 1 ? { AND: whereConditions } : whereConditions[0]

    // Verificar se o modelo existe (fallback caso Prisma Client não tenha sido regenerado)
    if (!prisma.notification) {
      console.error(
        'Prisma Client não contém o modelo Notification. Execute: pnpm db:generate'
      )
      return NextResponse.json({
        notifications: [],
        pagination: {
          total: 0,
          limit,
          offset,
          hasMore: false,
        },
      })
    }

    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
        skip: offset,
      }),
      prisma.notification.count({ where }),
    ])

    return NextResponse.json({
      notifications,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json(
      {
        error: errorMessage,
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}
