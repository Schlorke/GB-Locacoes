# 🚀 Quick Start - Storybook GB Locações

Guia rápido para começar a usar o Storybook do GB Locações em menos de 5
minutos.

---

## 1️⃣ Iniciar o Storybook

```bash
pnpm storybook
```

**URL**: `http://localhost:6006`

---

## 2️⃣ Navegar pela Documentação

### Começar por aqui:

1. **Introduction → Welcome** - Visão geral do Design System
2. **Design Tokens** - Cores, tipografia, espaçamento, sombras, breakpoints
3. **Public → Atoms** - Componentes básicos (Button, Input, Badge, etc.)

### Estrutura do Menu

```
📖 Introduction
   └── Welcome

🎨 Design Tokens
   ├── Colors
   ├── Typography
   ├── Spacing
   ├── Shadows
   └── Breakpoints

🧩 Public
   ├── Atoms (Button, Input, Badge, Label, Checkbox, Switch)
   ├── Molecules (Card, Alert)
   └── Organisms (Dialog, Form)
```

---

## 3️⃣ Usar um Componente

### Passo a passo:

1. **Encontre o componente** no menu lateral
2. **Veja as variantes** nas stories visuais
3. **Teste no Playground** com os controles
4. **Copie o código** da documentação MDX
5. **Cole no seu projeto** e ajuste conforme necessário

### Exemplo - Button:

1. Navegue para: **Public → Atoms → Button**
2. Veja as 8 variantes disponíveis
3. Clique em **Playground** e teste props
4. Vá para a aba **Docs**
5. Role até "Exemplos de Código"
6. Copie e use:

```tsx
import { Button } from "@/components/ui/button"
;<Button variant="default">Meu Botão</Button>
```

---

## 4️⃣ Validar Acessibilidade

1. **Abra qualquer story**
2. **Clique na aba "Accessibility"** (addon A11y)
3. **Verifique violações** (deve estar zerado ✅)
4. **Corrija** se houver problemas

---

## 5️⃣ Testar Responsividade

1. **Abra uma story**
2. **Clique no ícone de dispositivo** na toolbar
3. **Selecione diferentes tamanhos**:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1024px)
4. **Verifique** se comportamento está correto

---

## 🎨 Design Tokens - Cola Rápida

### Cores (sempre use Tailwind)

```tsx
bg - orange - 600 // Primary (#ea580c)
bg - slate - 700 // Secondary (#334155)
bg - emerald - 500 // Success
bg - amber - 500 // Warning
bg - red - 500 // Error
bg - blue - 500 // Info
```

### Espaçamento Responsivo

```tsx
px-4 sm:px-6 lg:px-8           // Containers
py-12 md:py-16 lg:py-20        // Seções
gap-6 md:gap-8 lg:gap-12       // Grids
```

### Tipografia

```tsx
text - h1 // Títulos principais (40-56px)
text - h2 // Subtítulos (32-48px)
text - h3 // Títulos de seção (24-36px)
text - base // Corpo de texto (16-18px)
text - small // Texto pequeno (14-16px)
```

---

## 🆘 Troubleshooting

### Storybook não inicia

```bash
# Limpar cache e reinstalar
rm -rf node_modules .next
pnpm install
pnpm storybook
```

### Stories não aparecem

- ✅ Verifique se arquivo termina com `.stories.tsx`
- ✅ Verifique se está dentro de `stories/`
- ✅ Recarregue o Storybook (Ctrl+R)

### Erros de import

- ✅ Use alias `@/` para imports
- ✅ Verifique se componente existe em `components/ui/`
- ✅ Importe corretamente de lucide-react

---

## 📖 Recursos

- **AI Context**: `stories/AI_CONTEXT.md`
- **Relatório Final**: `STORYBOOK_FINAL_REPORT.md`
- **Sumário**: `STORYBOOK_IMPLEMENTATION_SUMMARY.md`
- **Regras Cursor**: `.cursor/rules/storybook-rules.mdc`

---

## 🎯 Próximos Passos

1. **Explorar os 10 componentes** implementados
2. **Usar no projeto** copiando código das docs
3. **Expandir documentação** para componentes restantes
4. **Deploy** do Storybook (Chromatic ou Vercel)

---

**URL Local**: `http://localhost:6006` **Comando**: `pnpm storybook` **Versão**:
1.0.0
