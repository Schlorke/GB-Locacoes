import ContactForm from '@/components/contact-form'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ContactForm> = {
  title: 'Organisms/ContactForm',
  component: ContactForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente contactform - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof ContactForm> = {
  args: {},
}

export const Variant: StoryObj<typeof ContactForm> = {
  args: {
    // Props específicas do componente
  },
}
