import type { Meta, StoryObj } from '@storybook/react'
import { AdminPageHeader } from '@/components/admin/admin-page-header'

const meta: Meta<typeof AdminPageHeader> = {
  title: 'Admin/AdminPageHeader',
  component: AdminPageHeader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente adminpageheader - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof AdminPageHeader> = {
  args: {},
}

export const Variant: StoryObj<typeof AdminPageHeader> = {
  args: {
    // Props específicas do componente
  },
}
