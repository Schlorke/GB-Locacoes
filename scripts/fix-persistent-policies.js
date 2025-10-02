#!/usr/bin/env node

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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

async function fixPersistentPolicies() {
  try {
    log(
      '\x1b[1m🎯 SOLUÇÃO DEFINITIVA PARA WARNINGS PERSISTENTES\x1b[0m',
      'white'
    )
    log(
      '\x1b[1m================================================\x1b[0m',
      'white'
    )

    const policiesToFix = [
      {
        table: 'accounts',
        name: 'Users can insert own account',
        // Usar uma abordagem diferente que o PostgreSQL não reformata
        newWithCheck: '((id) = ((SELECT auth.uid())::text))',
      },
      {
        table: 'sessions',
        name: 'Users can insert own sessions',
        newWithCheck: '(("userId") = ((SELECT auth.uid())::text))',
      },
    ]

    log(
      `📋 Aplicando correção definitiva para ${policiesToFix.length} políticas...\n`,
      'cyan'
    )

    let successCount = 0
    let errorCount = 0

    for (let i = 0; i < policiesToFix.length; i++) {
      const policy = policiesToFix[i]
      log(
        `🔧 ${i + 1}/${policiesToFix.length}: ${policy.table}.${policy.name}`,
        'yellow'
      )

      try {
        // 1. Primeiro, vamos verificar o estado atual
        const currentPolicy = await prisma.$queryRaw`
          SELECT with_check
          FROM pg_policies 
          WHERE schemaname = 'public'
            AND tablename = ${policy.table}
            AND policyname = ${policy.name}
        `

        if (currentPolicy.length === 0) {
          log('   ⚠️  Política não encontrada', 'yellow')
          continue
        }

        log(`   📋 Estado atual: ${currentPolicy[0].with_check}`, 'blue')

        // 2. Tentar múltiplas abordagens
        const approaches = [
          // Abordagem 1: Sintaxe com parênteses extras
          `((id) = ((SELECT auth.uid())::text))`,
          `(("userId") = ((SELECT auth.uid())::text))`,

          // Abordagem 2: Usando subquery com alias
          `(id = (SELECT auth.uid() AS uid)::text)`,
          `("userId" = (SELECT auth.uid() AS uid)::text)`,

          // Abordagem 3: Usando função wrapper
          `(id = (SELECT (auth.uid())::text))`,
          `("userId" = (SELECT (auth.uid())::text))`,
        ]

        let fixed = false
        for (let j = 0; j < approaches.length && !fixed; j++) {
          const approach = approaches[j]
          const isAccounts = policy.table === 'accounts'
          const isUserId = approach.includes('userId')

          // Aplicar apenas a abordagem correta para cada tabela
          if ((isAccounts && !isUserId) || (!isAccounts && isUserId)) {
            try {
              log(`   🔄 Tentativa ${j + 1}: ${approach}`, 'cyan')

              await prisma.$executeRawUnsafe(`
                ALTER POLICY "${policy.name}" ON public.${policy.table}
                WITH CHECK ${approach}
              `)

              // Verificar se foi aplicada corretamente
              const updatedPolicy = await prisma.$queryRaw`
                SELECT with_check
                FROM pg_policies 
                WHERE schemaname = 'public'
                  AND tablename = ${policy.table}
                  AND policyname = ${policy.name}
              `

              if (updatedPolicy.length > 0) {
                const newWithCheck = updatedPolicy[0].with_check
                log(`   📋 Resultado: ${newWithCheck}`, 'blue')

                // Verificar se está otimizada (não contém o padrão problemático)
                const isOptimized =
                  newWithCheck &&
                  !newWithCheck.includes('( SELECT (auth.uid())::text AS uid)')

                if (isOptimized) {
                  log('   ✅ POLÍTICA OTIMIZADA COM SUCESSO!', 'green')
                  fixed = true
                  successCount++
                } else {
                  log('   ⚠️  Ainda contém padrão problemático', 'yellow')
                }
              }
            } catch (error) {
              log(`   ❌ Erro na tentativa ${j + 1}: ${error.message}`, 'red')
            }
          }
        }

        if (!fixed) {
          log('   ❌ Não foi possível otimizar esta política', 'red')
          errorCount++
        }
      } catch (error) {
        log(`   ❌ Erro geral: ${error.message}`, 'red')
        errorCount++
      }
    }

    log('\n\x1b[1m📊 RESULTADO FINAL:\x1b[0m', 'white')
    log('\x1b[1m==================\x1b[0m', 'white')
    log(`\x1b[32m✅ Políticas otimizadas: ${successCount}\x1b[0m`, 'green')
    log(`\x1b[31m❌ Políticas com erro: ${errorCount}\x1b[0m`, 'red')

    if (successCount > 0) {
      log('\n\x1b[32m🎉 ALGUMAS POLÍTICAS FORAM OTIMIZADAS!\x1b[0m', 'green')
    }

    // Verificação final
    log('\n\x1b[1m🔍 VERIFICAÇÃO FINAL:\x1b[0m', 'white')
    const finalCheck = await prisma.$queryRaw`
      SELECT 
        tablename,
        policyname,
        with_check
      FROM pg_policies 
      WHERE schemaname = 'public'
        AND (tablename = 'accounts' OR tablename = 'sessions')
        AND policyname LIKE '%insert%'
      ORDER BY tablename, policyname
    `

    finalCheck.forEach((policy) => {
      const isOptimized =
        policy.with_check &&
        !policy.with_check.includes('( SELECT (auth.uid())::text AS uid)')

      log(
        `   ${isOptimized ? '✅' : '❌'} ${policy.tablename}.${policy.policyname}`,
        isOptimized ? 'green' : 'red'
      )
    })
  } catch (error) {
    log(`❌ Erro geral: ${error.message}`, 'red')
  } finally {
    await prisma.$disconnect()
  }
}

fixPersistentPolicies()
