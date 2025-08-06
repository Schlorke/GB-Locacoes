import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from '@/components/ui/switch'

const meta: Meta<typeof Switch> = {
  title: 'Atoms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente switch - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Switch> = {
  args: {},
}

export const Variant: StoryObj<typeof Switch> = {
  args: {
    // Props específicas do componente
  },
}
