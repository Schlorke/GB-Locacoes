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

// Use globalThis directly to avoid initialization issues during build
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create a lazy initialization function
let _prisma: PrismaClient | null = null

export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    if (!_prisma) {
      _prisma = globalForPrisma.prisma ?? prismaClientSingleton()
      if (process.env.NODE_ENV !== 'production') {
        globalForPrisma.prisma = _prisma
      }
    }
    return _prisma[prop as keyof PrismaClient]
  },
})
