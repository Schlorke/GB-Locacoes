import type { Meta, StoryObj } from '@storybook/react'
import { Toast } from '@/components/ui/toast'

const meta: Meta<typeof Toast> = {
  title: 'Atoms/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente toast - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Toast> = {
  args: {},
}

export const Variant: StoryObj<typeof Toast> = {
  args: {
    // Props específicas do componente
  },
}
