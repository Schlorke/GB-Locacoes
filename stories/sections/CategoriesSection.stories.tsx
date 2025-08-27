import Categories from '@/components/categories'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { categoriesFixture } from '../fixtures/categories'

// Mock global fetch for Storybook
if (typeof window !== 'undefined') {
  window.fetch = (() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve(
          categoriesFixture.map((cat) => ({
            id: cat.id,
            name: cat.name,
            description: cat.description,
            icon: cat.icon.displayName || 'Building',
            slug: cat.slug,
            _count: { equipments: cat.count },
          }))
        ),
    })) as any
}

const meta: Meta<typeof Categories> = {
  title: 'Seções/Home/Categories — Categorias de Equipamentos',
  component: Categories,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'gray-50',
    },
    docs: {
      description: {
        component: `
# Categories Section - Categorias de Equipamentos

Seção que exibe as categorias principais de equipamentos com:
- Grid responsivo (1 col mobile, 2 cols tablet, 3 cols desktop)
- Cards com hover effects e animações staggered
- Ícones dinâmicos do Lucide React
- Contadores de equipamentos por categoria
- Background gradient no hover
- Linha de acento laranja no bottom

## Design Tokens Utilizados
- **Background**: \`gray-50\` (#f8fafc)
- **Cards**: Background branco com shadow-xl
- **Icons**: Circle gradient laranja (#ea580c to #9a3412)
- **Hover**: Scale 1.05, shadow-2xl
- **Typography**: Jost para títulos, Inter para descrições
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Categories>

export const Default: Story = {
  name: 'Categorias Padrão',
  parameters: {
    docs: {
      description: {
        story:
          'Grid de categorias completo com animações de entrada e hover effects.',
      },
    },
  },
}

export const Mobile: Story = {
  name: 'Vista Mobile',
  parameters: {
    viewport: {
      defaultViewport: 'iphone12',
    },
    docs: {
      description: {
        story: 'Layout mobile com uma coluna e espaçamento otimizado.',
      },
    },
  },
}

export const LoadingState: Story = {
  name: 'Estado de Carregamento',
  beforeEach: () => {
    // Mock loading state
    window.fetch = (() => new Promise(() => {})) as any
  },
  parameters: {
    docs: {
      description: {
        story:
          'Estado exibido enquanto as categorias estão sendo carregadas da API.',
      },
    },
  },
}
