# Acompanhamento de Status de Orçamento

> **⚠️ CRÍTICO**: Sistema que permite cliente e admin acompanharem o status dos
> orçamentos. Essencial para segurança do cliente e controle do admin.

## 1. Propósito

O sistema permite que clientes e administradores acompanhem o status dos
orçamentos em tempo real, com notificações automáticas de mudanças de status.

## 2. Lógica de Funcionamento

### 2.1. Status do Orçamento

- **PENDING**: Orçamento criado, aguardando análise do admin
- **APPROVED**: Orçamento aprovado pelo admin
- **REJECTED**: Orçamento rejeitado pelo admin
- **COMPLETED**: Orçamento convertido em locação

### 2.2. Fluxo de Acompanhamento

1. **Cliente cria orçamento**: Status `PENDING`
2. **Sistema envia confirmação**: Email/notificação de recebimento
3. **Admin analisa**: Visualiza orçamento na página admin
4. **Admin aprova/rejeita**: Status muda para `APPROVED` ou `REJECTED`
5. **Sistema notifica cliente**: Email/notificação de mudança de status
6. **Cliente visualiza**: Status atualizado na área do cliente

### 2.3. Notificações

- **Confirmação de recebimento**: Enviada quando orçamento é criado
- **Mudança de status**: Enviada quando admin aprova/rejeita
- **Lembrete de validade**: Enviada quando orçamento está próximo de vencer

## 3. Arquitetura e Dependências

### 3.1. Schema Prisma

```prisma
model Quote {
  status              QuoteStatus   @default(PENDING)
  approvedAt          DateTime?
  approvedBy          String?
  rejectedAt          DateTime?
  rejectedBy          String?
  validUntil          DateTime?
}
```

### 3.2. API Endpoints

- **GET `/api/admin/quotes`**: Lista orçamentos com status
- **PATCH `/api/admin/quotes/[id]`**: Atualiza status
- **GET `/api/quotes/[id]`**: Busca orçamento por ID (cliente)

### 3.3. Componentes Frontend

- **`app/admin/orcamentos/page.tsx`**: Visualização admin com status
- **`app/area-cliente/orcamentos/page.tsx`**: Visualização cliente (a
  implementar)

## 4. Como Usar

### 4.1. Cliente - Acompanhar Orçamento

1. Acesse área do cliente (quando implementada)
2. Visualize lista de orçamentos
3. Veja status atual de cada orçamento
4. Receba notificações de mudanças

### 4.2. Admin - Gerenciar Status

1. Acesse `/admin/orcamentos`
2. Visualize orçamentos por status (Kanban ou Tabela)
3. Clique em orçamento para ver detalhes
4. Aprove ou rejeite orçamento
5. Sistema notifica cliente automaticamente

## 5. Armadilhas a Evitar

- ❌ **NUNCA** perca histórico de mudanças de status
- ❌ **NUNCA** permita mudança de status sem autenticação
- ❌ **NUNCA** esqueça de notificar cliente
- ❌ **NUNCA** exiba informações sensíveis para clientes

## 6. Lições Aprendidas

- Notificações automáticas melhoram experiência
- Status claro previne confusão
- Histórico completo é essencial

## 7. Histórico de Alterações

| Data       | Descrição             | Autor   |
| ---------- | --------------------- | ------- |
| 2025-01-XX | Implementação inicial | Sistema |
