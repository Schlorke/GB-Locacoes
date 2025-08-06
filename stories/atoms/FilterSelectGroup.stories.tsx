import type { Meta, StoryObj } from '@storybook/react'
import { FilterSelectGroup } from '@/components/ui/filter-select-group'

const meta: Meta<typeof FilterSelectGroup> = {
  title: 'Atoms/FilterSelectGroup',
  component: FilterSelectGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente filterselectgroup - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof FilterSelectGroup> = {
  args: {},
}

export const Variant: StoryObj<typeof FilterSelectGroup> = {
  args: {
    // Props específicas do componente
  },
}
