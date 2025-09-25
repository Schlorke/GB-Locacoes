# Sistema de Notificações - GB Locações

## 📋 Visão Geral

O sistema de notificações da GB Locações foi projetado para manter os usuários
informados sobre eventos importantes relacionados a orçamentos, pedidos,
pagamentos, equipamentos e sistema. O sistema inclui notificações visuais no
header, página dedicada na área do cliente e integração com o carrinho de
compras.

## 🎯 Funcionalidades Principais

### 1. **Notificações do Usuário**

- **Orçamentos**: Criação, aprovação, rejeição
- **Pedidos**: Confirmação, atualizações de status
- **Pagamentos**: Confirmação de pagamento
- **Equipamentos**: Disponibilidade, estoque baixo
- **Sistema**: Manutenções, promoções

### 2. **Notificações do Carrinho**

- Contador de itens no carrinho
- Notificações de adição/remoção de itens
- Alertas de carrinho abandonado
- Atualizações de preço

### 3. **Interface Visual**

- Badges com contadores (estilo WhatsApp)
- Dropdown de notificações no header
- Página dedicada na área do cliente
- Animações suaves com Framer Motion

## 🏗️ Arquitetura

### Hooks Principais

#### `useNotifications`

```typescript
const {
  notifications, // Lista de todas as notificações
  unreadNotifications, // Notificações não lidas
  stats, // Estatísticas (total, não lidas, por tipo)
  addNotification, // Adicionar nova notificação
  markAsRead, // Marcar como lida
  markAllAsRead, // Marcar todas como lidas
  removeNotification, // Remover notificação
  clearAll // Limpar todas
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

### Componentes

#### `NotificationBadge`

```tsx
<NotificationBadge
  count={5}
  variant="pulse" // default, dot, pulse
  size="sm" // sm, md, lg
  maxCount={99}
/>
```

#### `NotificationBadgeWrapper`

```tsx
<NotificationBadgeWrapper count={itemCount} size="sm">
  <Button>Carrinho</Button>
</NotificationBadgeWrapper>
```

#### `NotificationDropdown`

```tsx
<NotificationDropdown className="custom-class" />
```

## 📱 Integração no Header

### Desktop

- **Usuário logado**: Dropdown de notificações com badge
- **Usuário não logado**: Botão de login
- **Carrinho**: Sempre visível com contador de itens

### Mobile

- **Usuário logado**: Dropdown + botão de carrinho com notificações
- **Usuário não logado**: Botões de login/cadastro

## 🎨 Tipos de Notificação

### Por Categoria

- **📋 Orçamento**: Relacionadas a orçamentos
- **📦 Pedido**: Relacionadas a pedidos
- **💳 Pagamento**: Relacionadas a pagamentos
- **🔧 Equipamento**: Relacionadas a equipamentos
- **🔔 Sistema**: Relacionadas ao sistema

### Por Prioridade

- **🔴 Alta**: Requer atenção imediata
- **🟡 Média**: Importante mas não urgente
- **🔵 Baixa**: Informativa

## 💾 Persistência

### LocalStorage

- Notificações são salvas por usuário (email)
- Chave: `gb-locacoes-notifications-{email}`
- Limite: 50 notificações mais recentes
- Limpeza automática de notificações antigas

### Carrinho

- Integrado com Zustand store existente
- Persistência automática via localStorage
- Sincronização entre abas

## 🔧 Helpers de Notificação

### Orçamentos

```typescript
const helpers = createNotificationHelpers(addNotification)

// Novo orçamento
helpers.newQuote("Betoneira 400L", "quote-123")

// Orçamento aprovado
helpers.quoteApproved("Betoneira 400L", "quote-123")

// Orçamento rejeitado
helpers.quoteRejected("Betoneira 400L", "Motivo: Estoque insuficiente")
```

### Pedidos

```typescript
// Novo pedido
helpers.newOrder("PED-2024-001")

// Atualização de status
helpers.orderStatusUpdate("PED-2024-001", "Em transporte")
```

### Pagamentos

```typescript
// Pagamento confirmado
helpers.paymentReceived(1250.0, "PED-2024-001")
```

### Equipamentos

```typescript
// Equipamento disponível
helpers.equipmentAvailable("Guincho Elétrico 500kg")
```

### Sistema

```typescript
// Manutenção
helpers.systemMaintenance("Sistema será atualizado hoje às 23h")

// Promoção
helpers.promotion(
  "Promoção Especial!",
  "Desconto de 20% em equipamentos para aluguel mensal",
  "/equipamentos"
)
```

## 📄 Página de Notificações

### Localização

`/area-cliente/notificacoes`

### Funcionalidades

- **Filtros**: Por tipo, status (lida/não lida)
- **Busca**: Por título e mensagem
- **Ordenação**: Por data, prioridade
- **Ações**: Marcar como lida, remover, limpar todas
- **Demo**: Componente para testar notificações

### Interface

- Lista paginada de notificações
- Badges de prioridade e tipo
- Timestamps relativos
- Ações contextuais
- Estados vazios informativos

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

## 🧪 Testes

### Componente de Demo

```tsx
import { NotificationDemo } from "@/components/notification-demo"

// Renderiza botões para testar cada tipo de notificação
;<NotificationDemo />
```

### Hook de Demo

```tsx
import { useNotificationDemo } from "@/hooks/use-notification-demo"

const { testQuoteNotification } = useNotificationDemo()
```

## 🚀 Uso Prático

### 1. Adicionar Notificação

```typescript
import { useNotifications } from "@/hooks/use-notifications"

const { addNotification } = useNotifications()

addNotification({
  type: "quote",
  title: "Orçamento Aprovado",
  message: "Seu orçamento foi aprovado!",
  priority: "high",
  actionUrl: "/area-cliente/orcamentos/123"
})
```

### 2. Integrar no Componente

```tsx
import { NotificationBadgeWrapper } from '@/components/ui/notification-badge'
import { useCartNotifications } from '@/hooks/use-cart-notifications'

const { itemCount } = useCartNotifications()

<NotificationBadgeWrapper count={itemCount}>
  <Button>Carrinho</Button>
</NotificationBadgeWrapper>
```

### 3. Usar Helpers

```typescript
import { createNotificationHelpers } from "@/hooks/use-notifications"

const helpers = createNotificationHelpers(addNotification)
helpers.quoteApproved("Equipamento", "quote-123")
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

### Otimizações

- **Lazy Loading**: Carregar notificações sob demanda
- **Virtual Scrolling**: Para listas grandes
- **WebSocket**: Notificações em tempo real
- **Service Worker**: Notificações offline

## 🐛 Troubleshooting

### Problemas Comuns

#### Notificações não aparecem

- Verificar se o usuário está logado
- Verificar localStorage do navegador
- Verificar console para erros

#### Badge não atualiza

- Verificar se o hook está sendo usado corretamente
- Verificar se o componente está re-renderizando
- Verificar se o estado está sendo atualizado

#### Performance lenta

- Verificar se há muitas notificações (limite: 50)
- Verificar se as animações estão otimizadas
- Verificar se o localStorage não está corrompido

### Debug

```typescript
// Verificar notificações no console
console.log(useNotifications())

// Verificar carrinho
console.log(useCartNotifications())

// Limpar todas as notificações
const { clearAll } = useNotifications()
clearAll()
```

---

**Última atualização**: Janeiro 2025  
**Versão**: 1.0  
**Status**: ✅ Implementado e Funcional
