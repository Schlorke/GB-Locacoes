import Categories from '@/components/categories'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Categories> = {
  title: 'Organisms/Categories',
  component: Categories,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente categories - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Categories> = {
  args: {},
}

export const Variant: StoryObj<typeof Categories> = {
  args: {
    // Props específicas do componente
  },
}
