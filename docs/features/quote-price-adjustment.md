# Sistema de Ajuste de Valor Final com Justificativa

> **⚠️ CRÍTICO**: Sistema fundamental para o funcionamento do negócio. Permite
> que o admin ajuste valores de orçamentos com justificativa obrigatória,
> garantindo transparência para o cliente.

## 1. Propósito

O sistema de ajuste de valor final permite que administradores editem o valor
total de um orçamento após sua criação, com justificativa obrigatória. O cliente
sempre vê o valor original e o valor final editado, junto com a justificativa do
admin.

## 2. Lógica de Funcionamento

### 2.1. Fluxo de Ajuste

1. **Admin visualiza orçamento** na página `/admin/orcamentos`
2. **Admin clica em "Ajustar Valor Final"** no modal de detalhes
3. **Sistema exibe**:
   - Valor original completo (com todos os detalhes)
   - Campo para valor final editado
   - Campo obrigatório de justificativa
4. **Admin preenche**:
   - Novo valor final
   - Justificativa (obrigatória)
5. **Sistema valida**:
   - Justificativa não pode estar vazia
   - Valor final deve ser um número válido ≥ 0
6. **Sistema salva**:
   - `originalTotal`: Valor original (se não existir, usa o `total` atual)
   - `finalTotal`: Valor final editado
   - `priceAdjustmentReason`: Justificativa obrigatória
   - `priceAdjustedAt`: Data/hora da edição
   - `priceAdjustedBy`: ID do usuário que editou
7. **Cliente visualiza**:
   - Valor original com breakdown completo
   - Valor final editado
   - Justificativa do admin
   - Data/hora do ajuste

### 2.2. Regras de Negócio

- **Justificativa é OBRIGATÓRIA**: Não é possível ajustar valor sem
  justificativa
- **Valor original preservado**: Sempre mantém o valor original completo
- **Informações sempre juntas**: Valor original, valor final e justificativa
  nunca são separados
- **Histórico completo**: Cada ajuste registra data/hora e usuário responsável

### 2.3. Casos de Uso

1. **Seguro e Taxa de Quebra/Avaria**: Admin pode adicionar taxa de seguro ou
   quebra/avaria
2. **Ajustes por Perdas de Peças**: Quando há registro de perdas no equipamento
3. **Ajustes por Danos/Mau Uso**: Quando há registro de danos ou mau uso
4. **Ajustes Administrativos**: Qualquer ajuste justificado pelo admin

## 3. Arquitetura e Dependências

### 3.1. Schema Prisma

```prisma
model Quote {
  originalTotal       Decimal?          // Valor original completo
  finalTotal          Decimal?          // Valor final editado
  priceAdjustmentReason String?         // Justificativa obrigatória
  priceAdjustedAt     DateTime?         // Data/hora da edição
  priceAdjustedBy     String?           // ID do usuário que editou
}
```

### 3.2. API Endpoints

- **PATCH `/api/admin/quotes/[id]`**: Atualiza valor final com justificativa
  - Body: `{ finalTotal: number, priceAdjustmentReason: string }`
  - Validação: Justificativa obrigatória

### 3.3. Componentes Frontend

- **`app/admin/orcamentos/page.tsx`**: Modal de detalhes com seção de valores
- **Dialog de Ajuste**: Formulário para editar valor final com justificativa

## 4. Como Usar

### 4.1. Admin - Ajustar Valor Final

1. Acesse `/admin/orcamentos`
2. Clique em um orçamento para ver detalhes
3. Clique em "Ajustar Valor Final"
4. Preencha:
   - Valor final editado
   - Justificativa (obrigatória)
5. Clique em "Ajustar Valor"

### 4.2. Cliente - Visualizar Ajustes

1. Acesse área do cliente (quando implementada)
2. Visualize orçamento
3. Veja:
   - Valor original
   - Valor final editado (se houver)
   - Justificativa do admin

## 5. Armadilhas a Evitar

- ❌ **NUNCA** permita ajuste sem justificativa
- ❌ **NUNCA** separe valor original, valor final e justificativa
- ❌ **NUNCA** perca o histórico de valores originais
- ❌ **NUNCA** permita ajuste sem autenticação de admin

## 6. Lições Aprendidas

- Justificativa obrigatória garante transparência
- Histórico completo previne disputas
- Exibição lado a lado (antes/depois) melhora UX

## 7. Histórico de Alterações

| Data       | Descrição             | Autor   |
| ---------- | --------------------- | ------- |
| 2025-01-XX | Implementação inicial | Sistema |
