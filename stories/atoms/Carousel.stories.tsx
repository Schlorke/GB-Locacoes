import type { Meta, StoryObj } from '@storybook/react-vite'
import { Carousel } from '@/components/ui/carousel'

const meta: Meta<typeof Carousel> = {
  title: 'Atoms/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente carousel - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Carousel> = {
  args: {},
}

export const Variant: StoryObj<typeof Carousel> = {
  args: {
    // Props específicas do componente
  },
}
