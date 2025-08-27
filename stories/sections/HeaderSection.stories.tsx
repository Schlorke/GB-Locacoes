import Header from '@/components/header'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Header> = {
  title: 'Seções/Global/Header — Cabeçalho do Site',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Header Section - Cabeçalho Global

Header fixo do site com duas barras:
- **Top Bar**: Informações de contato e links para área cliente/admin
- **Main Header**: Logo, navegação, botões de ação e menu mobile

## Funcionalidades
- Navigation com active states
- Menu mobile com overlay
- Logo com hover effects
- Background com backdrop-blur
- Top bar com cor slate-700 (#334155)

## Design Tokens Utilizados
- **Background**: \`white/95\` com backdrop-filter blur
- **Top Bar**: \`slate-700\` (#334155)
- **Active States**: Gradiente laranja (orange-500 to yellow-500)
- **Mobile Menu**: Border slate-200/50
- **Hover Effects**: Scale 1.05, color transitions
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {
  name: 'Header Padrão',
  parameters: {
    docs: {
      description: {
        story:
          'Header completo como aparece no desktop com navegação expandida.',
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
        story: 'Header mobile com menu hamburger e top bar compacta.',
      },
    },
  },
}

export const MobileMenuOpen: Story = {
  name: 'Menu Mobile Aberto',
  // play: async ({ canvasElement }) => {
  //   const canvas = within(canvasElement)
  //   const menuButton = canvas.getByLabelText('Abrir menu')
  //   await userEvent.click(menuButton)
  // },
  parameters: {
    viewport: {
      defaultViewport: 'iphone12',
    },
    docs: {
      description: {
        story: 'Como o menu mobile aparece quando expandido.',
      },
    },
  },
}

export const ActivePage: Story = {
  name: 'Página Ativa',
  beforeEach: () => {
    // Mock usePathname to show active state
    // Note: Mocking navigation in Storybook is handled by NextRouterDecorator
  },
  parameters: {
    docs: {
      description: {
        story:
          'Como os itens de navegação aparecem quando a página está ativa.',
      },
    },
  },
}
