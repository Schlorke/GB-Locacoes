import { PrismaClient } from "@prisma/client"

declare global {
  var __prisma: PrismaClient | undefined
}

// SOLUÇÃO DEFINITIVA: Não usar singleton, criar nova instância sempre
export function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DIRECT_URL || process.env.DATABASE_URL,
      },
    },
  })
}

// Export uma instância que funciona no Vercel  
export const prisma = createPrismaClient()

// Função de verificação que sempre cria cliente fresh
export async function checkDatabaseConnection(): Promise<{
  connected: boolean
  error?: string
}> {
  let client: PrismaClient | null = null
  try {
    client = createPrismaClient()
    await client.$queryRaw`SELECT 1`
    return { connected: true }
  } catch (error) {
    return {
      connected: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  } finally {
    if (client) {
      await client.$disconnect()
    }
  }
}
