import { Button } from '@/components/ui/button'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'outline',
        'destructive',
        'ghost',
        'reset',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: { control: 'boolean' },
    asChild: { control: 'boolean' },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de botão reutilizável com múltiplas variantes e tamanhos. Baseado no ShadCN UI com customizações específicas do projeto.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Primary: StoryObj<typeof Button> = {
  args: {
    variant: 'default',
    children: 'Alugar',
  },
}

export const Secondary: StoryObj<typeof Button> = {
  args: {
    variant: 'secondary',
    children: 'Secundário',
  },
}

export const Outline: StoryObj<typeof Button> = {
  args: {
    variant: 'outline',
    children: 'Contorno',
  },
}

export const Destructive: StoryObj<typeof Button> = {
  args: {
    variant: 'destructive',
    children: 'Excluir',
  },
}

export const Ghost: StoryObj<typeof Button> = {
  args: {
    variant: 'ghost',
    children: 'Fantasma',
  },
}

export const Reset: StoryObj<typeof Button> = {
  args: {
    variant: 'reset',
    children: 'Resetar',
  },
}

export const Link: StoryObj<typeof Button> = {
  args: {
    variant: 'link',
    children: 'Link',
  },
}

export const Disabled: StoryObj<typeof Button> = {
  args: {
    variant: 'default',
    disabled: true,
    children: 'Desabilitado',
  },
}

export const Small: StoryObj<typeof Button> = {
  args: {
    variant: 'default',
    size: 'sm',
    children: 'Pequeno',
  },
}

export const Large: StoryObj<typeof Button> = {
  args: {
    variant: 'default',
    size: 'lg',
    children: 'Grande',
  },
}

export const Icon: StoryObj<typeof Button> = {
  args: {
    variant: 'default',
    size: 'icon',
    children: '🔍',
  },
}

export const LongText: StoryObj<typeof Button> = {
  args: {
    variant: 'outline',
    children: 'Texto muito extenso para testar overflow',
  },
}
