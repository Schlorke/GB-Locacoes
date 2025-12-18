# Admin Orçamentos Page - Documentação

## 1. Propósito

Página administrativa para gerenciamento de orçamentos do sistema GB Locações.
Permite visualizar, aprovar, rejeitar e gerenciar todos os orçamentos enviados
pelos clientes.

**Localização**: `app/admin/orcamentos/page.tsx`

## 2. Lógica de Funcionamento

### 2.1 Visão Geral

A página oferece três modos de visualização:

- **Kanban**: Pipeline visual com colunas por status
- **Tabela**: Lista tradicional com filtros
- **Calendário**: Visualização temporal (a implementar)

### 2.2 Estados Principais

```typescript
// Estados de dados
const [quotes, setQuotes] = useState<Quote[]>([])
const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)

// Estados de filtro
const [statusFilter, setStatusFilter] = useState<string>("PENDING")
const [periodFilter, setPeriodFilter] = useState<string>("all")
const [valueFilter, setValueFilter] = useState<string>("all")

// Estados de ação
const [isUpdating, setIsUpdating] = useState(false)
const [updatingAction, setUpdatingAction] = useState<
  "approved" | "rejected" | null
>(null)
const [isDeleting, setIsDeleting] = useState(false)

// Estados de dialogs aninhadas
const [showDeleteDialog, setShowDeleteDialog] = useState(false)
const [showPriceAdjustmentDialog, setShowPriceAdjustmentDialog] =
  useState(false)
const [showLateFeeDialog, setShowLateFeeDialog] = useState(false)
const [nestedDialogOpen, setNestedDialogOpen] = useState(false)
```

### 2.3 Fluxo de Aprovação/Rejeição

1. Admin abre modal de detalhes do orçamento
2. Admin clica em "Aprovar Orçamento" ou "Rejeitar Orçamento"
3. Sistema mostra loading **apenas no botão clicado**
4. Ambos os botões ficam desabilitados durante a operação
5. API atualiza status do orçamento
6. Toast de sucesso/erro é exibido
7. Lista de orçamentos é atualizada

### 2.4 Sistema de Loading de Botões

**Padrão Implementado (Dez 2025):**

- `isUpdating`: Controla se alguma operação está em andamento (desabilita
  botões)
- `updatingAction`: Identifica QUAL ação está em andamento
  (`'approved' | 'rejected' | null`)

```tsx
// Botão Rejeitar - mostra loading apenas quando updatingAction === 'rejected'
<Button disabled={isUpdating}>
  {updatingAction === 'rejected' ? 'Rejeitando...' : 'Rejeitar Orçamento'}
</Button>

// Botão Aprovar - mostra loading apenas quando updatingAction === 'approved'
<Button disabled={isUpdating}>
  {updatingAction === 'approved' ? 'Aprovando...' : 'Aprovar Orçamento'}
</Button>
```

## 3. Arquitetura e Dependências

### Arquivos Relacionados

- `app/admin/orcamentos/page.tsx` - Página principal
- `app/api/admin/quotes/route.ts` - API de listagem
- `app/api/admin/quotes/[id]/route.ts` - API de ações individuais
- `components/admin/kanban-pipeline.tsx` - Componente Kanban

### Componentes Utilizados

- `Dialog` (Base UI) - Modal de detalhes
- `Button` - Ações
- `Badge` - Status
- `Card` - Containers

### APIs Consumidas

- `GET /api/admin/quotes` - Lista orçamentos
- `PATCH /api/admin/quotes/[id]` - Atualiza status/valores
- `DELETE /api/admin/quotes/[id]` - Exclui orçamento

## 4. Como Usar

### Aprovar/Rejeitar Orçamento

1. Clique no card do orçamento no Kanban ou na linha da tabela
2. Modal de detalhes abre com todas as informações
3. Use os botões no footer para aprovar ou rejeitar

### Ajustar Valor Final

1. Abra o modal de detalhes
2. Clique em "Ajustar Valor"
3. Preencha novo valor e justificativa obrigatória
4. Confirme o ajuste

### Aplicar Multa por Atraso

1. Abra o modal de detalhes de orçamento aprovado
2. Clique em "Calcular Multa"
3. Sistema calcula automaticamente baseado nos dias de atraso
4. Confirme aplicação da multa

## 5. Armadilhas a Evitar

- ❌ **NUNCA** use um único estado booleano para controlar loading de múltiplas
  ações distintas (ex: aprovar e rejeitar)
- ❌ **NUNCA** renderize dialogs aninhadas fora do `Dialog.BodyContent`
- ❌ **NUNCA** esqueça de sincronizar `nestedDialogOpen` com as dialogs filhas
- ❌ **NUNCA** omita informações de entrega/retirada no modal de detalhes
- ❌ **NÃO** sobrescreva hovers de `admin-action-button`: manter fundo branco e
  permitir `scale` suave para feedback visual

## 6. Lições Aprendidas

### Loading de Múltiplos Botões (Dez 2025)

**Problema**: Botões Aprovar/Rejeitar mostravam loading simultâneo.

**Solução**: Usar estado `updatingAction` para identificar qual ação está em
andamento, além de `isUpdating` para desabilitar botões.

### Dialogs Aninhadas (Dez 2025)

**Problema**: Dialog de exclusão travava a página.

**Solução**: Migrar para dialogs aninhadas Base UI dentro de
`Dialog.BodyContent` com `data-nested-parent`.

## 7. Histórico de Alterações

| Data       | Descrição                                               | Autor |
| ---------- | ------------------------------------------------------- | ----- |
| 2025-12-17 | Corrigido loading simultâneo de botões aprovar/rejeitar | IA    |
| 2025-12-17 | Corrigido dialog de exclusão travando página            | IA    |
| 2025-01    | Sistema de ajuste de valor com justificativa            | IA    |
| 2025-01    | Sistema de multa por atraso                             | IA    |
| 2025-01    | Informações de entrega/retirada no modal                | IA    |

---

_Última atualização: 2025-12-17_
