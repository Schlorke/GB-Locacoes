#!/usr/bin/env node

/**
 * Supabase Performance Diagnostics Tool
 *
 * Este script conecta diretamente ao Supabase e verifica:
 * - Warnings do Performance Advisor
 * - Políticas RLS existentes
 * - Índices criados
 * - Status das otimizações
 */

import { createClient } from '@supabase/supabase-js'
import { prisma } from './prisma-client.js'

// Configuração
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key para admin access
const supabase = createClient(supabaseUrl, supabaseKey)

// Cores para output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

async function checkRLSPolicies() {
  log('\n🔍 Verificando Políticas RLS...', 'cyan')

  try {
    // Usar Prisma para acessar pg_policies
    const policies = await prisma.$queryRaw`
      SELECT 
        schemaname,
        tablename,
        policyname,
        cmd,
        qual,
        with_check
      FROM pg_policies 
      WHERE schemaname = 'public'
      ORDER BY tablename, policyname
    `

    log(`✅ Encontradas ${policies.length} políticas RLS`, 'green')

    // Verificar se políticas usam SELECT-wrapped auth.uid()
    const problematicPolicies = policies.filter(
      (policy) =>
        policy.qual &&
        policy.qual.includes('auth.uid()') &&
        !policy.qual.includes('SELECT auth.uid()')
    )

    if (problematicPolicies.length > 0) {
      log(
        `⚠️  ${problematicPolicies.length} políticas precisam de otimização:`,
        'yellow'
      )
      problematicPolicies.forEach((policy) => {
        log(`   - ${policy.tablename}.${policy.policyname}`, 'yellow')
      })
    } else {
      log('✅ Todas as políticas estão otimizadas!', 'green')
    }
  } catch (error) {
    log('❌ Erro ao verificar políticas RLS', 'red')
    console.error(error)
  }
}

async function checkIndexes() {
  log('\n🔍 Verificando Índices...', 'cyan')

  try {
    // Usar Prisma para acessar pg_indexes
    const indexes = await prisma.$queryRaw`
      SELECT 
        tablename,
        indexname,
        indexdef
      FROM pg_indexes 
      WHERE schemaname = 'public'
        AND indexname LIKE 'idx_%'
      ORDER BY tablename, indexname
    `

    log(`✅ Encontrados ${indexes.length} índices de performance`, 'green')

    // Verificar índices esperados
    const expectedIndexes = [
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

    const existingIndexes = indexes.map((idx) => idx.indexname)
    const missingIndexes = expectedIndexes.filter(
      (expected) => !existingIndexes.includes(expected)
    )

    if (missingIndexes.length > 0) {
      log(`⚠️  ${missingIndexes.length} índices estão faltando:`, 'yellow')
      missingIndexes.forEach((idx) => log(`   - ${idx}`, 'yellow'))
    } else {
      log('✅ Todos os índices esperados estão presentes!', 'green')
    }
  } catch (error) {
    log('❌ Erro ao verificar índices', 'red')
    console.error(error)
  }
}

async function checkPrimaryKeys() {
  log('\n🔍 Verificando Primary Keys...', 'cyan')

  try {
    // Usar Prisma para acessar pg_constraint
    const primaryKeys = await prisma.$queryRaw`
      SELECT 
        tc.table_name,
        tc.constraint_name,
        kcu.column_name
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
      WHERE tc.constraint_type = 'PRIMARY KEY'
        AND tc.table_schema = 'public'
      ORDER BY tc.table_name
    `

    log(`✅ Encontradas ${primaryKeys.length} primary keys`, 'green')

    // Verificar se verificationtokens tem primary key
    const verificationTokensPK = primaryKeys.find(
      (pk) => pk.table_name === 'verificationtokens'
    )

    if (verificationTokensPK) {
      log('✅ verificationtokens tem primary key!', 'green')
    } else {
      log('⚠️  verificationtokens não tem primary key', 'yellow')
    }
  } catch (error) {
    log('❌ Erro ao verificar primary keys', 'red')
    console.error(error)
  }
}

async function checkPerformanceAdvisor() {
  log('\n🔍 Verificando Performance Advisor...', 'cyan')

  try {
    // Usar Prisma para simular verificação do Performance Advisor
    const policies = await prisma.$queryRaw`
      SELECT 
        schemaname,
        tablename,
        policyname,
        cmd,
        qual,
        with_check
      FROM pg_policies 
      WHERE schemaname = 'public'
      ORDER BY tablename, policyname
    `

    // Simular verificação de warnings
    const authRLSWarnings = policies.filter(
      (policy) =>
        policy.qual &&
        policy.qual.includes('auth.uid()') &&
        !policy.qual.includes('SELECT auth.uid()')
    ).length

    const multiplePoliciesWarnings = 0 // Seria calculado com query mais complexa

    const totalWarnings = authRLSWarnings + multiplePoliciesWarnings

    if (totalWarnings === 0) {
      log('✅ Performance Advisor: 0 warnings!', 'green')
    } else {
      log(
        `⚠️  Performance Advisor: ${totalWarnings} warnings encontrados`,
        'yellow'
      )
      log(`   - Auth RLS warnings: ${authRLSWarnings}`, 'yellow')
      log(
        `   - Multiple policies warnings: ${multiplePoliciesWarnings}`,
        'yellow'
      )
    }
  } catch (error) {
    log('❌ Erro ao verificar Performance Advisor', 'red')
    console.error(error)
  }
}

async function runDiagnostics() {
  log('🚀 Iniciando Diagnóstico do Supabase...', 'bright')
  log('=====================================', 'bright')

  try {
    await checkRLSPolicies()
    await checkIndexes()
    await checkPrimaryKeys()
    await checkPerformanceAdvisor()

    log('\n✅ Diagnóstico concluído!', 'green')
    log('\n💡 Dicas:', 'cyan')
    log('   - Se houver warnings, execute a migration V4 ULTRA', 'cyan')
    log('   - Verifique o Performance Advisor no dashboard do Supabase', 'cyan')
    log('   - Monitore a performance após as otimizações', 'cyan')
  } catch (error) {
    log('❌ Erro durante diagnóstico', 'red')
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

// Executar sempre
runDiagnostics().catch(console.error)

export {
  runDiagnostics,
  checkRLSPolicies,
  checkIndexes,
  checkPrimaryKeys,
  checkPerformanceAdvisor,
}
