import type { Meta, StoryObj } from '@storybook/react-vite'
import { Table } from '@/components/ui/table'

const meta: Meta<typeof Table> = {
  title: 'Atoms/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente table - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Table> = {
  args: {},
}

export const Variant: StoryObj<typeof Table> = {
  args: {
    // Props específicas do componente
  },
}
