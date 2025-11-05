# 🎨 Guia de Ícones Customizados

Este guia mostra como adicionar ícones SVG personalizados ao projeto
GB-Locações.

## 📚 Visão Geral

O projeto usa dois tipos de ícones:

1. **Lucide Icons** (~440 ícones) - Biblioteca padrão
2. **Ícones Customizados** - SVGs personalizados do projeto

## 🚀 Quick Start (3 passos)

### 1. Converter SVG

```bash
pnpm icon:convert caminho/para/seu-icone.svg NomeDoIcone
```

### 2. Copiar código gerado

O script gera automaticamente o componente React. Cole em:

```
components/icons/custom/index.tsx
```

### 3. Registrar o ícone

No mesmo arquivo, adicione ao objeto `CUSTOM_ICONS`:

```tsx
export const CUSTOM_ICONS = {
  // ... outros
  NomeDoIcone
} as const
```

**Pronto!** O ícone já aparece no seletor de categorias.

## 📖 Documentação Completa

- **README principal**: `components/icons/custom/README.md`
- **Exemplo prático**: `components/icons/custom/EXEMPLO.md`
- **Código fonte**: `components/icons/custom/index.tsx`

## 🎯 Onde os Ícones Aparecem

### 1. Seletor de Categorias

- **Admin → Categorias**
- Criar/Editar categoria
- "Personalizar Design"
- Ícones customizados aparecem junto com Lucide

### 2. Uso Direto no Código

```tsx
import { SeuIcone } from "@/components/icons/custom"
;<SeuIcone size={24} color="#ea580c" />
```

### 3. Sistema Unificado

```tsx
import { renderIcon } from "@/lib/constants/all-icons"

// Funciona com Lucide e customizados
renderIcon("Package", 24, "#000")
renderIcon("SeuIcone", 32, "#ea580c")
```

## 🛠️ Preparar SVG para Conversão

### ✅ Checklist Antes de Converter

- [ ] Remover IDs e classes desnecessárias
- [ ] Garantir `viewBox` correto (idealmente `0 0 24 24`)
- [ ] Substituir cores fixas por `currentColor`
- [ ] Remover atributos `xmlns:xlink`
- [ ] Simplificar paths quando possível

### 🔧 Ferramentas Úteis

**SVGOMG** - Otimizador online:

```
https://jakearchibald.github.io/svgomg/
```

**SVGR** - Conversor avançado:

```bash
npx @svgr/cli --icon --typescript seu-icone.svg
```

## 📐 Estrutura de Arquivos

```
components/icons/custom/
├── index.tsx           # ← Adicione seus ícones aqui
├── README.md           # Documentação completa
└── EXEMPLO.md          # Exemplo prático

lib/constants/
├── lucide-icons.ts     # Ícones Lucide (440+)
└── all-icons.ts        # Sistema unificado

scripts/
└── convert-svg-to-icon.js  # Conversor automático
```

## 🎨 Exemplo Completo

### SVG Original:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="10" fill="#ff0000" stroke="#000"/>
  <path d="M12 6v6l4 2" stroke="#000"/>
</svg>
```

### Converter:

```bash
pnpm icon:convert ./meu-icone.svg MeuIcone
```

### Componente Gerado:

```tsx
export const MeuIcone: React.FC<CustomIconProps> = ({
  size = 24,
  color = "currentColor",
  className = ""
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <path d="M12 6v6l4 2" stroke={color} strokeWidth="2" />
  </svg>
)
MeuIcone.displayName = "MeuIcone"
```

### Usar:

```tsx
import { MeuIcone } from "@/components/icons/custom"
;<MeuIcone size={32} color="#ea580c" className="hover:scale-110" />
```

## 🔄 Fluxo de Trabalho

```
1. Criar/obter SVG
   ↓
2. Otimizar (SVGOMG)
   ↓
3. Converter (pnpm icon:convert)
   ↓
4. Copiar código em index.tsx
   ↓
5. Registrar em CUSTOM_ICONS
   ↓
6. Usar no projeto! ✅
```

## ⚡ Comandos Úteis

```bash
# Converter SVG
pnpm icon:convert ./icone.svg NomeDoIcone

# Ver ícones no Storybook
pnpm storybook

# Testar no desenvolvimento
pnpm dev
```

## 🐛 Troubleshooting

### Ícone não aparece

- ✅ Verificar se está em `CUSTOM_ICONS`
- ✅ Reiniciar servidor (`pnpm dev`)
- ✅ Limpar cache do navegador

### Cores não funcionam

- ✅ Usar `stroke={color}` não `stroke="#000"`
- ✅ Usar `fill="none"` ou `fill={color}`

### Tamanho errado

- ✅ Verificar `viewBox` proporcional
- ✅ Usar `width={size}` e `height={size}`

### TypeScript reclama

- ✅ Verificar se `displayName` está definido
- ✅ Props devem ser `CustomIconProps`

## 📚 Recursos

- [Lucide Icons](https://lucide.dev) - Biblioteca base
- [SVGR Playground](https://react-svgr.com/playground/) - Testar conversões
- [SVG Specification](https://www.w3.org/TR/SVG2/) - Documentação SVG
- [Hero Icons](https://heroicons.com) - Inspiração de ícones

## 🎯 Boas Práticas

### ✅ Fazer

- Usar nomes descritivos (`Betoneira`, `Escavadeira`)
- Manter viewBox consistente
- Documentar ícones complexos
- Testar em diferentes tamanhos

### ❌ Evitar

- Nomes genéricos (`Icon1`, `Icon2`)
- Cores hardcoded
- ViewBox inconsistente
- Paths muito complexos

## 📊 Estatísticas

- **Lucide Icons**: 440+ ícones
- **Ícones Customizados**: Ilimitado!
- **Tempo de conversão**: ~30 segundos por ícone
- **Type-safe**: 100% TypeScript

---

**Última atualização**: Janeiro 2025 **Versão**: 1.0.0 **Autor**: GB-Locações
Team
