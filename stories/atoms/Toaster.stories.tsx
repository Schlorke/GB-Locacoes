import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toaster } from '@/components/ui/toaster'

const meta: Meta<typeof Toaster> = {
  title: 'Atoms/Toaster',
  component: Toaster,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente toaster - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Toaster> = {
  args: {},
}

export const Variant: StoryObj<typeof Toaster> = {
  args: {
    // Props específicas do componente
  },
}
