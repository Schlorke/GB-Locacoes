import type { Meta, StoryObj } from '@storybook/react'
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
  args: {},
}

export const Variant: StoryObj<typeof ToggleGroup> = {
  args: {
    // Props específicas do componente
  },
}
