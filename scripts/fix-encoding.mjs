#!/usr/bin/env node
/**
 * Script para corrigir problemas de encoding UTF-8 em arquivos do projeto
 *
 * Uso:
 *   node scripts/fix-encoding.mjs [arquivo]
 *
 * Se nenhum arquivo for especificado, corrige o CHANGELOG.md por padrão
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

// Ler arquivo
console.log(`📖 Lendo arquivo: ${targetFile}`)
let content = readFileSync(filePath, 'utf8')
const originalContent = content

// Mapeamento de caracteres mal codificados para corretos
const replacements = {
  // === CARACTERES PORTUGUESES - ORDEM IMPORTA! ===
  // Palavras compostas específicas primeiro
  'ser├úo': 'serão',
  serão: 'serão',
  çõo: 'ção',
  açõo: 'ação',
  'ç├Áes': 'ções',
  'ç├úo': 'ção',
  ções: 'ções',
  ação: 'ação',

  // Combinações comuns
  '├úo': 'ão',
  '├Áes': 'ões',
  '├Áe': 'õe',
  'Ã§Ã£': 'çã',
  'Ã§Ã£o': 'ção',

  // Caracteres individuais
  '├º': 'ç',
  '├í': 'á',
  '├®': 'ê',
  '├ó': 'ã',
  '├┤': 'ú',
  '├¬': 'ê',
  '├│': 'ó',
  '├¡': 'í',
  '├║': 'ú',
  '├á': 'á',
  '├ì': 'í',
  '├Á': 'õ',
  'Ã©': 'é',
  'Ã§': 'ç',
  'Ã£': 'ã',
  'Ã­': 'í',
  'Ã³': 'ó',
  Ãº: 'ú',
  'Ã¡': 'á',

  // === EMOJIS ===
  'Ô£à': '✅',
  ÔØî: '❌',
  'Ô£¿': '✨',
  '­ƒÉø': '🐛',
  '­ƒöä': '🔄',
  '­ƒôª': '📦',
  '­ƒöÉ': '🔒',
  '­ƒöº': '🔧',
  '­ƒÄ¿': '📄',
  '­ƒôó': '📊',
  '­ƒôØ': '📝',
  '­ƒöÿ': '🔘',
  'ÔÅ│': '⏱',
  '­ƒÄ»': '💡',
  '­ƒöó': '🔢',
  '­ƒ¬Ø': '🎨',
  ÔåÆ: '→',
  ÔööÔöÇÔöÇ: '└──',
  'Ôö£ÔöÇÔöÇ': '├──',
  '­ƒôì': '📍',
  '­ƒöÆ': '🛡',
  ÔÜí: '⚡',
  '­ƒº¬': '🎯',
  '­ƒôê': '📈',
  '­ƒôÜ': '📚',
  '­ƒöì': '🔍',
  '­ƒöæ': '🔑',
  '­ƒÜÇ': '🚨',
  '­ƒôè': '📋',
  'ÔÖ╗´©Å': '♻',
  '­ƒº®': '🎭',
  '­ƒº╣': '🎨',
  'ÔÅ¡´©Å': '⏭',
  '­ƒöñ': '🌐',
  '­ƒöÑ': '🚑',

  // Correções de duplicação
  técnicass: 'técnicas',
  ocorréncias: 'ocorrências',
}

// Contador de substituições
let changeCount = 0

// Fazer todas as substituições
for (const [wrong, correct] of Object.entries(replacements)) {
  const regex = new RegExp(wrong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
  const matches = content.match(regex)

  if (matches) {
    changeCount += matches.length
    content = content.replace(regex, correct)
    console.log(`  ✓ ${matches.length}x: "${wrong}" → "${correct}"`)
  }
}

// Verificar se houve mudanças
if (content === originalContent) {
  console.log('✅ Nenhuma correção necessária! Arquivo já está correto.')
  process.exit(0)
}

// Salvar arquivo com UTF-8
writeFileSync(filePath, content, 'utf8')

console.log(
  `\n✅ ${changeCount} correções aplicadas com sucesso em ${targetFile}!`
)
console.log(`📝 Arquivo salvo com encoding UTF-8`)
