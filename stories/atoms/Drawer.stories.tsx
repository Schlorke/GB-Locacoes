import type { Meta, StoryObj } from '@storybook/react'
import { Drawer } from '@/components/ui/drawer'

const meta: Meta<typeof Drawer> = {
  title: 'Atoms/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente drawer - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Drawer> = {
  args: {},
}

export const Variant: StoryObj<typeof Drawer> = {
  args: {
    // Props específicas do componente
  },
}
