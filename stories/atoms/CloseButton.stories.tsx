import type { Meta, StoryObj } from '@storybook/react'
import { CloseButton } from '@/components/ui/close-button'

const meta: Meta<typeof CloseButton> = {
  title: 'Atoms/CloseButton',
  component: CloseButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente closebutton - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof CloseButton> = {
  args: {},
}

export const Variant: StoryObj<typeof CloseButton> = {
  args: {
    // Props específicas do componente
  },
}
