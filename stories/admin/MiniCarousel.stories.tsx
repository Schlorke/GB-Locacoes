import type { Meta, StoryObj } from '@storybook/react'
import { MiniCarousel } from '@/components/admin/mini-carousel'

const meta: Meta<typeof MiniCarousel> = {
  title: 'Admin/MiniCarousel',
  component: MiniCarousel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente minicarousel - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof MiniCarousel> = {
  args: {},
}

export const Variant: StoryObj<typeof MiniCarousel> = {
  args: {
    // Props específicas do componente
  },
}
