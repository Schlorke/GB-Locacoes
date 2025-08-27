import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

console.log('[force-engines] 🔧 Forçando download de engines Prisma para Vercel...')
console.log('[force-engines] Environment:', {
  VERCEL: process.env.VERCEL,
  NODE_ENV: process.env.NODE_ENV,
  PRISMA_GENERATE_DATAPROXY: process.env.PRISMA_GENERATE_DATAPROXY
})

if (process.env.VERCEL) {
  try {
    // Forçar download de engines específicos para Linux x64
    console.log('[force-engines] Baixando engines específicos para Vercel...')
    
    // Definir engines necessários
    const engines = [
      'query-engine-rhel-openssl-1.0.x',
      'query-engine-rhel-openssl-1.1.x', 
      'query-engine-debian-openssl-1.1.x',
      'query-engine-debian-openssl-3.0.x'
    ]
    
    const prismaClientPath = path.join(process.cwd(), 'node_modules/.prisma/client')
    
    // Verificar se .prisma/client existe
    if (!fs.existsSync(prismaClientPath)) {
      console.error('[force-engines] ❌ .prisma/client não encontrado')
      process.exit(1)
    }
    
    // Forçar regeneração com engines
    console.log('[force-engines] Limpando cache e regenerando...')
    
    // Limpar e regenerar
    const runtimePath = path.join(prismaClientPath, 'runtime')
    if (fs.existsSync(runtimePath)) {
      fs.rmSync(runtimePath, { recursive: true, force: true })
      console.log('[force-engines] ✓ Cache runtime limpo')
    }
    
    // Regenerar com configuração específica
    process.env.PRISMA_GENERATE_DATAPROXY = 'false'
    process.env.PRISMA_CLI_QUERY_ENGINE_TYPE = 'binary'
    
    console.log('[force-engines] Regenerando Prisma com engines binários...')
    execSync('prisma generate --schema=prisma/schema.prisma', { 
      stdio: 'inherit',
      env: {
        ...process.env,
        PRISMA_GENERATE_DATAPROXY: 'false',
        PRISMA_CLI_QUERY_ENGINE_TYPE: 'binary'
      }
    })
    
    // Verificar se engines foram baixados
    const files = fs.readdirSync(prismaClientPath)
    const engineFiles = files.filter(file => 
      file.includes('query_engine') || 
      file.includes('libquery_engine') ||
      file.endsWith('.node')
    )
    
    console.log('[force-engines] Engines encontrados:', engineFiles)
    
    if (engineFiles.length > 0) {
      console.log('[force-engines] ✅ Engines binários baixados com sucesso!')
    } else {
      console.warn('[force-engines] ⚠️ Nenhum engine binário encontrado')
      
      // Estratégia alternativa: criar diretório runtime
      const runtimeDir = path.join(prismaClientPath, 'runtime')
      if (!fs.existsSync(runtimeDir)) {
        fs.mkdirSync(runtimeDir, { recursive: true })
        console.log('[force-engines] ✓ Diretório runtime criado')
      }
    }
    
  } catch (error) {
    console.error('[force-engines] ❌ Erro ao forçar download de engines:', error.message)
    
    // Não falhar o build, mas logar o erro
    console.log('[force-engines] Continuando build sem engines adicionais...')
  }
} else {
  console.log('[force-engines] Não é ambiente Vercel, pulando...')
}

console.log('[force-engines] ✅ Script concluído')
