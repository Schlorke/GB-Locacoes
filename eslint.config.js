// ESLint v9 flat config for Next.js project
import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

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

  // TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        // Next.js specific globals
        React: 'readonly',
        JSX: 'readonly',
        // Additional TypeScript globals
        EventListener: 'readonly',
        NodeJS: 'readonly',
        RequestInit: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react: react,
      'react-hooks': reactHooks,
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',

      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // General rules
      'no-console': 'off', // Permitir console.log para desenvolvimento
      'no-debugger': 'error',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // JavaScript files
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        // Next.js specific globals
        React: 'readonly',
        JSX: 'readonly',
        // Additional TypeScript globals
        EventListener: 'readonly',
        NodeJS: 'readonly',
        RequestInit: 'readonly',
      },
    },
    rules: {
      'no-console': 'off', // Permitir console.log para desenvolvimento
      'no-debugger': 'error',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
]
