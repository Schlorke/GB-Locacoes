#!/usr/bin/env node

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('👀 Watching Design Tokens...')
console.log('📁 Watching directory: design-tokens/ (excluding output/)')
console.log('🔄 Press Ctrl+C to stop')
console.log('')

let lastBuildTime = 0
const buildInterval = 2000 // 2 segundos para evitar loops
let isBuilding = false

function buildTokens() {
  if (isBuilding) {
    console.log('⏳ Build already in progress, skipping...')
    return
  }

  isBuilding = true
  try {
    console.log('🎨 Building Design Tokens...')
    execSync('pnpm design-system:build-tokens', {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    })
    lastBuildTime = Date.now()
    console.log('✅ Design tokens built successfully!')
    console.log('')
  } catch (error) {
    console.error('❌ Error building design tokens:', error.message)
  } finally {
    isBuilding = false
  }
}

// Build inicial
buildTokens()

// Watch for changes (only base.json file)
const baseJsonPath = path.join(__dirname, '../design-tokens/base.json')
fs.watchFile(baseJsonPath, { interval: 1000 }, (curr, prev) => {
  const now = Date.now()
  if (now - lastBuildTime > buildInterval && !isBuilding) {
    console.log(`📝 File changed: base.json`)
    buildTokens()
  }
})

// Keep the process running
process.on('SIGINT', () => {
  console.log('\n👋 Stopping design tokens watcher...')
  process.exit(0)
})
