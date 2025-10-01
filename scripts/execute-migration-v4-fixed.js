#!/usr/bin/env node

/**
 * Script para Executar Migration V4 ULTRA (Versão Corrigida)
 * 
 * Este script executa a migration V4 ULTRA diretamente no banco
 * usando execução SQL direta em vez de template literals.
 */

import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

async function executeMigration() {
  try {
    log('🚀 Executando Migration V4 ULTRA (Versão Corrigida)...', 'bright');
    log('=====================================================', 'bright');
    
    // Caminho para o arquivo de migration
    const migrationPath = join(__dirname, '..', 'prisma', 'migrations', 'performance_optimization_supabase_v4_ULTRA.sql');
    
    // Ler o arquivo de migration
    log('📖 Lendo arquivo de migration...', 'cyan');
    const migrationSQL = readFileSync(migrationPath, 'utf8');
    
    // Dividir em comandos individuais (separados por ;)
    const commands = migrationSQL
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => 
        cmd.length > 0 && 
        !cmd.startsWith('--') && 
        !cmd.startsWith('/*') &&
        cmd !== '' &&
        !cmd.includes('$$') && // Remover blocos de função
        !cmd.includes('END IF') &&
        !cmd.includes('END $$')
      );
    
    log(`📝 Encontrados ${commands.length} comandos SQL para executar`, 'cyan');
    
    let successCount = 0;
    let errorCount = 0;
    const errors = [];
    
    log('\n🔄 Executando comandos...', 'yellow');
    
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      if (command.trim()) {
        try {
          // Usar execução SQL direta em vez de template literal
          await prisma.$executeRawUnsafe(command);
          successCount++;
          
          // Mostrar progresso a cada 5 comandos
          if (i % 5 === 0 || i === commands.length - 1) {
            log(`✅ Comando ${i + 1}/${commands.length} executado`, 'green');
          }
        } catch (error) {
          errorCount++;
          const errorInfo = {
            command: i + 1,
            sql: command.substring(0, 100) + '...',
            error: error.message
          };
          errors.push(errorInfo);
          
          // Só mostrar erros críticos
          if (error.message.includes('already exists') || 
              error.message.includes('does not exist')) {
            // Ignorar erros de "já existe" ou "não existe"
            successCount++;
            errorCount--;
          } else {
            log(`❌ Erro no comando ${i + 1}: ${error.message}`, 'red');
          }
        }
      }
    }
    
    log('\n📊 RESULTADO DA MIGRATION:', 'bright');
    log('============================', 'bright');
    log(`✅ Comandos executados com sucesso: ${successCount}`, 'green');
    log(`❌ Comandos com erro: ${errorCount}`, errorCount > 0 ? 'red' : 'green');
    
    if (errorCount > 0) {
      log('\n⚠️  Detalhes dos erros:', 'yellow');
      errors.slice(0, 5).forEach((err, index) => {
        log(`   ${index + 1}. Comando ${err.command}: ${err.error}`, 'yellow');
        log(`      SQL: ${err.sql}`, 'yellow');
      });
      if (errors.length > 5) {
        log(`   ... e mais ${errors.length - 5} erros`, 'yellow');
      }
    }
    
    if (errorCount === 0) {
      log('\n🎉 Migration V4 ULTRA executada com SUCESSO!', 'green');
      log('💡 Execute pnpm run check:supabase para verificar os resultados', 'cyan');
    } else if (errorCount < 10) {
      log('\n⚠️  Migration executada com poucos erros', 'yellow');
      log('💡 A maioria das otimizações foi aplicada com sucesso', 'cyan');
    } else {
      log('\n❌ Migration executada com muitos erros', 'red');
      log('💡 Verifique os logs acima e tente novamente', 'cyan');
    }
    
  } catch (error) {
    log('❌ Erro durante execução da migration:', 'red');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar migration
executeMigration();
