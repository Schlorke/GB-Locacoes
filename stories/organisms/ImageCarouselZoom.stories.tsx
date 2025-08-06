import type { Meta, StoryObj } from '@storybook/react'
import { ImageCarouselZoom } from '@/components/image-carousel-zoom'

const meta: Meta<typeof ImageCarouselZoom> = {
  title: 'Organisms/ImageCarouselZoom',
  component: ImageCarouselZoom,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente imagecarouselzoom - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof ImageCarouselZoom> = {
  args: {},
}

export const Variant: StoryObj<typeof ImageCarouselZoom> = {
  args: {
    // Props específicas do componente
  },
}
