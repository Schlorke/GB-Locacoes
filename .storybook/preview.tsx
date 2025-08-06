import { ThemeProvider } from '@/components/theme-provider'
import type { Preview } from '@storybook/react-vite'
import React from 'react'
import '../app/globals.css'

export const decorators = [
  (Story) => (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Story />
    </ThemeProvider>
  ),
]

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { expanded: true },
    backgrounds: { default: 'app-background' },
    a11y: { element: '#root', manual: false },
    // Configurações para Next.js
    nextjs: {
      appDirectory: true,
    },
    // Configurações para lidar com imagens
    docs: {
      source: {
        state: 'open',
      },
    },
  },
  // Configurações globais para argTypes
  argTypes: {
    // Desabilitar controles para props que podem causar problemas
    src: { control: false },
    alt: { control: false },
    href: { control: false },
    // Configurar controles para props comuns
    className: { control: 'text' },
    children: { control: 'text' },
  },
}

export default preview
