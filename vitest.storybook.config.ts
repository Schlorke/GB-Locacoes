import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['.storybook/vitest.setup.ts'],
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(dirname, './'),
      '@/components': path.resolve(dirname, './components'),
      '@/lib': path.resolve(dirname, './lib'),
      '@/hooks': path.resolve(dirname, './hooks'),
      '@/types': path.resolve(dirname, './types'),
      '@/app': path.resolve(dirname, './app'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'markdown-to-jsx'],
  },
})
