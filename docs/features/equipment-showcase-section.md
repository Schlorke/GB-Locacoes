# 🎯 EquipmentShowcaseSection Component

> **Status**: ✅ Implementado e Funcional (Novembro 2025) **Localização**:
> `components/equipment-showcase-section.tsx` **Tipo**: Seção Completa de
> Homepage

## 📋 Visão Geral

O `EquipmentShowcaseSection` é uma seção completa que combina dois componentes
poderosos em um layout responsivo de duas colunas: o scroll infinito de
equipamentos (`EquipmentInfiniteScroll`) e o grid de categorias com tabs
(`CategoryShowcase`).

## 🎯 Características Principais

### **Design**

- ✅ **Layout Responsivo**: 2 colunas em desktop, empilhado em mobile
- ✅ **Scroll Infinito**: Equipamentos em movimento contínuo (esquerda)
- ✅ **Grid de Categorias**: Sistema `CategoryShowcase` com animações premium e
  swipe horizontal (direita)
- ✅ **Sticky Positioning**: Scroll infinito fixo durante rolagem em desktop
- ✅ **Identidade Visual**: Gradiente slate-50/blue-50 seguindo o projeto
- ✅ **Título Dinâmico**: Headline com animação `RotatingText` destacando o
  valor da tecnologia da GB Locações

### **Funcionalidades**

- ✅ **Navegação Automática**: Click em categoria redireciona para página de
  equipamentos
- ✅ **Dynamic Import**: Carregamento otimizado com lazy loading
- ✅ **Loading State**: Skeleton screen durante carregamento
- ✅ **3 Tabs Configuradas**: Categorias, Fases da Obra, Tipo de Trabalho
- ✅ **Swipe Navigation**: Gesto horizontal em dispositivos touch suportado
  nativamente
- ✅ **Scroll Reveal Inteligente**: Grid de categorias inicia a animação
  escalonada apenas quando a seção entra em viewport, sincronizando com o
  sistema global de scroll reveal
- ✅ **Controle Anti-Flicker**: O painel principal permanece oculto durante as
  transições (`swipePhase !== 'idle'`), evitando reaparecimento do grid antigo
  enquanto o overlay em movimento finaliza a troca de sessão

## 🔧 Uso

### **Homepage Integration**

```tsx
// components/home-page-client.tsx
import dynamic from "next/dynamic"

const EquipmentShowcaseSection = dynamic(
  () => import("./equipment-showcase-section"),
  { ssr: false }
)

export default function HomePageClient() {
  return (
    <>
      <EquipmentShowcaseSection />
      <Categories />
      <FeaturedMaterials />
    </>
  )
}
```

## 📐 Estrutura do Layout

### **Desktop (≥1024px)**

```
┌──────────────────────────────────────┐
│  max-w-7xl mx-auto px-4 sm:px-6...  │
│  ┌────────────────┬────────────────┐ │
│  │                │                │ │
│  │  Scroll        │  Tabs +        │ │
│  │  Infinito      │  Grid          │ │
│  │  (sticky)      │  Categorias    │ │
│  │                │                │ │
│  └────────────────┴────────────────┘ │
└──────────────────────────────────────┘
    50%              50%
```

### **Mobile (<1024px)**

```
┌──────────────────┐
│                  │
│  Tabs +          │ ← Topo (order-1)
│  Grid            │
│  Categorias      │
│                  │
├──────────────────┤
│                  │
│  Scroll          │ ← Embaixo (order-2)
│  Infinito        │
│                  │
└──────────────────┘
```

## 🎨 Configuração das Tabs

### **Tab 1: Categorias**

- Acesso e elevação
- Andaimes
- Compactação
- Concretagem
- Ferramentas elétricas
- Furação e demolição
- Jardinagem
- Limpeza
- Motores
- Outros

### **Tab 2: Fases da Obra**

- Canteiro de obras
- Cobertura
- Fundação
- Estrutura
- Instalações
- Acabamento
- Pintura
- Limpeza final
- Paisagismo
- Outros

### **Tab 3: Tipo de Trabalho**

- Limpar
- Trabalho em altura
- Trabalho em jardins
- Cortar, furar ou demolir
- Concretar, argamassa
- Gerar energia elétrica
- Escorar lajes ou vigas
- Bombear água ou lama
- Aplainar ou lixar
- Compactar o solo

## 🔄 Interações do Usuário

### **Click em Categoria**

```tsx
const handleCategoryClick = (category: CategoryItem) => {
  window.location.href = `/equipamentos?categoria=${category.id}`
}
```

**Comportamento:**

- Usuário clica em categoria
- Redireciona para página de equipamentos
- Filtro aplicado automaticamente via URL param

### **Swipe Navigation e Estados**

- Gestos horizontais são capturados via `drag="x"` no `motion.div`, com limites
  elásticos (`dragElastic: 0.2`) e thresholds de deslocamento/velocidade
  (`50px`/`500px`) para troca de sessão.
