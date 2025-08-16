#!/usr/bin/env node

/**
 * Script de diagnóstico para problemas de banco de dados
 * Uso: node scripts/diagnose-database.js
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔍 DIAGNÓSTICO DE BANCO DE DADOS - GB Locações')
console.log('='.repeat(60))

// 1. Verificar variáveis de ambiente
console.log('\n📋 1. VERIFICAÇÃO DE VARIÁVEIS DE AMBIENTE')
console.log('-'.repeat(40))

const envFile = path.join(__dirname, '..', '.env.local')
const envExists = fs.existsSync(envFile)

console.log(`📁 .env.local: ${envExists ? '✅ Existe' : '❌ Não encontrado'}`)

if (envExists) {
  const envContent = fs.readFileSync(envFile, 'utf8')
  const lines = envContent
    .split('\n')
    .filter((line) => line.trim() && !line.startsWith('#'))

  console.log(`📝 Variáveis configuradas: ${lines.length}`)

  lines.forEach((line) => {
    const [key] = line.split('=')
    if (key) {
      console.log(`   ${key}`)
    }
  })
} else {
  console.log('⚠️  Arquivo .env.local não encontrado!')
  console.log('   Crie este arquivo com suas variáveis de ambiente.')
}

// 2. Verificar configuração do Prisma
console.log('\n🗄️ 2. VERIFICAÇÃO DO PRISMA')
console.log('-'.repeat(40))

const prismaDir = path.join(__dirname, '..', 'node_modules', '.prisma')
const prismaExists = fs.existsSync(prismaDir)

console.log(
  `📁 .prisma/client: ${prismaExists ? '✅ Existe' : '❌ Não encontrado'}`
)

if (prismaExists) {
  const clientDir = path.join(prismaDir, 'client')
  const clientExists = fs.existsSync(clientDir)
  console.log(
    `📁 .prisma/client: ${clientExists ? '✅ Existe' : '❌ Não encontrado'}`
  )

  if (clientExists) {
    const files = fs.readdirSync(clientDir)
    console.log(`📄 Arquivos do cliente: ${files.length}`)
    files.slice(0, 5).forEach((file) => {
      console.log(`   ${file}`)
    })
    if (files.length > 5) {
      console.log(`   ... e mais ${files.length - 5} arquivos`)
    }
  }
} else {
  console.log('⚠️  Cliente Prisma não encontrado!')
  console.log('   Execute: pnpm db:generate')
}

// 3. Verificar schema do Prisma
console.log('\n📋 3. VERIFICAÇÃO DO SCHEMA')
console.log('-'.repeat(40))

const schemaFile = path.join(__dirname, '..', 'prisma', 'schema.prisma')
const schemaExists = fs.existsSync(schemaFile)

console.log(
  `📁 schema.prisma: ${schemaExists ? '✅ Existe' : '❌ Não encontrado'}`
)

if (schemaExists) {
  const schemaContent = fs.readFileSync(schemaFile, 'utf8')
  const datasourceMatch = schemaContent.match(/datasource\s+db\s*\{[\s\S]*?\}/)

  if (datasourceMatch) {
    console.log('✅ Configuração de datasource encontrada')
    const datasource = datasourceMatch[0]

    if (datasource.includes('env("DATABASE_URL")')) {
      console.log('✅ DATABASE_URL configurado no schema')
    } else {
      console.log('❌ DATABASE_URL não configurado no schema')
    }

    if (datasource.includes('env("DIRECT_URL")')) {
      console.log('✅ DIRECT_URL configurado no schema')
    } else {
      console.log('❌ DIRECT_URL não configurado no schema')
    }
  } else {
    console.log('❌ Configuração de datasource não encontrada')
  }
}

// 4. Verificar package.json
console.log('\n📦 4. VERIFICAÇÃO DE DEPENDÊNCIAS')
console.log('-'.repeat(40))

const packageFile = path.join(__dirname, '..', 'package.json')
const packageExists = fs.existsSync(packageFile)

if (packageExists) {
  const packageContent = JSON.parse(fs.readFileSync(packageFile, 'utf8'))
  const dependencies = packageContent.dependencies || {}

  console.log(
    `📦 @prisma/client: ${dependencies['@prisma/client'] || '❌ Não encontrado'}`
  )
  console.log(`📦 prisma: ${dependencies['prisma'] || '❌ Não encontrado'}`)

  // Verificar scripts relacionados ao banco
  const scripts = packageContent.scripts || {}
  const dbScripts = Object.keys(scripts).filter((key) => key.includes('db'))

  console.log(`🔧 Scripts de banco: ${dbScripts.length}`)
  dbScripts.forEach((script) => {
    console.log(`   ${script}: ${scripts[script]}`)
  })
}

// 5. Verificar build
console.log('\n🏗️ 5. VERIFICAÇÃO DE BUILD')
console.log('-'.repeat(40))

const nextDir = path.join(__dirname, '..', '.next')
const nextExists = fs.existsSync(nextDir)

console.log(`📁 .next: ${nextExists ? '✅ Existe' : '❌ Não encontrado'}`)

if (nextExists) {
  const serverDir = path.join(nextDir, 'server')
  const serverExists = fs.existsSync(serverDir)
  console.log(
    `📁 .next/server: ${serverExists ? '✅ Existe' : '❌ Não encontrado'}`
  )

  if (serverExists) {
    const prismaServerDir = path.join(serverDir, '.prisma')
    const prismaServerExists = fs.existsSync(prismaServerDir)
    console.log(
      `📁 .next/server/.prisma: ${prismaServerExists ? '✅ Existe' : '❌ Não encontrado'}`
    )
  }
}

// 6. Recomendações
console.log('\n💡 6. RECOMENDAÇÕES')
console.log('-'.repeat(40))

if (!envExists) {
  console.log(
    '🚨 CRÍTICO: Crie um arquivo .env.local com suas variáveis de ambiente'
  )
  console.log('   Exemplo:')
  console.log(
    '   DATABASE_URL="postgresql://user:pass@host:port/db?schema=public"'
  )
  console.log(
    '   DIRECT_URL="postgresql://user:pass@host:port/db?schema=public"'
  )
}

if (!prismaExists) {
  console.log('🚨 CRÍTICO: Cliente Prisma não encontrado')
  console.log('   Execute: pnpm db:generate')
}

if (!nextExists) {
  console.log('⚠️  Build não encontrado')
  console.log('   Execute: pnpm build')
}

console.log('\n🔧 COMANDOS DE RECUPERAÇÃO:')
console.log('   pnpm db:generate          # Regenerar cliente Prisma')
console.log('   pnpm build                # Fazer build completo')
console.log('   pnpm check:prisma         # Verificar Prisma')
console.log('   pnpm check:compatibility  # Verificar compatibilidade')

console.log('\n📊 VERIFICAÇÃO COMPLETA!')
console.log('='.repeat(60))
