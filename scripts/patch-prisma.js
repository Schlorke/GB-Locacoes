import fs from 'node:fs'
import path from 'node:path'

console.log('[patch-prisma] Starting Prisma patch for Vercel deployment...')
console.log('[patch-prisma] Environment:', {
  VERCEL: process.env.VERCEL,
  NODE_ENV: process.env.NODE_ENV,
  PWD: process.cwd(),
})

try {
  const prismaClientPath = path.join(
    process.cwd(),
    'node_modules',
    '.prisma',
    'client'
  )
  const nextServerPath = path.join(process.cwd(), '.next', 'server')
  const prismaDestPath = path.join(nextServerPath, '.prisma', 'client')

  // Verificar se o diretório source existe
  if (!fs.existsSync(prismaClientPath)) {
    console.log('[patch-prisma] Source .prisma/client not found, skipping copy')
    process.exit(0)
  }

  // Verificar se estamos na Vercel
  if (process.env.VERCEL) {
    console.log(
      '[patch-prisma] Running on Vercel, using optimized copy strategy'
    )

    // Criar diretórios necessários
    const dirsToCreate = [
      path.join(process.cwd(), '.next'),
      nextServerPath,
      path.join(nextServerPath, 'chunks'),
      path.dirname(prismaDestPath),
    ]

    dirsToCreate.forEach((dir) => {
      if (!fs.existsSync(dir)) {
        console.log(`[patch-prisma] Creating directory: ${dir}`)
        fs.mkdirSync(dir, { recursive: true })
      }
    })

    // Listar arquivos disponíveis
    const clientFiles = fs.readdirSync(prismaClientPath)
    console.log(
      '[patch-prisma] Available files in .prisma/client:',
      clientFiles
    )

    // Copiar todo o diretório .prisma/client
    fs.cpSync(prismaClientPath, prismaDestPath, {
      recursive: true,
      force: true,
    })
    console.log('[patch-prisma] ✅ Full .prisma/client copied to .next/server/')

    // Copiar engines específicos para chunks (estratégia adicional)
    const engineFiles = clientFiles.filter(
      (file) =>
        file.includes('query_engine') ||
        file.includes('schema_engine') ||
        file.endsWith('.node') ||
        file.includes('libquery_engine')
    )

    if (engineFiles.length > 0) {
      const chunksPath = path.join(nextServerPath, 'chunks')
      engineFiles.forEach((file) => {
        try {
          const srcPath = path.join(prismaClientPath, file)
          const destPath = path.join(chunksPath, file)
          fs.copyFileSync(srcPath, destPath)
          console.log(`[patch-prisma] ✓ Copied engine ${file} to chunks/`)
        } catch (error) {
          console.warn(
            `[patch-prisma] ⚠ Failed to copy ${file} to chunks:`,
            error.message
          )
        }
      })
    }

    // Verificar resultado final
    const destFiles = fs.readdirSync(prismaDestPath)
    console.log(
      `[patch-prisma] Files in destination: ${destFiles.length} files`
    )
  } else {
    console.log('[patch-prisma] Not running on Vercel, standard copy')

    // Criar diretório de destino
    fs.mkdirSync(prismaDestPath, { recursive: true })

    // Copiar recursivamente
    fs.cpSync(prismaClientPath, prismaDestPath, {
      recursive: true,
      force: true,
    })
    console.log('[patch-prisma] ✅ Prisma engines copied to .next/server/')
  }

  console.log('[patch-prisma] ✅ Patch completed successfully')
} catch (error) {
  console.error('[patch-prisma] ❌ Error copying Prisma engines:', error)

  if (process.env.VERCEL) {
    console.error(
      '[patch-prisma] This error on Vercel might cause API failures'
    )
  }

  // Não falhar o build, mas logar bem o erro
  process.exit(0)
}
