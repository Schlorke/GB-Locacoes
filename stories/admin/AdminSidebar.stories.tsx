import AdminSidebar from '@/components/admin/admin-sidebar'
import type { Meta, StoryObj } from '@storybook/react'

// Mock function para actions
const mockFn = () => {}

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
    onCollapseChange: mockFn,
  },
}

export const Variant: StoryObj<typeof AdminSidebar> = {
  args: {
    onCollapseChange: mockFn,
  },
}
