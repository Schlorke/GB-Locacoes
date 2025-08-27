import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert } from '@/components/ui/alert'

const meta: Meta<typeof Alert> = {
  title: 'Atoms/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente alert - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Alert> = {
  args: {},
}

export const Variant: StoryObj<typeof Alert> = {
  args: {
    // Props específicas do componente
  },
}
