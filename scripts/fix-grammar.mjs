#!/usr/bin/env node
/**
 * Script para corrigir erros gramaticais em arquivos usando LanguageTool API
 *
 * Uso:
 *   node scripts/fix-grammar.mjs [arquivo]
 *
 * IMPORTANTE: Este script usa a API pública do LanguageTool (gratuita)
 * com limite de 20 requisições/minuto. Para uso intensivo, considere
 * instalar o servidor local.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// Arquivo alvo (padrão: CHANGELOG.md)
const targetFile = process.argv[2] || 'CHANGELOG.md'
const filePath = resolve(process.cwd(), targetFile)

// Verificar se arquivo existe
if (!existsSync(filePath)) {
  console.error(`❌ Arquivo não encontrado: ${targetFile}`)
  process.exit(1)
}

console.log(`📖 Analisando gramática de: ${targetFile}`)
console.log('⚠️  Usando API pública do LanguageTool (pode ser lento)...\n')

// Ler arquivo
let content = readFileSync(filePath, 'utf8')

// Remover blocos de código para não confundir o LanguageTool
const codeBlocks = []
let codeBlockIndex = 0

// Substituir code blocks por placeholders
content = content.replace(/```[\s\S]*?```/g, (match) => {
  const placeholder = `CODEBLOCK${codeBlockIndex}`
  codeBlocks.push({ placeholder, content: match })
  codeBlockIndex++
  return placeholder
})

// Substituir inline code por placeholders
content = content.replace(/`[^`]+`/g, (match) => {
  const placeholder = `INLINECODE${codeBlockIndex}`
  codeBlocks.push({ placeholder, content: match })
  codeBlockIndex++
  return placeholder
})

// Dividir em blocos menores (API tem limite de tamanho)
const CHUNK_SIZE = 10000 // caracteres por requisição
const chunks = []
for (let i = 0; i < content.length; i += CHUNK_SIZE) {
  chunks.push(content.substring(i, i + CHUNK_SIZE))
}

console.log(`📊 Total de caracteres: ${content.length}`)
console.log(`📦 Dividido em ${chunks.length} bloco(s)\n`)

async function checkGrammar(text) {
  const apiUrl = 'https://api.languagetool.org/v2/check'

  const params = new URLSearchParams({
    text: text,
    language: 'pt-BR',
    enabledOnly: 'false',
  })

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`❌ Erro na API: ${error.message}`)
    return null
  }
}

// Lista de regras a IGNORAR (falsos positivos comuns em docs técnicas)
const IGNORED_RULES = [
  'MORFOLOGIK_RULE_PT_BR', // Ignora palavras técnicas em inglês
  'LOOSE_ACCENTS', // Ignora backticks como acentos
  'UNPAIRED_BRACKETS', // Ignora colchetes de markdown
  'UPPERCASE_SENTENCE_START', // Ignora início de frase em maiúscula (cabeçalhos)
  'PT_BARBARISMS_REPLACE', // Ignora estrangeirismos técnicos aceitos
  'PT_COLOUR_HYPHENATION', // Ignora cores sem hífen (comum em CSS/Tailwind)
  'ABREVIATIONS_PUNCTUATION', // Ignora abreviações sem ponto (comum em tech docs)
  'TIME_FORMAT', // Ignora versões (5.39.11) interpretadas como hora
  'DECIMAL_COMMA', // Ignora números com ponto (versões, não decimais)
  'UPPERCASE_AFTER_COMMA', // Ignora maiúscula após dois pontos (comum em títulos)
  'SPACE_AFTER_PUNCTUATION', // Ignora espaço após ... (comum em truncamentos)
  'GENERAL_NUMBER_AGREEMENT_ERRORS', // Ignora concordância (muitos falsos positivos com termos técnicos)
  'SEPARADORES_DE_ESTADOS_BRASILEIROS', // Ignora formatação de estados
  'WHITESPACE_RULE', // Ignora espaços duplos (trivial, formatter resolve)
  'PT_WORDINESS_REPLACE', // Ignora sugestões de estilo (não são erros)
  'GENERAL_GENDER_AGREEMENT_ERRORS', // Ignora concordância de gênero (status é masculino, base pode ser)
]

// Lista de palavras técnicas a IGNORAR
const TECHNICAL_TERMS = [
  // Termos markdown e changelog
  'changelog',
  'keep',
  'fixed',
  'added',
  'changed',
  'removed',
  'security',
  'technical',

  // Bibliotecas e frameworks
  'sonner',
  'toaster',
  'promise',
  'react',
  'next.js',
  'prisma',
  'supabase',
  'vercel',
  'storybook',
  'tailwind',
  'typescript',
  'javascript',
  'node',
  'npm',
  'pnpm',
  'vitest',
  'playwright',
  'nextauth',
  'stripe',
  'resend',
  'zod',
  'framer',
  'motion',
  'radix',
  'shadcn',
  'lucide',
  'embla',
  'carousel',

  // Termos CSS/UI
  'hover',
  'focus',
  'active',
  'border',
  'shadow',
  'padding',
  'margin',
  'gap',
  'grid',
  'flex',
  'inline',
  'block',
  'absolute',
  'relative',
  'fixed',
  'static',
  'sticky',
  'overflow',
  'hidden',
  'visible',
  'auto',
  'scroll',
  'rounded',
  'gradient',
  'backdrop',
  'media',
  'queries',
  'breakpoint',
  'responsive',
  'mobile',
  'desktop',
  'tablet',
  'design',
  'tokens',
  'system',
  'theme',
  'variant',
  'size',
  'color',
  'spacing',

  // Termos de código
  'true',
  'false',
  'null',
  'undefined',
  'const',
  'let',
  'var',
  'function',
  'class',
  'import',
  'export',
  'default',
  'return',
  'await',
  'async',
  'props',
  'state',

  // Atributos HTML/React
  'data-visible',
  'data-type',
  'data-description',
  'data-title',
  'data-sonner',
  'className',
  'onClick',
  'onChange',
  'onSubmit',

  // Termos técnicos gerais
  'api',
  'url',
  'css',
  'html',
  'json',
  'sql',
  'http',
  'https',
  'localhost',
  'build',
  'deploy',
  'commit',
  'push',
  'pull',
  'merge',
  'branch',
  'git',
  'github',
  'database',
  'schema',
  'migration',
  'seed',
  'query',
  'mutation',
  'resolver',
  'middleware',
  'endpoint',
  'route',
  'handler',
  'controller',
  'service',
  'repository',
  'model',
  'view',
  'component',
  'hook',
  'util',
  'helper',
  'config',
  'env',
  'type',
  'interface',
  'enum',
  'union',
  'generic',
  'extends',
  'implements',
  'public',
  'private',
  'protected',

  // UI/UX terms
  'toast',
  'toasts',
  'modal',
  'dialog',
  'popover',
  'dropdown',
  'combobox',
  'select',
  'input',
  'button',
  'card',
  'badge',
  'avatar',
  'skeleton',
  'spinner',
  'loader',
  'accordion',
  'tabs',
  'carousel',
  'slider',
  'switch',
  'checkbox',
  'radio',
  'form',
  'label',
  'placeholder',
  'tooltip',
  'breadcrumb',
  'pagination',
  'navigation',
  'sidebar',
  'header',
  'footer',
  'layout',
  'container',
  'wrapper',
  'section',
  'article',

  // Termos específicos do projeto
  'admin',
  'dashboard',
  'equipamentos',
  'categorias',
  'orcamentos',
  'locacoes',
  'gb-locacoes',
  'whatsapp',
  'oauth',
  'login',
  'logout',
  'signup',
  'signin',

  // Cores
  'orange',
  'green',
  'blue',
  'red',
  'gray',
  'grey',
  'white',
  'black',
  'yellow',
  'purple',
  'pink',
  'indigo',
  'teal',
  'cyan',
  'slate',
  'zinc',
  'neutral',
  'stone',
]

// Processar chunks
let totalErrors = 0
const allMatches = []

for (let i = 0; i < chunks.length; i++) {
  console.log(`🔍 Analisando bloco ${i + 1}/${chunks.length}...`)

  const result = await checkGrammar(chunks[i])

  if (result && result.matches) {
    // Filtrar falsos positivos
    const filtered = result.matches.filter((match) => {
      // Ignorar regras específicas (exato ou que começam com)
      if (
        IGNORED_RULES.some(
          (rule) => match.rule.id === rule || match.rule.id.startsWith(rule)
        )
      ) {
        return false
      }

      // Ignorar palavras técnicas
      const errorText = match.context.text
        .substring(
          match.context.offset,
          match.context.offset + match.context.length
        )
        .toLowerCase()

      if (TECHNICAL_TERMS.some((term) => errorText.includes(term))) {
        return false
      }

      return true
    })

    totalErrors += filtered.length
    allMatches.push(...filtered)
    console.log(
      `  ✓ Encontrados ${result.matches.length} problema(s) (${filtered.length} relevantes)\n`
    )
  }

  // Delay para respeitar rate limit
  if (i < chunks.length - 1) {
    await new Promise((resolve) => setTimeout(resolve, 3000))
  }
}

console.log(`\n📊 Análise concluída!`)
console.log(`🔍 Total de problemas encontrados: ${totalErrors}\n`)

if (totalErrors === 0) {
  console.log('✅ Nenhum erro gramatical encontrado!')
  process.exit(0)
}

// Mostrar primeiros 20 erros
console.log('📝 Primeiros problemas encontrados:\n')
const topMatches = allMatches.slice(0, 20)

topMatches.forEach((match, index) => {
  const context = match.context.text
  const offset = match.context.offset
  const length = match.context.length
  const error = context.substring(offset, offset + length)
  const suggestion = match.replacements[0]?.value || 'sem sugestão'

  console.log(`${index + 1}. "${error}" → "${suggestion}"`)
  console.log(`   Motivo: ${match.message}`)
  console.log(`   Regra: ${match.rule.id}\n`)
})

if (totalErrors > 20) {
  console.log(`... e mais ${totalErrors - 20} problema(s)\n`)
}

console.log('⚠️  NOTA: Para aplicar correções, use a extensão LTeX no VS Code')
console.log('   ou revise manualmente usando as sugestões acima.\n')
console.log(
  '💡 Comando recomendado: abra o arquivo no VS Code e use Ctrl+. nos erros'
)
