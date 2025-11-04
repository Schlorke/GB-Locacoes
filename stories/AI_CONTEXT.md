# Contexto de IA - GB Locações Design System

> **ARQUIVO CRÍTICO**: Este arquivo é a fonte de verdade para IAs trabalhando no
> Storybook do GB Locações. Leia SEMPRE antes de criar ou modificar componentes.

---

## 🎨 Identidade Visual

### Cores Primárias

```json
{
  "primary": "#ea580c", // Orange-600 - Cor principal da marca
  "primary-light": "#fed7aa", // Orange-200 - Variante clara
  "primary-dark": "#f97316", // Orange-500 - Variante escura
  "secondary": "#334155", // Slate-700 - Cor secundária
  "success": "#10b981", // Emerald-500 - Sucesso
  "warning": "#f59e0b", // Amber-500 - Aviso
  "error": "#ef4444", // Red-500 - Erro
  "info": "#3b82f6" // Blue-500 - Informação
}
```

### Backgrounds

```json
{
  "background-primary": "#f8fafc", // Slate-50
  "background-secondary": "#dbeafe", // Blue-50
  "background-card": "rgba(255, 255, 255, 0.95)" // Card com transparência
}
```

### Text Colors

```json
{
  "text-primary": "#111827", // Gray-900 - Texto principal
  "text-secondary": "#6b7280", // Gray-500 - Texto secundário
  "text-muted": "#9ca3af", // Gray-400 - Texto mudo
  "text-white": "#ffffff" // Texto branco
}
```

**Fonte de Verdade**: `design-tokens/base.json`

---

## 📝 Tipografia

### Font Families

- **Sans (Corpo)**: `var(--font-inter), sans-serif` - Inter
- **Heading (Títulos)**: `var(--font-jost), sans-serif` - Jost

### Font Sizes Responsivos (Clamp)

```css
h1: clamp(2.5rem, 5vw, 3.5rem)     /* 40px - 56px */
h2: clamp(2rem, 4vw, 3rem)         /* 32px - 48px */
h3: clamp(1.5rem, 3vw, 2.25rem)    /* 24px - 36px */
base: clamp(1rem, 2vw, 1.125rem)   /* 16px - 18px */
small: clamp(0.875rem, 1.5vw, 1rem) /* 14px - 16px */
```

### Line Heights

- **tight**: 1.2 - Para títulos grandes
- **normal**: 1.3 - Para subtítulos
- **relaxed**: 1.4 - Para títulos menores
- **loose**: 1.6 - Para corpo de texto

### Letter Spacing

- **tight**: -0.015em - Para títulos
- **normal**: 0em - Padrão
- **wide**: 0.015em - Para ênfase

---

## 📏 Sistema de Espaçamento

Sistema de espaçamento baseado em múltiplos de 4px:

```json
{
  "xs": "0.25rem", // 4px
  "sm": "0.5rem", // 8px
  "md": "1rem", // 16px
  "lg": "1.5rem", // 24px
  "xl": "2rem", // 32px
  "2xl": "3rem" // 48px
}
```

### Padrões Responsivos Obrigatórios

#### Containers Principais

```css
px-4 sm:px-6 lg:px-8           /* Padding lateral responsivo */
py-12 md:py-16 lg:py-20        /* Padding vertical entre seções */
```

#### Gaps em Grids

```css
gap-6 md:gap-8 lg:gap-12       /* Gaps responsivos */
```

---

## 🎭 Sombras e Elevações

```json
{
  "card": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "modal": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  "button": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  "overlay": "4px 8px 18px 2px rgba(0,0,0,0.18)"
}
```

---

## 📱 Breakpoints Responsivos

Sistema Mobile-First (Tailwind CSS):

```json
{
  "sm": "640px", // Small devices
  "md": "768px", // Medium devices
  "lg": "1024px", // Large devices
  "xl": "1280px", // Extra large devices
  "2xl": "1536px" // 2X Extra large devices
}
```

**Princípio**: Sempre comece com estilos mobile e use `sm:`, `md:`, `lg:`, etc.
para breakpoints maiores.

---

## 🏗️ Hierarquia de Componentes

### 📁 Estrutura do Storybook

