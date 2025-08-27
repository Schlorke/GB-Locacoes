import { PrismaClient } from '@prisma/client'

declare global {
  var __prisma: PrismaClient | undefined
}

let prismaInstance: PrismaClient | undefined

// Configuração específica para Vercel
const prismaConfig = {
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
} as const

const createPrismaClient = (): PrismaClient => {
  console.log('[Prisma] Creating new client instance')

  // Verificar se DATABASE_URL existe
  if (!process.env.DATABASE_URL) {
    console.error('[Prisma] DATABASE_URL not found in environment variables')
    console.error(
      '[Prisma] Available env vars:',
      Object.keys(process.env).filter((k) => k.includes('DATABASE'))
    )
    throw new Error('DATABASE_URL environment variable is required')
  }

  console.log('[Prisma] DATABASE_URL found, creating client...')

  try {
    const client = new PrismaClient(prismaConfig)
    console.log('[Prisma] Client created successfully')
    return client
  } catch (error) {
    console.error('[Prisma] Failed to create client:', error)
    throw error
  }
}

// Singleton pattern com Proxy para inicialização lazy
const prismaClientProxy = new Proxy({} as PrismaClient, {
  get(target, prop) {
    if (!prismaInstance) {
      console.log('[Prisma] Lazy initializing client...')
      prismaInstance = createPrismaClient()
    }
    
    const value = prismaInstance[prop as keyof PrismaClient]
    
    if (typeof value === 'function') {
      return value.bind(prismaInstance)
    }
    
    return value
  }
})

// Export principal
export const prisma = prismaClientProxy

// Função alternativa para casos específicos
export const getPrisma = (): PrismaClient => {
  if (!prismaInstance) {
    prismaInstance = createPrismaClient()
  }
  return prismaInstance
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
    prismaVersion: '6.15.0',
    nodeVersion: process.version,
    platform: process.platform,
  }
}