import type { Meta, StoryObj } from '@storybook/nextjs';
import Header from './header';

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Header principal do site com navegação, logo e informações de contato. Inclui menu responsivo e top bar com informações da empresa.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <Story />
        <div className="pt-32 px-4">
          <h1 className="text-2xl font-bold mb-4">Conteúdo da Página</h1>
          <p className="text-gray-600">
            Este é o conteúdo da página que aparece abaixo do header fixo. O header permanece
            visível no topo durante a rolagem.
          </p>
          <div className="mt-8 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-semibold mb-2">Seção 1</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-semibold mb-2">Seção 2</h2>
              <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-semibold mb-2">Seção 3</h2>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story básica
export const Default: Story = {};

// Story com menu aberto (mobile)
export const MobileMenuOpen: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement;
    const menuButton = canvas.querySelector('[aria-label="Menu"]') as HTMLElement;
    if (menuButton) {
      menuButton.click();
    }
  },
};

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

// Story com scroll
export const WithScroll: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-32 px-4">
        <div className="space-y-8">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Seção {i + 1}</h2>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-gray-600">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstração do header fixo durante a rolagem da página.',
      },
    },
  },
};

// Story de demonstração responsiva
export const Responsive: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-32 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Header Responsivo</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Desktop</h2>
              <p className="text-gray-600 mb-4">
                No desktop, o header exibe a navegação completa horizontalmente, com o menu
                hambúrguer oculto.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Navegação horizontal visível</li>
                <li>• Menu hambúrguer oculto</li>
                <li>• Top bar com informações completas</li>
                <li>• Logo e branding em destaque</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Mobile</h2>
              <p className="text-gray-600 mb-4">
                No mobile, a navegação é ocultada e substituída por um menu hambúrguer que abre um
                drawer lateral.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Menu hambúrguer visível</li>
                <li>• Navegação em drawer lateral</li>
                <li>• Top bar compacta</li>
                <li>• Logo otimizado para mobile</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstração das características responsivas do header.',
      },
    },
  },
};
