// ESLint v9 compatibility with Next.js
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

export default [
  // Global ignores
  {
    ignores: [
      'lib/validations/schemas/**/*',
      'node_modules/**',
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',
      'storybook-static/**',
      '.turbo/**',
      'scripts/**',
      '*.openapi.json',
      'public/openapi.json',
      'tests/api/**',
      'test-raw-prisma.mjs',
      '.storybook/**',
      'stories/**',
      'types/global.d.ts',
      'types/next-auth.d.ts',
      'types/filters.ts',
      'next-env.d.ts',
      'tailwind.config.cjs',
      'postcss.config.cjs',
      'next.config.mjs',
      'vitest.config.ts',
      'vitest.storybook.config.ts',
      '**/*.config.js',
      '**/*.config.cjs',
      '**/*.config.mjs',
      '**/*.config.ts',
    ],
  },

  // JavaScript recommended config
  js.configs.recommended,

  // Next.js configuration with TypeScript
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
]
