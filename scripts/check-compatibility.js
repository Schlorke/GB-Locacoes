#!/usr/bin/env node

/**
 * 🔍 Script de Verificação de Compatibilidade de Dependências
 *
 * Verifica se as dependências críticas estão nas versões compatíveis
 * para evitar problemas conhecidos no projeto GB-Locacoes.
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// 🚨 Versões críticas que NÃO devem ser atualizadas
const BLOCKED_VERSIONS = {
  '@prisma/client': {
    required: '6.13.0',
    reason: 'Prisma 6.14.0+ causa erro de inicialização com Next.js 15.4.6',
  },
  prisma: {
    required: '6.13.0',
    reason: 'Prisma 6.14.0+ causa erro de inicialização com Next.js 15.4.6',
  },
  tailwindcss: {
    required: '3.4.17',
    reason: 'Tailwind CSS 4.x quebra o sistema de design tokens',
  },
}

// 🟡 Dependências que requerem cuidado
const CAUTION_PACKAGES = [
  'next',
  'react',
  'react-dom',
  'typescript',
  '@next/bundle-analyzer',
]

console.log('🔍 GB-Locacoes - Verificação de Compatibilidade de Dependências\n')

function getPackageJson() {
  const packageJsonPath = path.join(process.cwd(), 'package.json')
  if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ package.json não encontrado!')
    process.exit(1)
  }
  return JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
}

function getCurrentVersion(packageName) {
  try {
    const output = execSync(`pnpm list ${packageName} --depth=0`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    })

    const match = output.match(
      new RegExp(
        `${packageName.replace('/', '\\/')}@([0-9]+\\.[0-9]+\\.[0-9]+)`
      )
    )
    return match ? match[1] : null
  } catch (error) {
    return null
  }
}

function checkBlockedVersions() {
  console.log('🚨 Verificando versões críticas bloqueadas...\n')

  let hasErrors = false

  Object.entries(BLOCKED_VERSIONS).forEach(([packageName, config]) => {
    const currentVersion = getCurrentVersion(packageName)

    if (!currentVersion) {
      console.log(`⚠️  ${packageName}: Não instalado`)
      return
    }

    if (currentVersion !== config.required) {
      console.error(`❌ ERRO: ${packageName}`)
      console.error(`   Versão atual: ${currentVersion}`)
      console.error(`   Versão requerida: ${config.required}`)
      console.error(`   Motivo: ${config.reason}`)
      console.error(`   Correção: pnpm add ${packageName}@${config.required}\n`)
      hasErrors = true
    } else {
      console.log(`✅ ${packageName}: ${currentVersion} (OK)`)
    }
  })

  return hasErrors
}

function checkCautionPackages() {
  console.log('\n🟡 Verificando dependências que requerem cuidado...\n')

  CAUTION_PACKAGES.forEach((packageName) => {
    const currentVersion = getCurrentVersion(packageName)
    if (currentVersion) {
      console.log(
        `⚠️  ${packageName}: ${currentVersion} (verificar antes de atualizar)`
      )
    }
  })
}

function showOutdatedPackages() {
  console.log('\n📊 Dependências desatualizadas (apenas informativo)...\n')

  try {
    execSync('pnpm outdated', { stdio: 'inherit' })
  } catch (error) {
    // pnpm outdated retorna exit code 1 quando há dependências desatualizadas
    // Isso é comportamento normal, não um erro
  }
}

function showRecommendations() {
  console.log('\n💡 Recomendações de Atualização Segura:\n')

  console.log('✅ SEGURO para atualizar:')
  console.log('   pnpm update @radix-ui/react-*     # Componentes UI')
  console.log('   pnpm update @testing-library/*    # Bibliotecas de teste')
  console.log('   pnpm update lucide-react date-fns # Utilitários')

  console.log('\n🟡 CUIDADO (testar build):')
  console.log('   pnpm update zustand               # Estado global')
  console.log('   pnpm update react-hook-form zod   # Formulários')
  console.log('   pnpm run build                    # <- SEMPRE testar!')

  console.log('\n❌ NÃO ATUALIZAR:')
  console.log('   @prisma/client@6.13.0             # Versão bloqueada')
  console.log('   prisma@6.13.0                     # Versão bloqueada')
  console.log('   tailwindcss@3.4.17                # Versão bloqueada')
}

function main() {
  const hasErrors = checkBlockedVersions()

  checkCautionPackages()
  showOutdatedPackages()
  showRecommendations()

  console.log('\n📚 Documentação:')
  console.log('   📖 DEPENDENCY_COMPATIBILITY_GUIDE.md - Guia completo')
  console.log('   🔧 PRISMA_TROUBLESHOOTING.md - Problemas do Prisma')

  if (hasErrors) {
    console.log('\n❌ FALHA: Incompatibilidades críticas encontradas!')
    console.log('🔧 Corrija as versões acima antes de continuar.')
    process.exit(1)
  } else {
    console.log(
      '\n✅ SUCESSO: Todas as dependências críticas estão compatíveis!'
    )
    process.exit(0)
  }
}

// Executar apenas se chamado diretamente
if (require.main === module) {
  main()
}

module.exports = {
  BLOCKED_VERSIONS,
  CAUTION_PACKAGES,
  checkBlockedVersions,
  getCurrentVersion,
}
