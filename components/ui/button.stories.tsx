import type { Meta, StoryObj } from '@storybook/nextjs';
import { Mail, Play, Plus } from 'lucide-react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
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
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'reset', 'link'],
      description: 'Variante visual do botão',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Tamanho do botão',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Estado desabilitado',
    },
    asChild: {
      control: { type: 'boolean' },
      description: 'Renderiza como elemento filho usando Radix Slot',
    },
    children: {
      control: { type: 'text' },
      description: 'Conteúdo do botão',
    },
    onClick: {
      action: 'clicked',
      description: 'Função chamada quando o botão é clicado',
    },
  },
  args: {
    children: 'Button',
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

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const Reset: Story = {
  args: {
    variant: 'reset',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
  },
};

// Stories para diferentes tamanhos
export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Icon: Story = {
  args: {
    size: 'icon',
    children: <Plus className="h-4 w-4" />,
  },
};

// Stories com ícones
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Mail className="mr-2 h-4 w-4" />
        Enviar Email
      </>
    ),
  },
};

export const WithIconRight: Story = {
  args: {
    children: (
      <>
        Assistir Vídeo
        <Play className="ml-2 h-4 w-4" />
      </>
    ),
  },
};

// Stories com estados
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: 'Carregando...',
    disabled: true,
  },
};

// Story com função play para demonstrar interações
export const InteractiveButton: Story = {
  args: {
    children: 'Clique em mim!',
    variant: 'default',
  },
  play: async ({ canvas, userEvent }) => {
    // Aguarda um pouco para garantir que o componente foi renderizado
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Encontra o botão
    const button = canvas.getByRole('button', { name: /clique em mim!/i });

    // Simula um hover
    await userEvent.hover(button);

    // Aguarda um pouco
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Clica no botão
    await userEvent.click(button);

    // Aguarda um pouco mais
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Clica novamente para demonstrar múltiplas interações
    await userEvent.click(button);
  },
};

// Story com múltiplos botões
export const MultipleButtons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="default">Primário</Button>
      <Button variant="secondary">Secundário</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    // Aguarda um pouco para garantir que o componente foi renderizado
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Clica em cada botão em sequência
    const primaryButton = canvas.getByRole('button', { name: /primário/i });
    await userEvent.click(primaryButton);

    await new Promise((resolve) => setTimeout(resolve, 200));

    const secondaryButton = canvas.getByRole('button', { name: /secundário/i });
    await userEvent.click(secondaryButton);

    await new Promise((resolve) => setTimeout(resolve, 200));

    const outlineButton = canvas.getByRole('button', { name: /outline/i });
    await userEvent.click(outlineButton);

    await new Promise((resolve) => setTimeout(resolve, 200));

    const destructiveButton = canvas.getByRole('button', { name: /destructive/i });
    await userEvent.click(destructiveButton);
  },
};

// Story com botão desabilitado
export const DisabledButtonInteraction: Story = {
  args: {
    children: 'Botão Desabilitado',
    disabled: true,
  },
  play: async ({ canvas, userEvent }) => {
    // Aguarda um pouco para garantir que o componente foi renderizado
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Tenta clicar no botão desabilitado
    const button = canvas.getByRole('button', { name: /botão desabilitado/i });

    // Simula hover (deve funcionar mesmo em botões desabilitados)
    await userEvent.hover(button);

    await new Promise((resolve) => setTimeout(resolve, 200));

    // Tenta clicar (não deve funcionar)
    await userEvent.click(button);
  },
};
