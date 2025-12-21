import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not set')
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
})

async function main() {
  console.log('🗑️  Removendo registros de manutenção...')

  try {
    // Contar registros antes
    const countBefore = await prisma.maintenance.count()
    console.log(`📊 Registros encontrados: ${countBefore}`)

    if (countBefore === 0) {
      console.log('✅ Nenhum registro de manutenção encontrado. Nada a fazer.')
      return
    }

    // Remover todos os registros de manutenção
    const result = await prisma.maintenance.deleteMany({})

    console.log(
      `✅ ${result.count} registro(s) de manutenção removido(s) com sucesso!`
    )
    console.log(
      '💡 A verificação de manutenção foi desabilitada temporariamente no código.'
    )
  } catch (error) {
    console.error('❌ Erro ao remover registros de manutenção:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
