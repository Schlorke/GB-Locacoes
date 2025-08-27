import ContactSection from '@/components/contact-section'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof ContactSection> = {
  title: 'Organisms/ContactSection',
  component: ContactSection,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente contactsection - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof ContactSection> = {
  args: {},
}

export const Variant: StoryObj<typeof ContactSection> = {
  args: {
    // Props específicas do componente
  },
}
