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

async function debugPersistentWarnings() {
  try {
    log(
      '\x1b[1m🔍 INVESTIGAÇÃO PROFUNDA DOS WARNINGS PERSISTENTES\x1b[0m',
      'white'
    )
    log(
      '\x1b[1m====================================================\x1b[0m',
      'white'
    )

    const problematicPolicies = [
      { table: 'accounts', name: 'Users can insert own account' },
      { table: 'sessions', name: 'Users can insert own sessions' },
    ]

    for (let i = 0; i < problematicPolicies.length; i++) {
      const policy = problematicPolicies[i]
      log(`\n🔍 Investigando: ${policy.table}.${policy.name}`, 'cyan')
      log('='.repeat(50), 'cyan')

      try {
        // 1. Verificar política atual
        const currentPolicy = await prisma.$queryRaw`
          SELECT 
            schemaname,
            tablename,
            policyname,
            cmd,
            qual,
            with_check,
            roles
          FROM pg_policies 
          WHERE schemaname = 'public'
            AND tablename = ${policy.table}
            AND policyname = ${policy.name}
        `

        if (currentPolicy.length === 0) {
          log('   ❌ Política não encontrada!', 'red')
          continue
        }

        const policyData = currentPolicy[0]
        log(`   📋 Schema: ${policyData.schemaname}`, 'blue')
        log(`   📋 Tabela: ${policyData.tablename}`, 'blue')
        log(`   📋 Nome: ${policyData.policyname}`, 'blue')
        log(`   📋 Comando: ${policyData.cmd}`, 'blue')
        log(`   📋 Qual: ${policyData.qual}`, 'blue')
        log(`   📋 With Check: ${policyData.with_check}`, 'blue')
        log(`   📋 Roles: ${policyData.roles}`, 'blue')

        // 2. Verificar se há padrão problemático
        const hasProblematicPattern =
          policyData.with_check &&
          policyData.with_check.includes('( SELECT (auth.uid())::text AS uid)')

        if (hasProblematicPattern) {
          log('   ⚠️  PADRÃO PROBLEMÁTICO DETECTADO!', 'yellow')
          log(`   🔍 With Check atual: ${policyData.with_check}`, 'yellow')

          // 3. Tentar correção mais agressiva
          log('   🔧 Aplicando correção agressiva...', 'cyan')

          // Drop e recreate da política
          await prisma.$executeRawUnsafe(
            `DROP POLICY IF EXISTS "${policy.name}" ON public.${policy.table};`
          )

          let newPolicy = ''
          if (policy.table === 'accounts') {
            newPolicy = `
              CREATE POLICY "${policy.name}" ON public.${policy.table}
              FOR INSERT
              TO authenticated
              WITH CHECK (id = (SELECT auth.uid()::text));
            `
          } else if (policy.table === 'sessions') {
            newPolicy = `
              CREATE POLICY "${policy.name}" ON public.${policy.table}
              FOR INSERT
              TO authenticated
              WITH CHECK ("userId" = (SELECT auth.uid()::text));
            `
          }

          await prisma.$executeRawUnsafe(newPolicy)
          log('   ✅ Política recriada com formato otimizado', 'green')

          // 4. Verificar se foi corrigida
          const updatedPolicy = await prisma.$queryRaw`
            SELECT with_check
            FROM pg_policies 
            WHERE schemaname = 'public'
              AND tablename = ${policy.table}
              AND policyname = ${policy.name}
          `

          if (updatedPolicy.length > 0) {
            log(
              `   📋 With Check após correção: ${updatedPolicy[0].with_check}`,
              'green'
            )

            const isNowOptimized =
              updatedPolicy[0].with_check &&
              updatedPolicy[0].with_check.includes(
                '(SELECT auth.uid()::text)'
              ) &&
              !updatedPolicy[0].with_check.includes(
                '( SELECT (auth.uid())::text AS uid)'
              )

            if (isNowOptimized) {
              log('   ✅ POLÍTICA CORRIGIDA COM SUCESSO!', 'green')
            } else {
              log('   ❌ Política ainda não está otimizada', 'red')
            }
          }
        } else {
          log('   ✅ Política já está otimizada', 'green')
        }
      } catch (error) {
        log(`   ❌ Erro ao investigar: ${error.message}`, 'red')
      }
    }

    log('\n\x1b[1m📊 VERIFICAÇÃO FINAL\x1b[0m', 'white')
    log('\x1b[1m====================\x1b[0m', 'white')

    // Verificar todas as políticas problemáticas
    const allPolicies = await prisma.$queryRaw`
      SELECT 
        tablename,
        policyname,
        cmd,
        with_check
      FROM pg_policies 
      WHERE schemaname = 'public'
        AND (tablename = 'accounts' OR tablename = 'sessions')
        AND policyname LIKE '%insert%'
      ORDER BY tablename, policyname
    `

    log(`\n📋 Políticas INSERT encontradas: ${allPolicies.length}`, 'cyan')
    allPolicies.forEach((policy) => {
      const isOptimized =
        policy.with_check &&
        policy.with_check.includes('(SELECT auth.uid()::text)') &&
        !policy.with_check.includes('( SELECT (auth.uid())::text AS uid)')

      log(
        `   ${isOptimized ? '✅' : '❌'} ${policy.tablename}.${policy.policyname}`,
        isOptimized ? 'green' : 'red'
      )
      if (!isOptimized) {
        log(`      With Check: ${policy.with_check}`, 'yellow')
      }
    })
  } catch (error) {
    log(`❌ Erro geral: ${error.message}`, 'red')
  } finally {
    await prisma.$disconnect()
  }
}

debugPersistentWarnings()