- Ao detectar um swipe válido, o componente muda para `swipePhase: 'animating'`,
  inicia o overlay (`SwipeOverlayLayer`) e força o painel principal a permanecer
  invisível (`opacity: 0`, `pointer-events: none`) até o término da transição.
- A função `completeSwipeTransition` restaura `swipePhase: 'idle'`, atualiza o
  conteúdo exibido (`displayedTabId`) e dispara a animação escalonada dos novos
  botões apenas após o overlay sair de cena.
- Esse fluxo evita o bug de “grid duplicado”, garantindo que o painel anterior
  não reapareça durante a troca de abas, mesmo em dispositivos com animações
  aceleradas.

## 📱 Responsividade

### **Breakpoints**

| Tamanho      | Layout    | Scroll Position | Grid Colunas |
| ------------ | --------- | --------------- | ------------ |
| Mobile       | Empilhado | Embaixo         | 2 colunas    |
| Small (640)  | Empilhado | Embaixo         | 2 colunas    |
| Medium (768) | Empilhado | Embaixo         | 3 colunas    |
| Large (1024) | 2 colunas | Esquerda sticky | 4 colunas    |

### **Ordem Visual**

- **Mobile**: `order-1` (Tabs) → `order-2` (Scroll)
- **Desktop**: `order-1` (Scroll esquerda) → `order-2` (Tabs direita)

## 🎯 Casos de Uso

### **1. Homepage Showcase (Atual)**

Seção principal da homepage exibindo equipamentos e categorias de forma
interativa.

### **2. Headline com Texto Rotativo**

- Destaque visual com cápsula azul variando entre _sob medida_, _certa_ e
  _eficiente_.
- Reforça a proposta de valor “Tecnologia [palavra] para cada fase da sua obra”.
- Implementação no arquivo `components/equipment-showcase-section.tsx`
  utilizando o componente `RotatingText`.

```tsx
import { LayoutGroup, motion } from "framer-motion"
;<h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 leading-tight">
  <LayoutGroup>
    <motion.span className="flex flex-col gap-1" layout>
      <motion.span
        layout
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        className="flex flex-wrap items-center gap-2"
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          className="leading-tight"
        >
          Tecnologia
        </motion.span>
        <RotatingText
          texts={["sob medida", "certa", "eficiente"]}
          mainClassName="inline-flex items-center justify-center rounded-lg bg-[#334155] px-2 py-1 text-white md:px-3 md:py-1.5"
          splitLevelClassName="inline-flex items-center"
          staggerDuration={0.05}
          staggerFrom="last"
          rotationInterval={3200}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
        />
      </motion.span>
      <span className="block leading-tight text-slate-900">
        para cada fase da sua obra
      </span>
    </motion.span>
  </LayoutGroup>
</h2>
```

> ℹ️ O componente `RotatingText` fica disponível em
> `components/rotating-text.tsx` e pode ser reutilizado em outras seções com as
> mesmas propriedades.

### **3. Landing Pages**

Pode ser reutilizada em landing pages de categorias específicas.

### **4. Páginas de Campanha**

Ideal para campanhas promocionais mostrando equipamentos em destaque.

## 🐛 Troubleshooting

### **Problema: Seção não aparece**

**Causa**: Dynamic import com SSR desabilitado **Solução**: Componente só
renderiza no cliente, aguarde carregamento

### **Problema: Scroll não inicia**

**Causa**: API de equipamentos não respondendo **Solução**: Verifique
`/api/equipments` e console para erros

### **Problema: Click não redireciona**

**Causa**: URL params não configurados na página de destino **Solução**:
Verifique `app/equipamentos/page.tsx` aceita param `categoria`

## 📊 Performance

### **Otimizações Aplicadas**

- ✅ **Dynamic Import**: Lazy loading da seção
- ✅ **SSR Disabled**: Evita problemas de hidratação
- ✅ **Limite de Equipamentos**: Máximo 12 (6 por linha)
- ✅ **Imagens Otimizadas**: Next/Image com quality 75
- ✅ **GSAP Timeline**: Animação GPU-accelerated

### **Métricas Esperadas**

- **First Contentful Paint**: +200ms (dynamic import)
- **Time to Interactive**: Não afetado
- **Layout Shift**: 0 (skeleton mantém espaço)
- **Performance Score**: 90+

## 🔗 Componentes Utilizados

- **EquipmentInfiniteScroll**: Scroll horizontal infinito de equipamentos
- **CategoryShowcase**: Tabs com grid de categorias, swipe, overlay e controle
  de animações
- **Custom SVG Icons**: 10 ícones customizados do projeto

## 🔗 Arquivos Relacionados

- **Componente**: `components/equipment-showcase-section.tsx`
- **Homepage Client**: `components/home-page-client.tsx`
- **Scroll Component**: `components/equipment-infinite-scroll.tsx`
- **Grid Component**: `components/category-showcase.tsx`

---

**Última atualização**: Novembro 2025 **Versão**: 1.0.0 **Autor**: GB-Locações
Team

```

```
