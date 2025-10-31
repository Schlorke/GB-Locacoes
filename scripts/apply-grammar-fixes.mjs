#!/usr/bin/env node
/**
 * Script para APLICAR correções gramaticais automaticamente
 *
 * ATENÇÃO: Este script FAZ BACKUP antes de aplicar as correções!
 *
 * Uso:
 *   node scripts/apply-grammar-fixes.mjs [arquivo]
 */

import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'fs'
import { resolve } from 'path'

const targetFile = process.argv[2] || 'CHANGELOG.md'
const filePath = resolve(process.cwd(), targetFile)

if (!existsSync(filePath)) {
  console.error(`❌ Arquivo não encontrado: ${targetFile}`)
  process.exit(1)
}

// Fazer backup
const backupPath = `${filePath}.backup`
copyFileSync(filePath, backupPath)
console.log(`💾 Backup criado: ${backupPath}\n`)

// Ler conteúdo
let content = readFileSync(filePath, 'utf8')
const originalContent = content

// Mapeamento de correções comuns em PT-BR para docs técnicas
const corrections = {
  // Acentuação
  experiencia: 'experiência',
  referencia: 'referência',
  preferencia: 'preferência',
  codigo: 'código',
  pagina: 'página',
  grafico: 'gráfico',
  especifico: 'específico',
  pratico: 'prático',
  logica: 'lógica',
  otimo: 'ótimo',
  unico: 'único',
  publico: 'público',
  basico: 'básico',
  tecnico: 'técnico',
  automatico: 'automático',
  dinamico: 'dinâmico',
  estatico: 'estático',
  mecanico: 'mecânico',
  organico: 'orgânico',

  // Crases (contexto específico - cuidado!)
  'á direita': 'à direita',
  'á esquerda': 'à esquerda',
  'á medida': 'à medida',
  'á vista': 'à vista',
  'devido a ': 'devido à ',
  'devido á': 'devido à',
  'igual á': 'igual à',
  'idêntico á': 'idêntico à',
  'idéntico á': 'idêntico à',
  'similar á': 'similar à',
  'relativo á': 'relativo à',
  'Á direita': 'À direita',
  'Á esquerda': 'À esquerda',
  'posicionado á': 'posicionado à',
  'Posicionado á': 'Posicionado à',

  // Concordância comum
  'foi adicionado': 'foi adicionada',
  'foi corrigido': 'foi corrigida',
  'foi removido': 'foi removida',

  // Plurais
  dependéncia: 'dependência',
  referéncia: 'referência',
  preferéncia: 'preferência',
  ocorréncia: 'ocorrência',

  // Concordância verbal - plural
  'estilos mantém': 'estilos mantêm',
  'atualizações mantém': 'atualizações mantêm',
  'componentes mantém': 'componentes mantêm',
  'arquivos mantém': 'arquivos mantêm',
  'páginas mantém': 'páginas mantêm',

  // Outros erros comuns
  Consisténcia: 'Consistência',
  consisténcia: 'consistência',
  performace: 'performance',
}

let changeCount = 0

// Aplicar correções
for (const [wrong, correct] of Object.entries(corrections)) {
  const regex = new RegExp(wrong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
  const matches = content.match(regex)

  if (matches) {
    changeCount += matches.length
    content = content.replace(regex, correct)
    console.log(`  ✓ ${matches.length}x: "${wrong}" → "${correct}"`)
  }
}

if (content === originalContent) {
  console.log('✅ Nenhuma correção aplicada - arquivo já está correto!')
  process.exit(0)
}

// Salvar
writeFileSync(filePath, content, 'utf8')

console.log(`\n✅ ${changeCount} correções aplicadas em ${targetFile}!`)
console.log(`💾 Backup salvo em: ${backupPath}`)
console.log(`\n💡 Para restaurar backup: mv ${backupPath} ${targetFile}`)
