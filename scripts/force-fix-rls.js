#!/usr/bin/env node

/**
 * Script para Forçar Correção das Políticas RLS
 * 
 * Este script força a atualização das políticas RLS que ainda não foram corrigidas,
 * garantindo que todas usem o formato otimizado (SELECT auth.uid()::text)
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Cores para output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function forceFixRLS() {
  try {
    log('🔧 Forçando Correção das Políticas RLS...', 'bright');
    log('==========================================', 'bright');
    
    // Primeiro, vamos verificar quais políticas existem
    log('📋 Verificando políticas existentes...', 'cyan');
    
    const existingPolicies = await prisma.$queryRaw`
      SELECT 
        tablename,
        policyname,
        cmd,
        qual,
        with_check
      FROM pg_policies 
      WHERE schemaname = 'public'
      ORDER BY tablename, policyname
    `;
    
    log(`✅ Encontradas ${existingPolicies.length} políticas existentes`, 'green');
    
    // Identificar políticas que precisam ser corrigidas
    const policiesToFix = existingPolicies.filter(policy => 
      policy.qual && policy.qual.includes('( SELECT (auth.uid())::text AS uid)')
    );
    
    log(`🔍 Identificadas ${policiesToFix.length} políticas que precisam de correção`, 'yellow');
    
    if (policiesToFix.length === 0) {
      log('🎉 Todas as políticas já estão otimizadas!', 'green');
      return;
    }
    
    let successCount = 0;
    let errorCount = 0;
    
    log('\n🔄 Corrigindo políticas...', 'yellow');
    
    for (let i = 0; i < policiesToFix.length; i++) {
      const policy = policiesToFix[i];
      
      try {
        log(`📝 Corrigindo ${i + 1}/${policiesToFix.length}: ${policy.tablename}.${policy.policyname}`, 'cyan');
        
        // Dropar a política existente
        await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "${policy.policyname}" ON public.${policy.tablename};`);
        
        // Criar nova política com formato otimizado
        let newPolicySQL = '';
        
        if (policy.cmd === 'SELECT') {
          newPolicySQL = `CREATE POLICY "${policy.policyname}"
            ON public.${policy.tablename}
            FOR SELECT
            TO authenticated
            USING (${policy.qual.replace('( SELECT (auth.uid())::text AS uid)', '(SELECT auth.uid()::text)')});`;
        } else if (policy.cmd === 'UPDATE') {
          const withCheck = policy.with_check ? policy.with_check.replace('( SELECT (auth.uid())::text AS uid)', '(SELECT auth.uid()::text)') : policy.qual.replace('( SELECT (auth.uid())::text AS uid)', '(SELECT auth.uid()::text)');
          newPolicySQL = `CREATE POLICY "${policy.policyname}"
            ON public.${policy.tablename}
            FOR UPDATE
            TO authenticated
            USING (${policy.qual.replace('( SELECT (auth.uid())::text AS uid)', '(SELECT auth.uid()::text)')})
            WITH CHECK (${withCheck});`;
        } else if (policy.cmd === 'DELETE') {
          newPolicySQL = `CREATE POLICY "${policy.policyname}"
            ON public.${policy.tablename}
            FOR DELETE
            TO authenticated
            USING (${policy.qual.replace('( SELECT (auth.uid())::text AS uid)', '(SELECT auth.uid()::text)')});`;
        } else if (policy.cmd === 'INSERT') {
          const withCheck = policy.with_check ? policy.with_check.replace('( SELECT (auth.uid())::text AS uid)', '(SELECT auth.uid()::text)') : policy.qual.replace('( SELECT (auth.uid())::text AS uid)', '(SELECT auth.uid()::text)');
          newPolicySQL = `CREATE POLICY "${policy.policyname}"
            ON public.${policy.tablename}
            FOR INSERT
            TO authenticated
            WITH CHECK (${withCheck});`;
        } else if (policy.cmd === 'ALL') {
          const withCheck = policy.with_check ? policy.with_check.replace('( SELECT (auth.uid())::text AS uid)', '(SELECT auth.uid()::text)') : policy.qual.replace('( SELECT (auth.uid())::text AS uid)', '(SELECT auth.uid()::text)');
          newPolicySQL = `CREATE POLICY "${policy.policyname}"
            ON public.${policy.tablename}
            FOR ALL
            TO authenticated
            USING (${policy.qual.replace('( SELECT (auth.uid())::text AS uid)', '(SELECT auth.uid()::text)')})
            WITH CHECK (${withCheck});`;
        }
        
        if (newPolicySQL) {
          await prisma.$executeRawUnsafe(newPolicySQL);
          successCount++;
          log(`   ✅ Corrigida com sucesso`, 'green');
        } else {
          log(`   ⚠️  Tipo de comando não suportado: ${policy.cmd}`, 'yellow');
        }
        
      } catch (error) {
        errorCount++;
        log(`   ❌ Erro: ${error.message}`, 'red');
      }
    }
    
    log('\n📊 RESULTADO DA CORREÇÃO FORÇADA:', 'bright');
    log('=====================================', 'bright');
    log(`✅ Políticas corrigidas com sucesso: ${successCount}`, 'green');
    log(`❌ Políticas com erro: ${errorCount}`, errorCount > 0 ? 'red' : 'green');
    
    if (errorCount === 0) {
      log('\n🎉 Todas as políticas foram corrigidas com SUCESSO!', 'green');
      log('💡 Execute pnpm run check:supabase para verificar os resultados', 'cyan');
    } else {
      log('\n⚠️  Algumas políticas tiveram erro', 'yellow');
      log('💡 Verifique os logs acima para detalhes', 'cyan');
    }
    
  } catch (error) {
    log('❌ Erro durante correção forçada:', 'red');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar correção forçada
forceFixRLS();
