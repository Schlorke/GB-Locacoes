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
  })
}

// Prevent multiple instances in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let _prisma: PrismaClient | undefined

function getPrismaClient(): PrismaClient {
  if (_prisma) return _prisma
  
  if (globalForPrisma.prisma) {
    _prisma = globalForPrisma.prisma
    return _prisma
  }
  
  _prisma = prismaClientSingleton()
  
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = _prisma
  }
  
  return _prisma
}

// Use getter para lazy initialization
export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    const client = getPrismaClient()
    return (client as Record<string, unknown>)[prop]
  }
})
