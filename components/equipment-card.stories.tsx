import type { Meta, StoryObj } from '@storybook/nextjs';
import { expect, within } from '@storybook/test';
import { EquipmentCard } from './equipment-card';

const meta: Meta<typeof EquipmentCard> = {
  title: 'Molecules/EquipmentCard',
  component: EquipmentCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Card de equipamento usado para exibir informações de produtos disponíveis para locação. Inclui imagem, categoria, status de disponibilidade, preço e ações.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    equipment: {
      control: { type: 'object' },
      description: 'Dados do equipamento',
    },
  },
  args: {
    equipment: {
      id: '1',
      name: 'Betoneira 400L',
      description:
        'Betoneira elétrica de 400 litros, ideal para pequenas obras e reformas. Motor de 1/2 CV, capacidade de 400L.',
      pricePerDay: 150.0,
      imageUrl: '/placeholder.svg',
      category: {
        name: 'Construção',
      },
      isAvailable: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story básica
export const Default: Story = {
  args: {
    equipment: {
      id: '1',
      name: 'Betoneira 400L',
      description:
        'Betoneira elétrica de 400 litros, ideal para pequenas obras e reformas. Motor de 1/2 CV, capacidade de 400L.',
      pricePerDay: 150.0,
      imageUrl: '/placeholder.svg',
      category: {
        name: 'Construção',
      },
      isAvailable: true,
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verificar elementos do card', async () => {
      // Verificar se o nome do equipamento está visível
      await expect(canvas.getByText('Betoneira 400L')).toBeInTheDocument();

      // Verificar se a descrição está visível
      await expect(canvas.getByText(/Betoneira elétrica de 400 litros/)).toBeInTheDocument();

      // Verificar se o preço está formatado corretamente
      await expect(canvas.getByText('R$ 150,00')).toBeInTheDocument();

      // Verificar se a categoria está visível
      await expect(canvas.getByText('Construção')).toBeInTheDocument();

      // Verificar se o status de disponibilidade está visível
      await expect(canvas.getByText('Disponível')).toBeInTheDocument();
    });

    await step('Testar botão Ver Detalhes', async () => {
      const verDetalhesButton = canvas.getByRole('link', { name: /ver detalhes/i });
      await expect(verDetalhesButton).toBeInTheDocument();
      await expect(verDetalhesButton).toHaveAttribute('href', '/equipamentos/1');
    });

    await step('Testar botão Solicitar Orçamento', async () => {
      const orcamentoButton = canvas.getByRole('link', { name: /solicitar orçamento/i });
      await expect(orcamentoButton).toBeInTheDocument();
      await expect(orcamentoButton).toHaveAttribute('href', '/orcamento?equipmentId=1');
      await expect(orcamentoButton).not.toBeDisabled();
    });
  },
};

// Story de equipamento indisponível
export const Unavailable: Story = {
  args: {
    equipment: {
      id: '2',
      name: 'Furadeira de Impacto',
      description: 'Furadeira de impacto profissional, 800W, com maleta e acessórios incluídos.',
      pricePerDay: 80.0,
      imageUrl: '/placeholder.svg',
      category: {
        name: 'Ferramentas',
      },
      isAvailable: false,
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verificar status indisponível', async () => {
      // Verificar se o status de indisponibilidade está visível
      await expect(canvas.getByText('Indisponível')).toBeInTheDocument();

      // Verificar se o botão de orçamento está desabilitado
      const orcamentoButton = canvas.getByRole('link', { name: /solicitar orçamento/i });
      await expect(orcamentoButton).toBeDisabled();
    });

    await step('Verificar botão Ver Detalhes ainda funcional', async () => {
      const verDetalhesButton = canvas.getByRole('link', { name: /ver detalhes/i });
      await expect(verDetalhesButton).toBeInTheDocument();
      await expect(verDetalhesButton).toHaveAttribute('href', '/equipamentos/2');
    });
  },
};

