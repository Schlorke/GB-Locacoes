import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from '@/components/ui/avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente avatar - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Avatar> = {
  args: {},
}

export const Variant: StoryObj<typeof Avatar> = {
  args: {
    // Props específicas do componente
  },
}
