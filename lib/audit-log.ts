import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export interface AuditLogData {
  userId?: string
  action: string
  entity: string
  entityId: string
  changes?: {
    before?: Record<string, unknown>
    after?: Record<string, unknown>
  }
  ipAddress?: string
  userAgent?: string
}

/**
 * Registra uma ação no log de auditoria
 */
export async function logAuditAction(data: AuditLogData): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: data.userId,
        action: data.action,
        entity: data.entity,
        entityId: data.entityId,
        changes: data.changes as Prisma.InputJsonValue | undefined,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      },
    })
  } catch (error) {
    // Não falhar a operação principal se o log falhar
    console.error('Error logging audit action:', error)
  }
}

/**
 * Busca logs de auditoria
 */
export async function getAuditLogs({
  userId,
  entity,
  entityId,
  action,
  startDate,
  endDate,
  limit = 100,
  offset = 0,
}: {
  userId?: string
  entity?: string
  entityId?: string
  action?: string
  startDate?: Date
  endDate?: Date
  limit?: number
  offset?: number
}) {
  const where: {
    userId?: string
    entity?: string
    entityId?: string
    action?: string
    createdAt?: { gte?: Date; lte?: Date }
  } = {}

  if (userId) where.userId = userId
  if (entity) where.entity = entity
  if (entityId) where.entityId = entityId
  if (action) where.action = action
  if (startDate || endDate) {
    where.createdAt = {}
    if (startDate) where.createdAt.gte = startDate
    if (endDate) where.createdAt.lte = endDate
  }

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    }),
    prisma.auditLog.count({ where }),
  ])

  return { logs, total }
}

