#!/usr/bin/env node

/**
 * Script para Monitorar Uso de Índices
 *
 * Este script verifica o uso dos índices criados para foreign keys
 * e recomenda quais podem ser removidos após período de observação
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Cores para output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

async function monitorIndexUsage() {
  try {
    log('📊 MONITORANDO USO DE ÍNDICES', 'bright')
    log('===============================', 'bright')
    log(
      'Verificando estatísticas de uso dos índices criados para foreign keys\n',
      'cyan'
    )

    const indexesToMonitor = [
      'idx_accounts_userid',
      'idx_addresses_userid',
      'idx_cart_items_equipmentid',
      'idx_cart_items_cartid',
      'idx_equipments_categoryid',
      'idx_quote_items_equipmentid',
      'idx_quote_items_quoteid',
      'idx_quotes_userid',
      'idx_rental_items_equipmentid',
      'idx_rental_items_rentalid',
      'idx_rentals_userid',
      'idx_sessions_userid',
    ]

    log('🔍 Verificando estatísticas de uso...', 'cyan')

    for (let i = 0; i < indexesToMonitor.length; i++) {
      const indexName = indexesToMonitor[i]

      try {
        // Verificar estatísticas de uso do índice
        const usageStats = await prisma.$queryRaw`
          SELECT 
            schemaname,
            tablename,
            indexname,
            idx_tup_read,
            idx_tup_fetch
          FROM pg_stat_user_indexes 
          WHERE indexname = ${indexName}
        `

        if (usageStats.length > 0) {
          const stats = usageStats[0]
          const reads = parseInt(stats.idx_tup_read) || 0
          const fetches = parseInt(stats.idx_tup_fetch) || 0

          if (reads > 0 || fetches > 0) {
            log(
              `   ✅ ${indexName}: ${reads} reads, ${fetches} fetches`,
              'green'
            )
          } else {
            log(`   ⚠️  ${indexName}: Nenhum uso detectado ainda`, 'yellow')
          }
        } else {
          log(`   ❓ ${indexName}: Estatísticas não disponíveis`, 'blue')
        }
      } catch (error) {
        log(`   ❌ ${indexName}: Erro ao verificar - ${error.message}`, 'red')
      }
    }

    log('\n📋 RECOMENDAÇÕES:', 'bright')
    log('==================', 'bright')
    log('', 'reset')
    log('🎯 ESTRATÉGIA RECOMENDADA:', 'cyan')
    log('', 'reset')
    log('1. ✅ MANTER todos os índices criados', 'green')
    log('   - São necessários para performance das foreign keys', 'green')
    log('   - Melhoram JOINs entre tabelas relacionadas', 'green')
    log('   - Seguem boas práticas de banco de dados', 'green')
    log('', 'reset')
    log('2. ⏰ AGUARDAR uso natural (30-60 dias)', 'yellow')
    log('   - Índices foram criados recentemente', 'yellow')
    log('   - Sistema precisa de tempo para utilizá-los', 'yellow')
    log('   - Mais dados = mais uso dos índices', 'yellow')
    log('', 'reset')
    log('3. 📊 MONITORAR periodicamente', 'blue')
    log('   - Execute este script semanalmente', 'blue')
    log('   - Verifique estatísticas de uso', 'blue')
    log('   - Remova apenas índices realmente não utilizados', 'blue')
    log('', 'reset')
    log('4. 🚫 NÃO remover índices de foreign keys', 'red')
    log('   - São críticos para integridade referencial', 'red')
    log('   - Melhoram performance de consultas relacionais', 'red')
    log('   - Warnings de "unused" são temporários', 'red')

    log('\n💡 COMANDO PARA MONITORAMENTO:', 'bright')
    log('node scripts/monitor-index-usage.js', 'cyan')
  } catch (error) {
    log('❌ Erro durante monitoramento:', 'red')
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

monitorIndexUsage()
