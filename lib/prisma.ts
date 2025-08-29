import { PrismaClient } from '@prisma/client'

declare global {
  var __prisma: PrismaClient | undefined
}

// Lazy initialization - só cria quando chamado
let prisma: PrismaClient

function getPrismaInstance(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DIRECT_URL || process.env.DATABASE_URL,
        },
      },
    })
  }
  return prisma
}

// Export lazy getter
export const prisma = getPrismaInstance()

// Função de verificação
export async function checkDatabaseConnection(): Promise<{
  connected: boolean
  error?: string
}> {
  try {
    const client = getPrismaInstance()
    await client.$queryRaw`SELECT 1`
    return { connected: true }
  } catch (error) {
    return {
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}