import Hero from '@/components/hero'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Hero> = {
  title: 'Organisms/Hero',
  component: Hero,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente hero - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Hero> = {
  args: {},
}

export const Variant: StoryObj<typeof Hero> = {
  args: {
    // Props específicas do componente
  },
}
