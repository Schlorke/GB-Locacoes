import { FlatCompat } from '@eslint/eslintrc'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

// Use the .eslintrc.cjs configuration in flat config format
export default [
  // Global ignores - aplicados a TODOS os arquivos
  {
    ignores: [
      // Build outputs e cache
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',
      'storybook-static/**',
      '.turbo/**',

      // Dependencies
      'node_modules/**',

      // Config files
      '**/*.config.js',
      '**/*.config.cjs',
      '**/*.config.mjs',
      '**/*.config.ts',
      'tailwind.config.cjs',
      'postcss.config.cjs',
      'next.config.mjs',
      'vitest.config.ts',
      'vitest.storybook.config.ts',

      // Scripts
      'scripts/**',

      // Generated files
      'lib/validations/**',
      '*.openapi.json',
      'public/openapi.json',
      'next-env.d.ts',

      // Test files with flexible types
      'tests/api/**',

      // Storybook files
      '.storybook/**',
      'stories/**',

      // Type definitions with flexible types
      'types/global.d.ts',
      'types/next-auth.d.ts',
      'types/filters.ts',
    ],
  },
  // Aplicar as configurações do Next.js aos arquivos restantes
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
]
