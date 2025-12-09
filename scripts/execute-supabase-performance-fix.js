#!/usr/bin/env node

/**
 * Script para Executar Migration de Performance do Supabase
 *
 * Este script executa a migration que corrige problemas de performance
 * identificados pelo Supabase Database Linter:
 * - Adiciona índices em foreign keys não indexadas
 */

import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Carregar variáveis de ambiente do arquivo .env se existir
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const envPath = join(__dirname, '..', '.env')

if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf8')
  envContent.split('\n').forEach((line) => {
    const trimmedLine = line.trim()
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=')
      if (key && valueParts.length > 0) {
        const value = valueParts
          .join('=')
          .trim()
          .replace(/^["']|["']$/g, '')
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = value
        }
      }
    }
  })
}

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

async function executeMigration() {
  // Importar prisma dinamicamente após carregar .env
  let prisma = null
  try {
    const prismaModule = await import('./prisma-client.js')
    prisma = prismaModule.prisma

    log('🚀 Executando Migration de Performance do Supabase...', 'bright')
    log('=====================================================', 'bright')

    // Caminho para o arquivo de migration
    const migrationPath = join(
      __dirname,
      '..',
      'prisma',
      'migrations',
      '20251208_fix_supabase_performance_issues.sql'
    )

    // Ler o arquivo de migration
    log('📖 Lendo arquivo de migration...', 'cyan')
    let migrationSQL = readFileSync(migrationPath, 'utf8')

    // Remover comentários de linha (-- até o fim da linha)
    migrationSQL = migrationSQL.replace(/--.*$/gm, '')

    // Remover comentários de bloco (/* ... */)
    migrationSQL = migrationSQL.replace(/\/\*[\s\S]*?\*\//g, '')

    // Dividir em comandos individuais (separados por ;)
    const commands = migrationSQL
      .split(';')
      .map((cmd) => cmd.trim())
      .filter((cmd) => cmd.length > 0 && !cmd.startsWith('=') && cmd !== '')

    log(`📝 Encontrados ${commands.length} comandos SQL para executar`, 'cyan')

    let successCount = 0
    let errorCount = 0
    const errors = []

    log('\n🔄 Executando comandos...', 'yellow')

    for (let i = 0; i < commands.length; i++) {
      const command = commands[i]
      if (command.trim()) {
        try {
          // Usar $executeRaw para comandos DDL
          await prisma.$executeRawUnsafe(command)
          successCount++
          log(`✅ Comando ${i + 1}/${commands.length} executado`, 'green')
        } catch (error) {
          // Ignorar erros de "já existe" para CREATE INDEX IF NOT EXISTS
          if (
            error.message?.includes('already exists') ||
            error.message?.includes('duplicate')
          ) {
            log(
              `⚠️  Comando ${i + 1}/${commands.length}: ${error.message}`,
              'yellow'
            )
            successCount++
          } else {
            errorCount++
            const errorInfo = {
              command: i + 1,
              sql: command.substring(0, 100) + '...',
              error: error.message,
            }
            errors.push(errorInfo)
            log(`❌ Erro no comando ${i + 1}: ${error.message}`, 'red')
          }
        }
      }
    }

    log('\n📊 RESULTADO DA MIGRATION:', 'bright')
    log('============================', 'bright')
    log(`✅ Comandos executados com sucesso: ${successCount}`, 'green')
    log(`❌ Comandos com erro: ${errorCount}`, errorCount > 0 ? 'red' : 'green')

    if (errors.length > 0) {
      log('\n❌ ERROS DETALHADOS:', 'red')
      errors.forEach((err) => {
        log(`\n  Comando ${err.command}:`, 'yellow')
        log(`  SQL: ${err.sql}`, 'cyan')
        log(`  Erro: ${err.error}`, 'red')
      })
    }

    // Verificar índices criados
    log('\n🔍 Verificando índices criados...', 'cyan')
    try {
      const indexes = await prisma.$queryRaw`
        SELECT indexname, tablename
        FROM pg_indexes
        WHERE schemaname = 'public'
        AND tablename = 'quotes'
        AND indexname IN ('quotes_approvedBy_idx', 'quotes_rejectedBy_idx')
        ORDER BY indexname;
      `
      log(`✅ Índices encontrados: ${indexes.length}`, 'green')
      indexes.forEach((idx) => {
        log(`  - ${idx.indexname}`, 'cyan')
      })
    } catch (error) {
      log(`⚠️  Erro ao verificar índices: ${error.message}`, 'yellow')
    }

    log('\n✅ Migration concluída!', 'green')
  } catch (error) {
    log(`\n❌ ERRO FATAL: ${error.message}`, 'red')
    console.error(error)
    process.exit(1)
  } finally {
    if (prisma) {
      await prisma.$disconnect()
    }
  }
}

// Executar migration
executeMigration()
