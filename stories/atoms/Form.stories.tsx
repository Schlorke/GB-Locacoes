import type { Meta, StoryObj } from '@storybook/react-vite'
import { Form } from '@/components/ui/form'

const meta: Meta<typeof Form> = {
  title: 'Atoms/Form',
  component: Form,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente form - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Form> = {
  args: {},
}

export const Variant: StoryObj<typeof Form> = {
  args: {
    // Props específicas do componente
  },
}
