import { Badge } from '@/components/ui/badge'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
    children: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de badge para indicar status, categorias ou informações importantes. Suporta diferentes variantes visuais.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Badge> = {
  args: {
    children: 'Padrão',
  },
}

export const Secondary: StoryObj<typeof Badge> = {
  args: {
    variant: 'secondary',
    children: 'Secundário',
  },
}

export const Destructive: StoryObj<typeof Badge> = {
  args: {
    variant: 'destructive',
    children: 'Perigoso',
  },
}

export const Outline: StoryObj<typeof Badge> = {
  args: {
    variant: 'outline',
    children: 'Contorno',
  },
}

export const StatusActive: StoryObj<typeof Badge> = {
  args: {
    variant: 'default',
    children: 'Ativo',
  },
}

export const StatusInactive: StoryObj<typeof Badge> = {
  args: {
    variant: 'secondary',
    children: 'Inativo',
  },
}

export const StatusError: StoryObj<typeof Badge> = {
  args: {
    variant: 'destructive',
    children: 'Erro',
  },
}

export const Category: StoryObj<typeof Badge> = {
  args: {
    variant: 'outline',
    children: 'Categoria',
  },
}