// Story de equipamento sem imagem com interações
export const NoImage: Story = {
  args: {
    equipment: {
      id: '3',
      name: 'Andaime Tubular',
      description: 'Andaime tubular metálico, 2m x 1m, com travamentos de segurança.',
      pricePerDay: 200.0,
      category: {
        name: 'Construção',
      },
      isAvailable: true,
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verificar fallback de imagem', async () => {
      // Verificar se a imagem placeholder está sendo usada
      const image = canvas.getByAltText('Andaime Tubular');
      await expect(image).toBeInTheDocument();
      await expect(image).toHaveAttribute('src', expect.stringContaining('placeholder.svg'));
    });

    await step('Verificar preço formatado', async () => {
      await expect(canvas.getByText('R$ 200,00')).toBeInTheDocument();
    });
  },
};

// Story de equipamento com preço alto
export const HighPrice: Story = {
  args: {
    equipment: {
      id: '4',
      name: 'Escavadeira Hidráulica',
      description:
        'Escavadeira hidráulica de 1.5 toneladas, ideal para escavações em terrenos difíceis.',
      pricePerDay: 1500.0,
      imageUrl: '/placeholder.svg',
      category: {
        name: 'Maquinário Pesado',
      },
      isAvailable: true,
    },
  },
};

// Story de equipamento com descrição longa
export const LongDescription: Story = {
  args: {
    equipment: {
      id: '5',
      name: 'Gerador de Energia',
      description:
        'Gerador de energia a diesel de 10kW, com painel de controle digital, tanque de 25L, autonomia de até 8 horas em carga média. Ideal para eventos, obras e emergências. Inclui cabos de extensão e manual de instruções.',
      pricePerDay: 300.0,
      imageUrl: '/placeholder.svg',
      category: {
        name: 'Energia',
      },
      isAvailable: true,
    },
  },
};

// Story de equipamento com nome longo
export const LongName: Story = {
  args: {
    equipment: {
      id: '6',
      name: 'Compressor de Ar Industrial de Alta Pressão com Sistema de Filtros Múltiplos',
      description: 'Compressor profissional para uso industrial.',
      pricePerDay: 250.0,
      imageUrl: '/placeholder.svg',
      category: {
        name: 'Ar Comprimido',
      },
      isAvailable: true,
    },
  },
};

// Story de equipamento com preço zero com interações
export const FreeEquipment: Story = {
  args: {
    equipment: {
      id: '7',
      name: 'Carrinho de Mão',
      description: 'Carrinho de mão resistente, ideal para transporte de materiais.',
      pricePerDay: 0.0,
      imageUrl: '/placeholder.svg',
      category: {
        name: 'Transporte',
      },
      isAvailable: true,
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verificar preço zero formatado', async () => {
      // Verificar se o preço zero está sendo exibido corretamente
      await expect(canvas.getByText('R$ 0,00')).toBeInTheDocument();
    });

    await step('Verificar botões funcionais mesmo com preço zero', async () => {
      const verDetalhesButton = canvas.getByRole('link', { name: /ver detalhes/i });
      const orcamentoButton = canvas.getByRole('link', { name: /solicitar orçamento/i });

      await expect(verDetalhesButton).toBeInTheDocument();
      await expect(orcamentoButton).toBeInTheDocument();
      await expect(orcamentoButton).not.toBeDisabled();
    });
  },
};

// Story de demonstração com múltiplos cards
export const MultipleCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl">
      <EquipmentCard
        equipment={{
          id: '1',
          name: 'Betoneira 400L',
          description: 'Betoneira elétrica de 400 litros, ideal para pequenas obras.',
          pricePerDay: 150.0,
          imageUrl: '/placeholder.svg',
          category: { name: 'Construção' },
          isAvailable: true,
        }}
      />
      <EquipmentCard
        equipment={{
          id: '2',
          name: 'Furadeira de Impacto',
          description: 'Furadeira de impacto profissional, 800W.',
          pricePerDay: 80.0,
          imageUrl: '/placeholder.svg',
          category: { name: 'Ferramentas' },
          isAvailable: false,
        }}
      />
      <EquipmentCard
        equipment={{
          id: '3',
          name: 'Andaime Tubular',
          description: 'Andaime tubular metálico, 2m x 1m.',
          pricePerDay: 200.0,
          imageUrl: '/placeholder.svg',
          category: { name: 'Construção' },
          isAvailable: true,
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstração de múltiplos cards de equipamento em um grid responsivo.',
      },
    },
  },
};

