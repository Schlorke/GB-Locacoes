import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create a lazy-loaded Prisma client to avoid initialization during build
let _prisma: PrismaClient | undefined

function createPrismaClient() {
  if (!_prisma) {
    _prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DIRECT_URL || process.env.DATABASE_URL,
        },
      },
    })
  }
  return _prisma
}

export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    // Skip initialization during build phase
    if (process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === undefined) {
      return target[prop as keyof PrismaClient]
    }
    
    const client = globalForPrisma.prisma ?? createPrismaClient()
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = client
    }
    return client[prop as keyof PrismaClient]
  },
})

// Função de verificação simples para compatibilidade
export async function checkDatabaseConnection(): Promise<{
  connected: boolean
  error?: string
}> {
  try {
    await prisma.$queryRaw`SELECT 1`
    return { connected: true }
  } catch (error) {
    return {
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
