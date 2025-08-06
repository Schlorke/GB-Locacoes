import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    'process.env': {},
    'process.env.NODE_ENV': JSON.stringify('development'),
    'process.env.NEXT_PUBLIC_VERCEL_URL': JSON.stringify(''),
    'process.env.NEXT_PUBLIC_SITE_URL': JSON.stringify('http://localhost:3000'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../'),
      '@/components': path.resolve(__dirname, '../components'),
      '@/lib': path.resolve(__dirname, '../lib'),
      '@/hooks': path.resolve(__dirname, '../hooks'),
      '@/types': path.resolve(__dirname, '../types'),
      '@/app': path.resolve(__dirname, '../app'),
    },
  },
  optimizeDeps: {
    include: [
      'next/image',
      'next/link',
      'next/navigation',
      'next/router',
      'next/head',
    ],
  },
  // Configurações para lidar com módulos do Next.js
  ssr: {
    noExternal: ['next'],
  },
})
