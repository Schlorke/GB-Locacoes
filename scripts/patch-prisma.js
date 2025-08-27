import fs from 'node:fs'
import path from 'node:path'

console.log('[patch-prisma] Starting Prisma patch for Vercel deployment...')

try {
  const from = path.join(process.cwd(), 'node_modules', '.prisma', 'client')
  const to = path.join(process.cwd(), '.next', 'server', '.prisma', 'client')

  // Verificar se o diretório source existe
  if (!fs.existsSync(from)) {
    console.log('[patch-prisma] Source .prisma/client not found, skipping copy')
    // Em ambiente Vercel, isso é normal - não é erro
    process.exit(0)
  }

  // Verificar se estamos na Vercel
  if (process.env.VERCEL) {
    console.log(
      '[patch-prisma] Running on Vercel, using optimized copy strategy'
    )

    // Na Vercel, precisamos garantir que o .next existe
    const nextDir = path.join(process.cwd(), '.next')
    const serverDir = path.join(nextDir, 'server')

    if (!fs.existsSync(nextDir)) {
      console.log('[patch-prisma] Creating .next directory')
      fs.mkdirSync(nextDir, { recursive: true })
    }

    if (!fs.existsSync(serverDir)) {
      console.log('[patch-prisma] Creating .next/server directory')
      fs.mkdirSync(serverDir, { recursive: true })
    }
  }

  // Criar diretório de destino se não existir
  fs.mkdirSync(to, { recursive: true })

  // Copiar recursivamente
  fs.cpSync(from, to, { recursive: true, force: true })

  console.log('[patch-prisma] ✅ Prisma engines copied to .next/server/')

  // Verificar se os arquivos foram copiados corretamente
  const files = fs.readdirSync(to)
  console.log('[patch-prisma] Files in destination:', files.length, 'files')
} catch (error) {
  console.error('[patch-prisma] ❌ Error copying Prisma engines:', error)

  // Se estivermos na Vercel, isso pode ser crítico
  if (process.env.VERCEL) {
    console.error(
      '[patch-prisma] This error on Vercel might cause API failures'
    )
  }

  // Não falhar o build por causa disso, mas logar bem o erro
  process.exit(0)
}
