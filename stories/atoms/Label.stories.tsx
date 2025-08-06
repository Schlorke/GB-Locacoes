import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '@/components/ui/label'

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente label - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Label> = {
  args: {},
}

export const Variant: StoryObj<typeof Label> = {
  args: {
    // Props específicas do componente
  },
}
