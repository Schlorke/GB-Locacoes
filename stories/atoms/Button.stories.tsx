import type { Meta, StoryObj } from '@storybook/react'
import { Edit, Phone, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { Button } from '../../components/ui/button'

const meta: Meta<typeof Button> = {
  title: 'Design System/Atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'outline',
        'destructive',
        'ghost',
        'link',
      ],
      description:
        'Variante visual do botão conforme design system GB Locações',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Tamanho do botão',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado do botão',
    },
    asChild: {
      control: 'boolean',
      description: 'Renderizar como elemento filho',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Button - Componente Base GB Locações

Componente de botão reutilizável seguindo o design system da GB Locações. Construído com ShadCN UI e customizado com a identidade visual da marca.

### Princípios de Design
- **Cor primária**: Laranja (#f97316) para ações principais
- **Hierarquia clara**: Variantes distintas para diferentes níveis de importância  
- **Acessibilidade**: Contraste adequado e estados de foco visíveis
- **Consistência**: Uso padronizado em todo o sistema

### Casos de Uso
- **Ações primárias**: Solicitar orçamento, finalizar pedido
- **Ações secundárias**: Ver detalhes, cancelar
- **Ações administrativas**: CRUD no painel admin
- **Navegação**: Links e botões de direcionamento
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

// ============================================================================
// STORIES CONTEXTUAIS - GB LOCAÇÕES
// ============================================================================

/** Botão principal para solicitar orçamentos - CTA primário do site */
export const SolicitarOrcamento: StoryObj<typeof Button> = {
  args: {
    variant: 'default',
    size: 'default',
    children: 'Solicitar Orçamento',
  },
  parameters: {
    docs: {
      description: {
        story:
          '**Call-to-Action principal** do site GB Locações. Usado em cards de equipamentos e páginas de produto para iniciar o processo de orçamento.',
      },
    },
  },
}

/** Botão secundário para visualizar detalhes de equipamentos */
export const VerDetalhes: StoryObj<typeof Button> = {
  args: {
    variant: 'outline',
    size: 'default',
    children: 'Ver Detalhes',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Botão secundário usado em **cards de equipamentos** para navegação para página de detalhes.',
      },
    },
  },
}

/** Botão de contato no cabeçalho */
export const ContatoTelefone: StoryObj<typeof Button> = {
  args: {
    variant: 'ghost',
    size: 'default',
    children: (
      <>
        <Phone className="w-4 h-4 mr-2" />
        (51) 2313-6262
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Botão de **contato telefônico** exibido no cabeçalho do site com ícone e número.',
      },
    },
  },
}

/** Botão para adicionar ao carrinho/orçamento */
export const AdicionarOrcamento: StoryObj<typeof Button> = {
  args: {
    variant: 'secondary',
    size: 'default',
    children: (
      <>
        <ShoppingCart className="w-4 h-4 mr-2" />
        Adicionar ao Orçamento
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Botão para **adicionar equipamentos ao orçamento** com ícone de carrinho.',
      },
    },
  },
}

// ============================================================================
// STORIES ADMINISTRATIVAS
// ============================================================================

/** Botão para criar novos itens no admin */
export const AdminNovo: StoryObj<typeof Button> = {
  args: {
    variant: 'default',
    size: 'default',
    children: (
      <>
        <Plus className="w-4 h-4 mr-2" />
        Novo Equipamento
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Botão para **criar novos equipamentos** no painel administrativo.',
      },
    },
  },
}

/** Botão de edição no admin */
export const AdminEditar: StoryObj<typeof Button> = {
  args: {
    variant: 'ghost',
    size: 'icon',
    children: <Edit className="w-4 h-4" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Botão de **ação rápida para edição** em tabelas e listagens administrativas.',
      },
    },
  },
}

/** Botão de exclusão no admin */
export const AdminExcluir: StoryObj<typeof Button> = {
  args: {
    variant: 'destructive',
    size: 'icon',
    children: <Trash2 className="w-4 h-4" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Botão **destrutivo para exclusão** de itens. Sempre confirmar ação antes da exclusão.',
      },
    },
  },
}

// ============================================================================
// STORIES DE ESTADO E VARIAÇÕES
// ============================================================================

/** Estado desabilitado */
export const Desabilitado: StoryObj<typeof Button> = {
  args: {
    variant: 'default',
    disabled: true,
    children: 'Indisponível',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Estado **desabilitado** usado quando equipamento está indisponível ou ação não pode ser executada.',
      },
    },
  },
}

/** Estado de carregamento */
export const Carregando: StoryObj<typeof Button> = {
  args: {
    variant: 'default',
    disabled: true,
    children: (
      <>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
        Processando...
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Estado de **carregamento** com spinner durante processamento de orçamentos ou submissão de formulários.',
      },
    },
  },
}

// ============================================================================
// STORIES DEMONSTRATIVAS
// ============================================================================

/** Todas as variantes lado a lado */
export const TodasVariantes: StoryObj<typeof Button> = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '**Comparação visual** de todas as variantes disponíveis do componente Button.',
      },
    },
  },
}

/** Todos os tamanhos lado a lado */
export const TodosTamanhos: StoryObj<typeof Button> = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button size="sm">Pequeno</Button>
      <Button size="default">Padrão</Button>
      <Button size="lg">Grande</Button>
      <Button size="icon">
        <Edit className="w-4 h-4" />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '**Comparação de tamanhos** disponíveis, incluindo tamanho de ícone.',
      },
    },
  },
}
