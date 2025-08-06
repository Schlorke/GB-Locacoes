import type { Meta, StoryObj } from '@storybook/react'
import AdminHeader from '@/components/admin/admin-header'

const meta: Meta<typeof AdminHeader> = {
  title: 'Admin/AdminHeader',
  component: AdminHeader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente adminheader - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof AdminHeader> = {
  args: {},
}

export const Variant: StoryObj<typeof AdminHeader> = {
  args: {
    // Props específicas do componente
  },
}
