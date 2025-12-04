const { PrismaPg } = require('@prisma/adapter-pg')
const { PrismaClient } = require('@prisma/client')

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not set')
}

const adapter = new PrismaPg({ connectionString })

const createPrismaClient = (options = {}) =>
  new PrismaClient({ adapter, ...options })

const prisma = createPrismaClient()

module.exports = { prisma, createPrismaClient }
