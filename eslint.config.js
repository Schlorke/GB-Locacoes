// eslint.config.js
import css from '@eslint/css';
import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import parser from '@typescript-eslint/parser';
import configPrettier from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig({
  ignores: ['**/*.css', '**/*.module.css', '**/node_modules/**', '**/.next/**', 'eslint.config.js'],

  files: ['**/*.{js,ts,jsx,tsx}'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser,
    parserOptions: {
      ecmaFeatures: { jsx: true },
      project: './tsconfig.json',
      tsconfigRootDir: process.cwd(),
    },
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  plugins: {
    react,
    json,
    markdown,
    css,
    prettier,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    ...js.configs.recommended.rules,
    ...tseslint.configs.recommended[0].rules,
    ...configPrettier.rules,
    'prettier/prettier': 'error',
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
    'no-undef': 'error',
  },
});
