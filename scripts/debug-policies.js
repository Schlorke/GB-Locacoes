#!/usr/bin/env node

/**
 * Script de Debug para Políticas RLS
 *
 * Este script investiga por que as políticas não estão sendo atualizadas
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

async function debugPolicies() {
  try {
    log('🔍 DEBUG: Investigando Políticas RLS', 'bright')
    log('=====================================', 'bright')

    // 1. Verificar se conseguimos alterar políticas
    log('\n1. Testando permissões...', 'cyan')

    try {
      // Tentar criar uma política de teste
      await prisma.$executeRawUnsafe(`
        CREATE POLICY "test_policy_debug" ON public.users
        FOR SELECT
        TO authenticated
        USING (false);
      `)

      log('   ✅ Permissão para criar políticas: OK', 'green')

      // Dropar a política de teste
      await prisma.$executeRawUnsafe(`
        DROP POLICY "test_policy_debug" ON public.users;
      `)

      log('   ✅ Permissão para dropar políticas: OK', 'green')
    } catch (error) {
      log(`   ❌ Erro de permissão: ${error.message}`, 'red')
    }

    // 2. Verificar políticas específicas
    log('\n2. Verificando políticas específicas...', 'cyan')

    const specificPolicies = await prisma.$queryRaw`
      SELECT 
        tablename,
        policyname,
        cmd,
        qual,
        with_check
      FROM pg_policies 
      WHERE schemaname = 'public'
        AND tablename = 'addresses'
        AND policyname = 'Users can delete own addresses'
    `

    if (specificPolicies.length > 0) {
      const policy = specificPolicies[0]
      log(
        `   📋 Política encontrada: ${policy.tablename}.${policy.policyname}`,
        'yellow'
      )
      log(`   Qual: ${policy.qual}`, 'yellow')
      log(`   With Check: ${policy.with_check}`, 'yellow')
    } else {
      log('   ❌ Política não encontrada!', 'red')
    }

    // 3. Tentar alterar uma política específica
    log('\n3. Tentando alterar política específica...', 'cyan')

    try {
      // Dropar política existente
      await prisma.$executeRawUnsafe(`
        DROP POLICY "Users can delete own addresses" ON public.addresses;
      `)
      log('   ✅ Política dropada com sucesso', 'green')

      // Criar nova política otimizada
      await prisma.$executeRawUnsafe(`
        CREATE POLICY "Users can delete own addresses" ON public.addresses
        FOR DELETE
        TO authenticated
        USING ("userId" = (SELECT auth.uid()::text));
      `)
      log('   ✅ Nova política criada com sucesso', 'green')

      // Verificar se foi realmente alterada
      const updatedPolicy = await prisma.$queryRaw`
        SELECT qual
        FROM pg_policies 
        WHERE schemaname = 'public'
          AND tablename = 'addresses'
          AND policyname = 'Users can delete own addresses'
      `

      if (updatedPolicy.length > 0) {
        const qual = updatedPolicy[0].qual
        if (qual && qual.includes('(SELECT auth.uid()::text)')) {
          log('   ✅ Política foi realmente atualizada!', 'green')
        } else {
          log(`   ❌ Política não foi atualizada. Qual: ${qual}`, 'red')
        }
      }
    } catch (error) {
      log(`   ❌ Erro ao alterar política: ${error.message}`, 'red')
    }

    // 4. Verificar se há políticas duplicadas
    log('\n4. Verificando políticas duplicadas...', 'cyan')

    const duplicates = await prisma.$queryRaw`
      SELECT 
        tablename,
        policyname,
        COUNT(*) as count
      FROM pg_policies 
      WHERE schemaname = 'public'
      GROUP BY tablename, policyname
      HAVING COUNT(*) > 1
    `

    if (duplicates.length > 0) {
      log('   ⚠️  Políticas duplicadas encontradas:', 'yellow')
      duplicates.forEach((dup) => {
        log(
          `      - ${dup.tablename}.${dup.policyname} (${dup.count}x)`,
          'yellow'
        )
      })
    } else {
      log('   ✅ Nenhuma política duplicada encontrada', 'green')
    }

    // 5. Verificar usuário atual e permissões
    log('\n5. Verificando usuário e permissões...', 'cyan')

    const currentUser =
      await prisma.$queryRaw`SELECT current_user, session_user`
    log(`   Usuário atual: ${currentUser[0].current_user}`, 'blue')
    log(`   Usuário da sessão: ${currentUser[0].session_user}`, 'blue')

    const isSuperuser =
      await prisma.$queryRaw`SELECT current_setting('is_superuser') as is_superuser`
    log(`   É superusuário: ${isSuperuser[0].is_superuser}`, 'blue')
  } catch (error) {
    log('❌ Erro durante debug:', 'red')
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

// Executar debug
debugPolicies()
