import type { Preview } from '@storybook/nextjs-vite'
import { Inter, Jost } from 'next/font/google'
import React from 'react'
import '../app/globals.css'

// Configurar fontes do projeto (mesma configuração do layout.tsx)
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jost',
  preload: true,
  fallback: ['Georgia', 'serif'],
  adjustFontFallback: false,
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Backgrounds para testar componentes
    backgrounds: {
      options: {
        light: { name: 'light', value: '#ffffff' },
        dark: { name: 'dark', value: '#1a1a1a' },
        gray: { name: 'gray', value: '#f5f5f5' },
      },
    },
    // Ordenação customizada do sidebar
    options: {
      storySort: {
        order: [
          'Introduction',
          'Design Tokens',
          ['Colors', 'Typography', 'Spacing', 'Shadows', 'Breakpoints'],
          'Public',
          ['Overview', 'Atoms', 'Molecules', 'Organisms', 'Templates'],
          'Admin',
          ['Overview', 'Layout', 'Components', 'Features', 'Pages'],
          'Shared',
        ],
      },
    },
  },

  // Decorators globais para aplicar fontes do projeto
  decorators: [
    (Story) => (
      <div className={inter.variable}>
        <div className={jost.variable}>
          <div className="font-sans antialiased">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],

  tags: ['autodocs'],

  initialGlobals: {
    backgrounds: {
      value: 'light',
    },
  },
}

export default preview
