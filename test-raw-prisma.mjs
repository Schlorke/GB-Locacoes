// Teste com PrismaClient sem configurações
import { PrismaClient } from '@prisma/client'

console.log('🔍 Testing RAW PrismaClient...')

// Criar client SEM configurações extras
const prisma = new PrismaClient()

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
  console.log('Full error:', error)
} finally {
  await prisma.$disconnect()
}
