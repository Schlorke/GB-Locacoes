// scripts/test-db-connection.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`
    console.log('✅ Conexão com banco bem-sucedida:', result)
    process.exit(0)
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
