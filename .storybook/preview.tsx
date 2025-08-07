import { ThemeProvider } from '@/components/theme-provider'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ToastProvider } from '@/components/ui/toast'
import { TooltipProvider } from '@/components/ui/tooltip'
import type { Preview } from '@storybook/react'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import '../app/globals.css'

// Configuração para o Next.js Image
import { ImageLoaderProps } from 'next/image'

// Função de loader personalizada para o Storybook
const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  // Se for uma URL externa, retorna como está
  if (src.startsWith('http')) {
    return src
  }
  // Para imagens locais, você pode implementar sua lógica aqui
  return src
}

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
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Configuração para o Next.js Image
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
  // Configuração global para o Next.js Image
  globalTypes: {
    imageLoader: {
      description: 'Image loader for Next.js Image component',
      defaultValue: imageLoader,
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
