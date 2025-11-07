# Category Showcase Shell

## Status Atual

> **Nov 2025**: O sandbox `/test-components` foi removido. Os testes visuais do
> `CategoryShowcase` agora acontecem diretamente em `app/playground/page.tsx`,
> que reutiliza o mesmo dataset e animações da homepage.

Este documento é mantido apenas como referência histórica do shell criado para
prototipagem. Caso você precise reativar um ambiente dedicado, use o playground
como base ou crie uma rota temporária seguindo as diretrizes abaixo.

## Objetivo Original

- Facilitar prototipagem de comportamento de abas sem depender do componente em
  produção.
- Permitir testes rápidos de conteúdo e micro-interações antes de consolidar no
  design system.
- Oferecer um playground isolado para validar nomenclaturas e agrupamentos de
  categorias.

## Estrutura Recomendada (se recriado)

- **Guia de abas**: `role="tablist"`, estados ativos visuais e suporte a
  teclado.
- **Grid responsivo**: 10 itens por sessão, distribuídos em `grid-cols-2` →
  `md:grid-cols-4` → `lg:grid-cols-5`.
- **Botões mock**: labels específicos por sessão com ícones customizados.

## Comportamento Esperado

- **Categorias**: replica as categorias públicas principais (andaimes,
  compactação etc.).
- **Fases da obra**: apresenta etapas simuladas do ciclo construtivo (pré-obra,
  fundação, acabamento...).
- **Tipo de trabalho**: lista tipos de atividade para validar combinações
  alternativas (demolição, limpeza pós-obra, energia temporária...).
- **Animações**: manter fade/slide por botão e suporte a swipe com overlay.

## Localização Atual

- Página playground oficial: `app/playground/page.tsx`
- Componentização central: `components/category-showcase.tsx`

Para ajustes locais, trabalhe diretamente com esses arquivos. Caso um sandbox
adicional seja necessário, duplique a configuração do playground e documente a
nova rota em `CHANGELOG.md` + `docs/features/`.

## Customização

- Ajuste o array `tabs` para alterar rótulos, itens mock ou ícones.
- As classes Tailwind presentes no componente principal servem como referência
  de cores, gradientes e espaçamentos.

## Acessibilidade

- Abas com `role="tab"`, `aria-controls` e `aria-selected` garantem navegação
  por teclado.
- Ícones permanecem decorativos (`aria-hidden="true"`).
- Botões podem utilizar `focus-visible` conforme padrão do design system.

## Próximos Passos

- Validar interações junto ao time de design utilizando o playground oficial.
- Caso o shell precise retornar, reutilize o componente `CategoryShowcase` para
  evitar divergências de comportamento.

**Última atualização:** 2025-11-07
