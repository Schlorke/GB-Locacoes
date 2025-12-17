# Bloqueio de Estoque por Orçamento Aprovado

> **⚠️ CRÍTICO**: Sistema que bloqueia estoque apenas quando orçamento é
> aprovado, não durante criação. Previne vulnerabilidade de bloqueio malicioso.

## 1. Propósito

O sistema bloqueia o estoque de equipamentos apenas quando um orçamento é
aprovado pelo admin, não durante a criação do orçamento. Isso previne que
usuários mal intencionados bloqueiem todos os equipamentos criando múltiplos
orçamentos.

## 2. Lógica de Funcionamento

### 2.1. Fluxo de Bloqueio

1. **Cliente cria orçamento**: Sistema NÃO bloqueia estoque
2. **Sistema valida disponibilidade**: Verifica se há estoque disponível (sem
   bloquear)
3. **Orçamento criado**: Status `PENDING`, estoque NÃO bloqueado
4. **Admin aprova orçamento**: Status muda para `APPROVED`
5. **Sistema cria locação**: Locação criada com status `PENDING` e `quoteId`
   vinculado
6. **Sistema bloqueia estoque**: Locação com orçamento `APPROVED` bloqueia
   estoque
7. **Cliente visualiza**: Equipamento aparece como indisponível no período

### 2.2. Regras de Negócio

- **NÃO bloqueia durante criação**: Orçamentos `PENDING` não bloqueiam estoque
- **Bloqueia quando aprovado**: Apenas orçamentos `APPROVED` bloqueiam estoque
- **Validação server-side**: Sempre valida disponibilidade antes de criar
  orçamento
- **Período específico**: Bloqueia apenas no período solicitado pelo cliente

### 2.3. Prevenção de Vulnerabilidade

**Problema**: Se bloqueasse durante criação, usuário mal intencionado poderia:

- Criar múltiplos orçamentos
- Bloquear todos os equipamentos
- Impedir outros clientes de locar

**Solução**:

- Bloqueio apenas quando aprovado
- Admin controla quais orçamentos bloqueiam estoque
- Validação server-side previne overbooking

## 3. Arquitetura e Dependências

### 3.1. Schema Prisma

```prisma
model Quote {
  status              QuoteStatus   @default(PENDING)
  approvedAt          DateTime?
  approvedBy          String?
}

model rentals {
  status              RentalStatus  @default(PENDING)
  quoteId             String?
  quote               Quote?
}
```

### 3.2. Lógica de Disponibilidade

**`lib/equipment-availability.ts`**:

```typescript
// Só bloqueia estoque se:
// - não for PENDING, OU
// - for PENDING, mas o orçamento já estiver APPROVED ou não existir quote
const blocksInventory =
  rental.status !== "PENDING" || (isPending && !quotePending)
```

### 3.3. API Endpoints

- **POST `/api/quotes`**: Cria orçamento (NÃO bloqueia estoque)
- **PATCH `/api/admin/quotes/[id]`**: Aprova orçamento (bloqueia estoque)

## 4. Como Usar

### 4.1. Cliente - Criar Orçamento

1. Cliente seleciona equipamentos e datas
2. Sistema valida disponibilidade (sem bloquear)
3. Cliente envia orçamento
4. Orçamento criado com status `PENDING`
5. Estoque NÃO é bloqueado

### 4.2. Admin - Aprovar Orçamento

1. Admin visualiza orçamento pendente
2. Admin clica em "Aprovar Orçamento"
3. Sistema:
   - Valida disponibilidade novamente
   - Cria locação com status `PENDING`
   - Vincula locação ao orçamento
   - Bloqueia estoque no período solicitado

## 5. Armadilhas a Evitar

- ❌ **NUNCA** bloqueie estoque durante criação de orçamento
- ❌ **NUNCA** permita bloqueio sem validação de disponibilidade
- ❌ **NUNCA** bloqueie estoque para orçamentos rejeitados
- ❌ **NUNCA** perca validação server-side

## 6. Lições Aprendidas

- Bloqueio apenas quando aprovado previne vulnerabilidades
- Validação server-side é essencial
- Admin tem controle total sobre bloqueios

## 7. Histórico de Alterações

| Data       | Descrição             | Autor   |
| ---------- | --------------------- | ------- |
| 2025-01-XX | Implementação inicial | Sistema |
