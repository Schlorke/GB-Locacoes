# 📑 TabbedCategoryGrid Component

> **Status**: ✅ Implementado e Funcional (Novembro 2025) **Localização**:
> `components/tabbed-category-grid.tsx` **Tipo**: Componente de UI Reutilizável

## 📋 Visão Geral

O `TabbedCategoryGrid` é um componente completo de navegação por abas com grid
de categorias, desenvolvido para apresentar categorias de forma organizada e
interativa. Utiliza o sistema de design do projeto com animações suaves
idênticas à página de equipamentos.

## 🎯 Características Principais

### **Design**

- ✅ **Visual Fichário Moderno**: Tabs estilo fichário com underline gradiente
- ✅ **Cards Interativos**: Background slate-800 com ícones laranja
- ✅ **Animações Framer Motion**: Exit/Enter em cascata (igual equipamentos)
- ✅ **Responsivo**: Grid adaptativo de 2 a 5 colunas
- ✅ **Hover Effects**: Texto laranja + glow sutil nos ícones

### **Funcionalidades**

- ✅ **Múltiplas Abas**: Suporta N tabs configuráveis
- ✅ **Categorias Customizáveis**: Aceita qualquer ícone SVG
- ✅ **Callback Opcional**: `onCategoryClickAction` para ações customizadas
- ✅ **Grid Configurável**: Controle total sobre breakpoints responsivos
- ✅ **TypeScript Completo**: Tipos exportados e documentados

## 🔧 Instalação e Uso

### **Import**

```tsx
import {
  TabbedCategoryGrid,
  type TabConfig,
  type CategoryItem
} from "@/components/tabbed-category-grid"
import { MeuIcone } from "@/components/icons/custom"
```

### **Uso Básico**

```tsx
const tabsConfig: TabConfig[] = [
  {
    value: 'categorias',
    label: 'Categorias',
    categories: [
      { id: '1', name: 'Categoria 1', icon: MeuIcone },
      { id: '2', name: 'Categoria 2', icon: OutroIcone },
    ],
  },
  {
    value: 'fases',
    label: 'Fases da Obra',
    categories: [
      { id: '3', name: 'Fundação', icon: IconeFundacao },
    ],
  },
]

<TabbedCategoryGrid
  tabs={tabsConfig}
  defaultTab="categorias"
  onCategoryClickAction={(category) => console.log(category)}
/>
```

### **Uso Avançado com Grid Customizado**

```tsx
<TabbedCategoryGrid
  tabs={tabsConfig}
  defaultTab="categorias"
  onCategoryClickAction={(category) => {
    // Navegar para página de categoria
    router.push(`/categoria/${category.id}`)
  }}
  gridCols={{
    base: 2, // Mobile: 2 colunas
    sm: 3, // Small: 3 colunas
    md: 4, // Medium: 4 colunas
    lg: 5 // Large: 5 colunas
  }}
  className="custom-wrapper"
/>
```

## 📦 Props API

### **TabbedCategoryGridProps**

| Prop                    | Tipo                               | Obrigatório | Default                      | Descrição                       |
| ----------------------- | ---------------------------------- | ----------- | ---------------------------- | ------------------------------- |
| `tabs`                  | `TabConfig[]`                      | ✅ Sim      | -                            | Array de configurações de tabs  |
| `defaultTab`            | `string`                           | ❌ Não      | Primeira tab                 | Tab ativa ao carregar           |
| `onCategoryClickAction` | `(category: CategoryItem) => void` | ❌ Não      | `undefined`                  | Callback ao clicar em categoria |
| `className`             | `string`                           | ❌ Não      | `''`                         | Classes CSS adicionais          |
| `gridCols`              | `GridConfig`                       | ❌ Não      | `{base:2, sm:3, md:4, lg:5}` | Configuração do grid responsivo |

### **TabConfig**

```typescript
type TabConfig = {
  value: string // Valor único da tab
  label: string // Texto exibido na tab
  categories: CategoryItem[] // Array de categorias
}
```

