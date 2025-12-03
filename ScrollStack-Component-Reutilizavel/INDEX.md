# 📦 ScrollStack Component - Pacote Completo

Todos os arquivos necessários para usar o componente ScrollStack no seu projeto
React + TypeScript + Tailwind CSS.

## 📁 Arquivos Criados

### 🎯 Arquivos Principais (NECESSÁRIOS)

1. **`ScrollStack.tsx`** ⭐
   - Componente principal completo
   - TypeScript + Tailwind CSS
   - Totalmente documentado com JSDoc
   - Pronto para copiar e usar

### 📚 Documentação e Guias

2. **`ScrollStack-README.md`**
   - Documentação completa
   - Props e suas descrições
   - Exemplos de uso
   - Dicas e troubleshooting

3. **`ScrollStack-Setup.md`**
   - Guia passo a passo de instalação
   - Configurações necessárias
   - Troubleshooting detalhado
   - Checklist completo

### 💡 Exemplos e Extras

4. **`ScrollStack-Example.tsx`**
   - Exemplo completo e funcional
   - Interface bonita e interativa
   - Código pronto para testar
   - Variações comentadas

5. **`lenis.d.ts`**
   - Definições de tipos TypeScript para Lenis
   - Opcional: use se tiver erros de tipos
   - Copie para `src/types/lenis.d.ts`

6. **`INDEX.md`** (este arquivo)
   - Índice de todos os arquivos
   - Guia rápido de uso

---

## 🚀 Início Rápido (3 passos)

### 1️⃣ Instalar dependência

```bash
npm install lenis
```

### 2️⃣ Copiar componente

Copie o arquivo **`ScrollStack.tsx`** para seu projeto:

```
seu-projeto/
  src/
    components/
      ScrollStack.tsx  ← Cole aqui
```

### 3️⃣ Usar no seu código

```tsx
import ScrollStack, { ScrollStackItem } from "./components/ScrollStack"

function App() {
  return (
    <div className="h-screen">
      <ScrollStack>
        <ScrollStackItem itemClassName="bg-purple-600">
          <h2 className="text-3xl font-bold text-white">Card 1</h2>
        </ScrollStackItem>

        <ScrollStackItem itemClassName="bg-blue-600">
          <h2 className="text-3xl font-bold text-white">Card 2</h2>
        </ScrollStackItem>
      </ScrollStack>
    </div>
  )
}
```

**Pronto!** 🎉

---

## 📖 Estrutura do Projeto Final

Depois de copiar os arquivos, seu projeto deve ficar assim:

```
seu-projeto/
├── src/
│   ├── components/
│   │   └── ScrollStack.tsx          ← Componente principal
│   ├── types/                       (opcional)
│   │   └── lenis.d.ts              ← Tipos do Lenis
│   ├── App.tsx                      ← Use o componente aqui
│   └── index.css                    ← Tailwind imports
├── public/
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🎨 Exemplos de Uso

### Básico

```tsx
<ScrollStack>
  <ScrollStackItem itemClassName="bg-purple-600">Conteúdo</ScrollStackItem>
</ScrollStack>
```

### Com Customizações

```tsx
<ScrollStack
  itemDistance={200}
  baseScale={0.85}
  rotationAmount={2}
  blurAmount={5}
  onStackComplete={() => console.log("Completo!")}
>
  <ScrollStackItem>Conteúdo</ScrollStackItem>
</ScrollStack>
```

### Fullscreen (Scroll da Janela)

```tsx
<ScrollStack useWindowScroll={true}>
  <ScrollStackItem>Conteúdo</ScrollStackItem>
