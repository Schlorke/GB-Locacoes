import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth/next';
import { NextRequest } from 'next/server';

export async function requireAdmin(_request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { error: 'Não autenticado', status: 401 };
  }

  if (session.user.role !== 'ADMIN') {
    return { error: 'Acesso negado', status: 403 };
  }

  return { success: true, user: session.user };
}
