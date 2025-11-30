# Scroll Stack

## Visao geral

O `ScrollStack` cria o efeito de cartoes que se sobrepoem enquanto o usuario
rola a pagina. As transformacoes sao calculadas a partir de medidas estaveis
(offsetTop) do layout, evitando flickers quando os cartoes recebem `transform`
ou `filter`.

- Componente: `components/ui/scroll-stack.tsx`
- Cartao base: `ScrollStackItem`
- Caso de referencia: `app/playground/page.tsx`

## Como funciona

- O scroll eh lido pelo container configurado (janela ou scroller interno).
- Cada cartao calcula `translateY` e `scale` com base no `stackPosition` e na
  distancia de empilhamento (`itemStackDistance`), mantendo o efeito nested.
- As medidas usam apenas offsets do layout (nao `getBoundingClientRect`),
  evitando reposicionamento quando o transform muda.
- Eventos de scroll e resize sao desacoplados por `requestAnimationFrame` para
  manter a animacao fluida.

## Props principais

- `itemDistance`: espaco em px entre cartoes na pilha base.
- `itemScale`: incremento de escala por cartao (efeito sutil de profundidade).
- `itemStackDistance`: deslocamento extra aplicado ao empilhar para manter o
  nested.
- `stackPosition`: posicao (px ou %) onde o cartao fixa na viewport.
- `scaleEndPosition`: ponto (px ou %) onde o scale chega no valor final.
- `baseScale`: escala inicial do primeiro cartao.
- `rotationAmount`: rotacao incremental opcional por cartao.
- `blurAmount`: blur incremental opcional para cartas que ficam atras.
- `useWindowScroll`: usa o scroll global (true) ou um scroller interno (false).
- `onStackComplete`: callback disparado quando o ultimo cartao permanece visivel
  no pin.

## Padrao de layout recomendado

- Use um wrapper com `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- Mantenha o titulo em uma coluna fixa para a secao, ex.:
  `md:sticky md:top-24 lg:top-28` com fundo semitransparente
  (`bg-gray-900/70 backdrop-blur-sm`) para nao sobrepor o header global.
- Cards ficam em outra coluna (`lg:col-span-2`) usando `ScrollStackItem` para
  preservar padding, radius e sombras.

```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
  <div className="lg:col-span-1">
    <div className="md:sticky md:top-24 lg:top-28 bg-gray-900/70 p-6 md:p-8 rounded-3xl border border-white/5">
      {/* titulo + helpers */}
    </div>
  </div>
  <div className="lg:col-span-2">
    <ScrollStack
      stackPosition="25%"
      scaleEndPosition="15%"
      itemStackDistance={25}
    >
      {items.map((item, index) => (
        <ScrollStackItem
          key={item.title}
          itemClassName="bg-gradient-to-br from-gray-800/95 to-gray-900/98 border border-gray-700/50"
        >
          {/* conteudo do cartao */}
        </ScrollStackItem>
      ))}
    </ScrollStack>
  </div>
</div>
```

## Boas praticas

- Garanta que todos os cartoes estejam dentro do mesmo contenedor com a classe
  `scroll-stack-card` (o componente ja atribui automaticamente via
  `ScrollStackItem`).
- Evite aplicar `transform` no wrapper externo do stack; as medidas sao
  relativas ao layout base.
- Mantenha `itemStackDistance > 0` para o nested ficar visivel. Valores entre 20
  e 30px funcionam bem com `stackPosition` em ~25%.
- Para evitar interferencia com outros stacks, o componente busca os cartoes
  apenas dentro do seu proprio wrapper (`ref`), mesmo usando `useWindowScroll`.

## Solucao de problemas

- **Flicker ou jump**: confira se o wrapper nao recebe `position: fixed` ou
  transformacoes; o stack usa offsets do layout e fica instavel se o contenedor
  for transformado. A ordem agora usa offsets absolutos, eliminando o efeito de
  reposicionamento do `getBoundingClientRect`.
- **Titulo sobrepondo header**: aplique o padrao sticky com `top` alinhado ao
  header (ex.: `md:top-24`) e mantenha `bg-*-70` + `backdrop-blur-sm` para
  isolar a camada.
- **Stack liberando cedo**: ajuste o `stackPosition`/`scaleEndPosition` e
  certifique-se de que o padding inferior (`pb`) do stack seja grande o
  suficiente para o ultimo pin soltar (o padrao `pb-[40rem]` cobre os casos do
  playground).
