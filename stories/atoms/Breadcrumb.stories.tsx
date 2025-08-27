import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumb } from '@/components/ui/breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Atoms/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente breadcrumb - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Breadcrumb> = {
  args: {},
}

export const Variant: StoryObj<typeof Breadcrumb> = {
  args: {
    // Props específicas do componente
  },
}
