import WhatsAppFAB from '@/components/whatsapp-fab'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof WhatsAppFAB> = {
  title: 'Organisms/WhatsappFab',
  component: WhatsAppFAB,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente whatsappfab - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof WhatsAppFAB> = {
  args: {},
}

export const Variant: StoryObj<typeof WhatsAppFAB> = {
  args: {
    // Props específicas do componente
  },
}