```
stories/
├── 00-Introduction/
│   └── Welcome.mdx
├── 01-Design-Tokens/
│   ├── Colors.stories.tsx
│   ├── Typography.stories.tsx
│   ├── Spacing.stories.tsx
│   ├── Shadows.stories.tsx
│   └── Breakpoints.stories.tsx
├── 02-Public/                    # DOMÍNIO PÚBLICO
│   ├── 01-Atoms/                 # Componentes atômicos
│   ├── 02-Molecules/             # Componentes moleculares
│   ├── 03-Organisms/             # Componentes complexos
│   └── 04-Templates/             # Templates de página
├── 03-Admin/                     # DOMÍNIO ADMINISTRATIVO
│   ├── 01-Layout/                # Layout admin
│   ├── 02-Components/            # Componentes específicos admin
│   ├── 03-Features/              # Features complexas admin
│   └── 04-Pages/                 # Páginas completas admin
└── 04-Shared/                    # Componentes compartilhados
    ├── Form/
    ├── DataDisplay/
    └── Feedback/
```

---

## 🧩 Domínios e Responsabilidades

### Domínio Público (`02-Public/`)

Componentes para o site público e área do cliente:

- Homepage
- Catálogo de equipamentos
- Páginas institucionais
- Área do cliente logado
- Formulários de contato/orçamento

**Localização no código**: `components/ui/` + componentes específicos em
`components/`

### Domínio Administrativo (`03-Admin/`)

Componentes para o painel administrativo:

- Dashboard
- Gestão de equipamentos
- Gestão de categorias
- Gestão de orçamentos
- Configurações do sistema

**Localização no código**: `components/admin/`

### Componentes Compartilhados (`04-Shared/`)

Componentes usados em ambos os domínios:

- Formulários (React Hook Form + Zod)
- Tabelas de dados
- Calendários
- Feedback (toasts, alerts, notifications)

---

## 📝 Padrões de Código Obrigatórios

### Template de Story (.stories.tsx)

```typescript
import type { Meta, StoryObj } from '@storybook/nextjs';
import { ComponentName } from '@/components/ui/component-name';

const meta = {
  title: 'Public/Atoms/ComponentName',  // Ajustar hierarquia
  component: ComponentName,
  tags: ['autodocs'],                   // OBRIGATÓRIO para docs
  parameters: {
    layout: 'centered',                 // ou 'fullscreen', 'padded'
    docs: {
      description: {
        component: 'Descrição clara e concisa do componente.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline'],
      description: 'Variante visual do componente',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'Tamanho do componente',
    },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

// OBRIGATÓRIO: Story Default (baseline)
export const Default: Story = {
  args: {
    // Props mínimas para renderizar
  },
};

// OBRIGATÓRIO: Story Playground (todos os controles)
export const Playground: Story = {
  args: {
    // Props completas para experimentação
  },
};

// RECOMENDADO: Feature stories para cada variante/estado
export const Primary: Story = {
  args: { variant: 'default' },
};

export const Destructive: Story = {
  args: { variant: 'destructive' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

// RECOMENDADO: Recipe stories (combinações)
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Icon className="mr-2 h-4 w-4" />
        Texto
      </>
    ),
  },
};
```

### Template de Documentação MDX

````mdx
import { Meta, Canvas, Story, Controls } from "@storybook/addon-docs/blocks"
import * as ComponentStories from "./Component.stories"

<Meta of={ComponentStories} />

# ComponentName

Descrição clara do que o componente faz e seu propósito no design system.

## Quando Usar

✅ Para ações primárias na interface ✅ Para navegação entre páginas ✅ Para
submissão de formulários

## Quando NÃO Usar

❌ Para links de navegação simples (use `<a>` ou Next.js `<Link>`) ❌ Para ações
inline em texto (use variant="link")

## Variantes

### Default

Descrição da variante default.

<Canvas of={ComponentStories.Default} />

### Destructive

Descrição da variante destructive.

<Canvas of={ComponentStories.Destructive} />

## Playground

Experimente diferentes combinações de props:

<Canvas of={ComponentStories.Playground} />
<Controls of={ComponentStories.Playground} />

## Acessibilidade

- ✅ Suporta navegação por teclado
- ✅ Estados de foco visíveis
- ✅ ARIA labels quando necessário
- ✅ Desabilitado acessível

## Design Tokens Utilizados

