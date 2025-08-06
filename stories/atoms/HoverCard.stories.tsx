import type { Meta, StoryObj } from '@storybook/react'
import { HoverCard } from '@/components/ui/hover-card'

const meta: Meta<typeof HoverCard> = {
  title: 'Atoms/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente hovercard - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof HoverCard> = {
  args: {},
}

export const Variant: StoryObj<typeof HoverCard> = {
  args: {
    // Props específicas do componente
  },
}
