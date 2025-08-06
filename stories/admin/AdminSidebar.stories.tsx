import AdminSidebar from '@/components/admin/admin-sidebar'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta: Meta<typeof AdminSidebar> = {
  title: 'Admin/AdminSidebar',
  component: AdminSidebar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente adminsidebar - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof AdminSidebar> = {
  args: {
    onCollapseChange: fn(),
  },
}

export const Variant: StoryObj<typeof AdminSidebar> = {
  args: {
    onCollapseChange: fn(),
  },
}