- **Colors**: `primary` (#ea580c), `secondary` (#334155)
- **Spacing**: `px-4 py-2` (default)
- **Border Radius**: `rounded-md`
- **Transitions**: `transition-all duration-300`

## Código de Exemplo

```tsx
import { ComponentName } from '@/components/ui/component-name';

// Exemplo básico
<ComponentName>Conteúdo</ComponentName>

// Com variante
<ComponentName variant="destructive">Deletar</ComponentName>

// Com ícone
<ComponentName>
  <Icon className="mr-2 h-4 w-4" />
  Adicionar
</ComponentName>
```

## Props

<Controls />
````

---

## ✅ Checklist Obrigatório para Cada Componente

Antes de marcar como concluído, verificar:

### Arquivos

- [ ] Story `.stories.tsx` criada com título correto na hierarquia
- [ ] Documentação `.mdx` criada com exemplos completos
- [ ] Componente existe em `components/ui/` ou `components/admin/`

### Stories Obrigatórias

- [ ] `Default` story criada (baseline visual)
- [ ] `Playground` story criada (todos os controles)
- [ ] Feature stories para TODAS as variantes
- [ ] Feature stories para TODOS os tamanhos
- [ ] Feature stories para estados (disabled, loading, error)
- [ ] Recipe stories para combinações comuns (se aplicável)

### Documentação MDX

- [ ] Descrição do componente
- [ ] "Quando usar" com exemplos ✅
- [ ] "Quando NÃO usar" com exemplos ❌
- [ ] Variantes visuais com `<Canvas>`
- [ ] Playground com `<Controls>`
- [ ] Seção de Acessibilidade
- [ ] Design tokens utilizados listados
- [ ] Exemplos de código em TSX

### Qualidade

- [ ] Tag `autodocs` adicionada
- [ ] Testado no Storybook (`pnpm storybook`)
- [ ] Acessibilidade validada com addon A11y (zero violações)
- [ ] Responsividade verificada
- [ ] Todos os estados visuais funcionando

---

## 🚨 Regras Anti-Alucinação

### SEMPRE FAÇA

1. ✅ **SEMPRE consulte o Storybook** antes de criar novos componentes
2. ✅ **SEMPRE use design tokens** de `design-tokens/base.json`
3. ✅ **SEMPRE use classes Tailwind** do design system
4. ✅ **SEMPRE documente "quando usar" e "quando NÃO usar"**
5. ✅ **SEMPRE teste acessibilidade** com addon A11y
6. ✅ **SEMPRE crie MDX** completo para cada componente
7. ✅ **SEMPRE use TypeScript** estrito
8. ✅ **SEMPRE siga a hierarquia** estabelecida (Public/Admin/Shared)

### NUNCA FAÇA

1. ❌ **NUNCA crie componentes** fora do design system sem consultar Storybook
2. ❌ **NUNCA use cores hardcoded** - sempre use classes Tailwind
3. ❌ **NUNCA ignore responsividade** - mobile-first obrigatório
4. ❌ **NUNCA pule a documentação MDX** - é obrigatória
5. ❌ **NUNCA ignore acessibilidade** - WCAG 2.1 AA compliance
6. ❌ **NUNCA use `any` em TypeScript** - sempre tipos específicos
7. ❌ **NUNCA quebre a hierarquia** - respeite Public/Atoms, Admin/Layout, etc.
8. ❌ **NUNCA ignore os design tokens** - são a base de tudo

---

## 🎨 Biblioteca de Componentes Base

### Radix UI

Este projeto usa **Radix UI** como biblioteca de componentes primitivos
acessíveis:

- **Dialog, AlertDialog** - Modais e diálogos
- **Dropdown Menu, Context Menu** - Menus
- **Popover, Tooltip** - Overlays
- **Checkbox, Radio Group, Switch** - Controles de formulário
- **Tabs, Accordion, Collapsible** - Navegação e organização
- **Select, Combobox** - Seletores

**Sempre prefira componentes Radix UI** quando disponíveis - eles são acessíveis
por padrão.

### Lucide React

Para ícones, use **Lucide React**:

```tsx
import { Plus, Trash2, Edit, Search } from "lucide-react"
```

**Tamanho padrão**: `h-4 w-4` (16px)

---

## 📚 Recursos e Referências

### Arquivos Importantes

- **Design Tokens**: `design-tokens/base.json`
- **Tailwind Config**: `tailwind.config.cjs`
- **Estilos Globais**: `app/globals.css`
- **Componentes UI**: `components/ui/`
- **Componentes Admin**: `components/admin/`

### Documentação do Projeto

- **Regras do Projeto**: `AGENTS.md`
- **Design System**: `docs/features/design-system.md`
- **Admin System**: `docs/features/admin-system.md`
- **Troubleshooting**: `docs/getting-started/troubleshooting.md`

### Ferramentas Externas

- [Storybook Docs](https://storybook.js.org/docs)
- [Radix UI Docs](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)

---

## 🔄 Manutenção deste Arquivo

**Este arquivo deve ser atualizado** quando:

1. Novos padrões de código são estabelecidos
2. Novos componentes são adicionados à biblioteca
3. Design tokens são modificados
4. Novas regras ou convenções são definidas
5. Problemas de alucinação são identificados e corrigidos

**Responsável**: Toda IA que trabalha no projeto deve manter este arquivo
atualizado.

---

**Última atualização**: Janeiro 2025 **Versão**: 1.0.0 **Status**: ✅ Ativo e
mantido
