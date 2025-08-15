import fs from 'node:fs'
import path from 'node:path'

try {
  const from = path.join(process.cwd(), 'node_modules', '.prisma', 'client')
  const to = path.join(process.cwd(), '.next', 'server', '.prisma', 'client')

  // Verificar se o diretório source existe
  if (!fs.existsSync(from)) {
    console.log('[patch-prisma] Source .prisma/client not found, skipping copy')
    process.exit(0)
  }

  // Criar diretório de destino se não existir
  fs.mkdirSync(to, { recursive: true })

  // Copiar recursivamente
  fs.cpSync(from, to, { recursive: true })

  console.log('[patch-prisma] ✅ Prisma engines copied to .next/server/')
} catch (error) {
  console.error('[patch-prisma] ❌ Error copying Prisma engines:', error)
  // Não falhar o build por causa disso
  process.exit(0)
}
