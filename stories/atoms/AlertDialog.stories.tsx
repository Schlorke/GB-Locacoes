import type { Meta, StoryObj } from '@storybook/react'
import { AlertDialog } from '@/components/ui/alert-dialog'

const meta: Meta<typeof AlertDialog> = {
  title: 'Atoms/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente alertdialog - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof AlertDialog> = {
  args: {},
}

export const Variant: StoryObj<typeof AlertDialog> = {
  args: {
    // Props específicas do componente
  },
}
