import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not set')
}

const adapter = new PrismaPg({ connectionString })

export function createPrismaClient(options = {}) {
  return new PrismaClient({ adapter, ...options })
}

export const prisma = createPrismaClient()
