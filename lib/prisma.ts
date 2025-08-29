import { PrismaClient } from '@prisma/client'

declare global {
  var __prisma: PrismaClient | undefined
}

// Configuração simplificada do Prisma Client - conforme Supabase
const prisma = global.__prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.__prisma = prisma
}

// Função de verificação de conexão
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

export { prisma }