#!/usr/bin/env node

/**
 * Script Final para Resolver Warnings RLS
 *
 * Este script resolve DEFINITIVAMENTE os warnings do Supabase Performance Advisor
 * substituindo auth.uid() por (SELECT auth.uid()) em todas as políticas RLS
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

async function finalRLSFix() {
  try {
    log('🎯 RESOLUÇÃO FINAL DOS WARNINGS RLS', 'bright')
    log('=====================================', 'bright')
    log(
      'Aplicando correção recomendada pelo Supabase Performance Advisor',
      'cyan'
    )
    log('')

    // Lista específica de políticas que precisam ser corrigidas
    const policiesToFix = [
      // Users policies
      {
        table: 'users',
        name: 'Users can view own profile',
        cmd: 'SELECT',
        currentExpr: '(id = ( SELECT (auth.uid())::text AS uid))',
        newExpr: '(id = (SELECT auth.uid()::text))',
      },
      {
        table: 'users',
        name: 'Users can update own profile',
        cmd: 'UPDATE',
        currentExpr: '(id = ( SELECT (auth.uid())::text AS uid))',
        newExpr: '(id = (SELECT auth.uid()::text))',
      },

      // Addresses policies
      {
        table: 'addresses',
        name: 'Users can view own addresses',
        cmd: 'SELECT',
        currentExpr: '("userId" = ( SELECT (auth.uid())::text AS uid))',
        newExpr: '("userId" = (SELECT auth.uid()::text))',
      },
      {
        table: 'addresses',
        name: 'Users can update own addresses',
        cmd: 'UPDATE',
        currentExpr: '("userId" = ( SELECT (auth.uid())::text AS uid))',
        newExpr: '("userId" = (SELECT auth.uid()::text))',
      },
      {
        table: 'addresses',
        name: 'Users can delete own addresses',
        cmd: 'DELETE',
        currentExpr: '("userId" = ( SELECT (auth.uid())::text AS uid))',
        newExpr: '("userId" = (SELECT auth.uid()::text))',
      },

      // Carts policies
      {
        table: 'carts',
        name: 'Users can view own carts',
        cmd: 'SELECT',
        currentExpr: '("userId" = ( SELECT (auth.uid())::text AS uid))',
        newExpr: '("userId" = (SELECT auth.uid()::text))',
      },
      {
        table: 'carts',
        name: 'Users can update own carts',
        cmd: 'UPDATE',
        currentExpr: '("userId" = ( SELECT (auth.uid())::text AS uid))',
        newExpr: '("userId" = (SELECT auth.uid()::text))',
      },
      {
        table: 'carts',
        name: 'Users can delete own carts',
        cmd: 'DELETE',
        currentExpr: '("userId" = ( SELECT (auth.uid())::text AS uid))',
        newExpr: '("userId" = (SELECT auth.uid()::text))',
      },

      // Cart items policies
      {
        table: 'cart_items',
        name: 'Users can view own cart items',
        cmd: 'SELECT',
        currentExpr:
          '("cartId" IN ( SELECT carts.id FROM carts WHERE (carts."userId" = ( SELECT (auth.uid())::text AS uid))))',
        newExpr:
          '("cartId" IN (SELECT carts.id FROM carts WHERE carts."userId" = (SELECT auth.uid()::text)))',
      },
      {
        table: 'cart_items',
        name: 'Users can update own cart items',
        cmd: 'UPDATE',
        currentExpr:
          '("cartId" IN ( SELECT carts.id FROM carts WHERE (carts."userId" = ( SELECT (auth.uid())::text AS uid))))',
        newExpr:
          '("cartId" IN (SELECT carts.id FROM carts WHERE carts."userId" = (SELECT auth.uid()::text)))',
      },
      {
        table: 'cart_items',
        name: 'Users can delete own cart items',
        cmd: 'DELETE',
        currentExpr:
          '("cartId" IN ( SELECT carts.id FROM carts WHERE (carts."userId" = ( SELECT (auth.uid())::text AS uid))))',
        newExpr:
          '("cartId" IN (SELECT carts.id FROM carts WHERE carts."userId" = (SELECT auth.uid()::text)))',
      },

      // Categories policies
      {
        table: 'categories',
        name: 'Only admins can update categories',
        cmd: 'UPDATE',
        currentExpr:
          '(EXISTS ( SELECT 1 FROM users WHERE ((users.id = ( SELECT (auth.uid())::text AS uid)) AND (users.role = \'ADMIN\'::"Role"))))',
        newExpr:
          '(EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = \'ADMIN\'::"Role"))',
      },
      {
        table: 'categories',
        name: 'Only admins can delete categories',
        cmd: 'DELETE',
        currentExpr:
          '(EXISTS ( SELECT 1 FROM users WHERE ((users.id = ( SELECT (auth.uid())::text AS uid)) AND (users.role = \'ADMIN\'::"Role"))))',
        newExpr:
          '(EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = \'ADMIN\'::"Role"))',
      },

      // Equipments policies
      {
        table: 'equipments',
        name: 'Only admins can update equipment',
        cmd: 'UPDATE',
        currentExpr:
          '(EXISTS ( SELECT 1 FROM users WHERE ((users.id = ( SELECT (auth.uid())::text AS uid)) AND (users.role = \'ADMIN\'::"Role"))))',
        newExpr:
          '(EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = \'ADMIN\'::"Role"))',
      },
      {
        table: 'equipments',
        name: 'Only admins can delete equipment',
        cmd: 'DELETE',
        currentExpr:
          '(EXISTS ( SELECT 1 FROM users WHERE ((users.id = ( SELECT (auth.uid())::text AS uid)) AND (users.role = \'ADMIN\'::"Role"))))',
        newExpr:
          '(EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = \'ADMIN\'::"Role"))',
      },

      // Quotes policies
      {
        table: 'quotes',
        name: 'Users can view own quotes',
        cmd: 'SELECT',
        currentExpr:
          '(("userId" = ( SELECT (auth.uid())::text AS uid)) OR (EXISTS ( SELECT 1 FROM users WHERE ((users.id = ( SELECT (auth.uid())::text AS uid)) AND (users.role = \'ADMIN\'::"Role")))))',
        newExpr:
          '(("userId" = (SELECT auth.uid()::text)) OR (EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = \'ADMIN\'::"Role")))',
      },
      {
        table: 'quotes',
        name: 'Only admins can update quotes',
        cmd: 'UPDATE',
        currentExpr:
          '(EXISTS ( SELECT 1 FROM users WHERE ((users.id = ( SELECT (auth.uid())::text AS uid)) AND (users.role = \'ADMIN\'::"Role"))))',
        newExpr:
          '(EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = \'ADMIN\'::"Role"))',
      },
      {
        table: 'quotes',
        name: 'Only admins can delete quotes',
        cmd: 'DELETE',
        currentExpr:
          '(EXISTS ( SELECT 1 FROM users WHERE ((users.id = ( SELECT (auth.uid())::text AS uid)) AND (users.role = \'ADMIN\'::"Role"))))',
        newExpr:
          '(EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = \'ADMIN\'::"Role"))',
      },

      // Quote items policies
      {
        table: 'quote_items',
        name: 'Users can view own quote items',
        cmd: 'SELECT',
        currentExpr:
          '(("quoteId" IN ( SELECT quotes.id FROM quotes WHERE (quotes."userId" = ( SELECT (auth.uid())::text AS uid)))) OR (EXISTS ( SELECT 1 FROM users WHERE ((users.id = ( SELECT (auth.uid())::text AS uid)) AND (users.role = \'ADMIN\'::"Role")))))',
        newExpr:
          '(("quoteId" IN (SELECT quotes.id FROM quotes WHERE quotes."userId" = (SELECT auth.uid()::text))) OR (EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = \'ADMIN\'::"Role")))',
      },

      // Rentals policies
      {
        table: 'rentals',
        name: 'Users can view own rentals',
        cmd: 'SELECT',
        currentExpr:
          '((userid = ( SELECT (auth.uid())::text AS uid)) OR (EXISTS ( SELECT 1 FROM users WHERE ((users.id = ( SELECT (auth.uid())::text AS uid)) AND (users.role = \'ADMIN\'::"Role")))))',
        newExpr:
          '((userid = (SELECT auth.uid()::text)) OR (EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = \'ADMIN\'::"Role")))',
      },

      // Settings policies
      {
        table: 'settings',
        name: 'Only admins can modify settings',
        cmd: 'ALL',
        currentExpr:
          '(EXISTS ( SELECT 1 FROM users WHERE ((users.id = ( SELECT (auth.uid())::text AS uid)) AND (users.role = \'ADMIN\'::"Role"))))',
        newExpr:
          '(EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = \'ADMIN\'::"Role"))',
      },
    ]

    log(`📋 Processando ${policiesToFix.length} políticas RLS...`, 'cyan')
    log('')

    let successCount = 0
    let errorCount = 0

    for (let i = 0; i < policiesToFix.length; i++) {
      const policy = policiesToFix[i]

      try {
        log(
          `🔧 ${i + 1}/${policiesToFix.length}: ${policy.table}.${policy.name}`,
          'yellow'
        )

        // Dropar política existente
        await prisma.$executeRawUnsafe(
          `DROP POLICY IF EXISTS "${policy.name}" ON public.${policy.table};`
        )

        // Criar nova política com formato otimizado
        let newPolicySQL = ''

        if (policy.cmd === 'SELECT') {
          newPolicySQL = `CREATE POLICY "${policy.name}"
            ON public.${policy.table}
            FOR SELECT
            TO authenticated
            USING ${policy.newExpr};`
        } else if (policy.cmd === 'UPDATE') {
          newPolicySQL = `CREATE POLICY "${policy.name}"
            ON public.${policy.table}
            FOR UPDATE
            TO authenticated
            USING ${policy.newExpr}
            WITH CHECK ${policy.newExpr};`
        } else if (policy.cmd === 'DELETE') {
          newPolicySQL = `CREATE POLICY "${policy.name}"
            ON public.${policy.table}
            FOR DELETE
            TO authenticated
            USING ${policy.newExpr};`
        } else if (policy.cmd === 'ALL') {
          newPolicySQL = `CREATE POLICY "${policy.name}"
            ON public.${policy.table}
            FOR ALL
            TO authenticated
            USING ${policy.newExpr}
            WITH CHECK ${policy.newExpr};`
        }

        if (newPolicySQL) {
          await prisma.$executeRawUnsafe(newPolicySQL)
          successCount++
          log(
            `   ✅ Corrigida: ${policy.currentExpr} → ${policy.newExpr}`,
            'green'
          )
        }
      } catch (error) {
        errorCount++
        log(`   ❌ Erro: ${error.message}`, 'red')
      }
    }

    log('')
    log('📊 RESULTADO FINAL:', 'bright')
    log('==================', 'bright')
    log(`✅ Políticas corrigidas: ${successCount}`, 'green')
    log(
      `❌ Políticas com erro: ${errorCount}`,
      errorCount > 0 ? 'red' : 'green'
    )

    if (errorCount === 0) {
      log('')
      log('🎉 TODOS OS WARNINGS RLS RESOLVIDOS!', 'green')
      log(
        '✅ Políticas agora usam formato otimizado (SELECT auth.uid())',
        'green'
      )
      log('✅ Performance melhorada conforme recomendação do Supabase', 'green')
      log('')
      log('💡 Execute pnpm run check:supabase para verificar', 'cyan')
    } else {
      log('')
      log('⚠️  Algumas políticas tiveram erro', 'yellow')
      log('💡 Verifique os logs acima para detalhes', 'cyan')
    }
  } catch (error) {
    log('❌ Erro durante correção final:', 'red')
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

// Executar correção final
finalRLSFix()
