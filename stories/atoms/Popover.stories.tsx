import type { Meta, StoryObj } from '@storybook/react-vite'
import { Popover } from '@/components/ui/popover'

const meta: Meta<typeof Popover> = {
  title: 'Atoms/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente popover - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Popover> = {
  args: {},
}

export const Variant: StoryObj<typeof Popover> = {
  args: {
    // Props específicas do componente
  },
}
