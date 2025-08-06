import type { Meta, StoryObj } from '@storybook/react'
import { DropdownMenu } from '@/components/ui/dropdown-menu'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Atoms/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente dropdownmenu - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof DropdownMenu> = {
  args: {},
}

export const Variant: StoryObj<typeof DropdownMenu> = {
  args: {
    // Props específicas do componente
  },
}
