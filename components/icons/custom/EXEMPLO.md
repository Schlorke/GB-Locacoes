# 📘 Exemplo Completo: Adicionando Ícone de Betoneira

Este guia mostra passo a passo como adicionar um ícone SVG customizado ao
projeto.

## 🎯 Cenário

Você tem um arquivo `betoneira.svg` e quer usá-lo nas categorias do sistema.

### Conteúdo do SVG original:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <circle id="circle1" cx="32" cy="40" r="15" fill="#ff6b6b" stroke="#000" stroke-width="2"/>
  <path id="path1" d="M32 25 L32 10 M24 14 L32 10 L40 14" stroke="#000" stroke-width="2" fill="none"/>
  <line x1="32" y1="40" x2="40" y2="48" stroke="#000" stroke-width="2"/>
  <line x1="32" y1="40" x2="24" y2="48" stroke="#000" stroke-width="2"/>
</svg>
```

## ⚙️ Passo a Passo

### 1. Converter com o Script

```bash
node scripts/convert-svg-to-icon.js ./betoneira.svg Betoneira
```

**Resultado:**

```
✅ Conversão concluída! Cole o código abaixo...
```

### 2. Adicionar ao index.tsx

Abra `components/icons/custom/index.tsx` e cole:

```tsx
export const Betoneira: React.FC<CustomIconProps> = ({
  size = 24,
  color = "currentColor",
  className = ""
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="32" cy="40" r="15" fill="none" stroke={color} strokeWidth="2" />
    <path
      d="M32 25 L32 10 M24 14 L32 10 L40 14"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    <line x1="32" y1="40" x2="40" y2="48" stroke={color} strokeWidth="2" />
    <line x1="32" y1="40" x2="24" y2="48" stroke={color} strokeWidth="2" />
  </svg>
)
Betoneira.displayName = "Betoneira"
```

### 3. Registrar no CUSTOM_ICONS

No mesmo arquivo, atualize o objeto:

```tsx
export const CUSTOM_ICONS = {
  CustomIcon1,
  CustomIcon2,
  Betoneira // ← Novo ícone adicionado
} as const
```

### 4. Usar no Código

#### Em qualquer componente:

```tsx
import { Betoneira } from "@/components/icons/custom"

function MeuComponente() {
  return (
    <div>
      <Betoneira size={32} color="#ea580c" />
      <h2>Betoneira Industrial</h2>
    </div>
  )
}
```

#### No seletor de categorias:

O ícone aparece automaticamente! Basta:

1. Ir em **Admin → Categorias**
2. Criar/Editar categoria
3. Clicar em **"Personalizar Design"**
4. **Betoneira** aparecerá na lista de ícones! 🎉

## 🎨 Resultado Visual

### Antes (apenas Lucide):

```
[Package] [Wrench] [Hammer] [Building] ...
```

### Depois (com customizados):

```
[Package] [Wrench] [Hammer] ... [Betoneira] [SeuIcone] ...
```

## ✨ Vantagens

- ✅ **Type-safe**: TypeScript detecta automaticamente
- ✅ **Reutilizável**: Use em qualquer lugar do projeto
- ✅ **Consistente**: Mesma API dos ícones Lucide
- ✅ **Customizável**: Tamanho e cor dinâmicos
- ✅ **Integrado**: Aparece no seletor de categorias

## 🔄 Múltiplos Ícones

Para adicionar vários ícones de uma vez:

```bash
# Converta todos
node scripts/convert-svg-to-icon.js ./betoneira.svg Betoneira
node scripts/convert-svg-to-icon.js ./escavadeira.svg Escavadeira
node scripts/convert-svg-to-icon.js ./guindaste.svg Guindaste

# Cole todos em index.tsx
# Registre todos no CUSTOM_ICONS
```

## 🐛 Troubleshooting

### "Ícone não aparece no seletor"

- ✅ Verificar se está registrado em `CUSTOM_ICONS`
- ✅ Reiniciar servidor de desenvolvimento
- ✅ Limpar cache do navegador

### "Cores não mudam"

- ✅ Usar `stroke={color}` em vez de `stroke="#000"`
- ✅ Remover atributos `fill` fixos ou usar `fill="none"`

### "Tamanho errado"

- ✅ Verificar `viewBox` (deve ser proporcional)
- ✅ Usar `width={size} height={size}`

---

**Pronto!** Agora você pode adicionar quantos ícones SVG quiser ao projeto! 🚀
