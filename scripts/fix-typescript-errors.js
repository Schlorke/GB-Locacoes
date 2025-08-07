#!/usr/bin/env node

/**
 * Script para corrigir automaticamente erros de TypeScript comuns
 * Foca nos erros que estão causando falhas no CI/CD
 */

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

console.log('🔧 Corrigindo erros de TypeScript...')

const filesToFix = [
  'app/admin/equipamentos/[id]/editar/page.tsx',
  'app/admin/equipamentos/novo/page.tsx',
  'app/admin/equipamentos/page.tsx',
  'app/orcamento/page.tsx',
  'components/admin/hero-carousel-manager.tsx',
  'components/admin/mini-carousel.tsx',
  'components/scroll-reveal-init.tsx',
  'components/ui/chart.tsx',
  'components/ui/input-otp.tsx',
]

function fixImageSrcErrors(content) {
  // Corrigir erros de src que podem ser undefined
  return content
    .replace(/src=\{([^}]+)\}/g, (match, src) => {
      if (src.includes('images[') || src.includes('imageUrl')) {
        return `src={${src} || ''}`
      }
      return match
    })
    .replace(/src=\{([^}]+)\}/g, (match, src) => {
      if (src.includes('currentImageIndex')) {
        return `src={${src} || ''}`
      }
      return match
    })
}

function fixUndefinedChecks(content) {
  // Adicionar verificações para undefined
  return content
    .replace(
      /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\.\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\.\s*trim\(\)/g,
      '$1 && $1.$2 && $1.$2.trim()'
    )
    .replace(
      /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\.\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\.\s*([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
      (match, obj, prop1, prop2) => {
        if (prop1 === 'images' && prop2 === 'length') {
          return `${obj} && ${obj}.${prop1} && ${obj}.${prop1}.${prop2}`
        }
        return match
      }
    )
}

function fixUseEffectReturn(content) {
  // Corrigir useEffect que não retorna em todos os caminhos
  const useEffectRegex =
    /useEffect\(\(\)\s*=>\s*\{([^}]*)\s*if\s*\(([^)]+)\)\s*\{([^}]*)\s*return\s*\([^)]+\)\s*([^}]*)\s*\}\s*([^}]*)\}/g

  return content.replace(
    useEffectRegex,
    (match, before, condition, inside, after, end) => {
      if (!end.includes('return')) {
        return `useEffect(() => {
${before}if (${condition}) {
${inside}return (${inside})
${after}}
// Retorno explícito para quando a condição é falsa
return undefined
${end}}`
      }
      return match
    }
  )
}

async function fixFile(filePath) {
  try {
    const fullPath = join(process.cwd(), filePath)
    let content = readFileSync(fullPath, 'utf8')

    console.log(`📝 Corrigindo ${filePath}...`)

    // Aplicar correções
    content = fixImageSrcErrors(content)
    content = fixUndefinedChecks(content)
    content = fixUseEffectReturn(content)

    // Salvar arquivo corrigido
    writeFileSync(fullPath, content, 'utf8')
    console.log(`✅ ${filePath} corrigido`)
  } catch (error) {
    console.error(`❌ Erro ao corrigir ${filePath}:`, error.message)
  }
}

async function main() {
  console.log('🚀 Iniciando correção automática de erros TypeScript...')

  for (const file of filesToFix) {
    await fixFile(file)
  }

  console.log('🎉 Correção concluída!')
  console.log(
    '📋 Execute "pnpm type-check" para verificar se os erros foram resolvidos'
  )
}

main().catch(console.error)
