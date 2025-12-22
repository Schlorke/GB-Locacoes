# Sistema de Orçamentos - Documentação Completa

> **⚠️ CRÍTICO**: Este documento contém todas as regras de negócio, estruturas
> de dados e fluxos do sistema de orçamentos. Consulte-o ANTES de fazer qualquer
> alteração relacionada a orçamentos.

---

## 1. Propósito

O sistema de orçamentos é o núcleo do modelo de negócio da GB-Locações. Ele
permite que clientes solicitem orçamentos para locação de equipamentos,
configurando detalhes como período, quantidade e opções de entrega.

---

## 2. Visão Geral do Fluxo

```
Página de Detalhes do Equipamento (/equipamentos/[id])
    ↓ (Configurar: quantidade, datas, período)
Adicionar ao Carrinho (SmartEquipmentPricing)
    ↓
Página de Orçamento (/orcamento)
    ↓ (Preencher: dados pessoais, entrega)
Enviar Orçamento (POST /api/quotes)
    ↓
API Processa e Salva no Banco
    ↓
Admin Recebe Notificação
    ↓
Página Admin de Orçamentos (/admin/orcamentos)
```

---

## 3. Fluxo Detalhado

### 3.1. Configuração do Equipamento (Página de Detalhes)

**Localização**: `/equipamentos/[id]` **Componente Principal**:
`SmartEquipmentPricing`

**O que acontece**:

- Cliente seleciona **período de locação** usando calendário (data início e data
  fim)
- Cliente escolhe se **inclui finais de semana** na contagem de dias
- **Confirmação obrigatória**: se o cliente não selecionar datas no calendário,
  o sistema confirma a preferência de finais de semana antes de adicionar ao
  carrinho
- **Datas automáticas**: sem calendário, o período é calculado a partir da data
  da solicitação; se `includeWeekends=false` e a solicitação for em
  sábado/domingo, o início passa para o próximo dia útil e a contagem considera
  apenas dias úteis
- Sistema calcula automaticamente:
  - Número de dias úteis ou totais (dependendo da opção)
  - Período aplicado (Diário, Semanal, Quinzenal, Mensal) baseado nos dias
  - Preço final com desconto ou valor direto aplicado
- Cliente clica em "Solicitar Orçamento" e o equipamento é adicionado ao
  carrinho **COM**:
  - `startDate`: Data de início da locação
  - `endDate`: Data de fim da locação
  - `days`: Número de dias calculados
  - `includeWeekends`: Se finais de semana estão incluídos
  - `selectedPeriod`: Período aplicado (daily, weekly, biweekly, monthly)
  - `finalPrice`: Preço final calculado
  - Todos os campos de desconto e valor direto do equipamento

> **🚨 REGRA CRÍTICA**: O período de locação é configurado **INDIVIDUALMENTE**
> para cada equipamento na página de detalhes. **NÃO** existe campo de período
> global no formulário de orçamentos.

### 3.2. Página de Orçamento (`/orcamento`)

**Localização**: `app/orcamento/page.tsx`

**O que o cliente vê**:

- Lista de equipamentos selecionados com suas respectivas datas e períodos
- Formulário de contato (nome, email, telefone, CPF/CNPJ, empresa)
- Opção de tipo de entrega (Retirada na Loja / Entrega no Endereço)
- Formulário de endereço (se entrega)
- Cálculo de frete (se entrega)
- Resumo com subtotal e total

**O que o sistema faz**:

- **Validação de Disponibilidade**: Verifica se cada equipamento está disponível
  nas datas selecionadas
- **Sincronização de Preços**: Garante que os preços no carrinho estão
  atualizados com o catálogo
- **Cálculo de Frete**: Calcula opções de frete baseado no CEP de entrega
- **Validação de Dados**: Valida CPF/CNPJ, telefone, email, endereço

**Regras de negócio obrigatórias**:

1. **Período por Item**: Cada equipamento no carrinho tem seu próprio
   `startDate`, `endDate` e `days`
