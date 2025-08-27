import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToggleGroup } from '@/components/ui/toggle-group'

const meta: Meta<typeof ToggleGroup> = {
  title: 'Atoms/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente togglegroup - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof ToggleGroup> = {
  args: {
    type: 'single',
  },
}

export const Variant: StoryObj<typeof ToggleGroup> = {
  args: {
    type: 'multiple',
    // Props específicas do componente
  },
}
