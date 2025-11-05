# 🎨 Ícones Customizados SVG

Este diretório contém ícones SVG personalizados convertidos em componentes React
para uso no projeto GB-Locações.

## 📋 Como Adicionar Novos Ícones SVG

### Passo 1: Preparar o SVG

1. **Limpe o SVG** - Remova atributos desnecessários:

   ```xml
   <!-- ❌ SVG com atributos extras -->
   <svg id="Layer_1" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" ...>

   <!-- ✅ SVG limpo -->
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
   ```

2. **Garanta viewBox correto** - Idealmente `0 0 24 24` para consistência

3. **Remova cores hardcoded** - Substitua por `currentColor`:

   ```xml
   <!-- ❌ Cor fixa -->
   <path fill="#000000" stroke="#FF0000" />

   <!-- ✅ Cor dinâmica -->
   <path fill="none" stroke="currentColor" />
   ```

### Passo 2: Converter para Componente React

Abra `components/icons/custom/index.tsx` e adicione:

```tsx
export const SeuIconeCustomizado: React.FC<CustomIconProps> = ({
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
    {/* Cole o conteúdo interno do SVG aqui */}
    <path
      d="..."
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
SeuIconeCustomizado.displayName = "SeuIconeCustomizado"
```

### Passo 3: Registrar no objeto CUSTOM_ICONS

No mesmo arquivo, adicione ao objeto de exportação:

```tsx
export const CUSTOM_ICONS = {
  CustomIcon1,
  CustomIcon2,
  SeuIconeCustomizado // ← Adicione aqui
} as const
```

### Passo 4: Usar o Ícone

#### No código diretamente:

```tsx
import { SeuIconeCustomizado } from "@/components/icons/custom"
;<SeuIconeCustomizado size={24} color="#ea580c" />
```

#### No seletor de categorias:

Os ícones customizados aparecerão automaticamente no modal "Personalizar Design"
junto com os ícones Lucide!

## 🛠️ Ferramentas Úteis

### SVGR (Recomendado)

Converte SVG automaticamente para componente React:

```bash
npx @svgr/cli --icon --typescript seu-icone.svg
```

### SVGOMG

Otimiza e limpa SVGs online:

- https://jakearchibald.github.io/svgomg/

## 📐 Padrões de Código

### ✅ Boas Práticas

```tsx
// 1. Use props tipadas
export const MeuIcone: React.FC<CustomIconProps> = ({ size, color, className }) => (...)

// 2. Defina displayName
MeuIcone.displayName = 'MeuIcone'

// 3. Use valores padrão consistentes
size = 24
color = 'currentColor'

// 4. Sempre inclua className para customização
<svg className={className}>
```

### ❌ Evitar

```tsx
// 1. NÃO use cores hardcoded
<path fill="#000000" /> // ❌

// 2. NÃO ignore o viewBox
<svg width={size} height={size}> // ❌ Falta viewBox

// 3. NÃO deixe atributos de ID
<svg id="Layer_1"> // ❌

// 4. NÃO use inline styles
<path style={{fill: 'red'}} /> // ❌
```

## 🎨 Exemplo Completo

```tsx
// Ícone de Betoneira
export const Betoneira: React.FC<CustomIconProps> = ({
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
    <circle cx="12" cy="16" r="6" stroke={color} strokeWidth="2" />
    <path
      d="M12 10V4M8 6l4-4 4 4"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 16l3 3M12 16l-3 3"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)
Betoneira.displayName = "Betoneira"

// Registrar
export const CUSTOM_ICONS = {
  // ... outros
  Betoneira
} as const
```

## 🔄 Atualizações

Após adicionar novos ícones:

1. ✅ O TypeScript detecta automaticamente o novo tipo
2. ✅ O ícone aparece no seletor de categorias
3. ✅ Pode ser usado em qualquer componente
4. ✅ Funciona com todas as props (size, color, className)

## 📚 Referências

- [Lucide Icons](https://lucide.dev) - Inspiração de estilo
- [SVGR](https://react-svgr.com) - Conversor SVG → React
- [SVG Specification](https://www.w3.org/TR/SVG2/) - Documentação SVG

---

**Última atualização**: Janeiro 2025 **Versão**: 1.0.0
