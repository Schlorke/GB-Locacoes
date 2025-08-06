import type { Meta, StoryObj } from '@storybook/nextjs';
import Footer from './footer';

const meta: Meta<typeof Footer> = {
  title: 'Organisms/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Footer do site com informações da empresa, links rápidos, contato e redes sociais. Layout responsivo com grid adaptativo.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Conteúdo da Página</h1>
            <p className="text-gray-600 mb-8">
              Este é o conteúdo da página que aparece acima do footer. O footer sempre fica no final
              da página.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Seção 1</h2>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Seção 2</h2>
                <p className="text-gray-600">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story básica
export const Default: Story = {};

// Story em desktop
export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

// Story em tablet
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

// Story em mobile
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Story com conteúdo longo
export const WithLongContent: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Página com Conteúdo Longo</h1>
          <div className="space-y-8">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Seção {i + 1}</h2>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-gray-600">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstração do footer com conteúdo longo na página.',
      },
    },
  },
};

// Story de demonstração responsiva
export const Responsive: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Footer Responsivo</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Desktop (4 colunas)</h2>
              <p className="text-gray-600 mb-4">
                No desktop, o footer exibe 4 colunas com todas as informações organizadas
                horizontalmente.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Informações da empresa</li>
                <li>• Links rápidos</li>
                <li>• Informações de contato</li>
                <li>• Horário de funcionamento</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Tablet (2 colunas)</h2>
              <p className="text-gray-600 mb-4">
                No tablet, o layout se adapta para 2 colunas, reorganizando o conteúdo de forma
                otimizada.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Grid adaptativo</li>
                <li>• Espaçamento otimizado</li>
                <li>• Links organizados</li>
                <li>• Redes sociais visíveis</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Mobile (1 coluna)</h2>
              <p className="text-gray-600 mb-4">
                No mobile, todas as seções ficam em uma única coluna para melhor legibilidade e
                navegação.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Layout em coluna única</li>
                <li>• Espaçamento aumentado</li>
                <li>• Links touch-friendly</li>
                <li>• Informações empilhadas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstração das características responsivas do footer.',
      },
    },
  },
};

// Story isolada do footer
export const FooterOnly: Story = {
  render: () => <Footer />,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Footer isolado para visualização detalhada dos elementos.',
      },
    },
  },
};