// Story de diferentes categorias
export const DifferentCategories: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl">
      <EquipmentCard
        equipment={{
          id: '1',
          name: 'Betoneira 400L',
          description: 'Betoneira elétrica de 400 litros.',
          pricePerDay: 150.0,
          imageUrl: '/placeholder.svg',
          category: { name: 'Construção' },
          isAvailable: true,
        }}
      />
      <EquipmentCard
        equipment={{
          id: '2',
          name: 'Furadeira de Impacto',
          description: 'Furadeira de impacto profissional.',
          pricePerDay: 80.0,
          imageUrl: '/placeholder.svg',
          category: { name: 'Ferramentas' },
          isAvailable: true,
        }}
      />
      <EquipmentCard
        equipment={{
          id: '3',
          name: 'Gerador de Energia',
          description: 'Gerador de energia a diesel de 10kW.',
          pricePerDay: 300.0,
          imageUrl: '/placeholder.svg',
          category: { name: 'Energia' },
          isAvailable: true,
        }}
      />
      <EquipmentCard
        equipment={{
          id: '4',
          name: 'Compressor de Ar',
          description: 'Compressor profissional para uso industrial.',
          pricePerDay: 250.0,
          imageUrl: '/placeholder.svg',
          category: { name: 'Ar Comprimido' },
          isAvailable: true,
        }}
      />
      <EquipmentCard
        equipment={{
          id: '5',
          name: 'Carrinho de Mão',
          description: 'Carrinho de mão resistente.',
          pricePerDay: 0.0,
          imageUrl: '/placeholder.svg',
          category: { name: 'Transporte' },
          isAvailable: true,
        }}
      />
      <EquipmentCard
        equipment={{
          id: '6',
          name: 'Escavadeira Hidráulica',
          description: 'Escavadeira hidráulica de 1.5 toneladas.',
          pricePerDay: 1500.0,
          imageUrl: '/placeholder.svg',
          category: { name: 'Maquinário Pesado' },
          isAvailable: false,
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstração de cards com diferentes categorias de equipamentos.',
      },
    },
  },
};

// Story com interações avançadas
export const InteractiveDemo: Story = {
  args: {
    equipment: {
      id: '8',
      name: 'Máquina de Solda',
      description: 'Máquina de solda elétrica profissional, 200A, com regulagem de corrente.',
      pricePerDay: 120.0,
      imageUrl: '/placeholder.svg',
      category: {
        name: 'Soldagem',
      },
      isAvailable: true,
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verificar estrutura inicial do card', async () => {
      // Verificar se todos os elementos estão presentes
      await expect(canvas.getByText('Máquina de Solda')).toBeInTheDocument();
      await expect(canvas.getByText('Soldagem')).toBeInTheDocument();
      await expect(canvas.getByText('Disponível')).toBeInTheDocument();
      await expect(canvas.getByText('R$ 120,00')).toBeInTheDocument();
    });

    await step('Testar navegação dos botões', async () => {
      const verDetalhesButton = canvas.getByRole('link', { name: /ver detalhes/i });
      const orcamentoButton = canvas.getByRole('link', { name: /solicitar orçamento/i });

      // Verificar URLs corretas
      await expect(verDetalhesButton).toHaveAttribute('href', '/equipamentos/8');
      await expect(orcamentoButton).toHaveAttribute('href', '/orcamento?equipmentId=8');

      // Verificar que os botões não estão desabilitados
      await expect(verDetalhesButton).not.toBeDisabled();
      await expect(orcamentoButton).not.toBeDisabled();
    });

    await step('Verificar acessibilidade', async () => {
      // Verificar se a imagem tem alt text
      const image = canvas.getByAltText('Máquina de Solda');
      await expect(image).toBeInTheDocument();

      // Verificar se os botões têm roles apropriados
      await expect(canvas.getByRole('link', { name: /ver detalhes/i })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: /solicitar orçamento/i })).toBeInTheDocument();
    });
  },
};
