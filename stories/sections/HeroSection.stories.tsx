import Hero from '@/components/hero'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Hero> = {
  title: 'Seções/Home/Hero — Locação de equipamentos',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Hero Section - Seção Principal

Replica exatamente a seção Hero da homepage com:
- Gradient de fundo laranja (orange-600 to orange-800)
- Typography responsiva com fonte Jost para títulos
- Barra de busca animada
- Botões CTAs com hover effects
- Informações de contato
- Elementos animados de fundo
- Imagem com stats flutuantes

## Design Tokens Utilizados
- **Cores**: \`#ea580c\` (primary), \`#f59e0b\` (yellow-500)
- **Fonts**: Inter (corpo), Jost (títulos)
- **Spacing**: Container max-w-7xl, padding responsivo
- **Animations**: Floating elements, scale transforms, pulse effects
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Hero>

export const Default: Story = {
  name: 'Hero Padrão',
  parameters: {
    docs: {
      description: {
        story:
          'Seção Hero completa exatamente como na homepage, com todos os elementos visuais e interações.',
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
        story:
          'Como a seção Hero aparece em dispositivos móveis, com layout responsivo.',
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
          'Layout da seção Hero em tablets, mostrando a transição entre mobile e desktop.',
      },
    },
  },
}
