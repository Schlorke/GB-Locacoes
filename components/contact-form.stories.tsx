import { Toaster } from '@/components/ui/toaster';
import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import ContactForm from './contact-form';

const meta: Meta<typeof ContactForm> = {
  title: 'Molecules/ContactForm',
  component: ContactForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Formulário de contato para solicitação de orçamento de equipamentos. Inclui validação, estados de loading e feedback visual.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl p-6">
        <Story />
        <Toaster />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story básica
export const Default: Story = {};

// Story com formulário preenchido
export const Prefilled: Story = {
  render: () => {
    // Mock do componente com dados preenchidos
    const MockContactForm = () => {
      const [formData, setFormData] = React.useState({
        name: 'João Silva',
        email: 'joao@exemplo.com',
        phone: '(51) 99999-9999',
        equipment: 'Betoneira 400L',
        message:
          'Preciso de uma betoneira para uma obra pequena. Gostaria de saber sobre disponibilidade e preços.',
      });

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Mock de envio
        console.log('Formulário enviado:', formData);
      };

      return (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Nome Completo *
              </label>
              <input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Seu nome completo"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="phone" className="text-sm font-medium">
                Telefone *
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="(51) 99999-9999"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium">
              E-mail *
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="seu@email.com"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label htmlFor="equipment" className="text-sm font-medium">
              Equipamento de Interesse *
            </label>
            <select
              id="equipment"
              value={formData.equipment}
              onChange={(e) => setFormData((prev) => ({ ...prev, equipment: e.target.value }))}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Selecione um equipamento</option>
              <option value="Betoneira 400L">Betoneira 400L</option>
              <option value="Betoneira 500L">Betoneira 500L</option>
              <option value="Vibrador de Concreto">Vibrador de Concreto</option>
              <option value="Cortador de Piso">Cortador de Piso</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-medium">
              Mensagem
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="Descreva sua necessidade..."
              rows={4}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md text-sm font-medium"
          >
            Enviar Solicitação
          </button>
        </form>
      );
    };

    return <MockContactForm />;
  },
};

// Story com função play para demonstrar interações automáticas
export const WithPlayFunction: Story = {
  play: async ({ canvas, userEvent }) => {
    // Aguarda um pouco para garantir que o componente foi renderizado
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Preenche o campo de nome
    const nameInput = canvas.getByLabelText('Nome Completo *', {
      selector: 'input',
    });
    await userEvent.type(nameInput, 'Maria Silva', { delay: 50 });

    // Preenche o campo de telefone
    const phoneInput = canvas.getByLabelText('Telefone *', {
      selector: 'input',
    });
    await userEvent.type(phoneInput, '(51) 88888-8888', { delay: 50 });

    // Preenche o campo de email
    const emailInput = canvas.getByLabelText('E-mail *', {
      selector: 'input',
    });
    await userEvent.type(emailInput, 'maria@exemplo.com', { delay: 50 });

    // Seleciona um equipamento
    const equipmentSelect = canvas.getByLabelText('Equipamento de Interesse *', {
      selector: 'select',
    });
    await userEvent.selectOptions(equipmentSelect, 'Vibrador de Concreto');

    // Preenche a mensagem
    const messageTextarea = canvas.getByLabelText('Mensagem', {
      selector: 'textarea',
    });
    await userEvent.type(messageTextarea, 'Preciso de um vibrador para uma obra de fundação.', {
      delay: 50,
    });

    // Clica no botão de enviar
    const submitButton = canvas.getByRole('button', { name: /enviar solicitação/i });
    await userEvent.click(submitButton);
  },
};

// Story com validação de formulário
export const FormValidation: Story = {
  play: async ({ canvas, userEvent }) => {
    // Tenta enviar o formulário sem preencher os campos obrigatórios
    const submitButton = canvas.getByRole('button', { name: /enviar solicitação/i });
    await userEvent.click(submitButton);

    // Aguarda um pouco para ver os erros de validação
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Agora preenche apenas o nome para testar validação parcial
    const nameInput = canvas.getByLabelText('Nome Completo *', {
      selector: 'input',
    });
    await userEvent.type(nameInput, 'João Teste', { delay: 50 });

    // Tenta enviar novamente
    await userEvent.click(submitButton);
  },
};

