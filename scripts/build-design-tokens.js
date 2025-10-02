#!/usr/bin/env node

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🎨 Building Design Tokens...')

try {
  // Ensure output directory exists
  const outputDir = path.join(__dirname, '../design-tokens/output')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Run Style Dictionary
  execSync('npx style-dictionary build --config style-dictionary.config.js', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
  })

  console.log('✅ Design tokens built successfully!')
  console.log('📁 Output files:')

  const files = fs.readdirSync(outputDir)
  files.forEach((file) => {
    console.log(`   - ${file}`)
  })

  // Update Tailwind config if tokens were generated
  if (files.includes('tokens-tailwind.json')) {
    console.log('🔄 Tailwind config will use generated tokens on next build')
  }
} catch (error) {
  console.error('❌ Error building design tokens:', error.message)
  process.exit(1)
}