2. **Validação de Datas**: Se um item não tem datas definidas, o sistema
   bloqueia o envio
3. **Disponibilidade**: Sistema valida disponibilidade de cada item nas suas
   datas específicas
4. **CPF ou CNPJ**: Pelo menos um deve ser preenchido
5. **Empresa Obrigatória**: Se CNPJ é informado, empresa é obrigatória
6. **Endereço Obrigatório**: Se tipo de entrega é DELIVERY, endereço completo é
   obrigatório

### 3.3. Envio do Orçamento

**API**: `POST /api/quotes`

**Payload enviado**:

```typescript
{
  customerName: string
  customerEmail: string
  customerPhone: string
  cpf?: string
  cnpj?: string
  customerCompany?: string
  message?: string
  deliveryType?: 'DELIVERY' | 'PICKUP'
  deliveryAddress?: AddressData
  items: Array<{
    equipmentId: string
    quantity: number
    days: number
    startDate?: string  // ISO string
    endDate?: string    // ISO string
    includeWeekends?: boolean
  }>
}
```

**O que a API faz**:

1. Valida todos os dados usando `QuoteRequestSchema` (Zod)
2. Valida disponibilidade de cada item nas suas datas específicas
3. Calcula preço inteligente para cada item usando `buildQuotePricing()`
4. Salva no banco de dados: `Quote` (orçamento principal) e `QuoteItem[]`
   (itens)
5. Envia email de confirmação para o cliente
6. Cria locação placeholder (status PENDING) para aparecer em `/admin/rentals`

---

## 4. Sistema de Preços Inteligente

**Localização**: `lib/pricing.ts` e `lib/quote-pricing.ts`

### 4.1. Determinação do Período

O sistema verifica quantos dias foram solicitados e aplica o período
correspondente:

| Dias       | Período Aplicado |
| :--------- | :--------------- |
| 1-6 dias   | Diário           |
| 7-14 dias  | Semanal          |
| 15-29 dias | Quinzenal        |
| 30+ dias   | Mensal           |

### 4.2. Cálculo de Preço

- **Se `useDirectValue = true`**: Usa valor direto do período
  - Exemplo: Semanal com valor direto R$ 500 → R$ 500 para 7 dias
- **Se `useDirectValue = false`**: Aplica desconto percentual
  - Exemplo: Semanal com 10% desconto → Preço diário × 7 × 0.90

### 4.3. Campos no Equipamento

```typescript
// Descontos percentuais
dailyDiscount?: number        // Desconto % para diário
weeklyDiscount?: number       // Desconto % para semanal (ex: 10)
biweeklyDiscount?: number     // Desconto % para quinzenal (ex: 15)
monthlyDiscount?: number      // Desconto % para mensal (ex: 20)

// Valores diretos (fixos)
dailyDirectValue?: number     // Valor fixo para diário
weeklyDirectValue?: number    // Valor fixo para semanal
biweeklyDirectValue?: number  // Valor fixo para quinzenal
monthlyDirectValue?: number   // Valor fixo para mensal

// Flags para usar valor direto
dailyUseDirectValue?: boolean
weeklyUseDirectValue?: boolean
biweeklyUseDirectValue?: boolean
monthlyUseDirectValue?: boolean
```

---

## 5. Página Admin de Orçamentos

**Localização**: `app/admin/orcamentos/page.tsx`

### 5.1. Visões Disponíveis

- **Kanban**: Visualização por status (PENDING, APPROVED, REJECTED, COMPLETED)
- **Tabela**: Lista com filtros e ordenação

### 5.2. Informações Exibidas por Item (CRÍTICO)

1. Nome do Equipamento
2. Quantidade solicitada
3. Dias de Locação (específicos daquele equipamento)
4. Período Aplicado (Diário, Semanal, Quinzenal, Mensal)
5. Desconto Aplicado (percentual) OU Valor Direto aplicado
6. Período de Locação (data início até data fim)
7. Incluir Finais de Semana (se marcado)
8. Preço Original (riscado, se houver desconto)
9. Preço Final (com desconto/valor direto aplicado)
10. Preço por Dia

