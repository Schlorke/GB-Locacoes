# Storybook Troubleshooting - GB Locações

## Problemas Comuns e Soluções

### 1. "React is not defined" Error

**Problema**: Erro `ReferenceError: React is not defined` ao renderizar
componentes no Storybook.

**Causa**: React não está sendo importado corretamente nos arquivos de stories.

**Solução**:

```tsx
// ❌ Errado - React não importado
const [state, setState] = React.useState()

// ✅ Correto - React importado
import React from "react"
const [state, setState] = React.useState()
```

**Arquivos Corrigidos**:

- `components/contact-form.stories.tsx` - ✅ Corrigido

### 2. ESLint "storybook/no-renderer-packages" Error

**Problema**: Erro `Do not import renderer package "@storybook/react" directly`
no ESLint.

**Causa**: Importação incorreta do pacote do Storybook. Deve-se usar o framework
específico.

**Solução**:

```tsx
// ❌ Errado - Importação genérica
import type { Meta, StoryObj } from "@storybook/react"

// ✅ Correto - Framework específico (Next.js)
import type { Meta, StoryObj } from "@storybook/nextjs"
```

**Arquivos Corrigidos**:

- `components/ui/button.stories.tsx` - ✅ Corrigido
- `components/ui/input.stories.tsx` - ✅ Corrigido
- `components/ui/card.stories.tsx` - ✅ Corrigido
- `components/ui/badge.stories.tsx` - ✅ Corrigido
- `components/footer.stories.tsx` - ✅ Corrigido
- `components/equipment-card.stories.tsx` - ✅ Corrigido
- `components/header.stories.tsx` - ✅ Corrigido
- `components/contact-form.stories.tsx` - ✅ Corrigido
- `stories/Design-Tokens.stories.tsx` - ✅ Corrigido

### 3. Conflitos de Case-Sensitivity

**Problema**: Erro `Prevent writing to file that only differs in casing` no
Windows.

**Causa**: Arquivos com nomes que diferem apenas na capitalização.

**Solução**: Remover arquivos duplicados e manter nomenclatura consistente.

**Arquivos Removidos**:

- `stories/Header.tsx` → Mantido apenas `components/header.stories.tsx`
- `stories/Button.tsx` → Mantido apenas `components/ui/button.stories.tsx`
- `stories/Page.tsx` → Removido (não necessário)

### 4. Configuração do Storybook

**Arquivos de Configuração**:

- `.storybook/main.ts` - Configuração principal
- `.storybook/preview.ts` - Configuração de preview
- `.storybook/preview-head.html` - Scripts globais

**Configurações Importantes**:

```ts
// Garantir que React seja resolvido corretamente
viteFinal: async (config) => {
  if (config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react': require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
    };
  }
  return config;
},
```

### 5. Padrões para Stories

**Estrutura Recomendada**:

```tsx
import React from "react" // ✅ Sempre importar React
import type { Meta, StoryObj } from "@storybook/nextjs"
import { Component } from "./component"

const meta: Meta<typeof Component> = {
  title: "Category/ComponentName",
  component: Component
  // ... outras configurações
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

// Story com função play para interações automáticas
export const Interactive: Story = {
  play: async ({ canvas, userEvent }) => {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const element = canvas.getByRole("button")
    await userEvent.click(element)
  }
}
```

**Boas Práticas**:

1. **Sempre importar React** quando usar hooks ou tipos React
2. **Usar nomenclatura consistente** para arquivos
3. **Organizar stories por categoria** (Atoms, Molecules, Organisms)
4. **Incluir documentação** com `autodocs: true`
5. **Usar funções play** para demonstrar interações automáticas
6. **Aguardar renderização** antes de interagir com elementos

### 6. Comandos Úteis

```bash
# Build de produção
pnpm build-storybook

# Desenvolvimento
pnpm storybook

# Limpar cache
Remove-Item -Recurse -Force node_modules\.cache\storybook

# Verificar saúde
npx storybook doctor
```

### 7. Estrutura de Stories

```
components/
├── ui/
│   ├── button.stories.tsx
│   ├── input.stories.tsx
│   └── card.stories.tsx
├── header.stories.tsx
├── footer.stories.tsx
└── contact-form.stories.tsx

stories/
├── Design-Tokens.stories.tsx
└── Configure.mdx
```

### 8. Troubleshooting Checklist

- [ ] React importado em todos os arquivos que usam hooks
- [ ] Importações do Storybook usando framework específico (@storybook/nextjs)
- [ ] Nomenclatura consistente (kebab-case para arquivos)
- [ ] Cache limpo após mudanças
- [ ] Configuração do TypeScript correta
- [ ] Dependências do Storybook atualizadas
- [ ] Arquivos duplicados removidos
- [ ] Funções play implementadas para interações automáticas
- [ ] Delays apropriados entre interações

### 9. Recursos Úteis

- [Storybook Documentation](https://storybook.js.org/docs)
- [Play Functions](https://storybook.js.org/docs/writing-stories/play-function)
- [React Hooks](https://react.dev/reference/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Configuration](https://vitejs.dev/config/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
