import { HeroCarouselManager } from '@/components/admin/hero-carousel-manager'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof HeroCarouselManager> = {
  title: 'Admin/HeroCarouselManager',
  component: HeroCarouselManager,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente herocarouselmanager - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof HeroCarouselManager> = {
  args: {
    items: [],
    onItemsChange: () => {},
  },
}

export const Variant: StoryObj<typeof HeroCarouselManager> = {
  args: {
    items: [
      {
        id: '1',
        title: 'Slide 1',
        description: 'Descrição do slide 1',
        imageUrl: '/placeholder.jpg',
        link: '/equipamentos',
        order: 1,
      },
    ],
    onItemsChange: () => {},
  },
}
