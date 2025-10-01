#!/usr/bin/env node

/**
 * Script Simples para Verificar Performance do Supabase
 * 
 * Usa apenas Prisma para conectar e verificar:
 * - Políticas RLS existentes
 * - Índices criados
 * - Status das otimizações
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

async function checkDatabaseConnection() {
  log('🔌 Testando conexão com o banco...', 'cyan');
  
  try {
    await prisma.$queryRaw`SELECT 1 as test`;
    log('✅ Conexão com banco estabelecida!', 'green');
    return true;
  } catch (error) {
    log('❌ Erro ao conectar com o banco', 'red');
    console.error(error);
    return false;
  }
}

async function checkRLSPolicies() {
  log('\n🔍 Verificando Políticas RLS...', 'cyan');
  
  try {
    // Query para buscar políticas RLS
    const policies = await prisma.$queryRaw`
      SELECT 
        schemaname,
        tablename,
        policyname,
        cmd,
        qual,
        with_check
      FROM pg_policies 
      WHERE schemaname = 'public'
      ORDER BY tablename, policyname
    `;
    
    log(`✅ Encontradas ${policies.length} políticas RLS`, 'green');
    
    // Verificar se políticas usam SELECT-wrapped auth.uid()
    const problematicPolicies = policies.filter(policy => 
      policy.qual && 
      policy.qual.includes('auth.uid()') && 
      !policy.qual.includes('SELECT auth.uid()')
    );
    
    if (problematicPolicies.length > 0) {
      log(`⚠️  ${problematicPolicies.length} políticas precisam de otimização:`, 'yellow');
      problematicPolicies.forEach(policy => {
        log(`   - ${policy.tablename}.${policy.policyname}`, 'yellow');
        log(`     Qual: ${policy.qual}`, 'yellow');
      });
    } else {
      log('✅ Todas as políticas estão otimizadas!', 'green');
    }
    
    return policies;
  } catch (error) {
    log('❌ Erro ao verificar políticas RLS', 'red');
    console.error(error);
    return [];
  }
}

async function checkIndexes() {
  log('\n🔍 Verificando Índices de Performance...', 'cyan');
  
  try {
    // Query para buscar índices
    const indexes = await prisma.$queryRaw`
      SELECT 
        tablename,
        indexname,
        indexdef
      FROM pg_indexes 
      WHERE schemaname = 'public'
        AND indexname LIKE 'idx_%'
      ORDER BY tablename, indexname
    `;
    
    log(`✅ Encontrados ${indexes.length} índices de performance`, 'green');
    
    // Verificar índices esperados
    const expectedIndexes = [
      'idx_accounts_userid',
      'idx_addresses_userid',
      'idx_cart_items_equipmentid',
      'idx_cart_items_cartid',
      'idx_equipments_categoryid',
      'idx_quote_items_equipmentid',
      'idx_quote_items_quoteid',
      'idx_quotes_userid',
      'idx_rental_items_equipmentid',
      'idx_rental_items_rentalid',
      'idx_rentals_userid',
      'idx_sessions_userid'
    ];
    
    const existingIndexes = indexes.map(idx => idx.indexname);
    const missingIndexes = expectedIndexes.filter(expected => 
      !existingIndexes.includes(expected)
    );
    
    if (missingIndexes.length > 0) {
      log(`⚠️  ${missingIndexes.length} índices estão faltando:`, 'yellow');
      missingIndexes.forEach(idx => log(`   - ${idx}`, 'yellow'));
    } else {
      log('✅ Todos os índices esperados estão presentes!', 'green');
    }
    
    return indexes;
  } catch (error) {
    log('❌ Erro ao verificar índices', 'red');
    console.error(error);
    return [];
  }
}

async function checkPrimaryKeys() {
  log('\n🔍 Verificando Primary Keys...', 'cyan');
  
  try {
    // Query para verificar primary keys
    const primaryKeys = await prisma.$queryRaw`
      SELECT 
        tc.table_name,
        tc.constraint_name,
        kcu.column_name
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
      WHERE tc.constraint_type = 'PRIMARY KEY'
        AND tc.table_schema = 'public'
      ORDER BY tc.table_name
    `;
    
    log(`✅ Encontradas ${primaryKeys.length} primary keys`, 'green');
    
    // Verificar se verificationtokens tem primary key
    const verificationTokensPK = primaryKeys.find(pk => 
      pk.table_name === 'verificationtokens'
    );
    
    if (verificationTokensPK) {
      log('✅ verificationtokens tem primary key!', 'green');
    } else {
      log('⚠️  verificationtokens não tem primary key', 'yellow');
    }
    
    return primaryKeys;
  } catch (error) {
    log('❌ Erro ao verificar primary keys', 'red');
    console.error(error);
    return [];
  }
}

async function checkForeignKeys() {
  log('\n🔍 Verificando Foreign Keys...', 'cyan');
  
  try {
    // Query para buscar foreign keys
    const foreignKeys = await prisma.$queryRaw`
      SELECT 
        tc.table_name,
        kcu.column_name,
        tc.constraint_name,
        ccu.table_name AS foreign_table_name,
        ccu.column_name AS foreign_column_name
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
      JOIN information_schema.constraint_column_usage ccu
        ON ccu.constraint_name = tc.constraint_name
      WHERE tc.constraint_type = 'FOREIGN KEY'
        AND tc.table_schema = 'public'
      ORDER BY tc.table_name, kcu.column_name
    `;
    
    log(`✅ Encontradas ${foreignKeys.length} foreign keys`, 'green');
    
    return foreignKeys;
  } catch (error) {
    log('❌ Erro ao verificar foreign keys', 'red');
    console.error(error);
    return [];
  }
}

async function generateReport(policies, indexes, primaryKeys, foreignKeys) {
  log('\n📊 RELATÓRIO DE PERFORMANCE', 'bright');
  log('============================', 'bright');
  
  // Contar warnings
  const authRLSWarnings = policies.filter(policy => 
    policy.qual && 
    policy.qual.includes('auth.uid()') && 
    !policy.qual.includes('SELECT auth.uid()')
  ).length;
  
  const expectedIndexes = [
    'idx_accounts_userid', 'idx_addresses_userid', 'idx_cart_items_equipmentid',
    'idx_cart_items_cartid', 'idx_equipments_categoryid', 'idx_quote_items_equipmentid',
    'idx_quote_items_quoteid', 'idx_quotes_userid', 'idx_rental_items_equipmentid',
    'idx_rental_items_rentalid', 'idx_rentals_userid', 'idx_sessions_userid'
  ];
  
  const existingIndexes = indexes.map(idx => idx.indexname);
  const missingIndexes = expectedIndexes.filter(expected => 
    !existingIndexes.includes(expected)
  ).length;
  
  const verificationTokensHasPK = primaryKeys.some(pk => 
    pk.table_name === 'verificationtokens'
  );
  
  const totalWarnings = authRLSWarnings + missingIndexes + (verificationTokensHasPK ? 0 : 1);
  
  log(`\n📈 Resumo:`, 'cyan');
  log(`   - Políticas RLS: ${policies.length}`, 'blue');
  log(`   - Índices de performance: ${indexes.length}`, 'blue');
  log(`   - Primary keys: ${primaryKeys.length}`, 'blue');
  log(`   - Foreign keys: ${foreignKeys.length}`, 'blue');
  
  log(`\n⚠️  Warnings encontrados: ${totalWarnings}`, totalWarnings > 0 ? 'yellow' : 'green');
  
  if (authRLSWarnings > 0) {
    log(`   - Políticas RLS não otimizadas: ${authRLSWarnings}`, 'yellow');
  }
  
  if (missingIndexes > 0) {
    log(`   - Índices faltando: ${missingIndexes}`, 'yellow');
  }
  
  if (!verificationTokensHasPK) {
    log(`   - verificationtokens sem primary key: 1`, 'yellow');
  }
  
  if (totalWarnings === 0) {
    log('\n🎉 Parabéns! Seu banco está 100% otimizado!', 'green');
  } else {
    log('\n💡 Recomendações:', 'cyan');
    if (authRLSWarnings > 0) {
      log('   - Execute a migration V4 ULTRA para otimizar políticas RLS', 'cyan');
    }
    if (missingIndexes > 0) {
      log('   - Execute a migration V4 ULTRA para criar índices faltantes', 'cyan');
    }
    if (!verificationTokensHasPK) {
      log('   - Execute a migration V4 ULTRA para adicionar primary key', 'cyan');
    }
  }
}

async function runDiagnostics() {
  log('🚀 Iniciando Verificação de Performance do Supabase...', 'bright');
  log('====================================================', 'bright');
  
  try {
    // Verificar conexão
    const connected = await checkDatabaseConnection();
    if (!connected) {
      return;
    }
    
    // Executar verificações
    const policies = await checkRLSPolicies();
    const indexes = await checkIndexes();
    const primaryKeys = await checkPrimaryKeys();
    const foreignKeys = await checkForeignKeys();
    
    // Gerar relatório
    await generateReport(policies, indexes, primaryKeys, foreignKeys);
    
  } catch (error) {
    log('❌ Erro durante verificação', 'red');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar sempre
runDiagnostics().catch(console.error);

export {
  runDiagnostics,
  checkRLSPolicies,
  checkIndexes,
  checkPrimaryKeys,
  checkForeignKeys
};
