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

/**
 * Script para cancelar locações relacionadas a orçamentos rejeitados
 *
 * Este script encontra todas as locações que estão vinculadas a orçamentos
 * com status REJECTED e as cancela (muda status para CANCELLED).
 *
 * Isso corrige o problema onde locações placeholder criadas durante a criação
 * do orçamento não eram canceladas quando o orçamento era rejeitado.
 */
async function cleanRejectedQuoteRentals() {
  console.log('🧹 Iniciando limpeza de locações de orçamentos rejeitados...\n')

  try {
    // Buscar todos os orçamentos rejeitados
    const rejectedQuotes = await prisma.quote.findMany({
      where: {
        status: 'REJECTED',
      },
      select: {
        id: true,
        name: true,
        email: true,
        rejectedAt: true,
      },
    })

    console.log(
      `📊 Total de orçamentos rejeitados encontrados: ${rejectedQuotes.length}\n`
    )

    let totalRentalsCancelled = 0
    let totalRentalsAlreadyCancelled = 0
    let totalRentalsNotFound = 0
    let totalOrphanRentalsCancelled = 0
    let totalDanglingRentalsCancelled = 0

    // Para cada orçamento rejeitado, buscar e cancelar locações relacionadas
    for (const quote of rejectedQuotes) {
      const relatedRentals = await prisma.rentals.findMany({
        where: {
          quoteId: quote.id,
          status: {
            not: 'CANCELLED', // Apenas processar se ainda não estiver cancelada
          },
        },
        select: {
          id: true,
          status: true,
          createdat: true,
        },
      })

      if (relatedRentals.length === 0) {
        totalRentalsNotFound++
        continue
      }

      // Cancelar cada locação encontrada
      for (const rental of relatedRentals) {
        if (rental.status === 'CANCELLED') {
          totalRentalsAlreadyCancelled++
          continue
        }

        await prisma.rentals.update({
          where: { id: rental.id },
          data: { status: 'CANCELLED' },
        })

        totalRentalsCancelled++
        console.log(
          `  ✅ Locação ${rental.id} cancelada (orçamento: ${quote.id}, cliente: ${quote.name})`
        )
      }
    }

    // Cancelar locações órfãs (sem quoteId) que ficaram pendentes no banco
    const orphanRentals = await prisma.rentals.findMany({
      where: {
        quoteId: null,
        status: {
          not: 'CANCELLED',
        },
      },
      select: {
        id: true,
        status: true,
        createdat: true,
      },
    })

    if (orphanRentals.length > 0) {
      console.log('\n🧹 Locações órfãs encontradas (sem quoteId):')
      for (const rental of orphanRentals) {
        await prisma.rentals.update({
          where: { id: rental.id },
          data: { status: 'CANCELLED', updatedat: new Date() },
        })
        totalOrphanRentalsCancelled++
        console.log(
          `  ✅ Locação ${rental.id} cancelada (órfã, criada em: ${rental.createdat?.toISOString()})`
        )
      }
    }

    // Cancelar locações que referenciam orçamentos inexistentes (dangling)
    const danglingRentals = await prisma.rentals.findMany({
      where: {
        quoteId: {
          not: null,
        },
        quote: {
          is: null,
        },
        status: {
          not: 'CANCELLED',
        },
      },
      select: {
        id: true,
        quoteId: true,
        status: true,
      },
    })

    if (danglingRentals.length > 0) {
      console.log(
        '\n🧹 Locações com quoteId sem orçamento encontrado (dangling):'
      )
      for (const rental of danglingRentals) {
        await prisma.rentals.update({
          where: { id: rental.id },
          data: { status: 'CANCELLED', updatedat: new Date() },
        })
        totalDanglingRentalsCancelled++
        console.log(
          `  ✅ Locação ${rental.id} cancelada (quoteId inexistente: ${rental.quoteId})`
        )
      }
    }

    console.log('\n📊 Resumo da limpeza:')
    console.log(
      `   - Orçamentos rejeitados processados: ${rejectedQuotes.length}`
    )
    console.log(`   - Locações canceladas: ${totalRentalsCancelled}`)
    console.log(`   - Locações já canceladas: ${totalRentalsAlreadyCancelled}`)
    console.log(`   - Orçamentos sem locações: ${totalRentalsNotFound}`)
    console.log(
      `   - Locações órfãs canceladas: ${totalOrphanRentalsCancelled}`
    )
    console.log(
      `   - Locações com quoteId sem orçamento canceladas: ${totalDanglingRentalsCancelled}`
    )

    if (
      totalRentalsCancelled > 0 ||
      totalOrphanRentalsCancelled > 0 ||
      totalDanglingRentalsCancelled > 0
    ) {
      const totalCleaned =
        totalRentalsCancelled +
        totalOrphanRentalsCancelled +
        totalDanglingRentalsCancelled
      console.log(
        `\n✅ Limpeza concluída! ${totalCleaned} locação(ões) cancelada(s) com sucesso.`
      )
    } else {
      console.log(
        '\n✅ Nenhuma locação precisou ser cancelada. Tudo está correto!'
      )
    }
  } catch (error) {
    console.error('❌ Erro durante a limpeza:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Executar o script
cleanRejectedQuoteRentals()
  .then(() => {
    console.log('\n✨ Script executado com sucesso!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Erro fatal:', error)
    process.exit(1)
  })
