import CategoriesWithAnimation from '@/components/categories-with-animation'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CategoriesWithAnimation> = {
  title: 'Organisms/CategoriesWithAnimation',
  component: CategoriesWithAnimation,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente categorieswithanimation - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof CategoriesWithAnimation> = {
  args: {},
}

export const Variant: StoryObj<typeof CategoriesWithAnimation> = {
  args: {
    // Props específicas do componente
  },
}
