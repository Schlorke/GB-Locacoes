import AdminMobileHeader from '@/components/admin/admin-mobile-header'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof AdminMobileHeader> = {
  title: 'Admin/AdminMobileHeader',
  component: AdminMobileHeader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente adminmobileheader - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof AdminMobileHeader> = {
  args: {},
}

export const Variant: StoryObj<typeof AdminMobileHeader> = {
  args: {
    // Props específicas do componente
  },
}
