import { ModernCategoryModal } from '@/components/ui/category-modal'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ModernCategoryModal> = {
  title: 'Atoms/ModernCategoryModal',
  component: ModernCategoryModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente moderncategorymodal - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof ModernCategoryModal> = {
  args: {},
}

export const Variant: StoryObj<typeof ModernCategoryModal> = {
  args: {
    // Props específicas do componente
  },
}
