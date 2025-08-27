import { PrismaClient } from '@prisma/client'

declare global {
  var __prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })

  // Log apenas informações essenciais
  if (process.env.NODE_ENV === 'production') {
    console.log('[Prisma] Client initialized in production mode')
  }

  return client
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Inicialização simples e robusta
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
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
    prismaVersion:
      process.env.npm_package_dependencies__prisma_client || 'unknown',
    nodeVersion: process.version,
    platform: process.platform,
  }
}

// Função para verificar conectividade
export async function checkDatabaseConnection(): Promise<{
  connected: boolean
  error?: string
  details?: {
    code?: string
    type: string
    timestamp: string
  }
}> {
  try {
    await prisma.$connect()
    await prisma.$queryRaw`SELECT 1`
    await prisma.$disconnect()

    return { connected: true }
  } catch (error) {
    return {
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: {
        code:
          error instanceof Error && 'code' in error
            ? String(error.code)
            : undefined,
        type: error?.constructor?.name || 'Unknown',
        timestamp: new Date().toISOString(),
      },
    }
  }
}

// Função para forçar reconexão
export async function reconnectDatabase(): Promise<void> {
  try {
    await prisma.$disconnect()
    await prisma.$connect()
    console.log('Database reconnection successful')
  } catch (error) {
    console.error('Database reconnection failed:', error)
    throw error
  }
}
