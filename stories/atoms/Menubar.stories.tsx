import type { Meta, StoryObj } from '@storybook/react'
import { Menubar } from '@/components/ui/menubar'

const meta: Meta<typeof Menubar> = {
  title: 'Atoms/Menubar',
  component: Menubar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente menubar - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Menubar> = {
  args: {},
}

export const Variant: StoryObj<typeof Menubar> = {
  args: {
    // Props específicas do componente
  },
}
