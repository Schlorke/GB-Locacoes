# Sincronizacao automatica de precos do carrinho

## Resumo

- Evita que carrinhos persistidos usem descontos percentuais quando o admin
  definiu valor direto para um periodo (ex.: semanal).
- A pagina `/orcamento` agora reidrata os itens com os dados mais recentes de
  `/api/equipments`, incluindo flags `*UseDirectValue` e valores diretos por
  periodo.
- A UI do `/orcamento` recalcula imediatamente os valores ao alterar dias e
  exibe o metodo correto (valor direto x desconto) sem mensagens conflitantes.

## Problema

- Carrinhos salvos no localStorage antes da configuracao de valor direto nao
  tinham `weeklyDirectValue`/`weeklyUseDirectValue`.
- Resultado: o calculo inteligente caia para o desconto percentual e exibia
  totais incorretos (ex.: 7 dias = R$ 630,00 em vez de R$ 400,00).

## Solucao implementada

- Novo metodo `hydrateItems` no `useCartStore` permite substituir o estado
  persistido por itens atualizados.
- Efeito em `/orcamento` faz uma sincronizacao unica quando ha itens no
  carrinho:
  - Busca o catalogo em `/api/equipments`.
  - Monta um mapa por `equipmentId`.
  - Atualiza preco base, descontos e valores/flags diretos
    (daily/weekly/biweekly/monthly) preservando `quantity` e `days`.
- O calculo inteligente aceita `directValue` igual a zero sem cair para o modo
  de desconto (apoia cenarios promocionais/gratuitos) e zera o desconto quando
  `*UseDirectValue` esta ativo para evitar mensagens incorretas.
- Motor de pricing centralizado em `lib/pricing.ts` com funcoes puras
  (`getPricingConfig`, `calculateIntelligentPrice`, `sanitizeCartItemPricing`) e
  testes unitarios cobrindo valor direto, desconto e saneamento de dados.
- Regra de valor direto: aplica por periodo completo e dias excedentes usam
  valor proporcional ao proprio periodo (ex.: semanal R$ 400 -> dia 8 cobra
  400 + 1/7 desse valor). Ao cruzar para o proximo limiar (15 dias, 30 dias), a
  logica muda automaticamente para o novo periodo configurado (desconto ou valor
  direto), atualizando badges e resumo em tempo real.

## Fluxo

1. Usuario abre `/orcamento` com itens persistidos.
2. Efeito dispara GET `/api/equipments`.
3. `hydrateItems` aplica valores diretos e descontos atuais aos itens.
4. Totais, badges e emails passam a refletir o valor direto configurado no
   admin.

## Como validar

- Configure um equipamento com `weeklyUseDirectValue=true` e
  `weeklyDirectValue=400` no admin.
- Adicione o item ao carrinho e recarregue `/orcamento`.
- Espere a sincronizacao (1 chamada a `/api/equipments`) e confirme:
  - Resumo mostra total de 7 dias = R$ 400,00.
  - Badge/descricao exibem "Valor direto" em vez de desconto percentual.
- Opcional: use um carrinho salvo antes da mudanca e verifique que o total
  corrige apos o carregamento da pagina.

## Observacoes

- Se a chamada a `/api/equipments` falhar, o carrinho permanece com os valores
  atuais (nenhum item e perdido).
- Novos itens adicionados ja chegam com os campos diretos preenchidos; o sync
  cobre somente carrinhos antigos/persistidos.
- UI do `/orcamento` nao depende mais de `finalPrice` inicial: todos os valores
  exibidos e enviados (resumo, WhatsApp, badges) usam o resultado atual do motor
  inteligente conforme o numero de dias.
- Descontos so aparecem quando realmente aplicados; configuracoes de valor
  direto exibem mensagem e montante correspondentes.
