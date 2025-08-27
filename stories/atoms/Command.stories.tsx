import type { Meta, StoryObj } from '@storybook/react-vite'
import { Command } from '@/components/ui/command'

const meta: Meta<typeof Command> = {
  title: 'Atoms/Command',
  component: Command,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente command - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Command> = {
  args: {},
}

export const Variant: StoryObj<typeof Command> = {
  args: {
    // Props específicas do componente
  },
}
