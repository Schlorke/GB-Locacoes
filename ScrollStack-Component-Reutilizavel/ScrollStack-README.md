# ScrollStack Component

Componente React de empilhamento com animação baseada em scroll, usando
TypeScript + Tailwind CSS.

## 📦 Instalação

### 1. Instalar dependências

```bash
npm install lenis
# ou
pnpm add lenis
# ou
yarn add lenis
```

### 2. Copiar o componente

Copie o arquivo `ScrollStack.tsx` para o seu projeto (ex:
`src/components/ScrollStack.tsx`)

### 3. Configurar Tailwind CSS

Certifique-se que seu `tailwind.config.js` ou `tailwind.config.ts` está
configurado corretamente:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        40: "40px" // Opcional: se quiser usar rounded-40 ao invés de rounded-[40px]
      }
    }
  },
  plugins: []
}
```

## 🚀 Uso Básico

```tsx
import ScrollStack, { ScrollStackItem } from "./components/ScrollStack"

function App() {
  return (
    <div className="h-screen">
      <ScrollStack>
        <ScrollStackItem itemClassName="bg-purple-600">
          <h2 className="text-3xl font-bold text-white">Card 1</h2>
          <p className="text-white">Conteúdo do primeiro card</p>
        </ScrollStackItem>

        <ScrollStackItem itemClassName="bg-blue-600">
          <h2 className="text-3xl font-bold text-white">Card 2</h2>
          <p className="text-white">Conteúdo do segundo card</p>
        </ScrollStackItem>

        <ScrollStackItem itemClassName="bg-pink-600">
          <h2 className="text-3xl font-bold text-white">Card 3</h2>
          <p className="text-white">Conteúdo do terceiro card</p>
        </ScrollStackItem>
      </ScrollStack>
    </div>
  )
}
```

## ⚙️ Props do ScrollStack

| Prop                | Tipo         | Padrão          | Descrição                                   |
| ------------------- | ------------ | --------------- | ------------------------------------------- |
| `children`          | `ReactNode`  | **obrigatório** | Componentes ScrollStackItem                 |
| `className`         | `string`     | `""`            | Classes CSS adicionais para o container     |
| `itemDistance`      | `number`     | `100`           | Distância entre itens em pixels             |
| `itemScale`         | `number`     | `0.03`          | Incremento de escala por item               |
| `itemStackDistance` | `number`     | `30`            | Distância entre itens empilhados em pixels  |
| `stackPosition`     | `string`     | `"20%"`         | Posição onde o empilhamento começa          |
| `scaleEndPosition`  | `string`     | `"10%"`         | Posição onde o scaling termina              |
| `baseScale`         | `number`     | `0.85`          | Escala base do primeiro item                |
| `scaleDuration`     | `number`     | `0.5`           | Duração da animação de escala em segundos   |
| `rotationAmount`    | `number`     | `0`             | Rotação por item em graus                   |
| `blurAmount`        | `number`     | `0`             | Quantidade de blur para profundidade        |
| `useWindowScroll`   | `boolean`    | `false`         | Usar scroll da janela ao invés do container |
| `onStackComplete`   | `() => void` | `undefined`     | Callback quando a animação completa         |

## 🎨 Exemplos Avançados

### Com customizações

```tsx
<ScrollStack
  itemDistance={200}
  itemStackDistance={40}
  stackPosition="25%"
  baseScale={0.9}
  rotationAmount={2}
  blurAmount={5}
  onStackComplete={() => console.log("Animação completa!")}
>
  <ScrollStackItem itemClassName="bg-gradient-to-br from-purple-500 to-pink-500">
    <h2>Card personalizado</h2>
  </ScrollStackItem>
</ScrollStack>
```

### Com conteúdo complexo

```tsx
<ScrollStack itemDistance={150}>
  <ScrollStackItem itemClassName="bg-white shadow-2xl">
    <div className="flex items-center gap-4">
      <img src="/icon.png" alt="Icon" className="w-16 h-16" />
      <div>
        <h3 className="text-2xl font-bold">Título do Card</h3>
        <p className="text-gray-600">Descrição detalhada aqui</p>
      </div>
    </div>
  </ScrollStackItem>
</ScrollStack>
```

### Usando scroll da janela (fullscreen)

```tsx
<ScrollStack useWindowScroll={true} className="min-h-screen">
  <ScrollStackItem itemClassName="bg-blue-600">
    <h2>Este scroll usa a janela inteira</h2>
  </ScrollStackItem>
</ScrollStack>
```

## 🎯 Props do ScrollStackItem

| Prop            | Tipo        | Padrão          | Descrição                          |
| --------------- | ----------- | --------------- | ---------------------------------- |
| `children`      | `ReactNode` | **obrigatório** | Conteúdo do item                   |
| `itemClassName` | `string`    | `""`            | Classes CSS adicionais para o item |

## 💡 Dicas

1. **Container Height**: O container pai precisa ter uma altura definida (ex:
   `h-screen`, `h-[600px]`)

2. **Cores de fundo**: Use `itemClassName` para adicionar backgrounds aos cards:

   ```tsx
   <ScrollStackItem itemClassName="bg-gradient-to-r from-blue-500 to-purple-600">
   ```

3. **Responsividade**: Ajuste o padding no mobile:

   ```tsx
   <ScrollStack className="px-4 md:px-20">
   ```

4. **Performance**: Evite muitos cards (máximo 10-15 para melhor performance)

5. **Blur Effect**: Use `blurAmount` para criar profundidade visual:
   ```tsx
   <ScrollStack blurAmount={3}>
   ```

## 🐛 Troubleshooting

### Cards não aparecem

- Verifique se o container pai tem altura definida
- Certifique-se que `lenis` foi instalado corretamente

### Animação travada

- Reduz o número de cards
- Diminua `blurAmount` se estiver usando

### Scroll não funciona no mobile

- Verifique se não há conflitos com outros event listeners de touch
- Teste com `useWindowScroll={true}`

## 📱 Compatibilidade

- ✅ React 18+
- ✅ TypeScript 4.5+
- ✅ Tailwind CSS 3.0+
- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Mobile (iOS Safari, Chrome Mobile)

## 📄 Licença

Componente de código aberto do [React Bits](https://github.com/react-bits)

---

Criado com ❤️ usando React, TypeScript e Tailwind CSS
