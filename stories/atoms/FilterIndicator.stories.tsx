import type { Meta, StoryObj } from '@storybook/react-vite'
import { FilterIndicator } from '@/components/ui/filter-indicator'

const meta: Meta<typeof FilterIndicator> = {
  title: 'Atoms/FilterIndicator',
  component: FilterIndicator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente filterindicator - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof FilterIndicator> = {
  args: {},
}

export const Variant: StoryObj<typeof FilterIndicator> = {
  args: {
    // Props específicas do componente
  },
}
