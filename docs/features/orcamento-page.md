# Pagina de Orcamento (/orcamento) - Documentacao

## 1. Proposito

Pagina publica onde o cliente revisa o carrinho, informa dados de contato e
endereco, escolhe modalidade de entrega/retirada, avalia opcoes de frete e envia
o orcamento para `/api/quotes`. Mantem os preços sincronizados com o catalogo e
exibe resumo final (itens + frete).

## 2. Logica de Funcionamento

1. Itens do carrinho vem de `useCartStore` e sao exibidos com quantidade, datas
   e precos inteligentes (`calculateIntelligentPrice` / `getPricingConfig`).
2. Quando um item nao possui `startDate`/`endDate`, a pagina calcula e exibe um
   periodo estimado a partir da data da solicitacao, respeitando
   `includeWeekends` (se false, inicia no proximo dia util e conta apenas dias
   uteis).
3. Quando um item possui `startDate` e o usuario ajusta `days`, o `endDate` e
   recalculado a partir da data de inicio, respeitando `includeWeekends`.
4. Ao montar, a pagina reidrata os itens via `hydrateItems` com dados atuais de
   `/api/equipments` (ver `docs/features/cart-pricing-sync.md`), preservando
   quantidade e dias.
5. Formulario de contato controla estado local (`formData`) e preenche
   nome/email se o usuario estiver logado (`useSession`).
6. `deliveryType`:
   - `PICKUP`: esconde endereco e frete.
   - `DELIVERY`: renderiza `AddressForm` e, com CEP valido/endereco definido,
     chama `calculateFreight` para montar `freightOptions`.
7. Dropdown de frete usa o `Select` do design system em modo nao modal
   (`modal={false}` por padrao). A neutralizacao do scroll-lock do Radix em
   `app/globals.css` (regra `body[data-scroll-locked]`) + guard no
   `app/orcamento/page.tsx` (remove `data-scroll-locked` e styles `data-rs*`)
   garantem que o dropdown nao insira padding/margin extra nem bloqueie o scroll
   global. Cada opcao exibe nome, transportadora e preco formatado.
8. Resumo (sidebar sticky) soma subtotais calculados pelo pricing inteligente e
   inclui o valor da opcao de frete selecionada.
9. Envio do orcamento posta para `/api/quotes` com itens, dados de contato,
   `deliveryType`, endereco (quando `DELIVERY`) e opcao de frete escolhida.
   Opcionalmente abre WhatsApp via `convertFormDataToWhatsApp` /
   `openWhatsAppQuote`. Ao concluir, limpa o carrinho (`clearCart`).

## 3. Arquitetura e Dependencias

- `app/orcamento/page.tsx` — pagina principal, controle de formulario, frete e
  submissao.
- `stores/useCartStore.ts` — estado do carrinho, `hydrateItems`, `updateItem*`.
- `lib/pricing.ts`, `lib/quote-pricing.ts` — motor de precificacao inteligente.
- `lib/freight-calculator.ts` — `calculateFreight` (opcoes de entrega).
- `lib/whatsapp.ts` — montagem/abertura de mensagens para contato rapido.
- Componentes: `components/ui/select` (modo nao modal),
  `components/ui/address-form`, inputs/labels/cards do design system.

## 4. Como Usar

- Itens chegam a partir das paginas de equipamento (cada item com `startDate`,
  `endDate`, `days`, `includeWeekends`).
- Para frete: defina `deliveryType = 'DELIVERY'`, preencha CEP/endereco; a
  pagina busca opcoes via `calculateFreight` e mostra no select (scroll
  permanece livre enquanto o dropdown esta aberto).
- `Select` aceita `modal` para casos especiais; manter `modal={false}` no fluxo
  publico para evitar travar scroll ou inserir padding lateral.
- Totais e badges de preco sao recalculados automaticamente ao alterar dias,
  quantidades ou opcao de frete.

## 5. Armadilhas a Evitar

- Evite usar `modal={true}` no `Select` de frete ou campos similares da area
  publica; isso bloqueia o scroll global e cria faixa branca na lateral.
- Nao enviar itens sem datas (`startDate`/`endDate`/`days`) — a API bloqueia.
- Nao pular a reidratacao de precos (`hydrateItems`), senao valores podem ficar
  defasados.
- Nao sobrescrever o `min-w-[var(--radix-select-trigger-width)]` do
  `SelectContent`, que garante alinhamento ao trigger.

## 6. Licoes Aprendidas

- O modo modal padrao do Radix Select ativa `RemoveScroll` no `body`, travando o
  scroll e adicionando padding visivel; manter `modal={false}` para dropdowns
  simples resolve o problema sem afetar a experiencia.
- Manter frete e endereco condicionais ao `deliveryType` reduz erros de
  submissao e evita requisicoes de frete desnecessarias.

## 7. Historico de Alteracoes

| Data       | Descricao                                                                   | Autor    |
| ---------- | --------------------------------------------------------------------------- | -------- |
| 2025-12-22 | Ajuste de dias recalcula o endDate para itens com datas                     | IA Codex |
| 2025-12-22 | Datas estimadas sem calendario e confirmacao antecipada de finais de semana | IA Codex |
| 2025-12-18 | Documentada logica da pagina e correcao do select de frete                  | IA Codex |
