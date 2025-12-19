import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Modo verbose para debug (ativar com PATCH_PRISMA_VERBOSE=true)
const VERBOSE = process.env.PATCH_PRISMA_VERBOSE === 'true'

/**
 * Encontra o caminho correto do Prisma Client no pnpm
 */
function findPrismaClientPath() {
  const possiblePaths = [
    // Caminho padrão no npm/yarn
    path.join(process.cwd(), 'node_modules', '.prisma', 'client'),
    // Caminho no pnpm (estrutura flat)
    path.join(process.cwd(), 'node_modules', '@prisma', 'client'),
  ]

  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      return possiblePath
    }
  }

  return null
}

/**
 * Copia recursivamente um diretório
 */
function copyDirectory(src, dest) {
  // Criar diretório de destino
  fs.mkdirSync(dest, { recursive: true })

  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath)
    } else {
      try {
        fs.copyFileSync(srcPath, destPath)
      } catch (error) {
        // Ignorar erros de arquivos bloqueados ou inexistentes
        console.warn(
          `[patch-prisma] Warning: Could not copy ${entry.name}:`,
          error.message
        )
      }
    }
  }
}

try {
  const from = findPrismaClientPath()
  const to = path.join(process.cwd(), '.next', 'server', '.prisma', 'client')

  if (!from) {
    // Apenas mostrar warning se for verbose ou se realmente for um problema
    if (VERBOSE) {
      console.warn(
        '[patch-prisma] ⚠️  Prisma Client not found in node_modules, skipping copy'
      )
      console.warn(
        '[patch-prisma] This is expected if Prisma is not used in server-side code'
      )
    }
    process.exit(0)
  }

  // Verificar se o diretório source realmente existe
  if (!fs.existsSync(from)) {
    if (VERBOSE) {
      console.warn(
        '[patch-prisma] ⚠️  Source directory does not exist, skipping copy'
      )
    }
    process.exit(0)
  }

  // Verificar se .next existe (build deve ter criado)
  const nextDir = path.join(process.cwd(), '.next')
  if (!fs.existsSync(nextDir)) {
    if (VERBOSE) {
      console.warn(
        '[patch-prisma] ⚠️  .next directory does not exist, skipping copy'
      )
    }
    process.exit(0)
  }

  // Criar diretório de destino se não existir
  fs.mkdirSync(to, { recursive: true })

  // Copiar recursivamente usando método compatível com Windows
  if (VERBOSE) {
    console.log(`[patch-prisma] Copying from: ${from}`)
    console.log(`[patch-prisma] Copying to: ${to}`)
  }

  copyDirectory(from, to)

  // Sucesso silencioso - apenas em modo verbose
  if (VERBOSE) {
    console.log('[patch-prisma] ✅ Prisma engines copied to .next/server/')
  }
  process.exit(0)
} catch (error) {
  console.error('[patch-prisma] ❌ Error copying Prisma engines:', error)
  console.error('[patch-prisma] Stack:', error.stack)
  // Não falhar o build por causa disso - continuar com exit(0)
  console.log('[patch-prisma] ⚠️  Continuing build despite error...')
  process.exit(0)
}
