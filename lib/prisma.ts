// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

declare global {
  // evita recriar em hot-reload
  var __prisma__: PrismaClient | undefined
}

export const prisma =
  global.__prisma__ ??
  new PrismaClient({
    // Se quiser logs, declare tipado:
    // log: [{ level: 'error', emit: 'stdout' }, { level: 'warn', emit: 'stdout' }],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })

if (process.env.NODE_ENV !== 'production') global.__prisma__ = prisma

// Função para verificar conexão com banco de dados com timeout
export async function checkDatabaseConnection(): Promise<{
  connected: boolean
  error?: string
  details?: { code: string; type: string }
}> {
  try {
    // Implementar timeout manual para evitar hang
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Database connection timeout')), 10000)
    })

    const queryPromise = prisma.$queryRaw`SELECT 1`

    await Promise.race([queryPromise, timeoutPromise])
    return { connected: true }
  } catch (error: unknown) {
    console.error('[Prisma] Database connection failed:', error)
    const errorObj = error as Error & { code?: string }
    return {
      connected: false,
      error: errorObj?.message || 'Unknown database error',
      details: {
        code: errorObj?.code || 'UNKNOWN',
        type: errorObj?.name || 'Unknown',
      },
    }
  }
}

// Função para diagnóstico de problemas de deployment
export function diagnosticInfo(): {
  environment: string
  databaseUrl: boolean
  prismaVersion: string
  nodeVersion: string
  platform: string
} {
  return {
    environment: process.env.NODE_ENV || 'unknown',
    databaseUrl: !!process.env.DATABASE_URL,
    prismaVersion: '6.13.0',
    nodeVersion: process.version,
    platform: process.platform,
  }
}

// Export principal
export default prisma

// Alias para compatibilidade
export const getPrisma = () => prisma
