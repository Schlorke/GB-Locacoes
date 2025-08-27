import { FilterSelectGroup } from '@/components/ui/filter-select-group'
import type { Meta, StoryObj } from '@storybook/react-vite'

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
  args: {
    filters: [
      {
        label: 'Categoria',
        options: [
          { value: 'all', label: 'Todas' },
          { value: 'construction', label: 'Construção' },
          { value: 'gardening', label: 'Jardinagem' },
        ],
        value: 'all',
        onValueChange: () => {},
      },
    ],
  },
}

export const Variant: StoryObj<typeof FilterSelectGroup> = {
  args: {
    filters: [
      {
        label: 'Categoria',
        options: [
          { value: 'all', label: 'Todas' },
          { value: 'construction', label: 'Construção' },
          { value: 'gardening', label: 'Jardinagem' },
        ],
        value: 'all',
        onValueChange: () => {},
      },
      {
        label: 'Status',
        options: [
          { value: 'all', label: 'Todos' },
          { value: 'available', label: 'Disponível' },
          { value: 'rented', label: 'Alugado' },
        ],
        value: 'all',
        onValueChange: () => {},
      },
    ],
  },
}
