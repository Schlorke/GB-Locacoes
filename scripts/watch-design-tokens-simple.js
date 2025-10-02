#!/usr/bin/env node

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('👀 Watching Design Tokens (Simple Mode)...')
console.log('📁 Watching file: design-tokens/base.json')
console.log('🔄 Press Ctrl+C to stop')
console.log('')

let lastBuildTime = 0
const buildInterval = 3000 // 3 segundos
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

// Watch apenas o arquivo base.json
const baseJsonPath = path.join(__dirname, '../design-tokens/base.json')

if (!fs.existsSync(baseJsonPath)) {
  console.error('❌ File not found: design-tokens/base.json')
  process.exit(1)
}

console.log('✅ Watching file:', baseJsonPath)
console.log('')

fs.watchFile(baseJsonPath, { interval: 2000 }, (curr, prev) => {
  const now = Date.now()
  if (now - lastBuildTime > buildInterval && !isBuilding) {
    console.log(
      `📝 File changed: base.json (${new Date().toLocaleTimeString()})`
    )
    buildTokens()
  }
})

// Keep the process running
process.on('SIGINT', () => {
  console.log('\n👋 Stopping design tokens watcher...')
  fs.unwatchFile(baseJsonPath)
  process.exit(0)
})
