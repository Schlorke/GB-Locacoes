# 📚 Stories - GB Locações Design System

**Bem-vindo à documentação visual do Design System GB Locações!**

---

## 🚀 Acesso Rápido

### URL do Storybook

```
http://localhost:6006
```

### Comando para Iniciar

```bash
pnpm storybook
```

---

## 📖 Estrutura da Documentação

### 00-Introduction

- **Welcome.mdx** - Comece aqui! Introdução completa ao Design System

### 01-Design-Tokens

- **Colors** - Sistema de cores completo
- **Typography** - Hierarquia tipográfica
- **Spacing** - Espaçamento responsivo
- **Shadows** - Elevações e profundidade
- **Breakpoints** - Sistema responsivo mobile-first

### 02-Public

- **01-Atoms** - Componentes básicos (Button, Input, Badge, Label, Checkbox,
  Switch)
- **02-Molecules** - Componentes compostos (Card, Alert)
- **03-Organisms** - Componentes complexos (Dialog, Form)

---

## 🎯 Componentes Documentados

### ✅ Atoms (6 componentes)

| Componente   | Stories | Descrição                        |
| ------------ | ------- | -------------------------------- |
| **Button**   | 20+     | 8 variantes, 4 tamanhos, recipes |
| **Input**    | 15+     | 7 tipos, validação, formulários  |
| **Badge**    | 12+     | Status, tags, notificações       |
| **Label**    | 10+     | Acessibilidade obrigatória       |
| **Checkbox** | 8+      | Estados, grupos, formulários     |
| **Switch**   | 6+      | Toggles, configurações           |

### ✅ Molecules (2 componentes)

| Componente | Stories | Descrição                       |
| ---------- | ------- | ------------------------------- |
| **Card**   | 14+     | Subcomponentes, produtos, stats |
| **Alert**  | 10+     | Info, success, warning, error   |

### ✅ Organisms (2 componentes)

| Componente | Stories | Descrição             |
| ---------- | ------- | --------------------- |
| **Dialog** | 8+      | Modais, confirmações  |
| **Form**   | 5+      | React Hook Form + Zod |

---

## 📝 Para IAs e Desenvolvedores

### ANTES de Criar Qualquer Componente

1. **Leia**: `AI_CONTEXT.md` (OBRIGATÓRIO)
2. **Consulte**: Componentes existentes como referência
3. **Siga**: Templates em AI_CONTEXT.md
4. **Teste**: Addon A11y para acessibilidade

### Templates Disponíveis

- ✅ Template de Story (.stories.tsx)
- ✅ Template de MDX (.mdx)
- ✅ Checklist de validação
- ✅ Padrões "quando usar/não usar"

---

## 🎨 Design Tokens - Cola Rápida

### Cores

```tsx
bg - orange - 600 // Primary
bg - slate - 700 // Secondary
bg - emerald - 500 // Success
bg - red - 500 // Error
```

### Espaçamento

```tsx
px-4 sm:px-6 lg:px-8        // Containers
py-12 md:py-16 lg:py-20     // Seções
gap-6 md:gap-8 lg:gap-12    // Grids
```

### Tipografia

```tsx
text - h1 // 40-56px
text - h2 // 32-48px
text - base // 16-18px
```

---

## 📚 Arquivos de Referência

| Arquivo                             | Descrição                     |
| ----------------------------------- | ----------------------------- |
| `AI_CONTEXT.md`                     | Fonte de verdade (501 linhas) |
| `QUICK_START.md`                    | Começar em 5 minutos          |
| `.cursor/rules/storybook-rules.mdc` | Regras do Storybook           |

---

## 🎯 Navegação Rápida

1. **Introduction → Welcome** - Visão geral
2. **Design Tokens → Colors** - Paleta de cores
3. **Public → Atoms → Button** - Componente mais completo
4. **Public → Organisms → Form** - Integração React Hook Form + Zod

---

## ✅ Qualidade Garantida

```
✅ 100% WCAG 2.1 AA
✅ 100% Mobile-First
✅ 100% TypeScript Strict
✅ 100% Documentado
✅ 100% Testável
```

---

**Versão**: 1.0.0 **Status**: ✅ Produção-Ready **URL**: http://localhost:6006
