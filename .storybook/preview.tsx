import { ThemeProvider } from '@/components/theme-provider'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ToastProvider } from '@/components/ui/toast'
import { TooltipProvider } from '@/components/ui/tooltip'
import type { Preview } from '@storybook/react-vite'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import '../app/globals.css'

export const decorators = [
  (Story) => (
    <div id="root">
      <SessionProvider session={null}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <ToastProvider>
            <TooltipProvider>
              <SidebarProvider>
                <Story />
              </SidebarProvider>
            </TooltipProvider>
          </ToastProvider>
        </ThemeProvider>
      </SessionProvider>
    </div>
  ),
]

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { expanded: true },
    backgrounds: { default: 'app-background' },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: false,
          },
        ],
      },
    },
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
