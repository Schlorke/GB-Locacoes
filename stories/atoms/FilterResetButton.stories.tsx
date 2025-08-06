import type { Meta, StoryObj } from '@storybook/react'
import { FilterResetButton } from '@/components/ui/filter-reset-button'

const meta: Meta<typeof FilterResetButton> = {
  title: 'Atoms/FilterResetButton',
  component: FilterResetButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente filterresetbutton - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof FilterResetButton> = {
  args: {},
}

export const Variant: StoryObj<typeof FilterResetButton> = {
  args: {
    // Props específicas do componente
  },
}
