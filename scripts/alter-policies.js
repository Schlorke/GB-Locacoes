#!/usr/bin/env node

/**
 * Script para Alterar Políticas RLS sem DROP
 *
 * Este script usa ALTER POLICY para atualizar as políticas existentes
 * sem precisar dropar e recriar
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

async function alterPolicies() {
  try {
    log('🔧 ALTERANDO Políticas RLS (Sem DROP)', 'bright')
    log('========================================', 'bright')
    log('Usando ALTER POLICY para atualizar políticas existentes', 'cyan')
    log('')

    // Lista de políticas para alterar
    const policiesToAlter = [
      // Users policies
      {
        table: 'users',
        name: 'Users can view own profile',
        newExpr: '(id = (SELECT auth.uid()::text))',
      },
      {
        table: 'users',
        name: 'Users can update own profile',
        newExpr: '(id = (SELECT auth.uid()::text))',
      },

      // Addresses policies
      {
        table: 'addresses',
        name: 'Users can view own addresses',
        newExpr: '("userId" = (SELECT auth.uid()::text))',
      },
      {
        table: 'addresses',
        name: 'Users can update own addresses',
        newExpr: '("userId" = (SELECT auth.uid()::text))',
      },
      {
        table: 'addresses',
        name: 'Users can delete own addresses',
        newExpr: '("userId" = (SELECT auth.uid()::text))',
      },

      // Carts policies
      {
        table: 'carts',
        name: 'Users can view own carts',
        newExpr: '("userId" = (SELECT auth.uid()::text))',
      },
      {
        table: 'carts',
        name: 'Users can update own carts',
        newExpr: '("userId" = (SELECT auth.uid()::text))',
      },
      {
        table: 'carts',
        name: 'Users can delete own carts',
        newExpr: '("userId" = (SELECT auth.uid()::text))',
      },

      // Cart items policies
      {
        table: 'cart_items',
        name: 'Users can view own cart items',
        newExpr:
          '("cartId" IN (SELECT carts.id FROM carts WHERE carts."userId" = (SELECT auth.uid()::text)))',
      },
      {
        table: 'cart_items',
        name: 'Users can update own cart items',
        newExpr:
          '("cartId" IN (SELECT carts.id FROM carts WHERE carts."userId" = (SELECT auth.uid()::text)))',
      },
      {
        table: 'cart_items',
        name: 'Users can delete own cart items',
        newExpr:
          '("cartId" IN (SELECT carts.id FROM carts WHERE carts."userId" = (SELECT auth.uid()::text)))',
      },

      // Categories policies
      {
        table: 'categories',
        name: 'Only admins can update categories',
        newExpr:
          '(EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = \'ADMIN\'::"Role"))',
      },
      {
        table: 'categories',
        name: 'Only admins can delete categories',
        newExpr:
          '(EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = \'ADMIN\'::"Role"))',
      },

      // Equipments policies
      {
        table: 'equipments',
        name: 'Only admins can update equipment',
        newExpr:
          '(EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = \'ADMIN\'::"Role"))',
      },
      {
        table: 'equipments',
        name: 'Only admins can delete equipment',
        newExpr:
          '(EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = \'ADMIN\'::"Role"))',
      },

      // Quotes policies
      {
        table: 'quotes',
        name: 'Users can view own quotes',
        newExpr:
          '(("userId" = (SELECT auth.uid()::text)) OR (EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = \'ADMIN\'::"Role")))',
      },
      {
        table: 'quotes',
        name: 'Only admins can update quotes',
        newExpr:
          '(EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = \'ADMIN\'::"Role"))',
      },
      {
        table: 'quotes',
        name: 'Only admins can delete quotes',
        newExpr:
          '(EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = \'ADMIN\'::"Role"))',
      },

      // Quote items policies
      {
        table: 'quote_items',
        name: 'Users can view own quote items',
        newExpr:
          '(("quoteId" IN (SELECT quotes.id FROM quotes WHERE quotes."userId" = (SELECT auth.uid()::text))) OR (EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = \'ADMIN\'::"Role")))',
      },

      // Rentals policies
      {
        table: 'rentals',
        name: 'Users can view own rentals',
        newExpr:
          '((userid = (SELECT auth.uid()::text)) OR (EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = \'ADMIN\'::"Role")))',
      },

      // Settings policies
      {
        table: 'settings',
        name: 'Only admins can modify settings',
        newExpr:
          '(EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = \'ADMIN\'::"Role"))',
      },
    ]

    log(`📋 Processando ${policiesToAlter.length} políticas...`, 'cyan')
    log('')

    let successCount = 0
    let errorCount = 0

    for (let i = 0; i < policiesToAlter.length; i++) {
      const policy = policiesToAlter[i]

      try {
        log(
          `🔧 ${i + 1}/${policiesToAlter.length}: ${policy.table}.${policy.name}`,
          'yellow'
        )

        // Tentar ALTER POLICY
        await prisma.$executeRawUnsafe(`
          ALTER POLICY "${policy.name}" ON public.${policy.table}
          USING ${policy.newExpr}
        `)

        successCount++
        log(`   ✅ Alterada com sucesso`, 'green')
      } catch (error) {
        errorCount++
        log(`   ❌ Erro: ${error.message}`, 'red')

        // Se ALTER POLICY falhar, tentar DROP + CREATE
        try {
          log(`   🔄 Tentando DROP + CREATE...`, 'yellow')

          await prisma.$executeRawUnsafe(
            `DROP POLICY "${policy.name}" ON public.${policy.table}`
          )
          await prisma.$executeRawUnsafe(`
            CREATE POLICY "${policy.name}" ON public.${policy.table}
            FOR ALL
            TO authenticated
            USING ${policy.newExpr}
            WITH CHECK ${policy.newExpr}
          `)

          successCount++
          errorCount--
          log(`   ✅ Recriada com sucesso`, 'green')
        } catch (retryError) {
          log(`   ❌ Falha no retry: ${retryError.message}`, 'red')
        }
      }
    }

    log('')
    log('📊 RESULTADO DA ALTERAÇÃO:', 'bright')
    log('============================', 'bright')
    log(`✅ Políticas alteradas: ${successCount}`, 'green')
    log(
      `❌ Políticas com erro: ${errorCount}`,
      errorCount > 0 ? 'red' : 'green'
    )

    if (errorCount === 0) {
      log('')
      log('🎉 TODAS AS POLÍTICAS FORAM ALTERADAS!', 'green')
      log('✅ Políticas agora usam formato otimizado', 'green')
      log('')
      log('💡 Execute pnpm run check:supabase para verificar', 'cyan')
    } else {
      log('')
      log('⚠️  Algumas políticas tiveram erro', 'yellow')
      log('💡 Verifique os logs acima para detalhes', 'cyan')
    }
  } catch (error) {
    log('❌ Erro durante alteração:', 'red')
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

// Executar alteração
alterPolicies()