// Story com preenchimento rápido
export const QuickFill: Story = {
  play: async ({ canvas, userEvent }) => {
    // Preenchimento rápido de todos os campos
    const nameInput = canvas.getByLabelText('Nome Completo *', {
      selector: 'input',
    });
    await userEvent.type(nameInput, 'Ana Rápida', { delay: 10 });

    const phoneInput = canvas.getByLabelText('Telefone *', {
      selector: 'input',
    });
    await userEvent.type(phoneInput, '(51) 77777-7777', { delay: 10 });

    const emailInput = canvas.getByLabelText('E-mail *', {
      selector: 'input',
    });
    await userEvent.type(emailInput, 'ana@rapida.com', { delay: 10 });

    const equipmentSelect = canvas.getByLabelText('Equipamento de Interesse *', {
      selector: 'select',
    });
    await userEvent.selectOptions(equipmentSelect, 'Cortador de Piso');

    const messageTextarea = canvas.getByLabelText('Mensagem', {
      selector: 'textarea',
    });
    await userEvent.type(messageTextarea, 'Preciso urgente!', { delay: 10 });

    // Envia o formulário
    const submitButton = canvas.getByRole('button', { name: /enviar solicitação/i });
    await userEvent.click(submitButton);
  },
};

// Story com estado de loading
export const Loading: Story = {
  render: () => {
    const MockContactForm = () => {
      const [isSubmitting, setIsSubmitting] = React.useState(true);

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Mock de loading
      };

      return (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Nome Completo *
              </label>
              <input
                id="name"
                placeholder="Seu nome completo"
                required
                disabled
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:opacity-50"
              />
            </div>
            <div>
              <label htmlFor="phone" className="text-sm font-medium">
                Telefone *
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="(51) 99999-9999"
                required
                disabled
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium">
              E-mail *
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              required
              disabled
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="equipment" className="text-sm font-medium">
              Equipamento de Interesse
            </label>
            <input
              id="equipment"
              placeholder="Ex: Betoneira, Andaime, etc."
              disabled
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-medium">
              Mensagem *
            </label>
            <textarea
              id="message"
              placeholder="Descreva seu projeto e necessidades..."
              rows={4}
              required
              disabled
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold py-3 px-6 rounded-lg opacity-50 cursor-not-allowed flex items-center justify-center"
          >
            <svg
              className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Enviando...
          </button>
        </form>
      );
    };

    return <MockContactForm />;
  },
};

// Story com validação de erro
export const WithErrors: Story = {
  render: () => {
    const MockContactForm = () => {
      const [errors, setErrors] = React.useState({
        name: 'Nome é obrigatório',
        email: 'E-mail inválido',
        phone: 'Telefone é obrigatório',
        message: 'Mensagem é obrigatória',
      });

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Mock de validação
      };

      return (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Nome Completo *
              </label>
              <input
                id="name"
                placeholder="Seu nome completo"
                required
                className="flex h-10 w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm"
              />
              {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="text-sm font-medium">
                Telefone *
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="(51) 99999-9999"
                required
                className="flex h-10 w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm"
              />
              {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium">
              E-mail *
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              required
              className="flex h-10 w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm"
            />
            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="equipment" className="text-sm font-medium">
              Equipamento de Interesse
            </label>
            <input
              id="equipment"
              placeholder="Ex: Betoneira, Andaime, etc."
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-medium">
              Mensagem *
            </label>
            <textarea
              id="message"
              placeholder="Descreva seu projeto e necessidades..."
              rows={4}
              required
              className="flex w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm"
            />
            {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105"
          >
            Enviar Solicitação
          </button>
        </form>
      );
    };

    return <MockContactForm />;
  },
};

// Story de demonstração responsiva
export const Responsive: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Formulário de Contato</h3>
          <ContactForm />
        </div>
        <div className="bg-muted p-6 rounded-lg">
          <h4 className="font-semibold mb-2">Informações de Contato</h4>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Telefone:</strong> (51) 99999-9999
            </p>
            <p>
              <strong>E-mail:</strong> contato@gblocacoes.com
            </p>
            <p>
              <strong>Endereço:</strong> Rua Exemplo, 123 - Porto Alegre/RS
            </p>
            <p>
              <strong>Horário:</strong> Seg-Sex: 8h às 18h
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstração do formulário em layout responsivo com informações de contato.',
      },
    },
  },
};
