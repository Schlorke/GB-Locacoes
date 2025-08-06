import type { Meta, StoryObj } from '@storybook/react'
import { IconPicker } from '@/components/ui/icon-picker'

const meta: Meta<typeof IconPicker> = {
  title: 'Atoms/IconPicker',
  component: IconPicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente iconpicker - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof IconPicker> = {
  args: {},
}

export const Variant: StoryObj<typeof IconPicker> = {
  args: {
    // Props específicas do componente
  },
}
