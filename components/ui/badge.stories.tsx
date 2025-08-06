import type { Meta, StoryObj } from '@storybook/nextjs';
import { X } from 'lucide-react';
import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de badge reutilizável com múltiplas variantes. Usado para destacar informações, status ou categorias.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'Variante visual do badge',
    },
    children: {
      control: { type: 'text' },
      description: 'Conteúdo do badge',
    },
    className: {
      control: { type: 'text' },
      description: 'Classes CSS adicionais',
    },
  },
  args: {
    children: 'Badge',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Stories básicas para cada variante
export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Error',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

// Stories com conteúdo específico
export const Status: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">Active</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="destructive">Failed</Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
  ),
};

export const Categories: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">Technology</Badge>
      <Badge variant="secondary">Design</Badge>
      <Badge variant="outline">Marketing</Badge>
      <Badge variant="destructive">Urgent</Badge>
    </div>
  ),
};

export const Numbers: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">12</Badge>
      <Badge variant="secondary">99+</Badge>
      <Badge variant="destructive">3</Badge>
      <Badge variant="outline">42</Badge>
    </div>
  ),
};

// Stories com ícones
export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">
        <X className="w-3 h-3 mr-1" />
        Remove
      </Badge>
      <Badge variant="secondary">
        ✓<span className="ml-1">Complete</span>
      </Badge>
      <Badge variant="destructive">
        ⚠<span className="ml-1">Warning</span>
      </Badge>
    </div>
  ),
};

// Stories de tamanhos customizados
export const CustomSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge className="text-xs px-2 py-1">Small</Badge>
      <Badge className="text-sm px-3 py-1">Medium</Badge>
      <Badge className="text-base px-4 py-2">Large</Badge>
    </div>
  ),
};

// Stories de cores customizadas
export const CustomColors: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge className="bg-blue-500 text-white hover:bg-blue-600">Blue</Badge>
      <Badge className="bg-green-500 text-white hover:bg-green-600">Green</Badge>
      <Badge className="bg-purple-500 text-white hover:bg-purple-600">Purple</Badge>
      <Badge className="bg-orange-500 text-white hover:bg-orange-600">Orange</Badge>
    </div>
  ),
};

// Story de demonstração com todas as variantes
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Default Variants</h3>
        <div className="flex gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Status Examples</h3>
        <div className="flex gap-2">
          <Badge variant="default">Active</Badge>
          <Badge variant="secondary">Pending</Badge>
          <Badge variant="destructive">Error</Badge>
          <Badge variant="outline">Draft</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">With Icons</h3>
        <div className="flex gap-2">
          <Badge variant="default">
            <X className="w-3 h-3 mr-1" />
            Remove
          </Badge>
          <Badge variant="secondary">✓ Complete</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstração completa de todas as variantes e usos do Badge.',
      },
    },
  },
};

// Story de uso em contexto
export const InContext: Story = {
  render: () => (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Project Dashboard</h3>
        <Badge variant="default">Active</Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>Tasks Completed</span>
          <Badge variant="secondary">24/30</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span>Issues</span>
          <Badge variant="destructive">3</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span>Status</span>
          <Badge variant="outline">In Progress</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de uso do Badge em um contexto real de interface.',
      },
    },
  },
};
