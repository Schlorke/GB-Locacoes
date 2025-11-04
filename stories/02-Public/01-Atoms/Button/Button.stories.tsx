import { Button } from '@/components/ui/button'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ArrowRight, Download, Loader2, Mail, Plus, Trash2 } from 'lucide-react'

const meta = {
  title: 'Public/Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de botão reutilizável com múltiplas variantes, tamanhos e estados. Baseado em Radix UI Slot para máxima flexibilidade.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'reset',
        'gradient',
        'link',
      ],
      description: 'Variante visual do botão',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Tamanho do botão',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado',
    },
    asChild: {
      control: 'boolean',
      description: 'Renderizar como componente filho (Radix Slot)',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Default Story (baseline)
export const Default: Story = {
  args: {
    children: 'Button',
  },
}

// Playground Story (todos os controles)
export const Playground: Story = {
  args: {
    children: 'Playground Button',
    variant: 'default',
    size: 'default',
    disabled: false,
  },
}

// Variantes
export const DefaultVariant: Story = {
  args: {
    children: 'Default Button',
    variant: 'default',
  },
}

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
}

export const Reset: Story = {
  args: {
    children: 'Reset',
    variant: 'reset',
  },
}

export const Gradient: Story = {
  args: {
    children: 'Gradient',
    variant: 'gradient',
    className: 'bg-gradient-to-r from-orange-500 to-orange-600',
  },
}

export const Link: Story = {
  args: {
    children: 'Link Style',
    variant: 'link',
  },
}

// Tamanhos
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
}

export const DefaultSize: Story = {
  args: {
    children: 'Default Size',
    size: 'default',
  },
}

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
}

export const Icon: Story = {
  args: {
    size: 'icon',
    children: <Plus className="h-4 w-4" />,
  },
}

// Estados
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
}

export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </>
    ),
  },
}

// Com Ícones
export const WithIconLeft: Story = {
  args: {
    children: (
      <>
        <Plus className="mr-2 h-4 w-4" />
        Add Item
      </>
    ),
  },
}

export const WithIconRight: Story = {
  args: {
    children: (
      <>
        Continue
        <ArrowRight className="ml-2 h-4 w-4" />
      </>
    ),
  },
}

export const DestructiveWithIcon: Story = {
  args: {
    variant: 'destructive',
    children: (
      <>
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </>
    ),
  },
}

export const OutlineWithIcon: Story = {
  args: {
    variant: 'outline',
    children: (
      <>
        <Download className="mr-2 h-4 w-4" />
        Download
      </>
    ),
  },
}

// Recipe: Grupo de Botões
export const ButtonGroup: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
}

// Recipe: Botões de Ação
export const ActionButtons: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-64">
      <Button className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add New
      </Button>
      <Button variant="outline" className="w-full">
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
      <Button variant="secondary" className="w-full">
        <Mail className="mr-2 h-4 w-4" />
        Send Email
      </Button>
      <Button variant="destructive" className="w-full">
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </Button>
    </div>
  ),
}

// Recipe: Form Actions
export const FormActions: Story = {
  render: () => (
    <div className="flex justify-end gap-3">
      <Button variant="outline">Cancel</Button>
      <Button>Save Changes</Button>
    </div>
  ),
}

// Recipe: Icon Buttons
export const IconButtons: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button size="icon">
        <Plus className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="outline">
        <Download className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost">
        <Mail className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="destructive">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  ),
}

// Recipe: Loading States
export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-64">
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Processing...
      </Button>
      <Button variant="outline" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Saving...
      </Button>
      <Button variant="destructive" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Deleting...
      </Button>
    </div>
  ),
}

// Todas as Variantes Lado a Lado
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Variantes Principais</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="reset">Reset</Button>
          <Button
            variant="gradient"
            className="bg-gradient-to-r from-orange-500 to-orange-600"
          >
            Gradient
          </Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Tamanhos</h3>
        <div className="flex items-center flex-wrap gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Com Ícones</h3>
        <div className="flex flex-wrap gap-3">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="secondary">
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Estados</h3>
        <div className="flex flex-wrap gap-3">
          <Button disabled>Disabled</Button>
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading
          </Button>
        </div>
      </div>
    </div>
  ),
}
