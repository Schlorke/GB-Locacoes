// Teste com PrismaClient usando adapter pg
import { prisma } from './scripts/prisma-client.js'

console.log('🧪 Testing PrismaClient with adapter...')
console.log('DATABASE_URL:', process.env.DATABASE_URL)

try {
  // Tentar conexão simples
  await prisma.$connect()
  console.log('✅ $connect() worked!')

  const result = await prisma.$queryRaw`SELECT 1 as test`
  console.log('✅ Query worked:', result)
} catch (error) {
  console.log('❌ Error:', error.message)
  console.log('Error code:', error.code)
} finally {
  await prisma.$disconnect()
}
