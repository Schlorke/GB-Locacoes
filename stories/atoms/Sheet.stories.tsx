import type { Meta, StoryObj } from '@storybook/react-vite'
import { Sheet } from '@/components/ui/sheet'

const meta: Meta<typeof Sheet> = {
  title: 'Atoms/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente sheet - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Sheet> = {
  args: {},
}

export const Variant: StoryObj<typeof Sheet> = {
  args: {
    // Props específicas do componente
  },
}
