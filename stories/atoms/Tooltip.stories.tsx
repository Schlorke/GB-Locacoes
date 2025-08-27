import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip } from '@/components/ui/tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente tooltip - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Tooltip> = {
  args: {},
}

export const Variant: StoryObj<typeof Tooltip> = {
  args: {
    // Props específicas do componente
  },
}
