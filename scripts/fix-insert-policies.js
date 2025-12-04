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

async function fixInsertPolicies() {
  try {
    log('\x1b[1m🔧 Corrigindo Políticas INSERT RLS\x1b[0m', 'white')
    log('\x1b[1m==================================\x1b[0m', 'white')

    const policiesToFix = [
      {
        table: 'accounts',
        name: 'Users can insert own account',
        newWithCheck: '(id = (SELECT auth.uid()::text))',
      },
      {
        table: 'sessions',
        name: 'Users can insert own sessions',
        newWithCheck: '("userId" = (SELECT auth.uid()::text))',
      },
    ]

    log(`📋 Corrigindo ${policiesToFix.length} políticas INSERT...\n`, 'cyan')

    let successCount = 0
    let errorCount = 0

    for (let i = 0; i < policiesToFix.length; i++) {
      const policy = policiesToFix[i]
      log(
        `🔧 ${i + 1}/${policiesToFix.length}: ${policy.table}.${policy.name}`,
        'yellow'
      )

      try {
        // Verificar política atual
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
        log(`   📋 Comando atual: ${policyData.cmd}`, 'blue')
        log(`   📋 With Check atual: ${policyData.with_check}`, 'blue')

        // Alterar política INSERT com WITH CHECK otimizado
        await prisma.$executeRawUnsafe(`
          ALTER POLICY "${policy.name}" ON public.${policy.table}
          WITH CHECK ${policy.newWithCheck}
        `)

        log('   ✅ Política INSERT otimizada com sucesso', 'green')
        successCount++
      } catch (error) {
        log(`   ❌ Erro: ${error.message}`, 'red')
        errorCount++
      }
    }

    log('\n\x1b[1m📊 RESULTADO:\x1b[0m', 'white')
    log('\x1b[1m=============\x1b[0m', 'white')
    log(`\x1b[32m✅ Políticas corrigidas: ${successCount}\x1b[0m`, 'green')
    log(`\x1b[31m❌ Erros: ${errorCount}\x1b[0m`, 'red')

    if (errorCount === 0) {
      log(
        '\n\x1b[32m🎉 TODAS AS POLÍTICAS INSERT FORAM CORRIGIDAS!\x1b[0m',
        'green'
      )
      log(
        '\x1b[36m💡 Execute pnpm run check:supabase para verificar\x1b[0m',
        'cyan'
      )
    }
  } catch (error) {
    log(`❌ Erro geral: ${error.message}`, 'red')
  } finally {
    await prisma.$disconnect()
  }
}

fixInsertPolicies()
