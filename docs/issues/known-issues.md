# 🐛 Problemas Conhecidos e Soluções - GB Locações

> **Documento de Referência**: Problemas técnicos já enfrentados e resolvidos no
> projeto. Consulte este arquivo antes de investigar bugs similares.

---

## 📋 Índice

1. [Dessincronização de Animações Hero](#1-dessincronização-de-animações-hero)
2. [Scroll Vertical Travado no iOS Safari](#2-scroll-vertical-travado-no-ios-safari)
3. [Scroll Involuntário na Home](#3-scroll-involuntário-na-home)
4. [Flick no Category Showcase após swipe](#4-flick-no-category-showcase-após-swipe)
5. [Hover e sombras cortados no Category Showcase](#5-hover-e-sombras-cortados-no-category-showcase)
6. [Gradiente do Carrossel Sobreposto às Categorias](#6-gradiente-do-carrossel-sobreposto-às-categorias)
7. [Inputs do Dialog Lab cortados nas laterais](#7-inputs-do-dialog-lab-cortados-nas-laterais)
8. [Hydration mismatch no IconCustomization](#8-hydration-mismatch-no-iconcustomization)
9. [Como Usar Este Documento](#como-usar-este-documento)

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

**Duas mudanças necessárias:**

#### Arquivos Modificados

1. `components/equipment-showcase-section.tsx` (linha 87)
2. `components/categories.tsx` (linha 158)

#### Implementação

**1. Remover `position: sticky` da seção de equipamentos:**

```tsx
// ANTES (com bug):
;<div className="order-2 lg:order-1">
  <EquipmentInfiniteScroll className="lg:sticky lg:top-8" />
</div>

// DEPOIS (corrigido):
{
  /* Sticky removido: causava bug de scroll vertical no iOS Safari */
}
;<div className="order-2 lg:order-1">
  <EquipmentInfiniteScroll />
</div>
```

**Localização**: Linhas 86-89 em `equipment-showcase-section.tsx`

**2. Adicionar `overflow-hidden` na seção de categorias:**

```tsx
// ANTES:
<section
  id="categorias"
  ref={sectionRef}
  className="bg-gray-50 py-12 md:py-16 lg:py-20"
>

// DEPOIS (corrigido):
<section
  id="categorias"
  ref={sectionRef}
  className="bg-gray-50 py-12 md:py-16 lg:py-20 overflow-hidden"
>
```

**Localização**: Linha 158 em `components/categories.tsx`

**Por que ambas as mudanças foram necessárias:**

- Remover sticky eliminou a captura de eventos
- Adicionar `overflow-hidden` na seção seguinte preveniu que o conteúdo
  "vazasse" e criasse scroll horizontal indesejado que interferia com o scroll
  vertical

### 🎯 Resultado

- ✅ Scroll vertical funciona perfeitamente no iOS Safari
- ✅ Todas as animações GSAP continuam funcionando
- ✅ Comportamento consistente entre iOS, Android e Desktop
- ✅ `overflow-hidden` na seção de categorias previne vazamento horizontal
- ⚠️ Trade-off: Elemento não fixa mais no desktop durante scroll (comportamento
  sticky removido)

### 📝 Lições Aprendidas

1. **iOS Safari tem bug grave com `position: sticky`** quando combinado com
   `overflow: hidden` e animações
2. **Sticky + scroll horizontal = problema no iOS** - evitar essa combinação
3. **Touch events no iOS são capturados por sticky** mesmo com `touch-action`
   configurado
4. **Remover sticky NÃO foi suficiente sozinho** - precisou adicionar
   `overflow-hidden` na seção seguinte
5. **`overflow-hidden` em sections adjacentes** ajuda a isolar contextos de
   scroll e prevenir interferências
6. **Bug conhecido do WebKit**:
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

## 3. Scroll Involuntário na Home

### 🎯 Problema

**Data da Ocorrência**: 2025-11-06 **Severidade**: Média (UX impactada)
**Status**: ✅ Resolvido

#### Descrição

Ao carregar ou recarregar a página inicial (Home), a viewport deslocava alguns
pixels para baixo sem nenhuma interação do usuário. O comportamento não era
reproduzido em outras rotas.

#### Sintomas

- ❌ Scroll vertical automático assim que a Home carregava
- ❌ Layout “pulava” para baixo antes de qualquer interação
- ✅ Outras páginas permaneciam estáticas
- ✅ Reproduzido em desktop e mobile

#### Causa Raiz

O componente `TabbedCategoryGrid` centralizava a tab ativa com
`scrollIntoView({ block: 'nearest', inline: 'center' })`. Apesar de indicar
somente alinhamento horizontal, alguns navegadores ajustavam também o eixo
vertical, provocando o scroll involuntário da página inicial (única rota que usa
o componente).

> **Atualização 2025-11-07**: O componente foi substituído por
> `CategoryShowcase`, que mantém a correção e elimina a dependência do wrapper
> de tabs anterior.

### ✅ Solução Implementada

#### Arquivos Modificados

1. `components/tabbed-category-grid.tsx` (REMOVIDO)
2. `components/category-showcase.tsx`

#### Implementação

- Substituído `scrollIntoView` por lógica manual usando `element.scrollTo`
  limitada ao eixo horizontal.
- Checagem de overflow garante que o ajuste só ocorra quando realmente
  necessário (evita alterações em desktop).
- Guarda que verifica se a tab já está totalmente visível antes de ajustar o
  scroll, prevenindo movimentos desnecessários.
- Adicionada flag `hasMountedRef` para evitar animação na primeira renderização.

### 🎯 Resultado

- ✅ Home permanece fixa no topo após carregar.
- ✅ Centralização das tabs continua funcional em telas menores.
- ✅ Nenhum impacto em outras páginas ou animações.

### 📝 Lições Aprendidas

- `scrollIntoView` pode alterar o eixo vertical mesmo com `block: 'nearest'`.
- Para controlar apenas um eixo, prefira cálculos manuais com `scrollLeft` /
  `scrollTo`.

### ⚠️ Armadilhas a Evitar

- ❌ Não reutilizar `scrollIntoView` para centralizar tabs horizontais.
- ❌ Evitar animação de scroll no primeiro render (previne jank visual).
- ✅ Priorizar lógica customizada quando o deslocamento deve ser restrito a um
  único eixo.

---

## 4. Flick no Category Showcase após swipe

### 🎯 Problema

**Data da Ocorrência**: 2025-11-06 **Severidade**: Média (UX impactada)
**Status**: ✅ Resolvido

#### Descrição

No showcase de categorias (atualmente disponível em `/playground`, antigo
`/test-components`), ao concluir o gesto de swipe as novas categorias surgiam
imediatamente em estado final, sem as animações escalonadas previstas. O usuário
percebia um “piscar” rápido no instante em que soltava o dedo/mouse, porque o
grid da nova aba aparecia em opacidade plena antes que os fades individuais
começassem.

#### Como Reproduzir

1. Abrir `/playground` e iniciar um swipe horizontal nas tabs.
2. Soltar o dedo/mouse antes do overlay terminar de deslizar.
3. Observar o frame logo após o release: dois conjuntos de botões aparecem
   simultaneamente (grid novo e overlay antigo), causando flick perceptível.

#### Sintomas

- Conteúdo das tabs carregava instantaneamente assim que o swipe terminava.
- Os botões ainda executavam animações com delay após o flick, gerando efeito
  duplo (flash + fade).
- Problema ocorria apenas em navegação por swipe; clique nas tabs funcionava.

#### Causa Raiz

Durante a animação de swipe, o estado `displayedTabId` era atualizado no mesmo
frame em que o overlay concluía a transição. Isso fazia com que as animações dos
cards fossem disparadas enquanto o grid ainda estava oculto
(`swipePhase === "animating"`). Quando o container voltava para `opacity-100`,
os cards já haviam atingido `opacity: 1`, causando o flash sem fade.

### ✅ Solução Implementada

#### Arquivos Modificados

1. `components/category-showcase.tsx`

#### Implementação

- Adicionada função `clearSwipeOverlay` e ajustado `commitTabChange` para
  diferenciar cliques de swipes.
- Para swipes, o update do grid (estado `displayedTabId` + `transitionKey`)
  agora acontece apenas no próximo `requestAnimationFrame`, garantindo que o
  container volte a ser visível no mesmo frame em que os cards são montados.
- O grid permanece oculto tanto em `"animating"` quanto em `"settling"`,
  evitando que o novo conteúdo apareça antes do overlay finalizar.
- A opacidade do grid deixa de utilizar transição durante o swipe, sumindo
  imediatamente e impedindo que o usuário veja o conteúdo “por trás” dos gaps do
  overlay.

### 🎯 Resultado

- Zero flick: o grid só reaparece quando o fade-in escalonado está pronto.
- Navegação por clique mantém comportamento original.
- Overlay cobre toda a transição, mantendo continuidade visual.

#### Como Validar

1. Abrir `/playground` e repetir os swipes rápidos em ambas direções.
2. Usar DevTools → “Slow 4x” opcionalmente para inspecionar frames: nenhum card
   deve aparecer antes do fade-in.
3. Confirmar que `swipePhase` retorna para `"idle"` enquanto o grid volta para
   `opacity-100` sem conteúdos duplicados.

### 📝 Lições Aprendidas

- Ao combinar overlay + grid animado, sincronize montagem dos itens com o frame
  em que o container volta a ser visível.
- Usar `requestAnimationFrame` é uma forma simples de alinhar estados visuais
  quando não há timeline compartilhada.

### ⚠️ Armadilhas a Evitar

- ❌ Não atualizar `displayedTabId` imediatamente em animações baseadas em
  overlay.
- ❌ Não limpar o overlay antes do grid estar pronto; isso expõe o frame sem
  animação.

---

## 5. Hover e sombras cortados no Category Showcase

### 🎯 Problema

**Data da Ocorrência**: 2025-11-06 **Severidade**: Baixa/Média (perda de
polimento visual) **Status**: ✅ Resolvido

#### Descrição

Os botões do showcase do CategoryShowcase eram renderizados dentro de um
container com `overflow-hidden`. Quando o usuário fazia hover (ou focus) os
cards cresciam `hover:-translate-y-1` e aplicavam sombra. Porém, as bordas do
container cortavam tanto o deslocamento quanto o blur, deixando o efeito com
aparência truncada — principalmente nas colunas externas.

#### Sintomas

- Hover/active não exibiam sombra completa nos cards laterais.
- Bordas superiores/inferiores também “cortavam” o movimento vertical dos
  botões.
- Mais perceptível em `Fases da obra`, quando os cartões têm sombra azul.

#### Causa Raiz

O wrapper que também controla o swipe overlay precisava de `overflow-hidden`
para evitar que o overlay animado escapasse visualmente. O grid principal,
entretanto, não precisava dessa restrição. Cada hover é executado dentro do grid
base, então bastava isolar o `overflow-hidden` apenas no overlay.

### ✅ Solução Implementada

#### Arquivos Modificados

1. `components/category-showcase.tsx`

#### Implementação

- Removido `overflow-hidden` do wrapper do grid.
- Overlay passou a ficar dentro de um container absoluto (`pointer-events-none`)
  dedicado, com `overflow-hidden` apenas para ele.
- Componentes reais permanecem com `overflow-visible`, liberando animações de
  hover/sombra.

### 🎯 Resultado

- Sombras e deslocamentos funcionam totalmente, inclusive nas extremidades.
- Overlay continua limitado ao container durante o swipe, sem vazar para fora.

### 📝 Lições Aprendidas

- Ao precisar de `overflow-hidden` por causa de animações temporárias, isole a
  restrição no elemento animado em vez de aplicá-la ao container que contém o
  conteúdo interativo.

### ⚠️ Armadilhas a Evitar

- ❌ Aplicar `overflow-hidden` diretamente no grid principal; isso corta hovers.
- ✅ Manter overlays auxiliares em wrappers dedicados com clipping específico.

---

## 6. Gradiente do Carrossel Sobreposto às Categorias

### 🎯 Problema

**Data da Ocorrência**: 2025-11-07 **Severidade**: Média (impacto visual claro)
**Status**: ✅ Resolvido

#### Descrição

O gradiente de fade do `EquipmentInfiniteScroll` (coluna esquerda da seção
`EquipmentShowcaseSection`) avançava sobre o grid de categorias na coluna
direita. Os botões das tabs e das categorias ficavam visivelmente desbotados, já
que o overlay com `z-index: 10` era renderizado acima deles.

#### Sintomas

- ❌ Aba ativa e cards das categorias apareciam esbranquiçados na borda esquerda
  da coluna direita
- ❌ Hover/focus dos botões ficava encoberto pelo gradiente
- ✅ Overlay funcionava normalmente sobre os cards do carrossel

#### Causa Raiz

O wrapper do carrossel não criava um contexto próprio de empilhamento, então o
overlay com `z-10` competia diretamente com os elementos da coluna vizinha. Como
o grid de categorias não possuía `z-index` definido, o gradiente vencia a
disputa e ficava “por cima” dos botões, mesmo estando em outra coluna do grid.

### ✅ Solução Implementada

#### Arquivos Modificados

1. `components/equipment-infinite-scroll.tsx`
2. `components/equipment-showcase-section.tsx`

#### Implementação

- Adicionado `z-0` ao container relativo do carrossel para criar stacking
  context isolado para os overlays do fade.
- Coluna das categorias passou a ser `relative z-20`, garantindo que tabs e
  cards fiquem sempre acima de elementos adjacentes.
- Mantido `pointer-events-none` nos overlays para preservar acessibilidade e
  interação do carrossel.

### 🎯 Resultado

- ✅ Gradiente permanece limitado ao carrossel, sem interferir no grid de
  categorias.
- ✅ Hover e foco dos botões voltam a ser exibidos com cores originais.
- ✅ Layout mantém o efeito de fade lateral desejado no carrossel.

### 📝 Lições Aprendidas

- Sempre que um overlay precisar de `z-index` elevado, isole o stacking context
  do componente para evitar interferência em colunas irmãs.
- Ajustar o `z-index` da coluna vizinha é uma solução rápida quando os elementos
  precisam permanecer acima visualmente.

### ⚠️ Armadilhas a Evitar

- ❌ Deixar overlays globais sem stacking context próprio em layouts de
  múltiplas colunas.
- ❌ Depender apenas de `pointer-events: none` quando o problema é ordem de
  empilhamento.

## 7. Inputs do Dialog Lab cortados nas laterais

### 🐛 Problema

**Data da Ocorrência**: 2025-11-09 **Severidade**: Média (UX interna)
**Status**: ✅ Resolvido

#### Descrição

As seções do fluxo "Criar/Editar Categoria" no Dialog Lab utilizam elementos
`<section>`, mas o estilo global definido em `app/globals.css` aplica
`overflow-x: hidden` para todas as seções do site. Dentro do dialog Base UI,
isso fazia os campos "Nome da Categoria" e "Descrição" perderem parte das bordas
e dos focus rings nas laterais, causando aparência de conteúdo cortado.

#### Sintomas

- Inputs e textarea aparentando estar "aparados" nas bordas laterais do popup.
- Estados de foco/hover não exibiam sombras completas em resoluções menores.

#### Causa Raiz

O CSS global (`section, .container { overflow-x: hidden; }`) é útil nas páginas
públicas para evitar scroll horizontal, mas dentro de uma modal esse overflow
impede que componentes com `box-shadow`/`outline` maiores que o container
renderizem totalmente.

### ✅ Solução Implementada

#### Arquivos Modificados

1. `app/playground/page.tsx`

#### Implementação

- Criado helper `DIALOG_FORM_SECTION` adicionando `overflow-visible` às seções
  do formulário.
- A seção que envolve inputs e textarea passou a usar o helper, sobrescrevendo o
  estilo global e liberando os focus rings dos campos.

### 🧪 Resultado

- Inputs, textarea e contêineres internos exibem suas bordas completas, sem
  cortes laterais.
- O layout segue alinhado com o restante do dialog, inclusive em nested dialogs.

### 🧠 Lições Aprendidas

- Sempre revisar utilitários globais aplicados a tags semânticas antes de
  reutilizá-las em modais/overlays.
- Dialogs Base UI precisam declarar explicitamente `overflow-visible` quando
  dependem de sombras externas ou animações de scale.

### 🚫 Armadilhas a Evitar

- Criar novas seções em dialogs sem sobrescrever `overflow-x: hidden` do
  stylesheet global.
- Confiar apenas em remover `overflow-hidden` de ancestrais; elementos sem
  override continuam herdando o corte.

---

## 8. Hydration mismatch no IconCustomization

### 🐛 Problema

**Data da Ocorrência**: 2025-11-13 **Severidade**: Alta (quebra UX) **Status**:
✅ Resolvido

#### Descrição

Ao acessar `/playground/icon-customization`, o console do navegador exibia:

> `Hydration failed because the server rendered text didn't match the client.`

No HTML SSR, a primeira seção da biblioteca de ícones era "Construção &
Ferramentas" (`🛠️`), mas logo após a hidratação o cliente substituía a seção por
"Recentes" (`🕒`). O React detectava a divergência e forçava a re-renderização
do bloco, quebrando animações e causando flick na navegação.

#### Causa Raiz

- `useIconRecents` lia `localStorage` durante a renderização inicial.
- No SSR, a lista de recentes era vazia; no cliente, era preenchida
  imediatamente.
- A ordem das seções mudava entre SSR e CSR, disparando o erro de hidratação.

#### Solução Implementada

1. `useIconRecents` (e o novo `useEmojiRecents`) passaram a iniciar estado
   vazio.
2. Os dados persistidos são carregados somente após o `mount` (`useEffect`),
   garantindo HTML idêntico no SSR e no cliente.
3. A lista de recentes agora só é exibida quando existe histórico real.

#### Arquivos Modificados

- `hooks/use-icon-recents.ts`
- `hooks/use-emoji-recents.ts`
- `components/dialogs/icon-customization-data.ts`
- `app/playground/icon-customization/page.tsx`
- `components/dialogs/category-dialog.tsx`

#### Como Validar

```bash
pnpm dev
# Abrir http://localhost:3000/playground/icon-customization
# Verificar console: nenhum hydration mismatch deve aparecer
```

#### Lições Aprendidas

- Evite ler `localStorage` (ou `window`) durante o SSR.
- Sempre garanta que dados "recentes" tenham fallback determinístico no SSR.
- Prefira carregar preferências do usuário após o `mount` quando a UI depende de
  browser APIs.

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

## 7. Flick no preview do Category Showcase no Dialog Lab

### 🧠 Problema

**Data da Ocorrência**: 2025-11-09 **Severidade**: Média (demonstração
inconsistente) **Status**: ✅ Resolvido

#### Descrição

O preview exibido dentro do fluxo "Criar/Editar Categoria" (`app/playground`)
usava um componente ad-hoc (`MiniCategoryShowcase`). As animações de swipe/fade
eram implementadas de forma diferente do `CategoryShowcase` real, o que fazia o
bloco "piscar" (overlay encerrava e, logo em seguida, o card único ainda
executava um fade-out). O resultado não representava as animações da homepage e
induzia teste errado dentro do Dialog Lab.

#### Como Reproduzir

1. Abrir `/playground`.
2. Acionar o botão "Nova Categoria" ou "Editar Categoria".
3. Alternar entre as tabs do preview ou realizar um swipe rápido.
4. Observar o flash antes do novo card aparecer.

#### Sintomas

- Card do preview fica invisível por um frame entre cada troca.
- Swipe overlay não cobre toda a animação (overlay some antes do novo conteúdo).
- Tabs do dialog exibem comportamento diferente da home.

#### Causa Raiz

- O componente prévio recriava manualmente as animações, sem `displayedTabId` e
  sem distinguir cliques de swipes.
- A lógica de overlay era simplificada e o grid voltava a ficar visível antes do
  fade-in iniciar, causando o flick conhecido.
- Dataset reduzido (1 card) impedia validar o grid real.

### ✅ Solução Implementada

#### Arquivos Modificados

1. `app/playground/page.tsx`
2. `docs/features/category-showcase-shell.md`

#### Implementação

- Substituído `MiniCategoryShowcase` pelo próprio `CategoryShowcase`, mantendo
  as animações oficiais e criando tabs com um único item (a própria categoria em
  edição) para que o bloco funcione como preview fiel do botão.
- Preview agora apenas injeta a cor/ícone selecionados (sem recriar animações
  duplicadas).
- Documentação do shell atualizada para registrar a mudança.

### 📈 Resultado

- Preview do dialog replica 100% das animações (fade + swipe + overlay).
- Nenhum "piscar" ao trocar tabs ou ao fazer swipe rápido.
- O botão exibido no dialog é exatamente o mesmo que aparece na home (mesmo
  ícone, cores e comportamento), atendendo ao objetivo de servir como preview
  único.

#### Como Validar

1. Abrir `/playground` e abrir qualquer dialog de categoria.
2. Alternar tabs rapidamente e realizar swipes em dispositivos touch / trackpad.
3. Confirmar que não há flash em branco entre overlay e novo grid.

### 🧠 Lições Aprendidas

- Pré-visualizações devem reutilizar exatamente o mesmo componente para evitar
  divergências difíceis de rastrear.
- Overlay + grid precisam compartilhar o mesmo lifecycle; duplicar animações
  aumenta o risco de perda de sincronismo.

### ⚠️ Armadilhas a Evitar

- ⚠️ Recriar versões "mini" de componentes complexos apenas para previews.
- ⚠️ Desacoplar dataset/testes do componente original sem documentar o motivo.

---

## 8. Loop de estado no Dialog Lab (Maximum update depth)

### 🎯 Problema

**Data da Ocorrência**: 2025-11-09 **Severidade**: Alta (bloqueia playground)
**Status**: ✅ Resolvido

#### Descrição

Ao abrir qualquer dialog dentro de `/playground` (especialmente o fluxo "Nova
Categoria"), o navegador exibia o erro `Maximum update depth exceeded` e o
componente travava antes de renderizar. A exceção acontecia logo após o
montagem, impedindo a validação dos nested dialogs documentados em
`docs/features/dialog-lab.md`.

#### Sintomas

- Erro imediato no console apontando para `CategoryDialogDemo` (linha 1173).
- Turbopack reiniciando constantemente enquanto `/playground` estava aberto.
- Scroll global permanecia travado por conta da tentativa de abrir a dialog.

#### Causa Raiz

- O callback `handleStateChange` definido em `PlaygroundPage` era recriado a
  cada renderização.
- Todos os dialogs chamavam `onStateChange` dentro de um `useEffect` com a
  dependência `[open, onStateChange]`.
- Como a referência mudava a cada render, os efeitos disparavam continuamente,
  cada um executando `setDialogStates`. Em Next.js 16 (React 19 + Strict + dev
  loops do Turbopack), essa sequência nunca estabilizava, resultando no limite
  de atualizações excedido.

### ✅ Solução Implementada

#### Arquivos Modificados

1. `app/playground/page.tsx`

#### Implementação

- `handleStateChange` agora é memoizado via `useCallback`, garantindo que o
  valor só mude quando realmente dependente (`setDialogStates`) se alterar (o
  que não acontece).
- Os efeitos dos dialogs passaram a reagir apenas a mudanças reais do `open`,
  impedindo que `setDialogStates` seja chamado em loop.

### 📈 Resultado

- `/playground` abre sem erros em Next.js 16 + Turbopack.
- Nested dialogs (Category / Design / Notifications) podem ser abertos e
  fechados repetidamente sem travar o scroll global.

#### Como Validar

1. `pnpm dev`
2. Navegar até `http://localhost:3000/playground`.
3. Clicar em "Nova Categoria" e "Editar Categoria" várias vezes.
4. Confirmar que não há erros `Maximum update depth exceeded` no console.

### 🧠 Lições Aprendidas

- Callbacks passados para efeitos em cascata devem ser memoizados para evitar
  disparos desnecessários.
- Em ambientes com Strict Mode duplicado (React 19 + Turbopack), loops que antes
  estabilizavam podem falhar rapidamente.

### ⚠️ Armadilhas a Evitar

- Evitar passar funções inline para props consumidas em `useEffect`.
- Não sincronizar bloqueio de scroll baseado em efeitos que disparam em todo
  render sem uma guarda clara.

---

## 9. Backdrop incompleto e scroll liberado no Dialog Lab

### 🎯 Problema

**Data da Ocorrência**: 2025-11-17 **Severidade**: Média (Impacta playground)
**Status**: ✅ Resolvido

#### Descrição

Ao abrir a dialog "Nova Categoria" em `/playground`, o backdrop preto exibido
pela Base UI não cobria toda a viewport e a página continuava rolando ao fundo,
quebrando o padrão descrito em `docs/features/dialog-lab.md`.

#### Sintomas

- Header e footer permaneciam visíveis fora da área escurecida.
- O usuário conseguia usar a roda do mouse ou o touch para mover a página atrás
  da dialog aberta.
- No DevTools, `html` e `body` apareciam com `overflow-hidden`, mas nada mudava
  no layout.

#### Causa Raiz

- As classes padrão do backdrop incluíam
  `supports-[-webkit-touch-callout:none]:absolute`. Em navegadores iOS (que
  suportam a propriedade), isso substituía `position: fixed` por `absolute`,
  fazendo o overlay rolar junto com a página e expondo o fundo.
- `app/globals.css` define `html { overflow-y: auto !important; }` e
  `body.min-h-screen { overflow: visible !important; }`. A classe
  `.overflow-hidden` adicionada dinamicamente não tinha especificidade
  suficiente para vencer essas regras, mantendo o scroll global liberado.

### ✅ Solução Implementada

#### Arquivos Modificados

1. `components/ui/dialog.tsx`
2. `app/globals.css`

#### Implementação

- Removido o modificador `supports-[-webkit-touch-callout:none]:absolute` de
  `BACKDROP_BASE_CLASSES`, garantindo que o backdrop permaneça `fixed` mesmo no
  Safari/iOS.
- Adicionadas regras específicas `html.overflow-hidden` e `body.overflow-hidden`
  logo após o helper global, forçando `overflow: hidden !important` (além de
  `overscroll-behavior: contain`) sempre que a classe for aplicada.
- Mantidos os utilitários existentes de `min-h-screen`, apenas garantindo que a
  trava de scroll tenha prioridade maior do que os resets globais.

### 🎯 Resultado

- O backdrop cobre 100% da viewport independentemente do tamanho da página.
- Não é mais possível rolar o conteúdo de fundo enquanto qualquer dialog do
  playground estiver aberta; somente o conteúdo interno do modal pode scrollar.
- Comportamento consistente para dialogs aninhadas (`DesignDialog`,
  `IconCustomizationBlock`) e para o fluxo "Editar Categoria".

#### Como Validar

1. `pnpm dev`
2. Acessar `http://localhost:3000/playground`.
3. Abrir "Nova Categoria" ou "Editar Categoria".
4. Tentar rolar a página fora do modal — nada acontece; apenas o conteúdo do
   dialog responde ao scroll.

### 📝 Lições Aprendidas

- Regras globais com `!important` devem considerar a especificidade das classes
  utilitárias aplicadas dinamicamente.
- Bloquear o scroll global exige tratar explicitamente `html` e `body` quando
  esses elementos recebem helpers como `min-h-screen`.

### ⚠️ Armadilhas a Evitar

- Definir `overflow: visible !important` em helpers globais sem prever exceções
  para dialogs/modal.
- Confiar apenas na ordem de declaração dos seletores quando envolvem níveis de
  especificidade diferentes.
- Usar modificadores condicionais que alterem `position: fixed` do backdrop sem
  validar o comportamento em navegadores mobile.

## 10. Rotação do equipamento 3D travando durante a troca do carrossel principal

### 🎯 Problema

**Data da Ocorrência**: 2025-11-19 **Severidade**: Média (experiência visual)

#### Descrição

O `Equipment3DCarousel` exibido no hero estava travando a rotação automática
sempre que o carrossel principal de imagens trocava o slide. Durante a transição
do background, o componente 3D congelava por 1–2 segundos e só retomava o
movimento após a nova imagem estabilizar, transmitindo a sensação de gargalo.

#### Sintomas

- A rotação do objeto 3D pausa exatamente no momento em que o background troca.
- Ao trocar manualmente de modelo 3D, a animação volta, mas volta a travar no
  próximo ciclo do carrossel do hero.
- O comportamento independe do navegador e ocorre mesmo com FPS alto.

#### Causa Raiz

- `components/hero.tsx` armazenava `currentImage` no mesmo componente que
  renderiza o `Equipment3DCarousel`. A cada 5s todo o hero era re-renderizado,
  forçando o `Canvas` do `react-three/fiber` a resincronizar o loop enquanto o
  Framer Motion animava a troca de imagem.
- O array de modelos era recriado inline a cada render e o carrossel não era
  memoizado, o que disparava novos cálculos de bounds/lights em cada ciclo.

### ✅ Solução Implementada

1. Extraímos o carrossel de imagens/bolinhas para um componente dedicado
   (`HeroBackgroundCarousel`), isolando o estado de `currentImage` para que o
   hero e o `ModelViewer` não sejam re-renderizados a cada 5 segundos.
2. Promovemos os modelos padrões do hero para `HERO_EQUIPMENT_MODELS`, evitando
   criar novos objetos em toda renderização.
3. O `Equipment3DCarousel` passou a ser exportado memoizado (`React.memo`),
   garantindo que mudanças no hero não reflitam em re-renderizações do canvas.

### 📈 Resultado

- As transições do carrossel principal não afetam mais o loop de rotação.
- Os modelos 3D continuam suaves enquanto o background troca ou enquanto as dots
  são clicadas.
- Redução perceptível de jank na hero section.

### 🔍 Como Validar

1. `pnpm dev`
2. Acesse `http://localhost:3000/`.
3. Observe a rotação automática do equipamento por dois ciclos completos do
   carrossel principal; não deve haver travamentos.
4. Clique nas dots do carrossel e verifique que o `ModelViewer` mantém a rotação
   durante o fade.

### ⚠️ Armadilhas a Evitar

- Reintroduzir estado global do carrossel dentro do hero principal.
- Criar arrays inline ao passar `models` para o `Equipment3DCarousel`.
- Desabilitar o memo do carrossel, o que voltaria a sincronizar renders com o
  background.

## 11. Altura do componente 3D destoando no mobile

### 🎯 Problema

**Data da Ocorrência**: 2025-11-19 **Severidade**: Baixa (UX visual)

#### Descrição

Após substituir a imagem estática (`Image` 500x500 apontando para
`/equipment-static.jpg`) por um carrossel 3D, o bloco no hero ficou
excessivamente alto no mobile, lembrando um retângulo vertical desconfortável
comparado ao quadrado original.

#### Sintomas

- No desktop o layout permanecia correto, mas em telas < 640px o bloco passava
  de 430px de altura.
- A comparação com o ambiente de produção mostrava a imagem antiga ocupando
  ~311px de altura dentro do mockup.

#### Causa Raiz

- O `Equipment3DCarousel` recebe um `height={500}` fixo e não respeitava o
  contexto responsivo, mantendo 500px em qualquer breakpoint.

- ### ✅ Solução Implementada

- O contêiner do hero passou a usar classes responsivas
  `h-[320px] sm:h-[360px] md:h-[544px]` (com `lg`/`xl` herdando 544px),
  preservando o tamanho desktop e aproximando o mobile do quadrado anterior.
- O carrossel passa agora `height="100%"`, preenchendo apenas a altura do
  wrapper, permitindo futuros ajustes via CSS utilitário.

### 📈 Resultado

- Em telas pequenas o bloco ocupa ~320px (vizinho aos 311px da imagem antiga).
- A partir de 768px o bloco volta a 544px, espelhando o asset estático antigo.

### 🔍 Como Validar

1. `pnpm dev`
2. Ajuste o viewport do navegador para 360px ou use o emulador mobile.
3. Confirme que o bloco 3D continua centralizado mas agora quadrado e alinhado à
   altura original.

### ⚠️ Armadilhas a Evitar

- Reintroduzir alturas inline fixas em pixels sem breakpoints.
- Remover as classes responsivas do wrapper ao ajustar animações futuras.

## 12. Indicadores do carrossel do hero escondidos atrás da onda

### 🎯 Problema

**Data da Ocorrência**: 2025-11-19 **Severidade**: Baixa (navegação visual)

#### Descrição

Os dots do carrossel principal (`div.flex.justify-center.space-x-3`) foram
movidos para dentro do componente `HeroBackgroundCarousel`, deixando de fazer
parte da coluna do hero. Como a `div` do background não compartilha o mesmo
contexto que o card 3D, os indicadores passaram a ficar depois das ondas, dando
impressão de que estavam "perdidos" no final da página.

#### Sintomas

- Em desktop, os dots surgiam dentro da área branca das ondas.
- Em mobile, os dots ficavam praticamente invisíveis, prejudicando a navegação
  manual do carrossel.

#### Causa Raiz

- Os dots estavam ancorados em um container externo ao hero principal, herdando
  o posicionamento das ondas em vez do wrapper do carrossel 3D.

### ✅ Solução Implementada

- Extraímos os dots do `HeroBackgroundCarousel` e os inserimos novamente dentro
  da `div` principal do hero, mantendo `bottom-0 left-1/2 -translate-x-1/2`
  exatamente como na versão em produção (`components/hero.tsx`).
- O estado `currentImage` voltou a ser controlado pelo componente `Hero`,
  garantindo que background e indicadores compartilhem a mesma fonte da verdade.

### 📈 Resultado

- Os dots agora permanecem alinhados ao card 3D, sem fugir para a área das
  ondas.
- O comportamento é idêntico ao ambiente em produção, tanto em mobile quanto em
  desktop.

### 🔍 Como Validar

1. `pnpm dev`
2. Visite `/` e role até o hero.
3. Verifique que os dots estão visíveis logo abaixo do 3D carousel tanto em
   mobile quanto desktop (não ficam escondidos pela onda).

### ⚠️ Armadilhas a Evitar

- Recolocar os indicadores dentro de `HeroBackgroundCarousel` ou criar novos
  estados locais que desincronizem a navegação.

## 13. Modelos 3D não rotacionam em dispositivos touch

### 🎯 Problema

**Data da Ocorrência**: 2025-11-19 **Severidade**: Baixa (UX visual)

#### Descrição

No iPhone (Safari) e em outros dispositivos com tela touch, os modelos GLB não
executavam a rotação automática ao carregar o hero. A animação só acontecia em
desktops.

#### Sintomas

- Em celulares, o objeto 3D permanecia estático mesmo após aguardar alguns
  segundos.
- Ao abrir a mesma página no desktop, a rotação automática funcionava como
  esperado.

#### Causa Raiz

- `components/ui/model-viewer.tsx` desabilitava `OrbitControls.autoRotate`
  quando `ontouchstart` estava disponível (`isTouch ? false : autoRotate`) para
  evitar conflitos em devices móveis.
- Com isso, toda a camada de auto rotação era desligada em iOS/Android.

### ✅ Solução Implementada

- Removemos o guard `isTouch ? false : autoRotate`, permitindo que a rotação
  automática ocorra independentemente do tipo de dispositivo.

### 📈 Resultado

- Os modelos retomam a rotação suave tanto no Safari/iOS quanto em navegadores
  desktop.
- Usuários mobile voltam a perceber que o cartão é interativo sem depender de
  gestos.

### 🔍 Como Validar

1. `pnpm dev`
2. Abrir `http://localhost:3000` em um dispositivo touch (ou no emulador de
   iPhone/Safari).
3. Verificar que o modelo inicia a rotação automática após o carregamento.

### ⚠️ Armadilhas a Evitar

- Reintroduzir lógica condicional ligada a `ontouchstart`/`maxTouchPoints` sem
  oferecer fallback.
- Esquecer de ajustar `frameloop` caso futuras alterações dependam de estados
  específicos.

---
