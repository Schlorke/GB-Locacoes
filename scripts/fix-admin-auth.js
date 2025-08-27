#!/usr/bin/env node

/**
 * Script para corrigir as chamadas de requireAdmin e requireAdminOrOperator
 * removendo o parâmetro request que não é mais necessário
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.join(__dirname, '..')

// Função para corrigir um arquivo
function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8')
    let hasChanges = false

    // Corrigir requireAdmin(request) para requireAdmin()
    if (content.includes('requireAdmin(request)')) {
      content = content.replaceAll('requireAdmin(request)', 'requireAdmin()')
      hasChanges = true
      console.log(
        `✅ Fixed requireAdmin calls in: ${path.relative(projectRoot, filePath)}`
      )
    }

    // Corrigir requireAdminOrOperator(request) para requireAdminOrOperator()
    if (content.includes('requireAdminOrOperator(request)')) {
      content = content.replaceAll(
        'requireAdminOrOperator(request)',
        'requireAdminOrOperator()'
      )
      hasChanges = true
      console.log(
        `✅ Fixed requireAdminOrOperator calls in: ${path.relative(projectRoot, filePath)}`
      )
    }

    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8')
    }

    return hasChanges
  } catch (error) {
    console.error(`❌ Error fixing file ${filePath}:`, error.message)
    return false
  }
}

// Lista de arquivos a corrigir baseado nos erros de TypeScript
const filesToFix = [
  'app/api/admin/categories/[id]/route.ts',
  'app/api/admin/categories/route.ts',
  'app/api/admin/dashboard/route.ts',
  'app/api/admin/equipments/[id]/route.ts',
  'app/api/admin/equipments/route.ts',
  'app/api/admin/quotes/[id]/route.ts',
  'app/api/admin/quotes/route.ts',
  'app/api/admin/security/route.ts',
]

console.log('🔧 Iniciando correção das chamadas de autenticação admin...\n')

let totalFixed = 0

filesToFix.forEach((relativePath) => {
  const fullPath = path.join(projectRoot, relativePath)
  if (fs.existsSync(fullPath)) {
    const wasFixed = fixFile(fullPath)
    if (wasFixed) totalFixed++
  } else {
    console.log(`⚠️ File not found: ${relativePath}`)
  }
})

console.log(`\n🎉 Correção completa! ${totalFixed} arquivos foram corrigidos.`)

if (totalFixed > 0) {
  console.log('\n📝 Próximos passos:')
  console.log('1. Execute: pnpm run type-check')
  console.log('2. Teste as APIs admin para garantir funcionamento')
  console.log('3. Execute os testes: pnpm test')
}
