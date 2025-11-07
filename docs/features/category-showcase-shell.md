# Category Showcase Shell

## Visão geral

Componente interativo criado para experimentos dentro de `/test-components`. Ele
reproduz o layout público de categorias, mas agora oferece abas funcionais e um
conjunto de botões mock específicos para cada sessão.

## Objetivo

- Facilitar prototipagem de comportamento de abas sem depender do
  `TabbedCategoryGrid` original.
- Permitir testes rápidos de conteúdo e micro-interações antes da migração para
  o design system oficial.
- Fornecer um playground isolado para validar cópias e agrupamentos de
  categorias.

## Estrutura

- **Guia de abas**: `role="tablist"`, estados ativos visuais e suporte a
  teclado.
- **Grid responsivo**: 10 itens por sessão, distribuídos em `grid-cols-2` →
  `md:grid-cols-4` → `lg:grid-cols-5`.
- **Botões mock**: cada sessão exibe rótulos distintos com ícones do
  `lucide-react`, permitindo avaliar nomenclaturas e agrupamentos.

## Comportamento

- **Categorias**: replica as categorias públicas principais (andaimes,
  compactação etc.).
- **Fases da obra**: apresenta etapas simuladas do ciclo construtivo (pré-obra,
  fundação, acabamento...).
- **Tipo de trabalho**: lista tipos de atividade para validar combinações
  alternativas (demolição, limpeza pós-obra, energia temporária...).
- **Animações duplas**: cliques nas abas mantêm a animação original de
  fade/slide por botão, enquanto gestos de swipe movem o painel inteiro e exibem
  somente a animação de entrada da nova sessão (sem reaparecimento dos botões
  antigos).

## Localização

- Página sandbox: `app/test-components/page.tsx`
- Rota espelho: `app/test-components/category-showcase/page.tsx` (reexporta a
  mesma página para manter URLs históricas)

## Como usar

O componente `CategoryShowcase` agora vive dentro da própria página sandbox.
Para reutilizar em outro contexto, duplique o trecho dentro de
`app/test-components/page.tsx` ou extraia-o para um componente dedicado conforme
necessário.

```tsx
export default function TestComponentsPage() {
  return (
    <div className="min-h-screen bg-slate-100 py-12 md:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* CategoryShowcase definido neste arquivo */}
        <CategoryShowcase />
      </div>
    </div>
  )
}
```

> O componente continua sem props. Para testes adicionais, ajuste os arrays
> internos de cada aba conforme necessário.

## Customização

- Atualize `TAB_SECTIONS` para alterar rótulos, itens mock ou ícones.
- Ajuste `ACCENT_STYLES` para modificar gradientes, shadows e cores de foco.
- Utilize as classes utilitárias existentes como referência para manter
  consistência com o design system.

## Acessibilidade

- Abas com `role="tab"`, `aria-controls` e `aria-selected` garantem navegação
  compatível com teclado.
- Ícones permanecem decorativos (`aria-hidden="true"`).
- Botões recebem `focus-visible:ring` com cores alinhadas ao padrão GB, evitando
  o focus azul padrão.

## Próximos passos sugeridos

- Validar essas interações com o time de design antes de migrar comportamento
  similar para produção.
- Avaliar se alguma das combinações mock deve ser promovida ao
  `TabbedCategoryGrid`.

**Última atualização:** 2025-11-06
