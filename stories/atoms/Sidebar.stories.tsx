import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from '@/components/ui/sidebar'

const meta: Meta<typeof Sidebar> = {
  title: 'Atoms/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente sidebar - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Sidebar> = {
  args: {},
}

export const Variant: StoryObj<typeof Sidebar> = {
  args: {
    // Props específicas do componente
  },
}
