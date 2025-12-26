# Sistema de Notificações - GB Locações

## 📋 Visão Geral

O sistema de notificações da GB Locações foi projetado para manter os usuários
informados sobre eventos importantes relacionados a orçamentos, pedidos,
pagamentos, equipamentos, locações, entregas, contratos e sistema. O sistema
inclui notificações visuais no header, página dedicada na área do cliente e
**persistência real no banco de dados** via PostgreSQL.

## 🎯 Funcionalidades Principais

### 1. **Notificações do Usuário**

- **Orçamentos**: Criação, aprovação, rejeição
- **Pedidos**: Confirmação, atualizações de status
- **Pagamentos**: Confirmação de pagamento
- **Equipamentos**: Disponibilidade, estoque baixo
- **Locações**: Início, término próximo, extensões
- **Entregas**: Agendamento, conclusão
- **Contratos**: Disponibilidade para assinatura
- **Sistema**: Manutenções, promoções

### 2. **Notificações do Carrinho**

- Contador de itens no carrinho (badge visual)
- Alertas de carrinho abandonado (após 5 minutos de inatividade)

### 3. **Interface Visual**

- Badges com contadores (estilo WhatsApp)
- Dropdown de notificações no header
- Página dedicada na área do cliente
- Animações suaves com Framer Motion
- **Bolinha azul** para indicar notificação não lida
- **Fundo laranja animado** que desaparece gradualmente ao marcar como lida
- **Badge vermelho** no sininho da sidebar indicando novas notificações

## 🏗️ Arquitetura

### Modelo de Dados (Prisma)

```prisma
model Notification {
  id         String               @id @default(cuid())
  userId     String
  type       NotificationType
  title      String
  message    String
  priority   NotificationPriority @default(MEDIUM)
  isRead     Boolean              @default(false)
  actionUrl  String?
  metadata   Json?
  createdAt  DateTime             @default(now())
  readAt     DateTime?

  @@index([userId])
  @@index([isRead])
  @@index([createdAt])
  @@index([type])
  @@map("notifications")
}

enum NotificationType {
  QUOTE
  ORDER
  PAYMENT
  EQUIPMENT
  SYSTEM
  RENTAL
  DELIVERY
  CONTRACT
}

enum NotificationPriority {
  LOW
  MEDIUM
  HIGH
}
```

### APIs REST

| Endpoint                                  | Método | Descrição                    |
| :---------------------------------------- | :----- | :--------------------------- |
| `/api/client/notifications`               | GET    | Lista paginada com filtros   |
| `/api/client/notifications/[id]`          | PATCH  | Marcar como lida             |
| `/api/client/notifications/[id]`          | DELETE | Deletar notificação          |
| `/api/client/notifications/mark-all-read` | POST   | Marcar todas como lidas      |
| `/api/client/notifications/stats`         | GET    | Estatísticas de notificações |

### Query Parameters (GET /api/client/notifications)

| Parâmetro | Tipo   | Descrição                                |
| :-------- | :----- | :--------------------------------------- |
| `page`    | number | Página (default: 1)                      |
| `limit`   | number | Itens por página (default: 20, max: 100) |
| `type`    | string | Filtrar por tipo (QUOTE, ORDER, etc.)    |
| `isRead`  | string | Filtrar por status (true/false)          |

### Hooks Principais

#### `useNotifications`

```typescript
const {
  notifications, // Lista de todas as notificações
  unreadNotifications, // Notificações não lidas
  highPriorityNotifications, // Notificações de alta prioridade não lidas
  stats, // Estatísticas (total, não lidas, por tipo)
  isLoading, // Estado de carregamento
  error, // Erro, se houver
  markAsRead, // Marcar como lida
  markAllAsRead, // Marcar todas como lidas
  removeNotification, // Remover notificação
  clearAll, // Limpar todas (local)
  refresh // Recarregar da API
} = useNotifications()
```

#### `useCartNotifications`

```typescript
const {
  itemCount, // Número de itens no carrinho
  totalPrice, // Preço total
  hasItems, // Se tem itens
  items // Lista de itens
} = useCartNotifications()
```

