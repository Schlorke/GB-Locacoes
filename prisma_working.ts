import { PrismaClient } from '@prisma/client'

declare global {
  var __prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
    // Configurações robustas para produção
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })
}

// Use globalThis directly to avoid initialization issues during build
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create a lazy initialization function
let _prisma: PrismaClient | null = null

export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    if (!_prisma) {
      try {
        _prisma = globalForPrisma.prisma ?? prismaClientSingleton()

        // Configurar handlers de erro para produção
        if (process.env.NODE_ENV === 'production') {
          // Logging básico para produção sem handlers de evento complexos
          console.log('Prisma client initialized in production mode')
        }

        if (process.env.NODE_ENV !== 'production') {
          globalForPrisma.prisma = _prisma
        }
      } catch (error) {
        console.error('Failed to initialize Prisma client:', error)
        throw new Error(
          `Prisma initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        )
      }
    }
    return _prisma[prop as keyof PrismaClient]
  },
})

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
    const client = prisma
    await client.$connect()
    await client.$queryRaw`SELECT 1`
    await client.$disconnect()

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
    if (_prisma) {
      await _prisma.$disconnect()
      _prisma = null
    }

    // Forçar nova inicialização
    await prisma.$connect()
    console.log('Database reconnection successful')
  } catch (error) {
    console.error('Database reconnection failed:', error)
    throw error
  }
}
