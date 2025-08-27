import Categories from '@/components/categories'
import ContactSection from '@/components/contact-section'
import FeaturedMaterials from '@/components/featured-materials'
import Hero from '@/components/hero'
import WhyChooseUs from '@/components/why-choose-us'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { categoriesFixture } from '../fixtures/categories'
import { featuredEquipmentsFixture } from '../fixtures/equipments'

// Mock APIs for complete homepage
if (typeof window !== 'undefined') {
  window.fetch = ((url: string) => {
    if (url.includes('/api/categories')) {
      return Promise.resolve({
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
      })
    }

    if (url.includes('/api/equipments')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(featuredEquipmentsFixture),
      })
    }

    return Promise.resolve({
      ok: false,
      json: () => Promise.resolve([]),
    })
  }) as any
}

// Complete Homepage component
function Homepage() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedMaterials />
      <WhyChooseUs />
      <ContactSection />
    </main>
  )
}

const meta: Meta<typeof Homepage> = {
  title: 'Páginas/Homepage — Página Completa',
  component: Homepage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Homepage Completa - GB Locações

Página inicial completa da GB Locações, exatamente como no site real:

## Seções Incluídas
1. **Hero** - Seção principal com CTA e busca
2. **Categories** - Grid de categorias de equipamentos  
3. **Featured** - Equipamentos em destaque
4. **Why Choose Us** - Benefícios da empresa
5. **Contact** - Formulário e informações de contato

## Design Fidelity
- ✅ Cores exatas do design system (#ea580c, #3b82f6)
- ✅ Typography com Inter + Jost
- ✅ Spacing e layout idênticos ao app
- ✅ Animações e hover effects preservados
- ✅ Responsividade em todos os breakpoints

Esta story permite visualizar o fluxo completo da homepage e como as seções se integram visualmente.
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Homepage>

export const Complete: Story = {
  name: 'Homepage Completa',
  parameters: {
    docs: {
      description: {
        story:
          'Página inicial completa da GB Locações com todas as seções integradas.',
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
        story: 'Como a homepage completa aparece em dispositivos móveis.',
      },
    },
  },
}

export const Tablet: Story = {
  name: 'Vista Tablet',
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
    docs: {
      description: {
        story:
          'Layout da homepage em tablets mostrando a transição responsiva.',
      },
    },
  },
}

export const ReducedMotion: Story = {
  name: 'Movimento Reduzido',
  globals: {
    reducedMotion: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Homepage com todas as animações reduzidas para acessibilidade.',
      },
    },
  },
}