## 🔧 Serviço de Notificações (Backend)

### Localização

`lib/notification-service.ts`

### Criando Notificações no Servidor

```typescript
import {
  notifyQuoteApproved,
  notifyPaymentReceived,
  notifyDeliveryScheduled,
  createNotification
} from "@/lib/notification-service"

// Notificação de orçamento aprovado
await notifyQuoteApproved(userId, quoteId, "Betoneira 400L")

// Notificação de pagamento
await notifyPaymentReceived(userId, 1250.0, "PED-2024-001")

// Notificação de entrega agendada
await notifyDeliveryScheduled(userId, rentalId, new Date("2025-01-15"))

// Notificação customizada
await createNotification({
  userId,
  type: NotificationType.SYSTEM,
  title: "Promoção Especial!",
  message: "Desconto de 20% em locações mensais",
  priority: NotificationPriority.MEDIUM,
  actionUrl: "/equipamentos"
})
```

### Helpers Disponíveis

| Função                     | Tipo      | Prioridade  |
| :------------------------- | :-------- | :---------- |
| `notifyQuoteCreated`       | QUOTE     | MEDIUM      |
| `notifyQuoteApproved`      | QUOTE     | HIGH        |
| `notifyQuoteRejected`      | QUOTE     | MEDIUM      |
| `notifyPaymentReceived`    | PAYMENT   | HIGH        |
| `notifyEquipmentAvailable` | EQUIPMENT | MEDIUM      |
| `notifyRentalStarted`      | RENTAL    | HIGH        |
| `notifyRentalEndingSoon`   | RENTAL    | HIGH/MEDIUM |
| `notifyDeliveryScheduled`  | DELIVERY  | MEDIUM      |
| `notifyDeliveryCompleted`  | DELIVERY  | HIGH        |
| `notifyContractReady`      | CONTRACT  | HIGH        |
| `notifySystem`             | SYSTEM    | LOW         |

## 📱 Integração no Header

### Desktop

- **Usuário logado**: Dropdown de notificações com badge
- **Usuário não logado**: Botão de login
- **Carrinho**: Sempre visível com contador de itens

### Mobile

- **Usuário logado**: Dropdown + botão de carrinho com notificações
- **Usuário não logado**: Botões de login/cadastro

### Sincronização

O contador de notificações não lidas é sincronizado entre componentes via:

1. **localStorage**: Chave `gb-locacoes-unread-count`
2. **CustomEvent**: Evento `notificationUpdate` com `detail.unreadCount`

```typescript
// Disparar atualização
window.dispatchEvent(
  new CustomEvent("notificationUpdate", { detail: { unreadCount: 5 } })
)

// Escutar atualização
window.addEventListener("notificationUpdate", (e) => {
  console.log("Não lidas:", e.detail.unreadCount)
})
```

## 🎨 Tipos de Notificação

### Por Categoria

- **📋 Orçamento (QUOTE)**: Relacionadas a orçamentos
- **📦 Pedido (ORDER)**: Relacionadas a pedidos
- **💳 Pagamento (PAYMENT)**: Relacionadas a pagamentos
- **🔧 Equipamento (EQUIPMENT)**: Relacionadas a equipamentos
- **📦 Locação (RENTAL)**: Relacionadas a locações
- **🚚 Entrega (DELIVERY)**: Relacionadas a entregas
- **📄 Contrato (CONTRACT)**: Relacionadas a contratos
- **🔔 Sistema (SYSTEM)**: Relacionadas ao sistema

### Por Prioridade

- **🔴 Alta (HIGH)**: Requer atenção imediata
- **🟡 Média (MEDIUM)**: Importante mas não urgente
- **🔵 Baixa (LOW)**: Informativa

## 📄 Página de Notificações

### Localização

`/area-cliente/notificacoes`

### Funcionalidades

- **Lista paginada** de notificações ordenadas por data
- **Botão "Marcar todas como lidas"** (visível quando há não lidas)
- **Botão de atualizar** para recarregar da API
- **Ações por notificação**: Ver (se tiver actionUrl), Marcar como lida, Deletar
- **Loading state** com spinner
- **Error state** com botão de retry
- **Empty state** informativo