</ScrollStack>
```

---

## 📦 Dependências

### Produção (Runtime)

- `react` >= 18.0.0
- `react-dom` >= 18.0.0
- `lenis` >= 1.0.0

### Desenvolvimento

- `typescript` >= 4.5.0
- `tailwindcss` >= 3.0.0
- `@vitejs/plugin-react` ou equivalente

---

## 🎯 Props Principais

| Prop                | Tipo     | Padrão | Descrição                   |
| ------------------- | -------- | ------ | --------------------------- |
| `itemDistance`      | number   | 100    | Distância entre cards (px)  |
| `itemStackDistance` | number   | 30     | Distância ao empilhar (px)  |
| `baseScale`         | number   | 0.85   | Escala dos cards empilhados |
| `stackPosition`     | string   | "20%"  | Onde começa o empilhamento  |
| `rotationAmount`    | number   | 0      | Rotação em graus            |
| `blurAmount`        | number   | 0      | Blur de profundidade (px)   |
| `useWindowScroll`   | boolean  | false  | Usar scroll da janela       |
| `onStackComplete`   | function | -      | Callback de conclusão       |

_Veja mais props em `ScrollStack-README.md`_

---

## 🔧 Configuração Mínima

### tailwind.config.js

```js
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: []
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true
  }
}
```

### src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🐛 Problemas Comuns

### "Module not found: lenis"

```bash
npm install lenis
```

### Cards não aparecem

```tsx
// Container precisa ter altura
<div className="h-screen">
  <ScrollStack>...</ScrollStack>
</div>
```

### Erros de tipo TypeScript

Copie `lenis.d.ts` para `src/types/lenis.d.ts`

_Mais troubleshooting em `ScrollStack-Setup.md`_

---

## 📱 Compatibilidade

- ✅ React 18+
- ✅ TypeScript 4.5+
- ✅ Tailwind CSS 3.0+
- ✅ Chrome, Firefox, Safari, Edge
- ✅ iOS Safari, Chrome Mobile
- ✅ Vite, Next.js, Create React App

---

## 🎓 Recursos de Aprendizado

### Ordem de Leitura Recomendada

1. **Este arquivo** (INDEX.md) - Visão geral
2. **ScrollStack.tsx** - Veja o código (bem comentado!)
3. **ScrollStack-README.md** - Documentação completa
4. **ScrollStack-Example.tsx** - Teste o exemplo
5. **ScrollStack-Setup.md** - Setup avançado (se precisar)

### Para Iniciantes

1. Leia o **Início Rápido** acima
2. Copie o código do exemplo básico
3. Teste no seu projeto
4. Depois customize as props

### Para Desenvolvedores Experientes

1. Copie `ScrollStack.tsx`
2. Instale `lenis`
3. Comece a usar
4. Leia os comentários no código para entender a lógica

---

## 🚀 Deploy

Funciona em todas as plataformas:

- **Vercel**: `vercel`
- **Netlify**: Arraste a pasta `dist/`
- **GitHub Pages**: `npm run build` + gh-pages
- **Cloudflare Pages**: Conecte o repo
- **AWS Amplify**: Deploy automático

---

## 💎 Dicas Finais

### Performance

- Use máximo 10 cards
- Evite `blurAmount` alto (>10px)
- Otimize imagens (lazy loading)

### Design

- Use gradientes Tailwind
- Combine com backdrop-blur
- Teste diferentes cores

### Mobile

- Sempre teste no mobile
- Use `touchMultiplier` se precisar
- Considere `useWindowScroll` para fullscreen

---

## 📄 Licença

Componente open-source do **React Bits**

- Livre para uso pessoal e comercial
- Código modificável
- Sem garantias

---

## 🆘 Precisa de Ajuda?

1. Veja a **documentação** em `ScrollStack-README.md`
2. Confira o **troubleshooting** em `ScrollStack-Setup.md`
3. Teste o **exemplo** em `ScrollStack-Example.tsx`
4. Verifique o **código-fonte** em `ScrollStack.tsx` (bem comentado!)

---

## ✨ Créditos

Componente original: **React Bits** (https://www.react-bits.dev/) Smooth scroll:
**Lenis** (https://lenis.studiofreight.com/)

---

**Bom desenvolvimento!** 🚀✨

_Criado com ❤️ para a comunidade React_