### **CategoryItem**

```typescript
type CategoryItem = {
  id: string // ID único da categoria
  name: string // Nome exibido
  icon: React.ComponentType<{
    // Componente de ícone SVG
    size?: number
    color?: string
    className?: string
  }>
}
```

### **GridConfig**

```typescript
type GridConfig = {
  base?: number // Colunas mobile (padrão: 2)
  sm?: number // Colunas small (padrão: 3)
  md?: number // Colunas medium (padrão: 4)
  lg?: number // Colunas large (padrão: 5)
}
```

## 🎨 Customização

### **Estilos das Tabs**

O componente utiliza o padrão do header de navegação:

- **Tab Ativa**: Texto laranja + negrito + underline gradiente visível
- **Tab Inativa**: Texto slate + hover laranja + underline aparece no hover
- **Underline**: Gradiente `from-orange-500 to-yellow-500`, altura `h-0.5`
- **Transição**: 300ms com `origin-center`, animação `scale-x`

### **Estilos dos Cards**

- **Background**: Gradiente `from-slate-800 to-slate-900`
- **Ícone**: Gradiente `from-orange-400 to-orange-600`
- **Hover Ícone**: Scale 1.04 + glow laranja sutil
- **Hover Texto**: Texto muda para `orange-400`
- **Shadow**: `shadow-lg` base, `shadow-2xl` no hover

## ⚡ Animações

### **Sistema AnimatePresence**

O componente implementa animações idênticas à página de equipamentos:

```tsx
// Ao trocar de tab:
initial={{ opacity: 0, y: 20, scale: 0.95 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
exit={{ opacity: 0, y: -20, scale: 0.95 }}
transition={{
  delay: index * 0.08,  // Delay sequencial
  duration: 0.3,
  ease: 'easeOut',
}}
```

### **Comportamento**

1. **Exit** (ao trocar tab):
   - Cards desaparecem em cascata (80ms entre cada)
   - Fade out + translação para cima + shrink

2. **Enter** (nova tab):
   - AnimatePresence aguarda exit terminar (`mode="wait"`)
   - Cards aparecem em cascata (80ms entre cada)
   - Fade in + translação de baixo + grow

3. **Key Dinâmica**:
   - `filterKey` incrementa a cada mudança de tab
   - Força React a re-renderizar com animações

## 📱 Responsividade

### **Grid Padrão**

| Breakpoint    | Colunas | Resolução |
| ------------- | ------- | --------- |
| Base (mobile) | 2       | < 640px   |
| Small         | 3       | 640px+    |
| Medium        | 4       | 768px+    |
| Large         | 5       | 1024px+   |

### **Espaçamento**

- **Gap**: `gap-4` (16px) - consistente em todos breakpoints
- **Padding Cards**: `p-6` (24px)
- **Margin Top**: `mt-8` (32px) entre tabs e grid

## 🎯 Casos de Uso

### **1. Catálogo de Produtos**

```tsx
const produtosConfig: TabConfig[] = [
  {
    value: 'mais-vendidos',
    label: 'Mais Vendidos',
    categories: [/* ... */],
  },
  {
    value: 'lancamentos',
    label: 'Lançamentos',
    categories: [/* ... */],
  },
]

<TabbedCategoryGrid
  tabs={produtosConfig}
  onCategoryClickAction={(cat) => router.push(`/produtos?cat=${cat.id}`)}
/>
```

### **2. Filtros de Equipamentos**

```tsx
const filtrosConfig: TabConfig[] = [
  {
    value: 'tipo',
    label: 'Por Tipo',
    categories: tiposEquipamentos,
  },
  {
    value: 'fase',
    label: 'Por Fase da Obra',
    categories: fasesObra,
  },
]

<TabbedCategoryGrid
  tabs={filtrosConfig}
  onCategoryClickAction={(cat) => aplicarFiltro(cat)}
/>
```

