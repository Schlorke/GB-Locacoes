import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { HeaderSearchCombobox } from '@/components/header-search-combobox'

const meta = {
  title: 'Public/Molecules/HeaderSearchCombobox',
  component: HeaderSearchCombobox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Componente de busca inteligente para o header. Apresenta um Popover elegante com autocomplete, buscas populares e feedback visual rico. Integrado com a API de busca de equipamentos.',
      },
    },
  },
} satisfies Meta<typeof HeaderSearchCombobox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Estado padrão do botão de busca. Clique para abrir o popover com o campo de busca e sugestões.',
      },
    },
  },
}

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interaja com o componente para testar todas as funcionalidades: busca em tempo real, navegação por teclado (↑/↓/Enter/Escape), buscas populares e feedback visual.',
      },
    },
  },
}

export const InHeaderContext: Story = {
  render: () => (
    <div className="bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/50 p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white p-2.5 rounded-xl font-bold text-lg shadow-lg">
            GB
          </div>
          <div>
            <div className="font-bold text-lg text-slate-800">GB Locações</div>
            <div className="text-xs text-slate-500">
              Equipamentos para Construção
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <HeaderSearchCombobox />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Visualização do componente integrado no contexto do header, mostrando como ele se comporta ao lado de outros elementos da navegação.',
      },
    },
  },
}

export const WithDarkBackground: Story = {
  render: () => (
    <div className="bg-slate-800 p-8 rounded-xl">
      <div className="flex justify-end">
        <HeaderSearchCombobox />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Componente sobre fundo escuro, demonstrando o contraste visual e a legibilidade em diferentes contextos.',
      },
    },
  },
}
