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

async function cleanQuotes() {
  console.log('🧹 Iniciando limpeza de orçamentos...\n')

  try {
    // Contar orçamentos antes da limpeza
    const countBefore = await prisma.quote.count()
    console.log(`📊 Total de orçamentos encontrados: ${countBefore}`)

    if (countBefore === 0) {
      console.log('✅ Nenhum orçamento encontrado. Nada a fazer.')
      return
    }

    // Contar itens de orçamento
    const itemsCount = await prisma.quoteItem.count()
    console.log(`📦 Total de itens de orçamento: ${itemsCount}`)

    // Deletar todos os orçamentos
    // QuoteItem será deletado automaticamente devido ao onDelete: Cascade
    const result = await prisma.quote.deleteMany({})

    console.log(`\n✅ Limpeza concluída!`)
    console.log(`   - ${result.count} orçamento(s) deletado(s)`)
    console.log(
      `   - ${itemsCount} item(ns) de orçamento deletado(s) automaticamente`
    )

    // Verificar se há pagamentos órfãos (sem quoteId)
    const orphanPayments = await prisma.payment.count({
      where: {
        quoteId: null,
      },
    })

    if (orphanPayments > 0) {
      console.log(
        `\n⚠️  Atenção: ${orphanPayments} pagamento(s) sem orçamento vinculado`
      )
    }

    // Verificar se há rentals vinculados a orçamentos deletados
    const rentalsWithDeletedQuotes = await prisma.rentals.count({
      where: {
        quoteId: {
          not: null,
        },
      },
    })

    if (rentalsWithDeletedQuotes > 0) {
      console.log(
        `\n⚠️  Atenção: ${rentalsWithDeletedQuotes} locação(ões) ainda referenciam orçamentos (quoteId mantido)`
      )
    }

    console.log('\n✨ Banco de dados limpo e pronto para testes!')
  } catch (error) {
    console.error('❌ Erro ao limpar orçamentos:', error)
    throw error
  }
}

cleanQuotes()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
