import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Eye, EyeOff, Lock, Mail, Search as SearchIcon } from 'lucide-react'
import { useState } from 'react'

const meta = {
  title: 'Public/Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de input de texto simples e acessível. Suporta todos os tipos nativos de HTML input e se integra perfeitamente com formulários e labels.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
      description: 'Tipo do input',
    },
    placeholder: {
      control: 'text',
      description: 'Texto de placeholder',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// Default Story (baseline)
export const Default: Story = {
  args: {
    placeholder: 'Digite algo...',
  },
}

// Playground Story (todos os controles)
export const Playground: Story = {
  args: {
    type: 'text',
    placeholder: 'Playground Input',
    disabled: false,
  },
}

// Tipos de Input
export const Text: Story = {
  args: {
    type: 'text',
    placeholder: 'Seu nome',
  },
}

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'seu@email.com',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: '••••••••',
  },
}

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '123',
  },
}

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Pesquisar...',
  },
}

export const Tel: Story = {
  args: {
    type: 'tel',
    placeholder: '(00) 00000-0000',
  },
}

export const Url: Story = {
  args: {
    type: 'url',
    placeholder: 'https://exemplo.com',
  },
}

// Estados
export const Disabled: Story = {
  args: {
    placeholder: 'Input desabilitado',
    disabled: true,
  },
}

export const WithValue: Story = {
  args: {
    value: 'Valor preenchido',
    onChange: () => {},
  },
}

export const ReadOnly: Story = {
  args: {
    value: 'Somente leitura',
    readOnly: true,
  },
}

// Com Label
export const WithLabel: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <Label htmlFor="name">Nome completo</Label>
      <Input id="name" placeholder="Digite seu nome" />
    </div>
  ),
}

export const WithLabelAndHelper: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="seu@email.com" />
      <p className="text-sm text-gray-500">Nunca compartilharemos seu email.</p>
    </div>
  ),
}

// Com Ícones (Recipe)
export const WithIconLeft: Story = {
  render: () => (
    <div className="w-64 relative">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
      <Input className="pl-10" placeholder="Pesquisar..." />
    </div>
  ),
}

export const WithIconRight: Story = {
  render: () => (
    <div className="w-64 relative">
      <Input className="pr-10" placeholder="Digite seu email" type="email" />
      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
    </div>
  ),
}

// Password Toggle (Recipe)
export const PasswordToggle: Story = {
  render: function PasswordToggleRender() {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="w-64 relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Senha"
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    )
  },
}

// Form Examples
export const LoginForm: Story = {
  render: () => (
    <div className="w-80 space-y-4 p-6 bg-white rounded-xl shadow-md">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            id="login-email"
            type="email"
            placeholder="seu@email.com"
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="login-password">Senha</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            id="login-password"
            type="password"
            placeholder="••••••••"
            className="pl-10"
          />
        </div>
      </div>
    </div>
  ),
}

export const ContactForm: Story = {
  render: () => (
    <div className="w-96 space-y-4 p-6 bg-white rounded-xl shadow-md">
      <div className="space-y-2">
        <Label htmlFor="contact-name">Nome</Label>
        <Input id="contact-name" placeholder="Seu nome completo" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-email">Email</Label>
        <Input id="contact-email" type="email" placeholder="seu@email.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-phone">Telefone</Label>
        <Input id="contact-phone" type="tel" placeholder="(00) 00000-0000" />
      </div>
    </div>
  ),
}

// Validation States (Recipe)
export const ValidationSuccess: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <Label htmlFor="valid-input">Email</Label>
      <Input
        id="valid-input"
        type="email"
        value="usuario@exemplo.com"
        className="border-green-500 focus-visible:ring-green-500"
        readOnly
      />
      <p className="text-sm text-green-600">Email válido!</p>
    </div>
  ),
}

export const ValidationError: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <Label htmlFor="error-input">Email</Label>
      <Input
        id="error-input"
        type="email"
        value="emailinvalido"
        className="border-red-500 focus-visible:ring-red-500"
      />
      <p className="text-sm text-red-600">Email inválido</p>
    </div>
  ),
}

// All Types Side by Side
export const AllTypes: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div className="space-y-2">
        <Label>Text</Label>
        <Input type="text" placeholder="Digite texto" />
      </div>

      <div className="space-y-2">
        <Label>Email</Label>
        <Input type="email" placeholder="seu@email.com" />
      </div>

      <div className="space-y-2">
        <Label>Password</Label>
        <Input type="password" placeholder="••••••••" />
      </div>

      <div className="space-y-2">
        <Label>Number</Label>
        <Input type="number" placeholder="123" />
      </div>

      <div className="space-y-2">
        <Label>Search</Label>
        <Input type="search" placeholder="Pesquisar..." />
      </div>

      <div className="space-y-2">
        <Label>Tel</Label>
        <Input type="tel" placeholder="(00) 00000-0000" />
      </div>

      <div className="space-y-2">
        <Label>URL</Label>
        <Input type="url" placeholder="https://exemplo.com" />
      </div>
    </div>
  ),
}

// Sizes Example
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div className="space-y-2">
        <Label>Default Height (h-10 - 40px)</Label>
        <Input placeholder="Input padrão" />
      </div>

      <div className="space-y-2">
        <Label>Custom Small (h-8 - 32px)</Label>
        <Input placeholder="Input pequeno" className="h-8 text-sm" />
      </div>

      <div className="space-y-2">
        <Label>Custom Large (h-12 - 48px)</Label>
        <Input placeholder="Input grande" className="h-12 text-base" />
      </div>
    </div>
  ),
}