### Elementos Visuais Preservados

- **Bolinha azul**: Canto superior direito de cada notificação não lida
- **Fundo laranja animado**: Gradiente que desaparece ao marcar como lida
- **Badge vermelho no sininho**: Indica novas notificações na sidebar

## 🎭 Animações

### Framer Motion

- **Entrada**: Fade in + slide up
- **Saída**: Fade out + slide down
- **Hover**: Scale + shadow
- **Badge**: Pulse para não lidas
- **Dropdown**: Scale + opacity

### Transições

- **Duração**: 200ms para interações
- **Easing**: Suave e natural
- **Stagger**: 100ms entre itens de lista

### Animação do Fundo Laranja

```css
.transition-opacity.duration-1000.ease-in-out
```

O fundo laranja usa `opacity-100` quando não lida e `opacity-0` quando lida, com
transição de 1000ms para efeito gradual.

## ♿ Acessibilidade

### ARIA Labels

- Botões com `aria-label` descritivo
- Selects com `aria-label` para filtros
- Estados de loading anunciados

### Navegação por Teclado

- Tab navigation funcional
- Escape para fechar dropdowns
- Enter para ativar botões

### Contraste

- Cores com contraste adequado
- Estados visuais claros
- Texto legível em todos os tamanhos

## 🧪 Integração com Eventos do Sistema

Para integrar notificações com eventos do sistema, use os helpers do serviço nos
endpoints de API ou server actions:

### Exemplo: Ao Aprovar Orçamento

```typescript
// app/api/admin/quotes/[id]/approve/route.ts
import { notifyQuoteApproved } from "@/lib/notification-service"

export async function POST(req, { params }) {
  const quote = await prisma.quote.update({
    where: { id: params.id },
    data: { status: "APPROVED" },
    include: { items: { include: { equipment: true } } }
  })

  // Notificar cliente
  if (quote.userId) {
    const equipmentName = quote.items[0]?.equipment.name || "Equipamento"
    await notifyQuoteApproved(quote.userId, quote.id, equipmentName)
  }

  return NextResponse.json(quote)
}
```

## 📊 Métricas e Analytics

### Estatísticas Disponíveis

- Total de notificações
- Notificações não lidas
- Contagem por tipo
- Contagem por prioridade

### Eventos Rastreados

- Criação de notificação
- Leitura de notificação
- Remoção de notificação
- Ações do carrinho

## 🔮 Melhorias Futuras

### Funcionalidades Planejadas

- **Push Notifications**: Notificações do navegador
- **Email Notifications**: Notificações por email
- **Templates**: Templates personalizáveis
- **Agrupamento**: Agrupar notificações similares
- **Preferências**: Configurações de notificação por usuário
- **WebSocket**: Notificações em tempo real

### Otimizações

- **Lazy Loading**: Carregar notificações sob demanda
- **Virtual Scrolling**: Para listas grandes
- **Service Worker**: Notificações offline

## 🐛 Troubleshooting

### Problemas Comuns

#### Notificações não aparecem

- Verificar se o usuário está logado
- Verificar se a tabela `notifications` existe no banco
- Verificar console para erros de API

#### Badge não atualiza

- Verificar se o evento `notificationUpdate` está sendo disparado
- Verificar localStorage `gb-locacoes-unread-count`
- Verificar se o componente está escutando o evento

#### Performance lenta

- Verificar se há muitas notificações (use paginação)
- Verificar se as animações estão otimizadas
- Verificar índices no banco de dados

### Debug

```typescript
// Verificar notificações via API
fetch("/api/client/notifications")
  .then((r) => r.json())
  .then(console.log)

// Verificar estatísticas
fetch("/api/client/notifications/stats")
  .then((r) => r.json())
  .then(console.log)

// Verificar contador local
console.log(localStorage.getItem("gb-locacoes-unread-count"))
```

---

**Última atualização**: Dezembro 2025 **Versão**: 2.0 (Persistência no Banco)
**Status**: ✅ Implementado e Funcional
