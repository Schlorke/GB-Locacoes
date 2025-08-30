import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'

export async function requireAdmin() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return { error: 'Não autenticado', status: 401 }
  }

  if (session.user.role !== 'ADMIN') {
    return { error: 'Acesso negado', status: 403 }
  }

  return { success: true, user: session.user }
}

// Versão para rotas que permitem ADMIN e OPERATOR
export async function requireAdminOrOperator() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return { error: 'Unauthorized', status: 401 }
  }

  if (!['ADMIN', 'OPERATOR'].includes(session.user.role)) {
    return { error: 'Unauthorized', status: 401 }
  }

  return { success: true, user: session.user }
}
