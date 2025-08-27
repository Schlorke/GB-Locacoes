import type { Meta, StoryObj } from '@storybook/react-vite'
import { CurrencyInput } from '@/components/ui/currency-input'

const meta: Meta<typeof CurrencyInput> = {
  title: 'Atoms/CurrencyInput',
  component: CurrencyInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente currencyinput - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof CurrencyInput> = {
  args: {},
}

export const Variant: StoryObj<typeof CurrencyInput> = {
  args: {
    // Props específicas do componente
  },
}
