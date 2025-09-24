#!/usr/bin/env tsx
/**
 * @fileoverview Script para gerar especificação OpenAPI usando schemas Zod
 *
 * Este script substitui o next-openapi-gen por uma abordagem baseada em Zod,
 * garantindo sincronização perfeita entre validação e documentação.
 */

import { writeFileSync } from 'fs'
import { join } from 'path'
import { generateOpenAPISpec } from '../lib/openapi-generator'

async function main() {
  try {
    console.log('🚀 Gerando especificação OpenAPI com schemas Zod...')

    // Gerar especificação
    const spec = generateOpenAPISpec()

    // Salvar arquivo
    const outputPath = join(process.cwd(), 'public', 'openapi.json')
    writeFileSync(outputPath, JSON.stringify(spec, null, 2))

    console.log('✅ Especificação OpenAPI gerada com sucesso!')
    console.log(`📄 Arquivo: ${outputPath}`)
    console.log(
      `📊 Endpoints documentados: ${Object.keys(spec.paths || {}).length}`
    )
    console.log(
      `🏷️ Schemas registrados: ${Object.keys(spec.components?.schemas || {}).length}`
    )

    // Estatísticas
    const tags = spec.tags?.map((tag) => tag.name).join(', ') || 'Nenhuma'
    console.log(`🏷️ Tags: ${tags}`)

    console.log('\n🔗 Acesse a documentação em:')
    console.log('   http://localhost:3000/api-docs (desenvolvimento)')
    console.log('   https://locacoesgb.com.br/api-docs (produção)')
  } catch (error) {
    console.error('❌ Erro ao gerar especificação OpenAPI:', error)
    process.exit(1)
  }
}

main()
