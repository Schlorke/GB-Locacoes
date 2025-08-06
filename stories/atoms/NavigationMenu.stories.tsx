import type { Meta, StoryObj } from '@storybook/react'
import { NavigationMenu } from '@/components/ui/navigation-menu'

const meta: Meta<typeof NavigationMenu> = {
  title: 'Atoms/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente navigationmenu - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof NavigationMenu> = {
  args: {},
}

export const Variant: StoryObj<typeof NavigationMenu> = {
  args: {
    // Props específicas do componente
  },
}
