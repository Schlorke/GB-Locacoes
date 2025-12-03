# Setup Completo - ScrollStack Component

Guia passo a passo para configurar o ScrollStack no seu projeto React +
TypeScript + Tailwind.

## 📋 Checklist Rápido

- [ ] Node.js 16+ instalado
- [ ] Projeto React com TypeScript
- [ ] Tailwind CSS configurado
- [ ] Instalar dependência `lenis`
- [ ] Copiar arquivos do componente
- [ ] Testar

## 🚀 Passo a Passo Completo

### 1️⃣ Criar projeto (se ainda não tem)

```bash
# Com Vite (recomendado)
npm create vite@latest meu-projeto -- --template react-ts
cd meu-projeto
npm install

# Ou com Create React App
npx create-react-app meu-projeto --template typescript
cd meu-projeto
```

### 2️⃣ Instalar e configurar Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Edite `tailwind.config.js`:**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {}
  },
  plugins: []
}
```

**Edite `src/index.css` ou `src/App.css`:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3️⃣ Instalar Lenis (biblioteca de smooth scroll)

```bash
npm install lenis
```

### 4️⃣ Copiar os arquivos do componente

Copie para o seu projeto:

```
src/
  components/
    ScrollStack.tsx          ← Arquivo principal do componente
```

### 5️⃣ Verificar TypeScript config

**Seu `tsconfig.json` deve ter pelo menos:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 6️⃣ Usar o componente

**Opção A - Exemplo Simples (`src/App.tsx`):**

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

        <ScrollStackItem itemClassName="bg-pink-600">
          <h2 className="text-3xl font-bold text-white">Card 3</h2>
        </ScrollStackItem>
      </ScrollStack>
    </div>
  )
}

export default App
```

**Opção B - Usar o exemplo completo:**

Copie o arquivo `ScrollStack-Example.tsx` para `src/App.tsx`

### 7️⃣ Rodar o projeto

```bash
npm run dev
```

Abra http://localhost:5173 (ou a porta que aparecer no terminal)

## 🎨 Customização de Cores

### Gradientes Tailwind

```tsx
// Gradiente roxo/rosa
<ScrollStackItem itemClassName="bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600">

// Gradiente azul/ciano
<ScrollStackItem itemClassName="bg-gradient-to-r from-blue-500 to-cyan-500">

// Gradiente escuro
<ScrollStackItem itemClassName="bg-gradient-to-bl from-gray-900 via-purple-900 to-violet-800">
```

### Bordas e Sombras

```tsx
// Com borda
<ScrollStackItem itemClassName="bg-white border-4 border-purple-500">

// Com sombra colorida
<ScrollStackItem itemClassName="bg-purple-600 shadow-2xl shadow-purple-500/50">

// Com backdrop blur
<ScrollStackItem itemClassName="bg-white/10 backdrop-blur-lg border border-white/20">
```

## ⚡ Otimizações de Performance

### 1. Limitar número de cards

```tsx
// ✅ BOM: 3-7 cards
<ScrollStack>
  {[1, 2, 3, 4, 5].map((i) => (
    <ScrollStackItem key={i}>...</ScrollStackItem>
  ))}
</ScrollStack>

// ❌ EVITAR: muitos cards (>10)
```

### 2. Usar will-change com cuidado

O componente já otimiza isso automaticamente, mas você pode adicionar:

```tsx
<ScrollStackItem itemClassName="will-change-transform">
```

### 3. Imagens otimizadas

```tsx
<ScrollStackItem>
  <img
    src="/imagem.jpg"
    loading="lazy"
    className="w-full h-auto object-cover"
  />
</ScrollStackItem>
```

## 🐛 Troubleshooting

### Erro: "Module not found: Can't resolve 'lenis'"

**Solução:**

```bash
npm install lenis
# ou
rm -rf node_modules package-lock.json
npm install
```

### Cards não aparecem / tela preta

**Possíveis causas:**

1. Container pai sem altura definida

   ```tsx
   // ✅ Correto
   <div className="h-screen">
     <ScrollStack>...</ScrollStack>
   </div>

   // ❌ Errado
   <div>
     <ScrollStack>...</ScrollStack>
   </div>
   ```

2. Tailwind não está carregando
   - Verifique se `@tailwind` está no CSS
   - Veja se o `content` no `tailwind.config.js` está correto

### Scroll não funciona

**Solução 1:** Tente com scroll da janela

```tsx
<ScrollStack useWindowScroll={true}>
```

**Solução 2:** Verifique se não há conflitos de CSS

```css
/* Remova estilos que possam interferir */
body {
  overflow: auto !important;
}
```

### Animação travada/lenta

**Otimizações:**

1. Reduza o número de cards
2. Desative blur se não estiver usando:
   ```tsx
   <ScrollStack blurAmount={0}>
   ```
3. Verifique o DevTools Performance

### TypeScript errors

Se tiver erro de tipos, adicione no `src/vite-env.d.ts` ou crie:

```typescript
/// <reference types="vite/client" />

declare module "lenis" {
  export default class Lenis {
    constructor(options?: any)
    on(event: string, callback: Function): void
    raf(time: number): void
    destroy(): void
  }
}
```

## 📦 Package.json Referência

Seu `package.json` deve ter algo assim:

```json
{
  "name": "meu-projeto-scroll-stack",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lenis": "^1.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.2.0",
    "vite": "^5.0.0"
  }
}
```

## 🌐 Deploy

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Arraste a pasta dist/ no Netlify
```

### GitHub Pages

```bash
npm install -D gh-pages

# Adicione no package.json:
"homepage": "https://seuusuario.github.io/seu-repo",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

npm run deploy
```

## ✅ Checklist Final

Antes de considerar completo:

- [ ] Componente renderiza sem erros
- [ ] Scroll funciona suavemente
- [ ] Cards empilham corretamente
- [ ] Funciona no mobile (teste no DevTools)
- [ ] Cores e estilos aplicados
- [ ] Performance aceitável (60fps)
- [ ] Testado em diferentes navegadores

## 🆘 Precisa de Ajuda?

- Veja o `ScrollStack-README.md` para documentação completa
- Teste o `ScrollStack-Example.tsx` para um exemplo funcional
- Verifique o console do navegador para erros

---

**Pronto!** 🎉 Seu ScrollStack deve estar funcionando perfeitamente!
