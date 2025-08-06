import type { Meta, StoryObj } from '@storybook/react'
import { Dialog } from '@/components/ui/dialog'

const meta: Meta<typeof Dialog> = {
  title: 'Atoms/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente dialog - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Dialog> = {
  args: {},
}

export const Variant: StoryObj<typeof Dialog> = {
  args: {
    // Props específicas do componente
  },
}
