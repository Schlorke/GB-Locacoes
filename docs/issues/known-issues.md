# 🐛 Problemas Conhecidos e Soluções - GB Locações

> **Documento de Referência**: Problemas técnicos já enfrentados e resolvidos no
> projeto. Consulte este arquivo antes de investigar bugs similares.

---

## 📋 Índice

1. [Dessincronização de Animações Hero](#1-dessincronização-de-animações-hero)
2. [Scroll Vertical Travado no iOS Safari](#2-scroll-vertical-travado-no-ios-safari)
3. [Como Usar Este Documento](#como-usar-este-documento)

---

## 1. Dessincronização de Animações Hero

### 🎯 Problema

**Data da Ocorrência**: Novembro 2025 **Severidade**: Alta (UX impactada)
**Status**: ✅ RESOLVIDO

#### Descrição

Ao carregar a página inicial (especialmente após reset de cache), a imagem de
fundo do Hero aparecia vários segundos **antes** do conteúdo (título, subtítulo,
botões, busca). Isso criava uma experiência ruim onde o usuário via apenas a
imagem sozinha por alguns segundos antes do resto aparecer.

#### Sintomas

- ✅ Primeira visita normal funcionava
- ❌ Reset de cache causava dessincronização
- ❌ Imagem aparecia 1-2 segundos antes do conteúdo
- ❌ Flash de imagem isolada prejudicava UX

#### Causa Raiz

**Problema de Timing de Hidratação:**

1. **Framer Motion** (flash da imagem) inicia imediatamente após hidratação do
   React
2. **Scroll Reveal Init** demora mais para inicializar (especialmente após reset
   de cache)
3. Não havia comunicação entre os dois sistemas
4. Flash disparava independentemente do scroll-reveal estar pronto

**Código Problemático:**

```tsx
// Hero.tsx - Flash disparava imediatamente após hidratação
const [isHydrated, setIsHydrated] = useState(false)

useEffect(() => {
  setIsHydrated(true) // ← Muito cedo!
}, [])

// Flash iniciava sem esperar scroll-reveal
<motion.div animate={isHydrated ? { opacity: 1 } : { opacity: 0 }}>
```

### ✅ Solução Implementada

**Sistema de Evento Customizado para Sincronização:**

#### Arquivos Modificados

1. `components/scroll-reveal-init.tsx`
2. `components/hero.tsx`

#### Implementação

**1. Scroll Reveal Dispara Evento (scroll-reveal-init.tsx)**

```tsx
const run = () => {
  // Disparar evento para avisar que scroll-reveal está pronto
  window.dispatchEvent(new Event("scrollRevealReady"))

  // ... resto do código de inicialização
}
```

**Localização**: Linha ~40 em `scroll-reveal-init.tsx`

**2. Hero Escuta e Aguarda Evento (hero.tsx)**

```tsx
const [isScrollRevealReady, setIsScrollRevealReady] = useState(false)

// Aguardar scroll-reveal-init estar pronto antes de iniciar animações do flash
useEffect(() => {
  const handleScrollRevealReady = () => {
    setIsScrollRevealReady(true)
  }

  window.addEventListener('scrollRevealReady', handleScrollRevealReady)

  return () => {
    window.removeEventListener('scrollRevealReady', handleScrollRevealReady)
  }
}, [])

// Flash só anima quando scroll-reveal estiver pronto
<motion.div
  animate={isScrollRevealReady ? { opacity: 1 } : { opacity: 0 }}
  transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
>
```

**Localização**: Linhas ~26-39 e ~135 em `hero.tsx`

#### Como Funciona

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Página carrega                                           │
│ 2. React hidrata                                            │
│ 3. Hero renderiza (flash invisível, aguardando)            │
│ 4. Scroll Reveal Init inicializa completamente             │
│ 5. Scroll Reveal dispara evento 'scrollRevealReady' ✨     │
│ 6. Hero recebe evento e libera animação do flash           │
│ 7. Título (delay 0.2s) + Flash (delay 0.2s) animam JUNTOS │
│ 8. Sincronização perfeita! 🎉                              │
└─────────────────────────────────────────────────────────────┘
```

### 🎯 Resultado

- ✅ Flash aguarda scroll-reveal estar 100% pronto
- ✅ Conteúdo já está animando quando imagem aparece
- ✅ Zero dessincronização mesmo após reset de cache
- ✅ Animação harmoniosa e profissional
- ✅ Funciona em todos os cenários (primeira visita, navegação, refresh)

### 📝 Lições Aprendidas

1. **Nunca confie apenas em hidratação do React** para sincronizar sistemas de
   animação
2. **Use eventos customizados** para comunicação entre componentes independentes
3. **Framer Motion é mais rápido** que sistemas de scroll reveal baseados em
   IntersectionObserver
4. **Sempre teste com reset de cache** para pegar problemas de timing
5. **Estado compartilhado via eventos** > Delays fixos estimados

### ⚠️ Armadilhas a Evitar

❌ **NÃO** use delays fixos grandes para "esperar" inicialização:

```tsx
// RUIM - delay fixo de 0.8s não garante sincronização
transition={{ delay: 0.8 }}
```

✅ **USE** comunicação via eventos:

```tsx
// BOM - aguarda sinal real de prontidão
animate={isScrollRevealReady ? { opacity: 1 } : { opacity: 0 }}
```

### 🔍 Como Diagnosticar Problema Similar

Se você encontrar animações dessincronizadas:

1. Verifique se há múltiplos sistemas de animação (Framer Motion + CSS +
   IntersectionObserver)
2. Teste com reset de cache completo (Ctrl+Shift+R)
3. Use `console.log` para verificar timing de inicialização
4. Considere evento customizado para sincronização

### 📚 Referências

- CHANGELOG.md: [2025-11-05] - Correção Animação Ondinha Hero e Sincronização
- Commit: [hash do commit]
- Arquivos: `components/hero.tsx`, `components/scroll-reveal-init.tsx`

---

## 2. Scroll Vertical Travado no iOS Safari

### 🎯 Problema

**Data da Ocorrência**: Novembro 2025 **Severidade**: Crítica (Funcionalidade
quebrada no iOS) **Status**: ✅ RESOLVIDO

#### Descrição

No iPhone/iPad (iOS Safari), ao tentar rolar a página verticalmente após a seção
"Nossos Equipamentos" (que contém scroll infinito horizontal com animações
GSAP), o scroll vertical ficava completamente travado. O usuário não conseguia
continuar scrollando para baixo para ver a seção "Categorias de Equipamentos" e
o restante do conteúdo da página.

#### Sintomas

- ❌ Scroll vertical travado/preso após seção de equipamentos no iOS
- ❌ Impossível acessar conteúdo abaixo da seção no iPhone
- ❌ Conteúdo aparecia "embaixo" da seção ao tentar scroll para cima
- ❌ Sensação de "chegou ao fim mas ainda tem mais conteúdo"
- ✅ Funcionava perfeitamente no desktop
- ✅ Funcionava perfeitamente no Android

#### Causa Raiz

**`position: sticky` no iOS Safari capturando eventos de touch:**

O componente `EquipmentInfiniteScroll` tinha `className="lg:sticky lg:top-8"`
aplicado, o que criava um elemento sticky no desktop. No iOS Safari,
`position: sticky` tem um bug conhecido onde captura eventos de touch/scroll,
especialmente quando combinado com:

1. **`overflow: hidden`** no mesmo contexto
2. **Animações horizontais** (GSAP movendo elementos com transform)
3. **Scroll containers** aninhados

**Código Problemático:**

```tsx
// equipment-showcase-section.tsx - Linha 87
<div className="order-2 lg:order-1">
  <EquipmentInfiniteScroll className="lg:sticky lg:top-8" />
  {/*                                   ^^^^^^^^^^^^^^^^^ CULPADO */}
</div>
```

**Como o bug ocorria:**

1. Usuário toca na tela para scrollar verticalmente
2. iOS Safari detecta o toque sobre o elemento sticky
3. Sticky tenta determinar: "scroll do elemento" ou "scroll da página"?
4. `overflow: hidden` + animações GSAP horizontais confundem o iOS
5. iOS "prende" o evento de scroll no elemento sticky
6. **Scroll vertical da página trava completamente**

### ✅ Solução Implementada

**Remoção simples do `position: sticky`:**

#### Arquivos Modificados

1. `components/equipment-showcase-section.tsx`

#### Implementação

**Antes (com bug):**

```tsx
<div className="order-2 lg:order-1">
  <EquipmentInfiniteScroll className="lg:sticky lg:top-8" />
</div>
```

**Depois (corrigido):**

```tsx
{
  /* Sticky removido: causava bug de scroll vertical no iOS Safari */
}
;<div className="order-2 lg:order-1">
  <EquipmentInfiniteScroll />
</div>
```

**Localização**: Linhas 86-89 em `equipment-showcase-section.tsx`

### 🎯 Resultado

- ✅ Scroll vertical funciona perfeitamente no iOS Safari
- ✅ Todas as animações GSAP continuam funcionando
- ✅ Comportamento consistente entre iOS, Android e Desktop
- ⚠️ Trade-off: Elemento não fixa mais no desktop durante scroll (comportamento
  sticky removido)

### 📝 Lições Aprendidas

1. **iOS Safari tem bug grave com `position: sticky`** quando combinado com
   `overflow: hidden` e animações
2. **Sticky + scroll horizontal = problema no iOS** - evitar essa combinação
3. **Touch events no iOS são capturados por sticky** mesmo com `touch-action`
   configurado
4. **Simples é melhor**: remover sticky resolveu instantaneamente o problema
5. **Bug conhecido do WebKit**:
   [WebKit Bug #179178](https://bugs.webkit.org/show_bug.cgi?id=179178)

### ⚠️ Armadilhas a Evitar

❌ **NÃO use `position: sticky` com:**

```tsx
// RUIM - combinação que quebra no iOS
<div className="sticky">
  <div className="overflow-hidden">{/* Animações horizontais GSAP */}</div>
</div>
```

✅ **Se precisar de sticky, isole completamente:**

```tsx
// BOM - sem overflow ou animações no contexto do sticky
<div className="sticky">
  <div>{/* Conteúdo estático simples */}</div>
</div>
```

❌ **NÃO tente corrigir com CSS:**

```css
/* INÚTIL - não resolve o problema do sticky no iOS */
.sticky-element {
  touch-action: pan-y !important;
  -webkit-overflow-scrolling: touch !important;
}
```

✅ **Solução real: remova o sticky:**

```tsx
// BOM - sem sticky = sem problemas
<div>
  <ComponenteComAnimacoes />
</div>
```

### 🔍 Como Diagnosticar Problema Similar

Se você encontrar scroll travado no iOS:

1. **Procure por `position: sticky`** nos componentes da área afetada
2. **Verifique se há `overflow: hidden`** no mesmo contexto
3. **Teste removendo temporariamente o sticky** - se resolver, esse é o problema
4. **Use DevTools do Safari iOS** para inspecionar eventos de touch
5. **Não perca tempo com `touch-action`** - não resolve bugs de sticky

### 🧪 Tentativas que NÃO Funcionaram

Durante a investigação, foram testadas (sem sucesso):

1. ❌ Adicionar `touch-action: pan-y pinch-zoom` em todos elementos
2. ❌ Adicionar `-webkit-overflow-scrolling: touch`
3. ❌ Mudar `overflow: hidden` para `overflow-x: hidden`
4. ❌ Usar `clip-path` em vez de `overflow`
5. ❌ Desabilitar animações GSAP no mobile
6. ❌ Adicionar `pointer-events: none`
7. ❌ Criar regras CSS globais específicas para iOS
8. ❌ Usar `isolation: isolate` para stacking context
9. ❌ Renderizar componente diferente no mobile
10. ❌ Adicionar propriedades no `body` e `html`

**Nenhuma dessas soluções funcionou. A única solução foi remover o
`position: sticky`.**

### 📚 Referências

- CHANGELOG.md: [2025-11-06] - Correção Bug de Scroll no iOS Safari
- WebKit Bug Report: https://bugs.webkit.org/show_bug.cgi?id=179178
- Stack Overflow: "iOS Safari sticky position scroll issues"
- MDN: Position Sticky - Known Issues
- Arquivos: `components/equipment-showcase-section.tsx`

---

## Como Usar Este Documento

### Para Desenvolvedores

1. **Antes de investigar um bug**, procure aqui se já foi resolvido
2. **Ao resolver um bug novo**, documente aqui seguindo o template
3. **Mantenha atualizado** com data, causa raiz e solução completa

### Para IAs (Cursor, GitHub Copilot, etc.)

1. **Consulte este arquivo** quando usuário reportar bug
2. **Busque por palavras-chave**: "animação", "dessincronização", "flash",
   "hero"
3. **Referência `AGENTS.md`** para lembrar de consultar este arquivo
4. **Sugira soluções já validadas** antes de criar novas abordagens

### Template para Novos Problemas

```markdown
## X. [Nome do Problema]

### 🎯 Problema

**Data da Ocorrência**: [Data] **Severidade**: [Baixa/Média/Alta/Crítica]
**Status**: [🔍 Investigando / ✅ Resolvido / 🚧 Parcial]

#### Descrição

[Descrição detalhada]

#### Sintomas

- Sintoma 1
- Sintoma 2

#### Causa Raiz

[Explicação técnica da causa]

### ✅ Solução Implementada

#### Arquivos Modificados

1. arquivo1.tsx
2. arquivo2.tsx

#### Implementação

[Código e explicação]

### 🎯 Resultado

[Resultados após implementação]

### 📝 Lições Aprendidas

[Insights importantes]

### ⚠️ Armadilhas a Evitar

[O que NÃO fazer]
```

---

**Última atualização**: 05/11/2025 **Mantido por**: Equipe de Desenvolvimento GB
Locações **Versão**: 1.0.0