### 5.3. Informações de Entrega/Retirada Exibidas

1. **Tipo de Entrega/Retirada**: Badge indicando "Entrega no Endereço"
   (DELIVERY) ou "Retirada na Loja" (PICKUP)
2. **Taxa de Entrega**: Exibida quando `deliveryFee` > 0
3. **Endereço Completo** (quando DELIVERY): Logradouro, número, complemento,
   bairro, cidade/estado, CEP
4. **Mensagem Informativa**: Quando PICKUP, exibe mensagem que cliente retirará
   na loja

---

## 6. Estrutura de Dados

### 6.1. Dados do Cliente

- Nome completo
- Email
- Telefone
- CPF (pessoa física) OU CNPJ (pessoa jurídica)
- Empresa (obrigatório se CNPJ)
- CEP
- Mensagem adicional (opcional)

### 6.2. Dados de Entrega

- Tipo: Retirada na Loja (PICKUP) ou Entrega (DELIVERY)
- Endereço completo (se DELIVERY): CEP, Logradouro, Número, Complemento, Bairro,
  Cidade, Estado

### 6.3. Schema Prisma

```prisma
model Quote {
  // ... outros campos
  deliveryType        DeliveryType?  // DELIVERY ou PICKUP
  deliveryAddress     Json?          // Endereço completo (quando DELIVERY)
  deliveryFee         Decimal?       // Taxa de entrega
  // ... outros campos
}

model QuoteItem {
  id              String    @id
  quoteId         String
  equipmentId     String
  quantity        Int
  days            Int
  pricePerDay     Decimal
  total           Decimal
  // Datas específicas deste item
  startDate       DateTime?
  endDate         DateTime?
  // Finais de semana
  includeWeekends Boolean   @default(false)
  // Informações de preço
  appliedDiscount Decimal?  // Desconto % aplicado
  appliedPeriod   String?   // daily, weekly, biweekly, monthly
  useDirectValue  Boolean   @default(false)
  directValue     Decimal?  // Valor direto aplicado
}
```

---

## 7. Subsistemas Relacionados

### 7.1. Ajuste de Valor Final com Justificativa

**Documentação**: `docs/features/quote-price-adjustment.md`

Sistema que permite admin editar valor final do orçamento com justificativa
obrigatória. Cliente sempre vê valor original vs valor final editado.

**Regras**:

- Admin pode editar valor total do orçamento
- Justificativa é OBRIGATÓRIA ao editar valor
- Sistema salva: `originalTotal`, `finalTotal`, `priceAdjustmentReason`,
  `priceAdjustedAt`, `priceAdjustedBy`

**API**: `PATCH /api/admin/quotes/[id]` com
`{ finalTotal, priceAdjustmentReason }`

### 7.2. Multa por Atraso

**Documentação**: `docs/features/late-fee-calculation.md`

Sistema que calcula automaticamente multa por atraso, mas requer aprovação do
admin para ser aplicada.

**Regras**:

- Sistema calcula automaticamente valor da multa
- Admin DEVE aprovar aplicação da multa
- Integra com ajuste de valor final

**API**:

- `POST /api/admin/quotes/[id]/calculate-late-fee`: Calcula multa
- `PATCH /api/admin/quotes/[id]` com `{ lateFee, lateFeeApproved }`: Aprova
  multa

**Utilitário**: `lib/late-fee-calculator.ts`

### 7.3. Registro de Perdas de Peças

**Documentação**: `docs/features/equipment-parts-loss.md`

Sistema para registrar perdas de peças dos equipamentos. Usado para cobrar taxas
no orçamento final.

### 7.4. Bloqueio de Estoque

**Documentação**: `docs/features/quote-stock-blocking.md`

