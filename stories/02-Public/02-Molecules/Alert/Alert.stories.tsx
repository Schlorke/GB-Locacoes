import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info as InfoIcon,
  Terminal,
  X,
} from 'lucide-react'

const meta = {
  title: 'Public/Molecules/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de alerta para exibir mensagens importantes, avisos, erros ou informações ao usuário.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
      description: 'Variante do alerta',
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

// Default Story
export const Default: Story = {
  render: () => (
    <Alert className="w-96">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
}

// Playground
export const Playground: Story = {
  render: () => (
    <Alert className="w-96">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This is an informational alert message.
      </AlertDescription>
    </Alert>
  ),
}

// Variantes
export const DefaultVariant: Story = {
  render: () => (
    <Alert className="w-96">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Informação</AlertTitle>
      <AlertDescription>
        Esta é uma mensagem informativa padrão.
      </AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-96">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Erro</AlertTitle>
      <AlertDescription>
        Sua sessão expirou. Por favor, faça login novamente.
      </AlertDescription>
    </Alert>
  ),
}

// Custom Variants (usando classes)
export const Success: Story = {
  render: () => (
    <Alert className="w-96 border-green-500 bg-green-50 text-green-900">
      <CheckCircle2 className="h-4 w-4 text-green-600" />
      <AlertTitle>Sucesso!</AlertTitle>
      <AlertDescription>Seu pedido foi realizado com sucesso.</AlertDescription>
    </Alert>
  ),
}

export const Warning: Story = {
  render: () => (
    <Alert className="w-96 border-yellow-500 bg-yellow-50 text-yellow-900">
      <AlertTriangle className="h-4 w-4 text-yellow-600" />
      <AlertTitle>Atenção</AlertTitle>
      <AlertDescription>
        Sua assinatura vence em 3 dias. Renove para continuar usando o serviço.
      </AlertDescription>
    </Alert>
  ),
}

export const Info: Story = {
  render: () => (
    <Alert className="w-96 border-blue-500 bg-blue-50 text-blue-900">
      <InfoIcon className="h-4 w-4 text-blue-600" />
      <AlertTitle>Informação</AlertTitle>
      <AlertDescription>
        Manutenção programada para domingo às 2h. Serviço ficará indisponível
        por 1 hora.
      </AlertDescription>
    </Alert>
  ),
}

// Without Title
export const WithoutTitle: Story = {
  render: () => (
    <Alert className="w-96">
      <InfoIcon className="h-4 w-4" />
      <AlertDescription>Uma mensagem simples sem título.</AlertDescription>
    </Alert>
  ),
}

// Without Icon
export const WithoutIcon: Story = {
  render: () => (
    <Alert className="w-96">
      <AlertTitle>Alerta sem ícone</AlertTitle>
      <AlertDescription>
        Este alerta não possui um ícone visual.
      </AlertDescription>
    </Alert>
  ),
}

// With Actions
export const WithActions: Story = {
  render: () => (
    <Alert className="w-96 border-blue-500 bg-blue-50">
      <InfoIcon className="h-4 w-4 text-blue-600" />
      <AlertTitle className="text-blue-900">
        Nova atualização disponível
      </AlertTitle>
      <AlertDescription className="text-blue-800">
        Uma nova versão do sistema está disponível.
      </AlertDescription>
      <div className="mt-4 flex gap-2">
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          Atualizar agora
        </Button>
        <Button size="sm" variant="outline">
          Mais tarde
        </Button>
      </div>
    </Alert>
  ),
}

// Dismissible
export const Dismissible: Story = {
  render: () => (
    <Alert className="w-96 relative">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Dica do dia</AlertTitle>
      <AlertDescription>
        Você pode usar atalhos de teclado para navegar mais rápido.
      </AlertDescription>
      <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        <X className="h-4 w-4" />
      </button>
    </Alert>
  ),
}

// All Types Side by Side
export const AllTypes: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      {/* Info */}
      <Alert className="border-blue-500 bg-blue-50">
        <InfoIcon className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-900">Informação</AlertTitle>
        <AlertDescription className="text-blue-800">
          Mensagem informativa para o usuário.
        </AlertDescription>
      </Alert>

      {/* Success */}
      <Alert className="border-green-500 bg-green-50">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-900">Sucesso</AlertTitle>
        <AlertDescription className="text-green-800">
          Operação realizada com sucesso!
        </AlertDescription>
      </Alert>

      {/* Warning */}
      <Alert className="border-yellow-500 bg-yellow-50">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertTitle className="text-yellow-900">Atenção</AlertTitle>
        <AlertDescription className="text-yellow-800">
          Esta ação requer sua atenção.
        </AlertDescription>
      </Alert>

      {/* Error */}
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>
          Ocorreu um erro ao processar sua solicitação.
        </AlertDescription>
      </Alert>
    </div>
  ),
}
