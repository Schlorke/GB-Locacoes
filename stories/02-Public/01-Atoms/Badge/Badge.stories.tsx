import { Badge } from '@/components/ui/badge'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { AlertCircle, Check, Package, Star, X } from 'lucide-react'

const meta = {
  title: 'Public/Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de badge para exibir status, categorias, tags ou contadores. Pequeno e discreto, ideal para metadados visuais.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'outline',
        'no-hover-default',
        'no-hover-secondary',
        'no-hover-destructive',
        'no-hover-outline',
      ],
      description: 'Variante visual do badge',
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

// Default Story
export const Default: Story = {
  args: {
    children: 'Badge',
  },
}

// Playground
export const Playground: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
}

// Variantes
export const DefaultVariant: Story = {
  args: {
    children: 'Default',
    variant: 'default',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
}

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
}

// No Hover Variants
export const NoHoverDefault: Story = {
  args: {
    children: 'No Hover',
    variant: 'no-hover-default',
  },
}

export const NoHoverSecondary: Story = {
  args: {
    children: 'No Hover',
    variant: 'no-hover-secondary',
  },
}

// Com Ícones
export const WithIconLeft: Story = {
  render: () => (
    <Badge>
      <Check className="mr-1 h-3 w-3" />
      Aprovado
    </Badge>
  ),
}

export const WithIconRight: Story = {
  render: () => (
    <Badge>
      Novo
      <Star className="ml-1 h-3 w-3 fill-current" />
    </Badge>
  ),
}

export const DestructiveWithIcon: Story = {
  render: () => (
    <Badge variant="destructive">
      <X className="mr-1 h-3 w-3" />
      Cancelado
    </Badge>
  ),
}

// Use Cases
export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Aprovado</Badge>
      <Badge variant="secondary">Pendente</Badge>
      <Badge variant="destructive">Rejeitado</Badge>
      <Badge variant="outline">Em Análise</Badge>
    </div>
  ),
}

export const CategoryBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>
        <Package className="mr-1 h-3 w-3" />
        Equipamentos
      </Badge>
      <Badge variant="secondary">Ferramentas</Badge>
      <Badge variant="outline">Acessórios</Badge>
    </div>
  ),
}

export const CountBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>3</Badge>
      <Badge variant="secondary">12</Badge>
      <Badge variant="destructive">99+</Badge>
      <Badge variant="outline">0</Badge>
    </div>
  ),
}

export const TagBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 max-w-md">
      <Badge>Novo</Badge>
      <Badge variant="secondary">Popular</Badge>
      <Badge variant="destructive">Urgente</Badge>
      <Badge variant="outline">Em Destaque</Badge>
      <Badge>
        <Star className="mr-1 h-3 w-3 fill-current" />
        Recomendado
      </Badge>
    </div>
  ),
}

// Product Badges
export const ProductBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm">Status:</span>
        <Badge>Disponível</Badge>
        <Badge variant="secondary">Indisponível</Badge>
        <Badge variant="destructive">Esgotado</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Categoria:</span>
        <Badge variant="outline">Betoneiras</Badge>
        <Badge variant="outline">Ferramentas</Badge>
      </div>
    </div>
  ),
}

// Notification Badges
export const NotificationBadges: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <Badge className="absolute -top-1 -right-1">3</Badge>
      </div>
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <Badge variant="destructive" className="absolute -top-1 -right-1">
          12
        </Badge>
      </div>
    </div>
  ),
}

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Variantes Principais</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Sem Hover</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="no-hover-default">No Hover Default</Badge>
          <Badge variant="no-hover-secondary">No Hover Secondary</Badge>
          <Badge variant="no-hover-destructive">No Hover Destructive</Badge>
          <Badge variant="no-hover-outline">No Hover Outline</Badge>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Com Ícones</h3>
        <div className="flex flex-wrap gap-2">
          <Badge>
            <Check className="mr-1 h-3 w-3" />
            Com Ícone
          </Badge>
          <Badge variant="destructive">
            <X className="mr-1 h-3 w-3" />
            Cancelado
          </Badge>
          <Badge variant="outline">
            <AlertCircle className="mr-1 h-3 w-3" />
            Aviso
          </Badge>
        </div>
      </div>
    </div>
  ),
}
