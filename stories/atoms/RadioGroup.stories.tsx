import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioGroup } from '@/components/ui/radio-group'

const meta: Meta<typeof RadioGroup> = {
  title: 'Atoms/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente radiogroup - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof RadioGroup> = {
  args: {},
}

export const Variant: StoryObj<typeof RadioGroup> = {
  args: {
    // Props específicas do componente
  },
}
