import { PrismaClient } from '@prisma/client'

declare global {
  var __prisma: PrismaClient | undefined
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Detect if we're in build phase (static generation)
const isBuildTime = process.env.NODE_ENV === 'production' && 
  (typeof window === 'undefined' && !process.env.VERCEL_ENV && !process.env.RAILWAY_ENVIRONMENT)

// Simple singleton pattern - no Proxy complexity
export const prisma = 
  globalForPrisma.prisma ??
  (isBuildTime ? {} as PrismaClient : new PrismaClient({
    datasources: {
      db: {
        url: process.env.DIRECT_URL || process.env.DATABASE_URL,
      },
    },
  }))

if (process.env.NODE_ENV !== 'production' && !isBuildTime) {
  globalForPrisma.prisma = prisma
}

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
