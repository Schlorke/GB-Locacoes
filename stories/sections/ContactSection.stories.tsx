import ContactSection from '@/components/contact-section'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ContactSection> = {
  title: 'Seções/Home/Contact — Entre em Contato',
  component: ContactSection,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'gray-50',
    },
    docs: {
      description: {
        component: `
# Contact Section - Entre em Contato

Seção final da homepage com formulário e informações de contato:
- Layout em duas colunas (formulário + informações)
- Formulário completo com validação visual
- Cards de informações de contato com hover effects
- Ícones em circles com gradient laranja
- Focus states com escala e sombra nos inputs
- Responsivo com stack em mobile

## Design Tokens Utilizados
- **Background**: \`gray-50\` (#f8fafc)
- **Form**: Card branco com shadow-xl, hover shadow-2xl
- **Inputs**: Border gray-200, focus border-blue-500
- **Contact Cards**: Shadow-xl base, hover shadow-2xl + scale 1.05
- **Icons**: Circle gradient laranja com hover rotate e scale
- **Typography**: Labels com transition para laranja no focus
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ContactSection>

export const Default: Story = {
  name: 'Contato Padrão',
  parameters: {
    docs: {
      description: {
        story:
          'Seção completa com formulário e todas as informações de contato.',
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
        story: 'Layout mobile com formulário e informações em stack vertical.',
      },
    },
  },
}

export const FormFocused: Story = {
  name: 'Formulário em Foco',
  // play: async ({ canvasElement }) => {
  //   const canvas = within(canvasElement)
  //   const nameInput = canvas.getByPlaceholderText('Seu nome completo')
  //   await userEvent.click(nameInput)
  // },
  parameters: {
    docs: {
      description: {
        story: 'Demonstra os estados de foco dos campos do formulário.',
      },
    },
  },
}

export const TabletLandscape: Story = {
  name: 'Tablet Landscape',
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
    docs: {
      description: {
        story: 'Como a seção aparece em tablets em modo landscape.',
      },
    },
  },
}
