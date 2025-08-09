import FeaturedMaterials from '@/components/featured-materials'
import type { Meta, StoryObj } from '@storybook/react'
import { featuredEquipmentsFixture } from '../fixtures/equipments'

// Mock global fetch for Storybook
if (typeof window !== 'undefined') {
  window.fetch = (() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(featuredEquipmentsFixture),
    })) as any
}

const meta: Meta<typeof FeaturedMaterials> = {
  title: 'Seções/Home/Featured — Equipamentos em Destaque',
  component: FeaturedMaterials,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'gray-50',
    },
    docs: {
      description: {
        component: `
# Featured Equipments Section - Equipamentos em Destaque

Seção que exibe os equipamentos mais procurados com:
- Grid responsivo de cards de equipamentos
- Imagens com hover effects (scale 1.05)
- Badges de categoria com cores dinâmicas
- Preços destacados em laranja
- Botões de ação (Ver Detalhes / Solicitar)
- Estados de disponibilidade
- CTA para ver todos os equipamentos

## Design Tokens Utilizados
- **Cards**: Background branco, shadow-xl, hover shadow-2xl
- **Preços**: Cor laranja (#ea580c), fonte bold
- **Badges**: Cores dinâmicas baseadas na categoria
- **Buttons**: Variants outline e default do design system
- **Layout**: Grid 1-2-3 colunas responsivo
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FeaturedMaterials>

export const Default: Story = {
  name: 'Equipamentos Padrão',
  parameters: {
    docs: {
      description: {
        story:
          'Grid completo de equipamentos em destaque com todos os elementos visuais.',
      },
    },
  },
}

export const WithUnavailableItems: Story = {
  name: 'Com Itens Indisponíveis',
  beforeEach: () => {
    // Mock com alguns itens indisponíveis
    const mixedAvailability = featuredEquipmentsFixture.map((eq, index) => ({
      ...eq,
      isAvailable: index % 3 !== 0, // Alguns indisponíveis
    }))

    window.fetch = (() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mixedAvailability),
      })) as any
  },
  parameters: {
    docs: {
      description: {
        story:
          'Como os cards aparecem quando alguns equipamentos estão indisponíveis.',
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
          'Skeleton loading state exibido durante o carregamento dos equipamentos.',
      },
    },
  },
}

export const EmptyState: Story = {
  name: 'Estado Vazio',
  beforeEach: () => {
    // Mock empty response
    window.fetch = (() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })) as any
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado exibido quando nenhum equipamento está disponível.',
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
        story: 'Layout mobile com uma coluna e cards otimizados para toque.',
      },
    },
  },
}
