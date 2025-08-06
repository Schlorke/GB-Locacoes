import type { Meta, StoryObj } from '@storybook/nextjs';
import { Mail, Search as SearchIcon } from 'lucide-react';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de input reutilizável com suporte a diferentes tipos e estados. Baseado no ShadCN UI.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'file'],
      description: 'Tipo do input HTML',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Texto de placeholder',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Estado desabilitado',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Campo obrigatório',
    },
    value: {
      control: { type: 'text' },
      description: 'Valor do input',
    },
    onChange: {
      action: 'changed',
      description: 'Função chamada quando o valor muda',
    },
    onFocus: {
      action: 'focused',
      description: 'Função chamada quando o input recebe foco',
    },
    onBlur: {
      action: 'blurred',
      description: 'Função chamada quando o input perde foco',
    },
  },
  args: {
    placeholder: 'Digite algo...',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Stories básicas para diferentes tipos
export const Default: Story = {
  args: {
    type: 'text',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'seu@email.com',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Digite sua senha',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Digite um número',
  },
};

export const Tel: Story = {
  args: {
    type: 'tel',
    placeholder: '(11) 99999-9999',
  },
};

export const Url: Story = {
  args: {
    type: 'url',
    placeholder: 'https://exemplo.com',
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Pesquisar...',
  },
};

// Stories com estados
export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Valor desabilitado',
  },
};

export const Required: Story = {
  args: {
    required: true,
    placeholder: 'Campo obrigatório *',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Valor preenchido',
  },
};

// Stories com ícones
export const WithIcon: Story = {
  render: () => (
    <div className="relative">
      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input type="email" placeholder="seu@email.com" className="pl-10" />
    </div>
  ),
};

export const WithIconRight: Story = {
  render: () => (
    <div className="relative">
      <SearchIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input type="search" placeholder="Pesquisar..." className="pr-10" />
    </div>
  ),
};

// Stories com função play para demonstrar interações
export const InteractiveInput: Story = {
  args: {
    type: 'text',
    placeholder: 'Digite seu nome...',
  },
  play: async ({ canvas, userEvent }) => {
    // Aguarda um pouco para garantir que o componente foi renderizado
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Encontra o input
    const input = canvas.getByPlaceholderText('Digite seu nome...');

    // Simula foco no input
    await userEvent.click(input);

    // Aguarda um pouco
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Digita no input
    await userEvent.type(input, 'João Silva', { delay: 50 });

    // Aguarda um pouco
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Simula blur (perda de foco)
    await userEvent.tab();
  },
};

// Story com validação de email
export const EmailValidation: Story = {
  args: {
    type: 'email',
    placeholder: 'Digite seu email...',
  },
  play: async ({ canvas, userEvent }) => {
    // Aguarda um pouco para garantir que o componente foi renderizado
    await new Promise((resolve) => setTimeout(resolve, 100));

    const input = canvas.getByPlaceholderText('Digite seu email...');

    // Digita um email inválido
    await userEvent.type(input, 'email-invalido', { delay: 50 });

    await new Promise((resolve) => setTimeout(resolve, 300));

    // Limpa o input
    await userEvent.clear(input);

    await new Promise((resolve) => setTimeout(resolve, 200));

    // Digita um email válido
    await userEvent.type(input, 'joao@exemplo.com', { delay: 50 });
  },
};

// Story com múltiplos inputs
export const MultipleInputs: Story = {
  render: () => (
    <div className="space-y-4">
      <Input type="text" placeholder="Nome completo" />
      <Input type="email" placeholder="Email" />
      <Input type="tel" placeholder="Telefone" />
      <Input type="password" placeholder="Senha" />
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    // Aguarda um pouco para garantir que o componente foi renderizado
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Preenche cada input em sequência
    const nameInput = canvas.getByPlaceholderText('Nome completo');
    await userEvent.type(nameInput, 'Maria Silva', { delay: 30 });

    await new Promise((resolve) => setTimeout(resolve, 200));

    const emailInput = canvas.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'maria@exemplo.com', { delay: 30 });

    await new Promise((resolve) => setTimeout(resolve, 200));

    const phoneInput = canvas.getByPlaceholderText('Telefone');
    await userEvent.type(phoneInput, '(51) 99999-9999', { delay: 30 });

    await new Promise((resolve) => setTimeout(resolve, 200));

    const passwordInput = canvas.getByPlaceholderText('Senha');
    await userEvent.type(passwordInput, 'senha123', { delay: 30 });
  },
};

// Story com input desabilitado
export const DisabledInputInteraction: Story = {
  args: {
    disabled: true,
    value: 'Input desabilitado',
  },
  play: async ({ canvas, userEvent }) => {
    // Aguarda um pouco para garantir que o componente foi renderizado
    await new Promise((resolve) => setTimeout(resolve, 100));

    const input = canvas.getByDisplayValue('Input desabilitado');

    // Tenta clicar no input desabilitado
    await userEvent.click(input);

    await new Promise((resolve) => setTimeout(resolve, 200));

    // Tenta digitar no input desabilitado (não deve funcionar)
    await userEvent.type(input, 'tentativa de digitação');
  },
};
