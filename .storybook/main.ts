import type { StorybookConfig } from '@storybook/react-vite'
import path from 'path'

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // Configurar aliases do TypeScript
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../'),
        '@/components': path.resolve(__dirname, '../components'),
        '@/lib': path.resolve(__dirname, '../lib'),
        '@/hooks': path.resolve(__dirname, '../hooks'),
        '@/types': path.resolve(__dirname, '../types'),
        '@/app': path.resolve(__dirname, '../app'),
      }
    }

    // Configurar variáveis de ambiente para o Storybook
    if (config.define) {
      config.define = {
        ...config.define,
        'process.env': {},
        'process.env.NODE_ENV': JSON.stringify('development'),
        'process.env.NEXT_PUBLIC_VERCEL_URL': JSON.stringify(''),
        'process.env.NEXT_PUBLIC_SITE_URL': JSON.stringify(
          'http://localhost:3000'
        ),
      }
    } else {
      config.define = {
        'process.env': {},
        'process.env.NODE_ENV': JSON.stringify('development'),
        'process.env.NEXT_PUBLIC_VERCEL_URL': JSON.stringify(''),
        'process.env.NEXT_PUBLIC_SITE_URL': JSON.stringify(
          'http://localhost:3000'
        ),
      }
    }

    // Configurar para lidar com módulos do Next.js
    if (config.optimizeDeps) {
      config.optimizeDeps = {
        ...config.optimizeDeps,
        include: [
          ...(config.optimizeDeps.include || []),
          'next/image',
          'next/link',
          'next/navigation',
          'next/router',
          'next/head',
          'markdown-to-jsx',
          'react',
          'react-dom',
        ],
      }
    }

    // Configurações para lidar com módulos do Next.js
    if (config.ssr) {
      config.ssr = {
        ...config.ssr,
        noExternal: ['next'],
      }
    } else {
      config.ssr = {
        noExternal: ['next'],
      }
    }

    // Garantir que o React seja carregado corretamente
    if (config.esbuild) {
      config.esbuild = {
        ...config.esbuild,
        jsx: 'automatic',
        jsxImportSource: 'react',
      }
    } else {
      config.esbuild = {
        jsx: 'automatic',
        jsxImportSource: 'react',
      }
    }

    return config
  },
}

export default config
