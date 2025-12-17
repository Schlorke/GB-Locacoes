# Sistema de Cálculo de Multa por Atraso

> **⚠️ CRÍTICO**: Sistema que calcula automaticamente multa por atraso, mas
> requer aprovação do admin para ser aplicada. Tudo é discriminado para cliente
> e admin.

## 1. Propósito

O sistema calcula automaticamente o valor da multa por atraso baseado na data de
término do orçamento e data atual, mas requer aprovação explícita do admin para
ser aplicada ao orçamento.

## 2. Lógica de Funcionamento

### 2.1. Fluxo de Cálculo e Aprovação

1. **Sistema detecta atraso**: Data atual > data de término do orçamento
2. **Admin clica em "Calcular Multa"** no modal de detalhes
3. **Sistema calcula**:
   - Dias de atraso
   - Valor da multa (baseado em configuração)
4. **Sistema exibe**:
   - Valor calculado
   - Dias de atraso
   - Método de cálculo usado
5. **Admin aprova ou rejeita**:
   - Se aprovar: Multa é adicionada ao valor final
   - Se rejeitar: Multa não é aplicada
6. **Sistema salva**:
   - `lateFee`: Valor da multa calculada
   - `lateFeeApproved`: Boolean (se foi aprovada)
   - `lateFeeApprovedAt`: Data de aprovação
   - `lateFeeApprovedBy`: ID do admin que aprovou
7. **Cliente visualiza**:
   - Multa calculada (se houver)
   - Status de aprovação
   - Valor final com multa (se aprovada)

### 2.2. Configuração de Cálculo

O sistema usa configuração padrão (pode ser customizada):

```typescript
{
  dailyRate: 0.02,      // 2% ao dia
  maxDays: 30,          // Máximo de 30 dias para calcular
  minAmount: 50,        // Mínimo de R$ 50,00
  maxAmount: 5000,      // Máximo de R$ 5.000,00
}
```

**Métodos de Cálculo**:

- **Taxa Diária**: `valorOriginal × taxaDiária × diasAtraso`
- **Valor Fixo**: Valor fixo configurado

### 2.3. Regras de Negócio

- **Cálculo automático**: Sistema calcula quando solicitado
- **Aprovação obrigatória**: Admin DEVE aprovar para aplicar multa
- **Tudo discriminado**: Cliente e admin veem todos os detalhes
- **Integração com ajuste de valor**: Multa aprovada adiciona ao valor final

## 3. Arquitetura e Dependências

### 3.1. Schema Prisma

```prisma
model Quote {
  lateFee             Decimal?          // Valor da multa calculada
  lateFeeApproved     Boolean?          // Se admin aprovou
  lateFeeApprovedAt   DateTime?         // Data de aprovação
  lateFeeApprovedBy   String?           // ID do admin que aprovou
}
```

### 3.2. API Endpoints

- **POST `/api/admin/quotes/[id]/calculate-late-fee`**: Calcula multa por atraso
- **PATCH `/api/admin/quotes/[id]`**: Aprova/rejeita multa
  - Body: `{ lateFee: number, lateFeeApproved: boolean }`

### 3.3. Utilitários

- **`lib/late-fee-calculator.ts`**: Função `calculateLateFee()` para cálculo

## 4. Como Usar

### 4.1. Admin - Calcular e Aprovar Multa

1. Acesse `/admin/orcamentos`
2. Clique em orçamento com data de término passada
3. Clique em "Calcular Multa"
4. Sistema exibe valor calculado
5. Clique em "Aprovar e Aplicar Multa" ou "Cancelar"

### 4.2. Cliente - Visualizar Multa

1. Acesse área do cliente (quando implementada)
2. Visualize orçamento
3. Veja:
   - Multa calculada (se houver)
   - Status de aprovação
   - Valor final com multa (se aprovada)

## 5. Armadilhas a Evitar

- ❌ **NUNCA** aplique multa sem aprovação do admin
- ❌ **NUNCA** calcule multa para datas futuras
- ❌ **NUNCA** permita aprovação sem valor calculado
- ❌ **NUNCA** perca histórico de aprovação

## 6. Lições Aprendidas

- Aprovação obrigatória garante controle do admin
- Cálculo automático agiliza processo
- Discriminação completa previne disputas

## 7. Histórico de Alterações

| Data       | Descrição             | Autor   |
| ---------- | --------------------- | ------- |
| 2025-01-XX | Implementação inicial | Sistema |
