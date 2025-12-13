import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import type { NextRequest } from 'next/server'
import type { Prisma } from '@prisma/client'

export type AuditAction =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'APPROVE'
  | 'REJECT'
  | 'CANCEL'
  | 'VIEW'
  | 'EXPORT'
  | 'LOGIN'
  | 'LOGOUT'

export type AuditEntity =
  | 'EQUIPMENT'
  | 'QUOTE'
  | 'RENTAL'
  | 'PAYMENT'
  | 'MAINTENANCE'
  | 'DELIVERY'
  | 'CONTRACT'
  | 'USER'
  | 'SETTINGS'
  | 'PERMISSION'

/**
 * Cria um log de auditoria automaticamente
 */
export async function createAuditLog({
  userId,
  action,
  entity,
  entityId,
  changes,
  ipAddress,
  userAgent,
  request,
}: {
  userId?: string
  action: AuditAction
  entity: AuditEntity
  entityId?: string
  changes?: Record<string, unknown>
  ipAddress?: string
  userAgent?: string
  request?: NextRequest
}): Promise<void> {
  try {
    // Se não tiver userId, tentar obter da sessão
    if (!userId && request) {
      const session = await getServerSession(authOptions)
      userId = session?.user?.id
    }

    // Obter IP e User-Agent do request se disponível
    if (request) {
      ipAddress =
        request.headers.get('x-forwarded-for')?.split(',')[0] ||
        request.headers.get('x-real-ip') ||
        'unknown'
      userAgent = request.headers.get('user-agent') || undefined
    }

    await prisma.auditLog.create({
      data: {
        userId: userId ?? null,
        action,
        entity,
        entityId: entityId ?? '',
        changes: changes ? (changes as Prisma.InputJsonValue) : undefined,
        ipAddress: ipAddress ?? null,
        userAgent: userAgent ?? null,
      },
    })
  } catch (error) {
    // Não falhar a operação principal se o log falhar
    console.error('Error creating audit log:', error)
  }
}

/**
 * Middleware helper para criar logs automaticamente
 */
export function withAuditLog(
  action: AuditAction,
  entity: AuditEntity,
  getEntityId?: (_request: NextRequest) => Promise<string | undefined>
) {
  return async (_request: NextRequest, handler: () => Promise<Response>) => {
    const response = await handler()

    // Criar log apenas se a operação foi bem-sucedida
    if (response.status >= 200 && response.status < 300) {
      const entityId = getEntityId ? await getEntityId(_request) : undefined
      await createAuditLog({
        action,
        entity,
        entityId,
        request: _request,
      })
    }

    return response
  }
}
