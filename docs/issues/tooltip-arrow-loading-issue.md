# 🐛 Issue: Tooltip Arrow Loading Order

**Data**: Janeiro 2025 **Componente**: `HybridTooltip`
(components/ui/HybridTooltip.tsx) **Status**: 🔍 Investigando

---

## 📋 Descrição do Problema

A seta (`<polygon>`) do tooltip está sendo renderizada **após** o conteúdo da
mensagem, causando um possível atraso visual ou ordem de carregamento não ideal.

### Comportamento Observado

```html
<!-- Estrutura DOM renderizada -->
<div data-side="top" data-align="center" class="...tooltip-content...">
  <!-- Conteúdo da mensagem carrega primeiro -->
  <div>💡 Background Padrão: Quando nenhuma imagem...</div>

  <!-- Seta (polygon) carrega depois -->
  <svg>
    <polygon points="0,0 30,0 15,10"></polygon>
  </svg>
</div>
```

### Comportamento Desejado

A seta deve ser carregada **antes** ou **simultaneamente** com o conteúdo da
mensagem para evitar qualquer atraso visual.

---

## 🔧 Contexto Técnico

### Stack Tecnológico

- **Framework**: Next.js 15.4.6 (App Router)
- **React**: 19.2.0
- **Radix UI Tooltip**: @radix-ui/react-tooltip@latest
- **Radix UI Popover**: @radix-ui/react-popover@latest
- **TypeScript**: 5.9.2

### Implementação Atual

```tsx
// components/ui/HybridTooltip.tsx

// DESKTOP MODE (Tooltip)
<TooltipPrimitive.Content
  side="top"
  align="center"
  sideOffset={5}
  className={contentClassName}
>
  <TooltipPrimitive.Arrow className={arrowClassName} />  // Movido para ANTES
  {content}                                              // do conteúdo
</TooltipPrimitive.Content>

// MOBILE MODE (Popover)
<PopoverPrimitive.Content
  side="top"
  align="center"
  sideOffset={5}
  className={contentClassName}
>
  <PopoverPrimitive.Arrow className={arrowClassName} />  // Movido para ANTES
  {content}                                              // do conteúdo
</PopoverPrimitive.Content>
```

### Configurações do Arrow

Segundo a
[documentação oficial do Radix UI](https://www.radix-ui.com/primitives/docs/components/tooltip):

```typescript
interface ArrowProps {
  asChild?: boolean // Default: false
  width?: number // Default: 10
  height?: number // Default: 5
}
```

**Configuração atual**: Usando defaults (width: 10, height: 5)

---

## ✅ O Que Foi Tentado

### 1. Reordenação no DOM (Implementado)

```tsx
// ANTES
<Content>
  {content}
  <Arrow />
</Content>

// DEPOIS
<Content>
  <Arrow />    // Movido para primeiro
  {content}
</Content>
```

**Resultado**: Arrow agora é renderizado primeiro no DOM, mas o problema visual
pode persistir.

### 2. Configurações Testadas

- `delayDuration`: 500ms (aumentado de 300ms)
- `side`: "top" (forçado)
- `sideOffset`: 5
- Arrow `className`: "fill-gray-50" (cor clara matching o fundo)

---

## 🎯 Informações para Pesquisa nos Fóruns

### Palavras-chave Recomendadas

```
- "Radix UI Tooltip Arrow loading order"
- "Tooltip.Arrow render before content"
- "Radix Tooltip polygon SVG timing"
- "@radix-ui/react-tooltip arrow position"
- "Tooltip arrow flash delay Radix UI"
```

### Links Úteis para Referência

1. **Documentação Oficial**:
   - [Radix UI Tooltip Docs](https://www.radix-ui.com/primitives/docs/components/tooltip)
   - [Radix UI Popover Docs](https://www.radix-ui.com/primitives/docs/components/popover)

2. **GitHub Issues Relacionadas**:
   - [Radix Primitives Issues](https://github.com/radix-ui/primitives/issues)
   - Buscar: "arrow", "tooltip arrow", "polygon"

3. **Comunidades**:
   - [Discord do Radix UI](https://discord.com/invite/7Xb99uG)
   - Stack Overflow: tag `radix-ui`
   - GitHub Discussions

---

## 🔍 Possíveis Soluções a Investigar

### Opção 1: CSS Loading Priority

```css
/* Garantir que o Arrow tenha prioridade de renderização */
[data-radix-tooltip-arrow],
[data-radix-popover-arrow] {
  content-visibility: auto;
  will-change: transform;
}
```

### Opção 2: Customizar Arrow Component

```tsx
// Criar Arrow customizado com prioridade de carregamento
const CustomArrow = React.memo(() => (
  <TooltipPrimitive.Arrow className={arrowClassName} width={10} height={5} />
))
```

### Opção 3: forceMount no Portal

```tsx
<TooltipPrimitive.Portal forceMount>
  <TooltipPrimitive.Content>{/* ... */}</TooltipPrimitive.Content>
</TooltipPrimitive.Portal>
```

### Opção 4: Preload do SVG

```tsx
// Criar SVG estático inline ao invés do componente Arrow
<svg className="absolute -bottom-1" width="10" height="5">
  <polygon points="0,0 10,0 5,5" className="fill-gray-50" />
</svg>
```

---

## 📊 Specs do Componente HybridTooltip

### Props Interface

```typescript
interface HybridTooltipProps {
  children: React.ReactNode // Elemento trigger
  content: React.ReactNode // Conteúdo do tooltip
  [key: string]: unknown // Props adicionais para Content
}
```

### Estilos Aplicados

```typescript
// Content
className: "z-50 overflow-hidden rounded-md border border-gray-100
           bg-gray-50 text-gray-700 px-3 py-1.5 text-[13px] shadow-lg
           animate-in fade-in-0 zoom-in-95..."

// Arrow
className: "fill-gray-50"
```

### Comportamento

- **Desktop (hover device)**: Usa `@radix-ui/react-tooltip`
- **Mobile (touch device)**: Usa `@radix-ui/react-popover`
- **Detecção**: Hook `useHasHover` com media query `(hover: hover)`

---

## 🎨 Visual do Problema

```
┌─────────────────────────────┐
│ 💡 Background Padrão:       │  ← Conteúdo aparece
│ Quando nenhuma imagem...    │
└──────────────▼──────────────┘
               │                  ← Seta (polygon) pode ter delay
               ▼
```

---

## 📝 Notas Adicionais

- O problema é puramente visual/cosmético
- Não afeta a funcionalidade do tooltip
- Ambos os modos (Desktop/Mobile) apresentam o mesmo comportamento
- A seta **funciona corretamente**, apenas a ordem de loading que é questão

---

## 🔗 Arquivos Relacionados

- **Componente**: `components/ui/HybridTooltip.tsx`
- **Hook**: `hooks/useHasHover.ts`
- **Usos**:
  - `app/admin/settings/page.tsx` (Carrossel Principal)
  - `app/admin/equipamentos/[id]/editar/page.tsx` (Editar Equipamento)
  - `app/admin/equipamentos/novo/page.tsx` (Novo Equipamento)
  - `components/ui/image-upload.tsx` (via prop `tooltipContent`)

---

## ✨ Próximos Passos

1. Pesquisar issues similares no GitHub do Radix UI
2. Verificar no Discord da comunidade Radix
3. Testar soluções propostas acima
4. Considerar abrir issue no repositório oficial se for bug
5. Documentar solução encontrada aqui

---

**Última atualização**: Janeiro 2025 **Responsável**: Equipe GB-Locações
