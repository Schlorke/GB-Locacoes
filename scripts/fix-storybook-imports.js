#!/usr/bin/env node
/**
 * Script para corrigir imports do Storybook
 * Substitui @storybook/react por @storybook/react-vite
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { glob } from 'glob'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const cwd = path.dirname(__dirname)

console.log('🔧 Corrigindo imports do Storybook...')

// Encontrar todos os arquivos .stories.tsx
const storyFiles = await glob('stories/**/*.stories.tsx', {
  cwd,
})

let filesFixed = 0

storyFiles.forEach((filePath) => {
  const fullPath = path.join(cwd, filePath)

  try {
    // Ler o arquivo
    let content = fs.readFileSync(fullPath, 'utf8')

    // Verificar se precisa de correção
    if (content.includes("from '@storybook/react'")) {
      // Fazer a substituição
      content = content.replace(
        "from '@storybook/react'",
        "from '@storybook/react-vite'"
      )

      // Escrever de volta
      fs.writeFileSync(fullPath, content, 'utf8')
      console.log(`✅ Corrigido: ${filePath}`)
      filesFixed++
    }
  } catch (error) {
    console.error(`❌ Erro ao processar ${filePath}:`, error.message)
  }
})

console.log(`\n🎉 Processo concluído! ${filesFixed} arquivos corrigidos.`)

if (filesFixed > 0) {
  console.log('\n📝 Próximos passos:')
  console.log('1. Execute: pnpm run build')
  console.log(
    '2. Se ainda houver problemas, verifique se @storybook/react-vite está instalado'
  )
}
