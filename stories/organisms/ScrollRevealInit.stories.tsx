import ScrollRevealInit from '@/components/scroll-reveal-init'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ScrollRevealInit> = {
  title: 'Organisms/ScrollRevealInit',
  component: ScrollRevealInit,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente scrollrevealinit - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof ScrollRevealInit> = {
  args: {},
}

export const Variant: StoryObj<typeof ScrollRevealInit> = {
  args: {
    // Props específicas do componente
  },
}