### **3. Navegação de Serviços**

```tsx
const servicosConfig: TabConfig[] = [
  {
    value: 'todos',
    label: 'Todos os Serviços',
    categories: todosServicos,
  },
]

<TabbedCategoryGrid
  tabs={servicosConfig}
  gridCols={{ base: 1, md: 2, lg: 3 }} // Grid diferente
/>
```

## 🔍 Detalhes Técnicos

### **Estado Interno**

```tsx
const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.value)
const [filterKey, setFilterKey] = useState(0)
```

- `activeTab`: Tab atualmente selecionada
- `filterKey`: Incrementa a cada mudança para forçar animação

### **Handler de Mudança**

```tsx
const handleTabChange = (value: string) => {
  setActiveTab(value)
  setFilterKey((prev) => prev + 1) // Força re-render com animação
}
```

### **Performance**

- ✅ **GPU Acceleration**: `transform-gpu` nos ícones para animações suaves
- ✅ **AnimatePresence**: Gerencia entrada/saída de elementos do DOM
- ✅ **Modo Wait**: Aguarda exit completo antes de enter
- ✅ **Ease Out**: Curva de animação natural e fluida

## 🎨 Design System Integration

### **Componentes Utilizados**

- `Tabs` (Radix UI) - Estrutura base de tabs
- `TabsList` - Container das tabs (customizado)
- `TabsTrigger` - Botões de tab individuais (customizado)
- `AnimatePresence` (Framer Motion) - Sistema de animações
- `motion.div` (Framer Motion) - Wrapper de animação

### **Cores do Projeto**

- **Orange-500/600**: `#f97316` / `#ea580c` - Ícones e destaques
- **Yellow-500**: `#eab308` - Gradiente do underline
- **Slate-700/800/900**: `#334155` / `#1e293b` / `#0f172a` - Textos e
  backgrounds

### **Padrões Seguidos**

- ✅ Espaçamento: `gap-4`, `p-6`, `mt-8`
- ✅ Border-radius: `rounded-2xl` (cards), `rounded-xl` (ícones)
- ✅ Transições: `duration-300` (padrão do projeto)
- ✅ Typography: `text-base font-medium` (tabs), `text-sm font-semibold` (cards)

## 🐛 Troubleshooting

### **Problema: Animações não funcionam**

**Causa**: AnimatePresence não está detectando mudanças **Solução**:
Certifique-se que `filterKey` está incrementando corretamente

### **Problema: Grid não responsivo**

**Causa**: Classes Tailwind dinâmicas não sendo detectadas **Solução**: Grid
classes são construídas dinamicamente, verifique `gridCols` prop

### **Problema: Tabs sem shadow/outline removido**

**Causa**: CSS global aplicando estilos **Solução**: Regras em `app/globals.css`
linhas 277-290 removem box-shadow dos tabs

## 📊 Exemplo Completo (Playground)

O arquivo `app/playground/page.tsx` contém um exemplo completo de uso:

- 3 tabs configuradas
- 30 categorias (10 por tab)
- 10 ícones SVG customizados
- Grid responsivo 2→3→4→5 colunas
- Callback de click implementado

## 🔗 Arquivos Relacionados

- **Componente**: `components/tabbed-category-grid.tsx`
- **Exemplo de Uso**: `app/playground/page.tsx`
- **Ícones SVG**: `components/icons/custom/index.tsx`
- **Componente Tabs Base**: `components/ui/tabs.tsx`
- **Estilos Globais**: `app/globals.css` (linhas 277-290)

## 📝 Changelog

### **[2025-11-05] - Implementação Inicial**

- Componente criado com suporte a múltiplas tabs
- Sistema de animações idêntico à página equipamentos
- Integração com ícones SVG customizados
- Grid responsivo configurável
- Tabs estilo header com underline gradiente

---

**Última atualização**: Novembro 2025 **Versão**: 1.0.0 **Autor**: GB-Locações
Team
