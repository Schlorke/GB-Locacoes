import type { Meta, StoryObj } from '@storybook/react-vite'
import { Mdx } from '@/components/mdx'

const meta: Meta<typeof Mdx> = {
  title: 'Organisms/Mdx',
  component: Mdx,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente mdx - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Mdx> = {
  args: {},
}

export const Variant: StoryObj<typeof Mdx> = {
  args: {
    // Props específicas do componente
  },
}
