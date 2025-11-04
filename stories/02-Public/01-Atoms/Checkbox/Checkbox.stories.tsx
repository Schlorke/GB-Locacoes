import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Public/Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de checkbox acessível baseado em Radix UI. Suporta estados checked, unchecked e indeterminate.',
      },
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

// Default Story
export const Default: Story = {
  args: {},
}

// Playground
export const Playground: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="playground" />
      <Label htmlFor="playground">Checkbox Label</Label>
    </div>
  ),
}

// With Label
export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Aceito os termos e condições</Label>
    </div>
  ),
}

// Checked State
export const Checked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="checked" defaultChecked />
      <Label htmlFor="checked">Marcado por padrão</Label>
    </div>
  ),
}

// Disabled
export const Disabled: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-unchecked" disabled />
        <Label htmlFor="disabled-unchecked" className="text-gray-500">
          Desabilitado (desmarcado)
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <Label htmlFor="disabled-checked" className="text-gray-500">
          Desabilitado (marcado)
        </Label>
      </div>
    </div>
  ),
}

// Form Example
export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div>
        <h3 className="text-lg font-semibold mb-3">Preferências</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="emails" defaultChecked />
            <Label htmlFor="emails">Receber emails promocionais</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="notifications" defaultChecked />
            <Label htmlFor="notifications">Ativar notificações</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="newsletter" />
            <Label htmlFor="newsletter">Assinar newsletter</Label>
          </div>
        </div>
      </div>
    </div>
  ),
}

// Group Example
export const CheckboxGroup: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div>
        <h4 className="font-semibold mb-3">Categorias de Equipamentos</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="cat-betoneiras" />
            <Label htmlFor="cat-betoneiras">Betoneiras</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="cat-ferramentas" />
            <Label htmlFor="cat-ferramentas">Ferramentas Elétricas</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="cat-andaimes" />
            <Label htmlFor="cat-andaimes">Andaimes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="cat-geradores" />
            <Label htmlFor="cat-geradores">Geradores</Label>
          </div>
        </div>
      </div>
    </div>
  ),
}

// With Description
export const WithDescription: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div className="flex items-start space-x-2">
        <Checkbox id="marketing" className="mt-1" />
        <div className="grid gap-1.5">
          <Label htmlFor="marketing" className="cursor-pointer">
            Marketing emails
          </Label>
          <p className="text-sm text-gray-500">
            Receba emails sobre novos produtos, ofertas e eventos.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <Checkbox id="security" className="mt-1" defaultChecked />
        <div className="grid gap-1.5">
          <Label htmlFor="security" className="cursor-pointer">
            Security updates
          </Label>
          <p className="text-sm text-gray-500">
            Emails importantes sobre segurança da sua conta.
          </p>
        </div>
      </div>
    </div>
  ),
}

// Terms Acceptance
export const TermsAcceptance: Story = {
  render: () => (
    <div className="space-y-4 w-96 p-4 border rounded-lg">
      <div className="space-y-3">
        <div className="flex items-start space-x-2">
          <Checkbox id="terms-use" className="mt-1" />
          <Label htmlFor="terms-use" className="cursor-pointer">
            Li e aceito os{' '}
            <a href="#" className="text-orange-600 hover:underline">
              Termos de Uso
            </a>
          </Label>
        </div>
        <div className="flex items-start space-x-2">
          <Checkbox id="privacy-policy" className="mt-1" />
          <Label htmlFor="privacy-policy" className="cursor-pointer">
            Li e aceito a{' '}
            <a href="#" className="text-orange-600 hover:underline">
              Política de Privacidade
            </a>
          </Label>
        </div>
        <div className="flex items-start space-x-2">
          <Checkbox id="age-confirm" className="mt-1" />
          <Label htmlFor="age-confirm" className="cursor-pointer">
            Confirmo que tenho mais de 18 anos
          </Label>
        </div>
      </div>
    </div>
  ),
}

// All States
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div>
        <h3 className="text-sm font-semibold mb-3">Estados Básicos</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="unchecked" />
            <Label htmlFor="unchecked">Unchecked</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="checked-state" defaultChecked />
            <Label htmlFor="checked-state">Checked</Label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Estados Disabled</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="disabled-1" disabled />
            <Label htmlFor="disabled-1" className="text-gray-500">
              Disabled Unchecked
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="disabled-2" disabled defaultChecked />
            <Label htmlFor="disabled-2" className="text-gray-500">
              Disabled Checked
            </Label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Com Descrição</h3>
        <div className="flex items-start space-x-2">
          <Checkbox id="with-desc" className="mt-1" />
          <div className="grid gap-1.5">
            <Label htmlFor="with-desc" className="cursor-pointer">
              Checkbox com descrição
            </Label>
            <p className="text-sm text-gray-500">
              Texto descritivo adicional aqui.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
}
