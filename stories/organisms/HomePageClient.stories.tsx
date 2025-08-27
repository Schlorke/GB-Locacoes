import HomePageClient from '@/components/home-page-client'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof HomePageClient> = {
  title: 'Organisms/HomePageClient',
  component: HomePageClient,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente homepageclient - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof HomePageClient> = {
  args: {},
}

export const Variant: StoryObj<typeof HomePageClient> = {
  args: {
    // Props específicas do componente
  },
}
