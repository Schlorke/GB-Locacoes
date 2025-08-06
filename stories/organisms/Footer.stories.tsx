import Footer from '@/components/footer'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Footer> = {
  title: 'Organisms/Footer',
  component: Footer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente footer - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Footer> = {
  args: {},
}

export const Variant: StoryObj<typeof Footer> = {
  args: {
    // Props específicas do componente
  },
}
