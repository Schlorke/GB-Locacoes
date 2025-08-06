import type { Role } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth'

export async function requireAdminAuth() {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('Não autenticado')
  }

  const userRole = session.user?.role as Role
  if (!['ADMIN', 'OPERATOR', 'FINANCIAL'].includes(userRole)) {
    throw new Error('Acesso negado - privilégios insuficientes')
  }

  return session
}

export function hasAdminRole(role: string): boolean {
  return ['ADMIN', 'OPERATOR', 'FINANCIAL'].includes(role)
}
