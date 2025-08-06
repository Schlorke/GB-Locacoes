import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from '@/components/ui/textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente textarea - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Textarea> = {
  args: {},
}

export const Variant: StoryObj<typeof Textarea> = {
  args: {
    // Props específicas do componente
  },
}
