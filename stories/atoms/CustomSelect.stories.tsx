import type { Meta, StoryObj } from '@storybook/react'
import { CustomSelect } from '@/components/ui/custom-select'

const meta: Meta<typeof CustomSelect> = {
  title: 'Atoms/CustomSelect',
  component: CustomSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente customselect - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof CustomSelect> = {
  args: {},
}

export const Variant: StoryObj<typeof CustomSelect> = {
  args: {
    // Props específicas do componente
  },
}
