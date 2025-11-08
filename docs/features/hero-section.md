# 🌅 Hero Section Layout

## 📋 Visão Geral

A seção Hero da homepage utiliza um layout em camadas com carrossel de fundo,
gradiente, indicadores e onda decorativa. Após o ajuste de novembro de 2025,
todos esses elementos passaram a respeitar o mesmo container responsivo
`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8`, garantindo alinhamento e
espaçamento idênticos às demais seções da página.

## 🧱 Estrutura Principal

| Camada                    | Descrição                                                                                       |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| `<section>`               | Wrapper externo que define o fundo principal e o padding vertical (`pb-12 md:pb-16 lg:pb-20`)   |
| `containerClasses`        | Constante reutilizada em `components/hero.tsx` com o padrão `max-w-7xl` + paddings responsivos  |
| Carousel + Gradient       | Preenchem 100% da largura da seção com wrapper `overflow-hidden` para evitar bleed nas laterais |
| Indicadores do carrossel  | 100% width (`left-0 right-0`) com alinhamento central via `flex`                                |
| Onda (`.hero-wave`)       | SVG fixado no rodapé da seção ocupando 100% da largura disponível                               |
| Conteúdo textual e imagem | Mantém grid de duas colunas com `gap-12 lg:gap-16` seguindo o design system                     |

```tsx
const containerClasses = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
```

## 🎯 Objetivos do Ajuste

- Eliminar a sensação de “padding extra” que o carrossel e a onda provocavam ao
  ultrapassar o container principal.
- Garantir alinhamento perfeito entre Hero, seções de destaque e grids de
  conteúdo (todas usam o mesmo padrão de container).
- Facilitar manutenção futura: qualquer ajuste de spacing pode ser feito uma
  única vez na constante `containerClasses`.

## 📐 Regras de Espaçamento

- **Padding horizontal**: definido exclusivamente pelo container (mobile `px-4`,
  tablet `sm:px-6`, desktop `lg:px-8`).
- **Padding vertical**: controlado na `<section>` para contemplar a altura da
  onda (`pb-12 md:pb-16 lg:pb-20`).
- **Overlap controlado**: o wrapper do carrossel usa `pointer-events-none` para
  não interferir em interações do conteúdo.
- **Rodapé uniforme**: indicadores e onda usam `absolute bottom-*` cobrindo toda
  a largura da seção, sem alterar o padding global.
- **Bleed prevenido**: wrapper `overflow-hidden` dedicado ao carrossel impede
  extrapolação das imagens quando animadas em tela cheia.

## ♿ Acessibilidade & Animações

- O `aria-roledescription="carousel"` permanece aplicado ao `<section>` apenas
  quando há imagens.
- A classe `.hero-wave` continua integrada ao `scroll-reveal-init`, mantendo a
  animação de entrada.
- Indicadores do carrossel preservam `aria-label` individuais e animações do
  Framer Motion.

## ✅ Checklist para alterações futuras

- Reutilizar `containerClasses` em qualquer nova camada da Hero.
- Evitar adicionar elementos absolutos fora do container.
- Manter o `overflow-hidden` do wrapper do SVG para impedir sombras fora da área
  útil.
- Testar o alinhamento em 320px, 768px e 1280px antes de finalizar qualquer
  ajuste.

_Atualizado em: 2025-11-08_
