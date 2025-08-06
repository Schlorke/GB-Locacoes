import { Input } from '@/components/ui/input'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de input reutilizável com suporte a diferentes tipos e estados. Inclui estilos de foco e hover padronizados.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Input> = {
  args: {
    placeholder: 'Digite algo...',
  },
}

export const Email: StoryObj<typeof Input> = {
  args: {
    type: 'email',
    placeholder: 'seu@email.com',
  },
}

export const Password: StoryObj<typeof Input> = {
  args: {
    type: 'password',
    placeholder: 'Digite sua senha',
  },
}

export const Number: StoryObj<typeof Input> = {
  args: {
    type: 'number',
    placeholder: '0',
  },
}

export const Search: StoryObj<typeof Input> = {
  args: {
    type: 'search',
    placeholder: 'Buscar...',
  },
}

export const Disabled: StoryObj<typeof Input> = {
  args: {
    placeholder: 'Campo desabilitado',
    disabled: true,
  },
}

export const Required: StoryObj<typeof Input> = {
  args: {
    placeholder: 'Campo obrigatório',
    required: true,
  },
}

export const WithValue: StoryObj<typeof Input> = {
  args: {
    placeholder: 'Com valor',
    defaultValue: 'Valor preenchido',
  },
}
