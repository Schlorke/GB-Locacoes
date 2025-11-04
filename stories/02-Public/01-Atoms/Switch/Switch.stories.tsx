import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Public/Atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de switch toggle acessível baseado em Radix UI. Para estados binários on/off com mudança imediata.',
      },
    },
  },
} satisfies Meta<typeof Switch>

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
      <Switch id="playground" />
      <Label htmlFor="playground">Switch Label</Label>
    </div>
  ),
}

// With Label
export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Modo avião</Label>
    </div>
  ),
}

// Checked State
export const Checked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="checked-switch" defaultChecked />
      <Label htmlFor="checked-switch">Ativado por padrão</Label>
    </div>
  ),
}

// Disabled
export const Disabled: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Switch id="disabled-off" disabled />
        <Label htmlFor="disabled-off" className="text-gray-500">
          Desabilitado (off)
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="disabled-on" disabled defaultChecked />
        <Label htmlFor="disabled-on" className="text-gray-500">
          Desabilitado (on)
        </Label>
      </div>
    </div>
  ),
}

// Settings Example
export const SettingsExample: Story = {
  render: () => (
    <div className="space-y-4 w-96 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Configurações</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="notif-email" className="cursor-pointer">
            Notificações por email
          </Label>
          <Switch id="notif-email" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="notif-push" className="cursor-pointer">
            Notificações push
          </Label>
          <Switch id="notif-push" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="notif-sms" className="cursor-pointer">
            Notificações por SMS
          </Label>
          <Switch id="notif-sms" />
        </div>
      </div>
    </div>
  ),
}

// With Description
export const WithDescription: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="marketing-switch" className="cursor-pointer">
            Marketing emails
          </Label>
          <p className="text-sm text-gray-500">
            Receba atualizações sobre produtos e ofertas.
          </p>
        </div>
        <Switch id="marketing-switch" />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="security-switch" className="cursor-pointer">
            Alertas de segurança
          </Label>
          <p className="text-sm text-gray-500">
            Notificações importantes sobre sua conta.
          </p>
        </div>
        <Switch id="security-switch" defaultChecked />
      </div>
    </div>
  ),
}

// Privacy Settings
export const PrivacySettings: Story = {
  render: () => (
    <div className="space-y-6 w-96 p-6 bg-white rounded-lg shadow-md">
      <div>
        <h3 className="text-lg font-semibold mb-4">Privacidade</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label
                htmlFor="profile-public"
                className="cursor-pointer font-medium"
              >
                Perfil público
              </Label>
              <p className="text-sm text-gray-500">
                Permitir que outros usuários vejam seu perfil.
              </p>
            </div>
            <Switch id="profile-public" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label
                htmlFor="show-email"
                className="cursor-pointer font-medium"
              >
                Mostrar email
              </Label>
              <p className="text-sm text-gray-500">
                Exibir seu email no perfil público.
              </p>
            </div>
            <Switch id="show-email" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label
                htmlFor="allow-messages"
                className="cursor-pointer font-medium"
              >
                Permitir mensagens
              </Label>
              <p className="text-sm text-gray-500">
                Outros usuários podem enviar mensagens.
              </p>
            </div>
            <Switch id="allow-messages" defaultChecked />
          </div>
        </div>
      </div>
    </div>
  ),
}

// All States
export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <h3 className="text-sm font-semibold mb-3">Estados Básicos</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Switch id="off-state" />
            <Label htmlFor="off-state">Off (unchecked)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="on-state" defaultChecked />
            <Label htmlFor="on-state">On (checked)</Label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Estados Disabled</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Switch id="disabled-off" disabled />
            <Label htmlFor="disabled-off" className="text-gray-500">
              Disabled Off
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="disabled-on" disabled defaultChecked />
            <Label htmlFor="disabled-on" className="text-gray-500">
              Disabled On
            </Label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Com Descrição</h3>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="with-desc" className="cursor-pointer">
              Notificações
            </Label>
            <p className="text-sm text-gray-500">
              Ativar notificações do sistema.
            </p>
          </div>
          <Switch id="with-desc" defaultChecked />
        </div>
      </div>
    </div>
  ),
}
