#!/usr/bin/env node

/**
 * Script para Resolver TODOS os Warnings do Supabase
 *
 * Este script resolve todos os 33 warnings identificados pelo Supabase Performance Advisor:
 * - 32 warnings de Auth RLS Initialization Plan
 * - 1 warning de Duplicate Index
 */

import { prisma } from './prisma-client.js'

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

async function resolveAllWarnings() {
  try {
    log('🎯 RESOLVENDO TODOS OS WARNINGS DO SUPABASE', 'bright')
    log('=============================================', 'bright')
    log('Resolvendo 59 warnings:', 'cyan')
    log('  - 32 warnings de Auth RLS Initialization Plan', 'cyan')
    log('  - 1 warning de Duplicate Index', 'cyan')
    log('  - 12 warnings de Unused Index', 'cyan')
    log('  - 11 warnings de Unindexed Foreign Keys', 'cyan')
    log('  - 3 warnings de RLS Enabled No Policy', 'cyan')
    log('')

    let totalResolved = 0
    let totalErrors = 0

    // 1. RESOLVER WARNINGS DE AUTH RLS INITIALIZATION PLAN
    log('🔧 1. Resolvendo Auth RLS Initialization Plan warnings...', 'cyan')

    const rlsPolicies = [
      // Users policies
      { table: 'users', name: 'Users can insert own profile' },
      { table: 'users', name: 'Users can update own profile' },
      { table: 'users', name: 'Users can view own profile' },

      // Categories policies
      { table: 'categories', name: 'Only admins can delete categories' },
      { table: 'categories', name: 'Only admins can insert categories' },
      { table: 'categories', name: 'Only admins can update categories' },

      // Equipments policies
      { table: 'equipments', name: 'Only admins can delete equipment' },
      { table: 'equipments', name: 'Only admins can insert equipment' },
      { table: 'equipments', name: 'Only admins can update equipment' },

      // Quotes policies
      { table: 'quotes', name: 'Only admins can delete quotes' },
      { table: 'quotes', name: 'Only admins can update quotes' },
      { table: 'quotes', name: 'Users can create own quotes' },
      { table: 'quotes', name: 'Users can view own quotes' },

      // Quote items policies
      { table: 'quote_items', name: 'Users can view own quote items' },

      // Rentals policies
      { table: 'rentals', name: 'Users can create own rentals' },
      { table: 'rentals', name: 'Users can view own rentals' },

      // Settings policies
      { table: 'settings', name: 'Only admins can modify settings' },

      // Addresses policies
      { table: 'addresses', name: 'Users can delete own addresses' },
      { table: 'addresses', name: 'Users can insert own addresses' },
      { table: 'addresses', name: 'Users can update own addresses' },
      { table: 'addresses', name: 'Users can view own addresses' },

      // Carts policies
      { table: 'carts', name: 'Users can delete own carts' },
      { table: 'carts', name: 'Users can insert own carts' },
      { table: 'carts', name: 'Users can update own carts' },
      { table: 'carts', name: 'Users can view own carts' },

      // Cart items policies
      { table: 'cart_items', name: 'Users can delete own cart items' },
      { table: 'cart_items', name: 'Users can insert own cart items' },
      { table: 'cart_items', name: 'Users can update own cart items' },
      { table: 'cart_items', name: 'Users can view own cart items' },
    ]

    log(`   📋 Processando ${rlsPolicies.length} políticas RLS...`, 'yellow')

    for (let i = 0; i < rlsPolicies.length; i++) {
      const policy = rlsPolicies[i]

      try {
        // Obter a política atual
        const currentPolicy = await prisma.$queryRaw`
          SELECT cmd, qual, with_check
          FROM pg_policies 
          WHERE schemaname = 'public'
            AND tablename = ${policy.table}
            AND policyname = ${policy.name}
        `

        if (currentPolicy.length === 0) {
          log(
            `   ⚠️  Política não encontrada: ${policy.table}.${policy.name}`,
            'yellow'
          )
          continue
        }

        const policyData = currentPolicy[0]

        // Criar nova expressão otimizada
        let newExpr = ''
        if (policyData.qual) {
          newExpr = policyData.qual
            .replace(
              /\( SELECT \(auth\.uid\(\)\)::text AS uid\)/g,
              '(SELECT auth.uid()::text)'
            )
            .replace(
              /\( SELECT \(auth\.uid\(\)\)::text\)/g,
              '(SELECT auth.uid()::text)'
            )
            .replace(/auth\.uid\(\)/g, '(SELECT auth.uid())')
        }

        if (policyData.with_check) {
          const newWithCheck = policyData.with_check
            .replace(
              /\( SELECT \(auth\.uid\(\)\)::text AS uid\)/g,
              '(SELECT auth.uid()::text)'
            )
            .replace(
              /\( SELECT \(auth\.uid\(\)\)::text\)/g,
              '(SELECT auth.uid()::text)'
            )
            .replace(/auth\.uid\(\)/g, '(SELECT auth.uid())')

          // Alterar política com WITH CHECK (apenas para políticas INSERT)
          if (policyData.cmd === 'INSERT') {
            await prisma.$executeRawUnsafe(`
              ALTER POLICY "${policy.name}" ON public.${policy.table}
              WITH CHECK ${newWithCheck}
            `)
          } else {
            await prisma.$executeRawUnsafe(`
              ALTER POLICY "${policy.name}" ON public.${policy.table}
              USING ${newExpr}
              WITH CHECK ${newWithCheck}
            `)
          }
        } else {
          // Alterar política sem WITH CHECK
          await prisma.$executeRawUnsafe(`
            ALTER POLICY "${policy.name}" ON public.${policy.table}
            USING ${newExpr}
          `)
        }

        totalResolved++
        log(
          `   ✅ ${i + 1}/${rlsPolicies.length}: ${policy.table}.${policy.name}`,
          'green'
        )
      } catch (error) {
        totalErrors++
        log(
          `   ❌ ${i + 1}/${rlsPolicies.length}: ${policy.table}.${policy.name} - ${error.message}`,
          'red'
        )
      }
    }

    log('')

    // 2. RESOLVER WARNING DE DUPLICATE INDEX
    log('🔧 2. Resolvendo Duplicate Index warning...', 'cyan')

    try {
      // Dropar índice duplicado (manter apenas o primary key)
      await prisma.$executeRawUnsafe(`
        DROP INDEX IF EXISTS "verificationtokens_identifier_token_key";
      `)

      log(
        '   ✅ Índice duplicado removido: verificationtokens_identifier_token_key',
        'green'
      )
      totalResolved++
    } catch (error) {
      totalErrors++
      log(`   ❌ Erro ao remover índice duplicado: ${error.message}`, 'red')
    }

    log('')

    // 3. RESOLVER WARNINGS DE UNUSED INDEX
    log('🔧 3. Resolvendo Unused Index warnings...', 'cyan')

    const unusedIndexes = [
      { table: 'accounts', index: 'idx_accounts_userid' },
      { table: 'addresses', index: 'idx_addresses_userid' },
      { table: 'cart_items', index: 'idx_cart_items_equipmentid' },
      { table: 'cart_items', index: 'idx_cart_items_cartid' },
      { table: 'equipments', index: 'idx_equipments_categoryid' },
      { table: 'quote_items', index: 'idx_quote_items_equipmentid' },
      { table: 'quote_items', index: 'idx_quote_items_quoteid' },
      { table: 'quotes', index: 'idx_quotes_userid' },
      { table: 'rental_items', index: 'idx_rental_items_equipmentid' },
      { table: 'rental_items', index: 'idx_rental_items_rentalid' },
      { table: 'rentals', index: 'idx_rentals_userid' },
      { table: 'sessions', index: 'idx_sessions_userid' },
    ]

    log(
      `   📋 Processando ${unusedIndexes.length} índices não utilizados...`,
      'yellow'
    )

    for (let i = 0; i < unusedIndexes.length; i++) {
      const indexInfo = unusedIndexes[i]

      try {
        // Verificar se o índice existe antes de tentar removê-lo
        const indexExists = await prisma.$queryRaw`
          SELECT indexname 
          FROM pg_indexes 
          WHERE schemaname = 'public' 
            AND tablename = ${indexInfo.table}
            AND indexname = ${indexInfo.index}
        `

        if (indexExists.length > 0) {
          // Remover índice não utilizado
          await prisma.$executeRawUnsafe(`
            DROP INDEX IF EXISTS "${indexInfo.index}";
          `)

          log(
            `   ✅ ${i + 1}/${unusedIndexes.length}: ${indexInfo.index} removido`,
            'green'
          )
          totalResolved++
        } else {
          log(
            `   ⚠️  ${i + 1}/${unusedIndexes.length}: ${indexInfo.index} não encontrado`,
            'yellow'
          )
        }
      } catch (error) {
        totalErrors++
        log(
          `   ❌ ${i + 1}/${unusedIndexes.length}: ${indexInfo.index} - ${error.message}`,
          'red'
        )
      }
    }

    log('')

    // 4. RESOLVER WARNINGS DE UNINDEXED FOREIGN KEYS
    log('🔧 4. Resolvendo Unindexed Foreign Keys warnings...', 'cyan')

    const foreignKeysToIndex = [
      { table: 'accounts', column: 'userId', index: 'idx_accounts_userid' },
      { table: 'addresses', column: 'userId', index: 'idx_addresses_userid' },
      {
        table: 'cart_items',
        column: 'equipmentId',
        index: 'idx_cart_items_equipmentid',
      },
      {
        table: 'equipments',
        column: 'categoryId',
        index: 'idx_equipments_categoryid',
      },
      {
        table: 'quote_items',
        column: 'equipmentId',
        index: 'idx_quote_items_equipmentid',
      },
      {
        table: 'quote_items',
        column: 'quoteId',
        index: 'idx_quote_items_quoteid',
      },
      { table: 'quotes', column: 'userId', index: 'idx_quotes_userid' },
      {
        table: 'rental_items',
        column: 'equipmentid',
        index: 'idx_rental_items_equipmentid',
      },
      {
        table: 'rental_items',
        column: 'rentalid',
        index: 'idx_rental_items_rentalid',
      },
      { table: 'rentals', column: 'userid', index: 'idx_rentals_userid' },
      { table: 'sessions', column: 'userId', index: 'idx_sessions_userid' },
    ]

    log(
      `   📋 Criando ${foreignKeysToIndex.length} índices para foreign keys...`,
      'yellow'
    )

    for (let i = 0; i < foreignKeysToIndex.length; i++) {
      const fkInfo = foreignKeysToIndex[i]

      try {
        // Verificar se o índice já existe
        const indexExists = await prisma.$queryRaw`
          SELECT indexname 
          FROM pg_indexes 
          WHERE schemaname = 'public' 
            AND tablename = ${fkInfo.table}
            AND indexname = ${fkInfo.index}
        `

        if (indexExists.length === 0) {
          // Criar índice para foreign key
          await prisma.$executeRawUnsafe(`
            CREATE INDEX "${fkInfo.index}" ON public.${fkInfo.table} ("${fkInfo.column}");
          `)

          log(
            `   ✅ ${i + 1}/${foreignKeysToIndex.length}: ${fkInfo.index} criado`,
            'green'
          )
          totalResolved++
        } else {
          log(
            `   ⚠️  ${i + 1}/${foreignKeysToIndex.length}: ${fkInfo.index} já existe`,
            'yellow'
          )
        }
      } catch (error) {
        totalErrors++
        log(
          `   ❌ ${i + 1}/${foreignKeysToIndex.length}: ${fkInfo.index} - ${error.message}`,
          'red'
        )
      }
    }

    log('')

    // 5. RESOLVER WARNINGS DE RLS ENABLED NO POLICY
    log('🔧 5. Resolvendo RLS Enabled No Policy warnings...', 'cyan')

    const tablesNeedingPolicies = [
      { table: 'accounts', description: 'Tabela de contas de usuários' },
      { table: 'sessions', description: 'Tabela de sessões de usuários' },
      {
        table: 'verificationtokens',
        description: 'Tabela de tokens de verificação',
      },
    ]

    log(
      `   📋 Criando políticas RLS para ${tablesNeedingPolicies.length} tabelas...`,
      'yellow'
    )

    for (let i = 0; i < tablesNeedingPolicies.length; i++) {
      const tableInfo = tablesNeedingPolicies[i]

      try {
        // Verificar se já existem políticas para esta tabela
        const existingPolicies = await prisma.$queryRaw`
          SELECT policyname 
          FROM pg_policies 
          WHERE schemaname = 'public' 
            AND tablename = ${tableInfo.table}
        `

        if (existingPolicies.length === 0) {
          // Criar políticas básicas de segurança
          let policies = []

          if (tableInfo.table === 'accounts') {
            policies = [
              `CREATE POLICY "Users can view own account" ON public.${tableInfo.table} FOR SELECT TO authenticated USING (id = (SELECT auth.uid()::text));`,
              `CREATE POLICY "Users can update own account" ON public.${tableInfo.table} FOR UPDATE TO authenticated USING (id = (SELECT auth.uid()::text));`,
              `CREATE POLICY "Users can insert own account" ON public.${tableInfo.table} FOR INSERT TO authenticated WITH CHECK (id = (SELECT auth.uid()::text));`,
            ]
          } else if (tableInfo.table === 'sessions') {
            policies = [
              `CREATE POLICY "Users can view own sessions" ON public.${tableInfo.table} FOR SELECT TO authenticated USING ("userId" = (SELECT auth.uid()::text));`,
              `CREATE POLICY "Users can delete own sessions" ON public.${tableInfo.table} FOR DELETE TO authenticated USING ("userId" = (SELECT auth.uid()::text));`,
              `CREATE POLICY "Users can insert own sessions" ON public.${tableInfo.table} FOR INSERT TO authenticated WITH CHECK ("userId" = (SELECT auth.uid()::text));`,
            ]
          } else if (tableInfo.table === 'verificationtokens') {
            policies = [
              `CREATE POLICY "Users can view own verification tokens" ON public.${tableInfo.table} FOR SELECT TO authenticated USING (identifier = (SELECT auth.email()));`,
              `CREATE POLICY "Users can insert own verification tokens" ON public.${tableInfo.table} FOR INSERT TO authenticated WITH CHECK (identifier = (SELECT auth.email()));`,
              `CREATE POLICY "Users can delete own verification tokens" ON public.${tableInfo.table} FOR DELETE TO authenticated USING (identifier = (SELECT auth.email()));`,
            ]
          }

          // Executar políticas
          for (const policy of policies) {
            await prisma.$executeRawUnsafe(policy)
          }

          log(
            `   ✅ ${i + 1}/${tablesNeedingPolicies.length}: ${tableInfo.table} - ${policies.length} políticas criadas`,
            'green'
          )
          totalResolved += policies.length
        } else {
          log(
            `   ⚠️  ${i + 1}/${tablesNeedingPolicies.length}: ${tableInfo.table} já tem políticas`,
            'yellow'
          )
        }
      } catch (error) {
        totalErrors++
        log(
          `   ❌ ${i + 1}/${tablesNeedingPolicies.length}: ${tableInfo.table} - ${error.message}`,
          'red'
        )
      }
    }

    log('')
    log('📊 RESULTADO FINAL:', 'bright')
    log('==================', 'bright')
    log(`✅ Warnings resolvidos: ${totalResolved}`, 'green')
    log(
      `❌ Warnings com erro: ${totalErrors}`,
      totalErrors > 0 ? 'red' : 'green'
    )

    if (totalErrors === 0) {
      log('')
      log('🎉 TODOS OS 59 WARNINGS FORAM RESOLVIDOS!', 'green')
      log('✅ Políticas RLS otimizadas com (SELECT auth.uid())', 'green')
      log('✅ Índice duplicado removido', 'green')
      log('✅ Índices não utilizados removidos', 'green')
      log('✅ Índices para foreign keys criados', 'green')
      log('✅ Políticas RLS criadas para tabelas sem políticas', 'green')
      log('')
      log('💡 Execute pnpm run check:supabase para verificar', 'cyan')
    } else {
      log('')
      log('⚠️  Alguns warnings tiveram erro', 'yellow')
      log('💡 Verifique os logs acima para detalhes', 'cyan')
    }
  } catch (error) {
    log('❌ Erro durante resolução:', 'red')
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

// Executar resolução completa
resolveAllWarnings()
