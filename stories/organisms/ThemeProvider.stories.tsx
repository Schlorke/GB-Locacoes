import type { Meta, StoryObj } from '@storybook/react'
import { ThemeProvider } from '@/components/theme-provider'

const meta: Meta<typeof ThemeProvider> = {
  title: 'Organisms/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente themeprovider - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof ThemeProvider> = {
  args: {},
}

export const Variant: StoryObj<typeof ThemeProvider> = {
  args: {
    // Props específicas do componente
  },
}
