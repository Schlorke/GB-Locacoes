import type { Meta, StoryObj } from '@storybook/react-vite'
import { Collapsible } from '@/components/ui/collapsible'

const meta: Meta<typeof Collapsible> = {
  title: 'Atoms/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente collapsible - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Collapsible> = {
  args: {},
}

export const Variant: StoryObj<typeof Collapsible> = {
  args: {
    // Props específicas do componente
  },
}
