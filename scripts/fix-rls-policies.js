#!/usr/bin/env node

/**
 * Script para Corrigir Políticas RLS Específicas
 *
 * Este script corrige as políticas RLS que ainda não estão otimizadas,
 * substituindo ( SELECT (auth.uid())::text AS uid) por (SELECT auth.uid()::text)
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

async function fixRLSPolicies() {
  try {
    log('🔧 Corrigindo Políticas RLS Específicas...', 'bright')
    log('==========================================', 'bright')

    // Lista de políticas que precisam ser corrigidas
    const policiesToFix = [
      // Users policies
      {
        table: 'users',
        policy: 'Users can view own profile',
        newPolicy: `CREATE POLICY "Users can view own profile"
          ON public.users
          FOR SELECT
          TO authenticated
          USING (id = (SELECT auth.uid()::text));`,
      },
      {
        table: 'users',
        policy: 'Users can update own profile',
        newPolicy: `CREATE POLICY "Users can update own profile"
          ON public.users
          FOR UPDATE
          TO authenticated
          USING (id = (SELECT auth.uid()::text))
          WITH CHECK (id = (SELECT auth.uid()::text));`,
      },

      // Addresses policies
      {
        table: 'addresses',
        policy: 'Users can view own addresses',
        newPolicy: `CREATE POLICY "Users can view own addresses"
          ON public.addresses
          FOR SELECT
          TO authenticated
          USING ("userId" = (SELECT auth.uid()::text));`,
      },
      {
        table: 'addresses',
        policy: 'Users can update own addresses',
        newPolicy: `CREATE POLICY "Users can update own addresses"
          ON public.addresses
          FOR UPDATE
          TO authenticated
          USING ("userId" = (SELECT auth.uid()::text))
          WITH CHECK ("userId" = (SELECT auth.uid()::text));`,
      },
      {
        table: 'addresses',
        policy: 'Users can delete own addresses',
        newPolicy: `CREATE POLICY "Users can delete own addresses"
          ON public.addresses
          FOR DELETE
          TO authenticated
          USING ("userId" = (SELECT auth.uid()::text));`,
      },

      // Carts policies
      {
        table: 'carts',
        policy: 'Users can view own carts',
        newPolicy: `CREATE POLICY "Users can view own carts"
          ON public.carts
          FOR SELECT
          TO authenticated
          USING ("userId" = (SELECT auth.uid()::text));`,
      },
      {
        table: 'carts',
        policy: 'Users can update own carts',
        newPolicy: `CREATE POLICY "Users can update own carts"
          ON public.carts
          FOR UPDATE
          TO authenticated
          USING ("userId" = (SELECT auth.uid()::text))
          WITH CHECK ("userId" = (SELECT auth.uid()::text));`,
      },
      {
        table: 'carts',
        policy: 'Users can delete own carts',
        newPolicy: `CREATE POLICY "Users can delete own carts"
          ON public.carts
          FOR DELETE
          TO authenticated
          USING ("userId" = (SELECT auth.uid()::text));`,
      },

      // Cart items policies
      {
        table: 'cart_items',
        policy: 'Users can view own cart items',
        newPolicy: `CREATE POLICY "Users can view own cart items"
          ON public.cart_items
          FOR SELECT
          TO authenticated
          USING ("cartId" IN (SELECT carts.id FROM carts WHERE carts."userId" = (SELECT auth.uid()::text)));`,
      },
      {
        table: 'cart_items',
        policy: 'Users can update own cart items',
        newPolicy: `CREATE POLICY "Users can update own cart items"
          ON public.cart_items
          FOR UPDATE
          TO authenticated
          USING ("cartId" IN (SELECT carts.id FROM carts WHERE carts."userId" = (SELECT auth.uid()::text)))
          WITH CHECK ("cartId" IN (SELECT carts.id FROM carts WHERE carts."userId" = (SELECT auth.uid()::text)));`,
      },
      {
        table: 'cart_items',
        policy: 'Users can delete own cart items',
        newPolicy: `CREATE POLICY "Users can delete own cart items"
          ON public.cart_items
          FOR DELETE
          TO authenticated
          USING ("cartId" IN (SELECT carts.id FROM carts WHERE carts."userId" = (SELECT auth.uid()::text)));`,
      },

      // Categories policies
      {
        table: 'categories',
        policy: 'Only admins can update categories',
        newPolicy: `CREATE POLICY "Only admins can update categories"
          ON public.categories
          FOR UPDATE
          TO authenticated
          USING (EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = 'ADMIN'::"Role"));`,
      },
      {
        table: 'categories',
        policy: 'Only admins can delete categories',
        newPolicy: `CREATE POLICY "Only admins can delete categories"
          ON public.categories
          FOR DELETE
          TO authenticated
          USING (EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = 'ADMIN'::"Role"));`,
      },

      // Equipments policies
      {
        table: 'equipments',
        policy: 'Only admins can update equipment',
        newPolicy: `CREATE POLICY "Only admins can update equipment"
          ON public.equipments
          FOR UPDATE
          TO authenticated
          USING (EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = 'ADMIN'::"Role"));`,
      },
      {
        table: 'equipments',
        policy: 'Only admins can delete equipment',
        newPolicy: `CREATE POLICY "Only admins can delete equipment"
          ON public.equipments
          FOR DELETE
          TO authenticated
          USING (EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = 'ADMIN'::"Role"));`,
      },

      // Quotes policies
      {
        table: 'quotes',
        policy: 'Users can view own quotes',
        newPolicy: `CREATE POLICY "Users can view own quotes"
          ON public.quotes
          FOR SELECT
          TO authenticated
          USING (("userId" = (SELECT auth.uid()::text)) OR (EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = 'ADMIN'::"Role")));`,
      },
      {
        table: 'quotes',
        policy: 'Only admins can update quotes',
        newPolicy: `CREATE POLICY "Only admins can update quotes"
          ON public.quotes
          FOR UPDATE
          TO authenticated
          USING (EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = 'ADMIN'::"Role"));`,
      },
      {
        table: 'quotes',
        policy: 'Only admins can delete quotes',
        newPolicy: `CREATE POLICY "Only admins can delete quotes"
          ON public.quotes
          FOR DELETE
          TO authenticated
          USING (EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = 'ADMIN'::"Role"));`,
      },

      // Quote items policies
      {
        table: 'quote_items',
        policy: 'Users can view own quote items',
        newPolicy: `CREATE POLICY "Users can view own quote items"
          ON public.quote_items
          FOR SELECT
          TO authenticated
          USING (("quoteId" IN (SELECT quotes.id FROM quotes WHERE quotes."userId" = (SELECT auth.uid()::text))) OR (EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = 'ADMIN'::"Role")));`,
      },

      // Rentals policies
      {
        table: 'rentals',
        policy: 'Users can view own rentals',
        newPolicy: `CREATE POLICY "Users can view own rentals"
          ON public.rentals
          FOR SELECT
          TO authenticated
          USING ((userid = (SELECT auth.uid()::text)) OR (EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = 'ADMIN'::"Role")));`,
      },

      // Settings policies
      {
        table: 'settings',
        policy: 'Only admins can modify settings',
        newPolicy: `CREATE POLICY "Only admins can modify settings"
          ON public.settings
          FOR ALL
          TO authenticated
          USING (EXISTS (SELECT 1 FROM users WHERE users.id = (SELECT auth.uid()::text) AND users.role = 'ADMIN'::"Role"));`,
      },
    ]

    log(
      `📝 Encontradas ${policiesToFix.length} políticas para corrigir`,
      'cyan'
    )

    let successCount = 0
    let errorCount = 0

    log('\n🔄 Corrigindo políticas...', 'yellow')

    for (let i = 0; i < policiesToFix.length; i++) {
      const policy = policiesToFix[i]

      try {
        // Primeiro, dropar a política existente
        await prisma.$executeRawUnsafe(
          `DROP POLICY IF EXISTS "${policy.policy}" ON public.${policy.table};`
        )

        // Criar a nova política otimizada
        await prisma.$executeRawUnsafe(policy.newPolicy)

        successCount++
        log(
          `✅ Política ${i + 1}/${policiesToFix.length}: ${policy.table}.${policy.policy}`,
          'green'
        )
      } catch (error) {
        errorCount++
        log(
          `❌ Erro na política ${i + 1}: ${policy.table}.${policy.policy} - ${error.message}`,
          'red'
        )
      }
    }

    log('\n📊 RESULTADO DA CORREÇÃO:', 'bright')
    log('============================', 'bright')
    log(`✅ Políticas corrigidas com sucesso: ${successCount}`, 'green')
    log(
      `❌ Políticas com erro: ${errorCount}`,
      errorCount > 0 ? 'red' : 'green'
    )

    if (errorCount === 0) {
      log('\n🎉 Todas as políticas foram corrigidas com SUCESSO!', 'green')
      log(
        '💡 Execute pnpm run check:supabase para verificar os resultados',
        'cyan'
      )
    } else {
      log('\n⚠️  Algumas políticas tiveram erro', 'yellow')
      log('💡 Verifique os logs acima para detalhes', 'cyan')
    }
  } catch (error) {
    log('❌ Erro durante correção das políticas:', 'red')
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

// Executar correção
fixRLSPolicies()
