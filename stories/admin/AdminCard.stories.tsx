import type { Meta, StoryObj } from '@storybook/react-vite'
import { AdminCard } from '@/components/admin/admin-card'

const meta: Meta<typeof AdminCard> = {
  title: 'Admin/AdminCard',
  component: AdminCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente admincard - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof AdminCard> = {
  args: {},
}

export const Variant: StoryObj<typeof AdminCard> = {
  args: {
    // Props específicas do componente
  },
}
