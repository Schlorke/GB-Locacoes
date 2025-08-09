import WhyChooseUs from '@/components/why-choose-us'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof WhyChooseUs> = {
  title: 'Seções/Home/WhyChooseUs — Por que Escolher a GB Locações',
  component: WhyChooseUs,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'gray-900',
    },
    docs: {
      description: {
        component: `
# Why Choose Us Section - Por que Escolher a GB Locações

Seção dark com benefícios da empresa, contendo:
- Background dark (gray-900) com elementos flutuantes animados
- Grid responsivo de cards com benefícios
- Cards com backdrop-blur e hover effects
- Ícones em circles com gradient laranja
- CTA section final com gradient background
- Animações de pulse e float nos elementos decorativos

## Design Tokens Utilizados
- **Background**: \`gray-900\` (#111827) 
- **Cards**: \`gray-800/50\` com backdrop-blur-sm
- **Text**: Branco para títulos, \`gray-300\` para descrições
- **Icons**: Circle gradient laranja (#ea580c to #9a3412)
- **CTA**: Gradient laranja com botões contrastantes
- **Animations**: Float, pulse, scale, rotate effects
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof WhyChooseUs>

export const Default: Story = {
  name: 'Seção Padrão',
  parameters: {
    docs: {
      description: {
        story: 'Seção completa com todos os benefícios e CTA final.',
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
        story: 'Layout mobile com cards em coluna única e CTA responsivo.',
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
        story:
          'Como a seção aparece com animações reduzidas para acessibilidade.',
      },
    },
  },
}
