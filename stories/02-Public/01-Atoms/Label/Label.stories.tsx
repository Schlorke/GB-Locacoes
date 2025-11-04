import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Public/Atoms/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de label acessível baseado em Radix UI. SEMPRE associe inputs com labels usando htmlFor e id para acessibilidade.',
      },
    },
  },
  argTypes: {
    htmlFor: {
      control: 'text',
      description: 'ID do input associado',
    },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

// Default Story
export const Default: Story = {
  render: () => <Label>Label Text</Label>,
}

// Playground
export const Playground: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <Label htmlFor="playground-input">Playground Label</Label>
      <Input id="playground-input" placeholder="Digite algo..." />
    </div>
  ),
}

// With Input
export const WithInput: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <Label htmlFor="email-input">Email</Label>
      <Input id="email-input" type="email" placeholder="seu@email.com" />
    </div>
  ),
}

// Required Field
export const RequiredField: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <Label htmlFor="required-input">
        Nome Completo <span className="text-red-500">*</span>
      </Label>
      <Input id="required-input" required placeholder="Seu nome" />
    </div>
  ),
}

// With Helper Text
export const WithHelperText: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <Label htmlFor="username-input">Nome de usuário</Label>
      <Input id="username-input" placeholder="@usuario" />
      <p className="text-sm text-gray-500">Escolha um nome de usuário único.</p>
    </div>
  ),
}

// With Error
export const WithError: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <Label htmlFor="error-input">Email</Label>
      <Input
        id="error-input"
        type="email"
        value="email-invalido"
        className="border-red-500"
      />
      <p className="text-sm text-red-600">Email inválido</p>
    </div>
  ),
}

// With Checkbox
export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms" className="cursor-pointer">
        Aceito os termos e condições
      </Label>
    </div>
  ),
}

// With Switch
export const WithSwitch: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="notifications" />
      <Label htmlFor="notifications" className="cursor-pointer">
        Ativar notificações
      </Label>
    </div>
  ),
}

// Disabled State
export const Disabled: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <Label htmlFor="disabled-input" className="opacity-50">
        Campo Desabilitado
      </Label>
      <Input id="disabled-input" disabled placeholder="Desabilitado" />
    </div>
  ),
}

// Multiple Labels in Form
export const FormExample: Story = {
  render: () => (
    <form className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="form-name">Nome</Label>
        <Input id="form-name" placeholder="Seu nome completo" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="form-email">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="form-email"
          type="email"
          placeholder="seu@email.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="form-phone">Telefone</Label>
        <Input id="form-phone" type="tel" placeholder="(00) 00000-0000" />
        <p className="text-xs text-gray-500">Opcional - Para contato rápido</p>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="form-terms" />
        <Label htmlFor="form-terms" className="cursor-pointer text-sm">
          Li e aceito os termos de uso
        </Label>
      </div>
    </form>
  ),
}

// Different Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <div className="space-y-2">
        <Label htmlFor="small" className="text-xs">
          Small Label (text-xs)
        </Label>
        <Input id="small" className="h-8 text-sm" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="default">Default Label (text-sm)</Label>
        <Input id="default" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="large" className="text-base">
          Large Label (text-base)
        </Label>
        <Input id="large" className="h-12" />
      </div>
    </div>
  ),
}

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <h3 className="text-sm font-semibold mb-3">Label Básico</h3>
        <div className="space-y-2">
          <Label htmlFor="basic">Label Text</Label>
          <Input id="basic" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Com Required</h3>
        <div className="space-y-2">
          <Label htmlFor="required">
            Campo Obrigatório <span className="text-red-500">*</span>
          </Label>
          <Input id="required" required />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Com Helper Text</h3>
        <div className="space-y-2">
          <Label htmlFor="helper">Label com ajuda</Label>
          <Input id="helper" />
          <p className="text-xs text-gray-500">Texto de ajuda aqui</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Com Erro</h3>
        <div className="space-y-2">
          <Label htmlFor="error">Label com erro</Label>
          <Input id="error" className="border-red-500" />
          <p className="text-xs text-red-600">Mensagem de erro</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Com Checkbox/Switch</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="check-all" />
            <Label htmlFor="check-all" className="cursor-pointer">
              Label com Checkbox
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="switch-all" />
            <Label htmlFor="switch-all" className="cursor-pointer">
              Label com Switch
            </Label>
          </div>
        </div>
      </div>
    </div>
  ),
}
