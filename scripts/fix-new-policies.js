#!/usr/bin/env node

import { prisma } from './prisma-client.js'

const log = (message, color = 'white') => {
  const colors = {
    white: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
  }
  console.log(`${colors[color]}${message}\x1b[0m`)
}

async function fixNewPolicies() {
  try {
    log('\x1b[1m🔧 Otimizando Políticas RLS Recém-Criadas\x1b[0m', 'white')
    log('\x1b[1m==========================================\x1b[0m', 'white')

    const policiesToFix = [
      { table: 'accounts', name: 'Users can update own account' },
      { table: 'accounts', name: 'Users can view own account' },
      { table: 'sessions', name: 'Users can delete own sessions' },
      { table: 'sessions', name: 'Users can view own sessions' },
    ]

    log(`📋 Otimizando ${policiesToFix.length} políticas...\n`, 'cyan')

    let successCount = 0
    let errorCount = 0

    for (let i = 0; i < policiesToFix.length; i++) {
      const policy = policiesToFix[i]
      log(
        `🔧 ${i + 1}/${policiesToFix.length}: ${policy.table}.${policy.name}`,
        'yellow'
      )

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
          log('   ⚠️  Política não encontrada', 'yellow')
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

        // Alterar política
        if (policyData.cmd === 'INSERT') {
          await prisma.$executeRawUnsafe(`
            ALTER POLICY "${policy.name}" ON public.${policy.table}
            WITH CHECK ${newExpr}
          `)
        } else {
          await prisma.$executeRawUnsafe(`
            ALTER POLICY "${policy.name}" ON public.${policy.table}
            USING ${newExpr}
          `)
        }

        log('   ✅ Otimizada com sucesso', 'green')
        successCount++
      } catch (error) {
        log(`   ❌ Erro: ${error.message}`, 'red')
        errorCount++
      }
    }

    // Criar índice faltante
    log('\n🔧 Criando índice faltante...', 'cyan')
    try {
      await prisma.$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS "idx_cart_items_cartid" ON public.cart_items ("cartId");
      `)
      log('   ✅ Índice idx_cart_items_cartid criado', 'green')
      successCount++
    } catch (error) {
      log(`   ❌ Erro ao criar índice: ${error.message}`, 'red')
      errorCount++
    }

    log('\n\x1b[1m📊 RESULTADO:\x1b[0m', 'white')
    log('\x1b[1m=============\x1b[0m', 'white')
    log(`\x1b[32m✅ Correções aplicadas: ${successCount}\x1b[0m`, 'green')
    log(`\x1b[31m❌ Erros: ${errorCount}\x1b[0m`, 'red')

    if (errorCount === 0) {
      log('\n\x1b[32m🎉 TODAS AS CORREÇÕES APLICADAS!\x1b[0m', 'green')
    }
  } catch (error) {
    log(`❌ Erro geral: ${error.message}`, 'red')
  } finally {
    await prisma.$disconnect()
  }
}

fixNewPolicies()
