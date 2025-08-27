import { Toaster } from '@/components/ui/sonner'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Toaster> = {
  title: 'Atoms/Sonner',
  component: Toaster,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de toast notifications usando Sonner.',
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
