#!/usr/bin/env node

/**
 * Script de diagnóstico para problemas de conectividade do banco
 * GB-Locações - Diagnóstico de Conexão
 */

import { createPrismaClient } from './prisma-client.js'
import { execSync } from 'child_process'

console.log('🔍 DIAGNÓSTICO DE CONECTIVIDADE - GB LOCAÇÕES')
console.log('=' * 60)

// 1. Verificar variáveis de ambiente
console.log('\n📋 1. VERIFICANDO VARIÁVEIS DE AMBIENTE')
console.log('-' * 40)

const requiredEnvVars = ['DATABASE_URL', 'DIRECT_URL']
let hasAllEnvVars = true

requiredEnvVars.forEach((varName) => {
  const value = process.env[varName]
  if (value) {
    // Mascarar a URL para segurança
    const maskedValue = value.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')
    console.log(`✅ ${varName}: ${maskedValue}`)
  } else {
    console.log(`❌ ${varName}: AUSENTE`)
    hasAllEnvVars = false
  }
})

if (!hasAllEnvVars) {
  console.log('❌ Algumas variáveis de ambiente estão ausentes!')
  process.exit(1)
}

// 2. Verificar versão do Prisma
console.log('\n🔧 2. VERIFICANDO VERSÃO DO PRISMA')
console.log('-' * 40)

try {
  const prismaVersion = execSync('npx prisma version', { encoding: 'utf8' })
  console.log(prismaVersion)
} catch (error) {
  console.log('❌ Erro ao verificar versão do Prisma:', error.message)
}

// 3. Verificar geração do cliente
console.log('\n⚙️ 3. VERIFICANDO GERAÇÃO DO CLIENTE PRISMA')
console.log('-' * 40)

try {
  const generateOutput = execSync('npx prisma generate', { encoding: 'utf8' })
  console.log(generateOutput)

  // Verificar se mostra engine=binary ou engine=none
  if (generateOutput.includes('engine=binary')) {
    console.log('✅ Cliente gerado com engine binário')
  } else if (generateOutput.includes('engine=none')) {
    console.log('⚠️  Cliente gerado com engine=none (pode ser problema)')
  }
} catch (error) {
  console.log('❌ Erro na geração do cliente:', error.message)
}

// 4. Teste de conectividade básica
console.log('\n🌐 4. TESTE DE CONECTIVIDADE BÁSICA')
console.log('-' * 40)

const prisma = createPrismaClient({
  log: ['error', 'warn', 'info'],
})

try {
  console.log('🔄 Tentando conectar ao banco...')

  // Teste de conexão simples
  await prisma.$connect()
  console.log('✅ Conexão estabelecida com sucesso!')

  // Teste de query simples
  console.log('🔄 Testando query simples...')
  const result = await prisma.$queryRaw`SELECT 1 as test`
  console.log('✅ Query executada com sucesso:', result)
} catch (error) {
  console.log('❌ ERRO DE CONECTIVIDADE:')
  console.log('Código:', error.code)
  console.log('Mensagem:', error.message)

  if (error.code === 'P1001') {
    console.log('\n💡 SUGESTÕES PARA ERRO P1001:')
    console.log('• Verificar se o Supabase está funcionando')
    console.log('• Verificar se as credenciais estão corretas')
    console.log('• Verificar conectividade de rede')
    console.log('• Verificar se não há variáveis PRISMA_GENERATE_* definidas')
  }
} finally {
  await prisma.$disconnect()
}

// 5. Verificar variáveis problemáticas do Prisma
console.log('\n🚨 5. VERIFICANDO VARIÁVEIS PROBLEMÁTICAS')
console.log('-' * 40)

const problematicVars = [
  'PRISMA_GENERATE_DATAPROXY',
  'PRISMA_GENERATE_ACCELERATE',
  'PRISMA_GENERATE_NO_ENGINE',
]

let hasProblematicVars = false

problematicVars.forEach((varName) => {
  const value = process.env[varName]
  if (value !== undefined) {
    console.log(`⚠️  ${varName}: "${value}" (PROBLEMÁTICA!)`)
    hasProblematicVars = true
  } else {
    console.log(`✅ ${varName}: não definida`)
  }
})

if (hasProblematicVars) {
  console.log('\n❌ VARIÁVEIS PROBLEMÁTICAS ENCONTRADAS!')
  console.log('Essas variáveis podem forçar engine=none no Prisma 6.15.0')
  console.log('Remova-as completamente do seu .env')
}

// 6. Verificar status do Supabase
console.log('\n🌍 6. VERIFICANDO STATUS DO SUPABASE')
console.log('-' * 40)

try {
  const response = await fetch('https://status.supabase.com/api/v2/status.json')
  const status = await response.json()
  console.log(`✅ Status Supabase: ${status.status.description}`)
} catch (error) {
  console.log(
    '⚠️  Não foi possível verificar status do Supabase:',
    error.message
  )
}

console.log('\n🏁 DIAGNÓSTICO CONCLUÍDO')
console.log('=' * 60)
