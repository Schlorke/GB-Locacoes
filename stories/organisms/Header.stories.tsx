import Header from '@/components/header'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Header principal do site com navegação, logo e menu responsivo.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Header> = {
  args: {},
}

export const WithActivePage: StoryObj<typeof Header> = {
  args: {
    // Simular página ativa
  },
  parameters: {
    docs: {
      description: {
        story: 'Header com página ativa destacada na navegação.',
      },
    },
  },
}
