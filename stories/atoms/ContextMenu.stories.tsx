import type { Meta, StoryObj } from '@storybook/react-vite'
import { ContextMenu } from '@/components/ui/context-menu'

const meta: Meta<typeof ContextMenu> = {
  title: 'Atoms/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente contextmenu - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof ContextMenu> = {
  args: {},
}

export const Variant: StoryObj<typeof ContextMenu> = {
  args: {
    // Props específicas do componente
  },
}