Sistema que bloqueia estoque apenas quando orçamento é aprovado, não durante
criação.

**Regras**:

- NÃO bloqueia durante criação (orçamentos PENDING não bloqueiam)
- Bloqueia quando aprovado (apenas APPROVED bloqueiam)
- Validação server-side sempre antes de criar

**Lógica**: `lib/equipment-availability.ts`

### 7.5. Acompanhamento de Status

**Documentação**: `docs/features/quote-status-tracking.md`

**Status disponíveis**:

- `PENDING`: Aguardando análise
- `APPROVED`: Aprovado pelo admin
- `REJECTED`: Rejeitado pelo admin
- `COMPLETED`: Convertido em locação

---

## 8. Arquivos Principais

| Arquivo                         | Propósito                                |
| :------------------------------ | :--------------------------------------- |
| `app/orcamento/page.tsx`        | Página pública de orçamento              |
| `app/admin/orcamentos/page.tsx` | Página admin de orçamentos               |
| `app/api/quotes/route.ts`       | API para criar orçamento                 |
| `app/api/admin/quotes/route.ts` | API admin para gerenciar orçamentos      |
| `lib/pricing.ts`                | Sistema de cálculo de preços             |
| `lib/quote-pricing.ts`          | Cálculo de preços para orçamentos        |
| `prisma/schema.prisma`          | Models `Quote` e `QuoteItem`             |
| `lib/validations/index.ts`      | Schema de validação `QuoteRequestSchema` |
| `stores/useCartStore.ts`        | Interface `CartItem`                     |

---

## 9. Armadilhas a Evitar

- ❌ **NUNCA** adicione campo de período global no formulário de orçamentos
- ❌ **NUNCA** remova a validação de datas por item
- ❌ **NUNCA** modifique o cálculo de preço sem entender o sistema inteligente
- ❌ **NUNCA** remova campos de desconto/valor direto do schema
- ❌ **NUNCA** exiba apenas quantidade e preço sem mostrar período, desconto e
  datas
- ❌ **NUNCA** assuma que todos os itens têm o mesmo período
- ❌ **NUNCA** omita informações de entrega/retirada na API admin
- ❌ **NUNCA** acesse `deliveryAddress` sem verificar se é objeto válido (use
  type guards)
- ❌ **NUNCA** exiba endereço quando `deliveryType` for PICKUP

---

## 10. Boas Práticas

- ✅ **SEMPRE** valide que cada item tem datas definidas
- ✅ **SEMPRE** exiba todas as informações detalhadas por item no admin
- ✅ **SEMPRE** exiba informações de entrega/retirada quando disponíveis
- ✅ **SEMPRE** use `buildQuotePricing()` para calcular preços
- ✅ **SEMPRE** salve todos os campos de preço por item no banco
- ✅ **SEMPRE** valide disponibilidade usando as datas específicas de cada item
- ✅ **SEMPRE** mantenha a estrutura de dados completa no `QuoteItem`
- ✅ **SEMPRE** retorne `deliveryType`, `deliveryAddress` e `deliveryFee` na API
  admin
- ✅ **SEMPRE** use type guards ao acessar `deliveryAddress` (tipo Json do
  Prisma)

---

## 11. Histórico de Alterações

| Data     | Descrição                                          | Autor  |
| :------- | :------------------------------------------------- | :----- |
| Jan 2025 | Implementação inicial do sistema de orçamentos     | Equipe |
| Jan 2025 | Adição do sistema de entrega/retirada              | Equipe |
| Jan 2025 | Sistema de ajuste de valor final com justificativa | Equipe |
| Jan 2025 | Sistema de multa por atraso                        | Equipe |
| Jan 2025 | Registro de perdas de peças                        | Equipe |
| Jan 2025 | Bloqueio de estoque                                | Equipe |
| Jan 2025 | Acompanhamento de status                           | Equipe |

---

_Última atualização: Janeiro 2025_
