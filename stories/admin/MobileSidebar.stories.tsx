import MobileSidebar from '@/components/admin/mobile-sidebar'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof MobileSidebar> = {
  title: 'Admin/MobileSidebar',
  component: MobileSidebar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente mobilesidebar - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof MobileSidebar> = {
  args: {},
}

export const Variant: StoryObj<typeof MobileSidebar> = {
  args: {
    // Props específicas do componente
  },
}
