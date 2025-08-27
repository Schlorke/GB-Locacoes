import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from '@/components/ui/select'

const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente select - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Select> = {
  args: {},
}

export const Variant: StoryObj<typeof Select> = {
  args: {
    // Props específicas do componente
  },
}
