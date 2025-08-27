import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pagination } from '@/components/ui/pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Atoms/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente pagination - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Pagination> = {
  args: {},
}

export const Variant: StoryObj<typeof Pagination> = {
  args: {
    // Props específicas do componente
  },
}
