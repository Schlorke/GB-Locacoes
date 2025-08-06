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
  args: {},
}

export const Variant: StoryObj<typeof HeroCarouselManager> = {
  args: {
    // Props específicas do componente
  },
}
