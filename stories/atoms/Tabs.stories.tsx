import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from '@/components/ui/tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Atoms/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente tabs - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Tabs> = {
  args: {},
}

export const Variant: StoryObj<typeof Tabs> = {
  args: {
    // Props específicas do componente
  },
}
