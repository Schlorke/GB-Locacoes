import { InputOTP } from '@/components/ui/input-otp'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof InputOTP> = {
  title: 'Atoms/InputOtp',
  component: InputOTP,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente inputotp - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof InputOTP> = {
  args: {},
}

export const Variant: StoryObj<typeof InputOTP> = {
  args: {
    // Props específicas do componente
  },
}
