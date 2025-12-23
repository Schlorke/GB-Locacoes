# 🐛 Bug Crítico: Clique em Eventos do Popover Não Abre Dialog

**Data:** 23 de Dezembro de 2025 **Severidade:** Alta **Status:** 🔴 Não
Resolvido **Componente Afetado:** `AggregatedEventsPopover` + `EventBlock`

---

## 📋 Resumo Executivo

Quando o usuário clica em um evento dentro do popover agregador (badge "+N"), a
dialog de detalhes do evento **não abre**, mesmo que o mesmo evento quando
clicado diretamente no calendário (EventBlock) funcione perfeitamente.

---

## 🎯 Comportamento Esperado

### Fluxo Correto:

1. **Usuário vê 3+ eventos simultâneos** na coluna "Pendentes"
2. **Badge "+2" aparece** no canto inferior direito do 3º evento
3. **Usuário clica no badge "+2"** → Popover abre mostrando eventos ocultos
4. **Usuário clica em um evento no popover** (ex: "Harry Schlorke - Cadeira
   Suspensa Manual 06:22")
5. **Popover fecha automaticamente**
6. **Dialog de detalhes do evento abre** (mesma dialog que abre ao clicar
   diretamente no EventBlock)

### Dialog Esperada:

```
┌─────────────────────────────────────────┐
│ Detalhes do Orçamento                  │
│ Harry Schlorke                         │
│ 23/12/2025 às 06:22                    │
│                                         │
│ Informações do Cliente                 │
│ Email: harryschlorke@gmail.com         │
│ Telefone: (51) 99815-8015              │
│ CPF: 857.190.560-68                    │
│                                         │
│ ID do Orçamento: cmjidlwcb0005ekky...  │
└─────────────────────────────────────────┘
```

---

## ❌ Comportamento Atual (Bug)

### O Que Acontece:

1. ✅ Badge "+2" aparece corretamente
2. ✅ Clicar no badge abre o popover corretamente
3. ✅ Popover mostra eventos ocultos corretamente
4. ✅ Hover funciona (fundo laranja suave)
5. ❌ **Clicar em um evento no popover NÃO abre a dialog**
6. ❌ Popover fecha, mas nada acontece

### Evidências:

- **Console logs aparecem:** Os logs de debug mostram que `onEventClick` existe
  e é chamado
- **Dialog não abre:** A dialog que deveria abrir simplesmente não aparece
- **EventBlock direto funciona:** Clicar diretamente no EventBlock no calendário
  abre a dialog normalmente

---

## 🏗️ Arquitetura Atual

### Hierarquia de Componentes:

```
DailyView (daily-view.tsx)
  └─> EventBlock (event-block.tsx)
      ├─> Renderização Normal (eventos regulares)
      │   └─> onClick={() => onEventClick?.(pos.event)}
      │
      └─> Renderização Badge Agregador (event.isAggregatedIndicator)
          └─> AggregatedEventsPopover (aggregated-events-popover.tsx)
              ├─> PopoverTrigger: badgeElement
              └─> PopoverContent: lista de eventos
                  └─> onClick={() => handleEventClick(event)}
                      └─> handleEventClick chama onEventClick?.(event)
```

### Fluxo de Dados:

```
1. DailyView recebe onEventClick prop
2. DailyView passa para EventBlock: onClick={() => onEventClick?.(pos.event)}
3. EventBlock passa para AggregatedEventsPopover: onEventClick={onClick}
4. AggregatedEventsPopover recebe: onEventClick?: (event: CalendarEvent) => void
5. handleEventClick chama: onEventClick?.(event)
```

---

## 📁 Arquivos Envolvidos

### 1. `components/admin/advanced-calendar/daily-view.tsx`

**Linha 260:**

```typescript
<EventBlock
  key={pos.event.id}
  event={pos.event}
  style={{...position, left: pos.left, width: pos.width}}
  onClick={() => onEventClick?.(pos.event)}  // ✅ Funciona para eventos normais
/>
```

**Prop `onEventClick`:**

```typescript
interface DailyViewProps {
  onEventClick?: (_event: CalendarEvent) => void
  // ...
}
```

### 2. `components/admin/advanced-calendar/event-block.tsx`

**Linhas 47-81: Renderização do Badge Agregador**

```typescript
if (event.isAggregatedIndicator && event.aggregatedEvents) {
  const badgeElement = (
    <div className={/* ... */}>
      {event.title}
    </div>
  )

  return (
    <AggregatedEventsPopover
      trigger={badgeElement}
      events={event.aggregatedEvents}
      date={event.createdAt || event.start}
      onEventClick={onClick}  // ⚠️ Passa o onClick do EventBlock
    />
  )
}
```

**Prop `onClick`:**

```typescript
interface EventBlockProps {
  onClick?: () => void // ⚠️ Tipo: () => void (sem parâmetros!)
  // ...
}
```

### 3. `components/admin/advanced-calendar/aggregated-events-popover.tsx`

**Linhas 13-18: Interface**

```typescript
interface AggregatedEventsPopoverProps {
  trigger: React.ReactNode
  events: CalendarEvent[]
  date: Date
  onEventClick?: (event: CalendarEvent) => void // ✅ Tipo: (event) => void
}
```

**Linhas 28-35: Handler**

```typescript
const handleEventClick = (event: CalendarEvent) => {
  console.log("🔵 Popover: Clicou no evento", event.id, event.title)
  console.log("🔵 Popover: onEventClick existe?", !!onEventClick)

  setOpen(false)

  setTimeout(() => {
    console.log("🟢 Popover: Executando onEventClick")
    onEventClick?.(event) // ⚠️ Chama com o evento
  }, 100)
}
```

**Linhas 46-54: Renderização dos Eventos**

```typescript
{events.map((event) => (
  <div
    key={event.id}
    className="p-2 rounded hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition-all duration-200"
    onClick={(e) => {
      e.stopPropagation()
      handleEventClick(event)
    }}
  >
    {/* Conteúdo do evento */}
  </div>
))}
```

---

## 🔍 Análise do Problema

### Problema Identificado: Incompatibilidade de Tipos

**EventBlock.onClick:**

```typescript
onClick?: () => void  // ❌ Não recebe parâmetros
```

**AggregatedEventsPopover.onEventClick:**

```typescript
onEventClick?: (event: CalendarEvent) => void  // ✅ Recebe evento como parâmetro
```

**Quando EventBlock passa `onClick` para AggregatedEventsPopover:**

```typescript
<AggregatedEventsPopover
  onEventClick={onClick}  // ⚠️ onClick é () => void, mas espera (event) => void
/>
```

**Resultado:**

- TypeScript pode não reclamar (porque `() => void` é compatível com
  `(event) => void` em alguns contextos)
- Mas quando `handleEventClick` chama `onEventClick?.(event)`, o `onClick`
  original não recebe o evento
- O `onClick` original espera que o evento já esteja "capturado" no closure

### O Que Acontece:

1. `EventBlock` recebe `onClick={() => onEventClick?.(pos.event)}`
2. `pos.event` é o evento agregador (badge "+N"), não os eventos individuais
3. Quando passa `onClick` para `AggregatedEventsPopover`, o closure já está
   "fechado" com o evento errado
4. `handleEventClick` tenta passar um evento diferente, mas o `onClick` original
   ignora

---

## 🧪 Testes Realizados

### Teste 1: Verificar se onEventClick é chamado

**Resultado:** ✅ Sim, logs aparecem no console

### Teste 2: Verificar se onEventClick existe

**Resultado:** ✅ Sim, `!!onEventClick` retorna `true`

### Teste 3: Verificar se o evento é passado corretamente

**Resultado:** ✅ Sim, `event.id` e `event.title` aparecem nos logs

### Teste 4: Verificar se a dialog abre ao clicar diretamente no EventBlock

**Resultado:** ✅ Sim, funciona perfeitamente

### Teste 5: Verificar se há erros no console

**Resultado:** ✅ Não há erros JavaScript

---

## 🔧 Tentativas de Correção (Já Realizadas)

### Tentativa 1: Adicionar delay

```typescript
setTimeout(() => {
  onEventClick?.(event)
}, 100)
```

**Resultado:** ❌ Não funcionou

### Tentativa 2: Adicionar stopPropagation

```typescript
onClick={(e) => {
  e.stopPropagation()
  handleEventClick(event)
}}
```

**Resultado:** ❌ Não funcionou

### Tentativa 3: Controlar estado do popover

```typescript
const [open, setOpen] = useState(false)
<Popover open={open} onOpenChange={setOpen}>
```

**Resultado:** ❌ Não funcionou

### Tentativa 4: Adicionar logs de debug

**Resultado:** ✅ Logs aparecem, mas dialog não abre

---

## 💡 Hipóteses do Problema

### Hipótese 1: Incompatibilidade de Tipos (MAIS PROVÁVEL)

O `onClick` do EventBlock é `() => void`, mas precisa ser
`(event: CalendarEvent) => void` para funcionar com o popover.

**Solução Proposta:**

```typescript
// Em event-block.tsx
interface EventBlockProps {
  onClick?: (event: CalendarEvent) => void  // Mudar tipo
}

// Ao passar para AggregatedEventsPopover
<AggregatedEventsPopover
  onEventClick={(event) => onClick?.(event)}  // Passar função que recebe evento
/>
```

### Hipótese 2: Closure Capturado Incorretamente

O `onClick` está capturando o evento agregador em vez dos eventos individuais.

**Solução Proposta:**

```typescript
// Em event-block.tsx, ao criar o badge
const handleBadgeEventClick = (clickedEvent: CalendarEvent) => {
  onClick?.()  // Chama o onClick original, mas precisa passar o evento correto
}

// Passar função que recebe evento
<AggregatedEventsPopover
  onEventClick={handleBadgeEventClick}
/>
```

### Hipótese 3: Conflito de Z-Index ou Overlay

O popover pode estar bloqueando a abertura da dialog.

**Solução Proposta:**

- Aumentar delay para 200ms
- Usar `requestAnimationFrame` em vez de `setTimeout`
- Verificar se há overlays bloqueando

### Hipótese 4: Dialog Não Está Sendo Renderizada

A dialog pode estar sendo criada, mas não visível.

**Solução Proposta:**

- Verificar z-index da dialog
- Verificar se há `display: none` ou `visibility: hidden`
- Verificar se a dialog está sendo renderizada no DOM

---

## 📊 Informações Técnicas Detalhadas

### Estrutura do Evento CalendarEvent

```typescript
interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  resourceId?: string
  color: string
  type: "delivery" | "pickup" | "maintenance" | "rental"
  status: string
  metadata?: Record<string, unknown>
  createdAt?: Date
  isPendingRequest?: boolean
  isAggregatedIndicator?: boolean
  aggregatedEvents?: CalendarEvent[]
  // ...
}
```

### Exemplo de Evento no Popover

```typescript
{
  id: "cmjidlwcb0005ekkyhjjbo7vz",
  title: "Harry Schlorke - Cadeira Suspensa Manual",
  start: Date("2025-12-23T06:22:00"),
  end: Date("2025-12-23T06:52:00"),
  createdAt: Date("2025-12-23T06:22:00"),
  color: "rgba(249, 115, 22, 0.125)",
  status: "pending",
  isPendingRequest: true,
  // ...
}
```

### Como a Dialog é Aberta (Funcionando no EventBlock Direto)

**Arquivo:** `components/admin/advanced-calendar/index.tsx`

**Linha 101-112:**

```typescript
const handleEventClick = (event: CalendarEvent) => {
  if (onEventClick) {
    onEventClick(event)
  } else {
    // Fallback: abre painel de detalhes interno
    setSelectedEvent(event)
    setIsDetailsPanelOpen(true)
  }
}
```

**Linha 29:**

```typescript
interface DailyViewProps {
  onEventClick?: (_event: CalendarEvent) => void // ✅ Recebe CalendarEvent
  // ...
}
```

**Passado para DailyView (linha ~113):**

```typescript
<DailyView
  onEventClick={handleEventClick}  // ✅ Funciona para eventos normais
  // ...
/>
```

**Fluxo Completo:**

```
AdvancedCalendar.handleEventClick (recebe CalendarEvent)
  └─> DailyView.onEventClick (recebe CalendarEvent)
      └─> EventBlock.onClick={() => onEventClick?.(pos.event)}
          └─> ❌ PROBLEMA: onClick é () => void, não recebe evento
```

---

## 🎯 Solução Recomendada

### Opção 1: Corrigir Tipo do onClick no EventBlock (RECOMENDADA)

**Esta é a solução mais direta e correta.**

**Problema Raiz:**

- `EventBlock.onClick` é `() => void` (não recebe parâmetros)
- `DailyView.onEventClick` é `(event: CalendarEvent) => void` (recebe evento)
- Quando EventBlock cria closure `onClick={() => onEventClick?.(pos.event)}`, o
  evento já está "capturado"
- Quando AggregatedEventsPopover tenta passar um evento diferente, o closure
  original ignora

**Solução:**

**Arquivo 1: `components/admin/advanced-calendar/event-block.tsx`**

**Mudança 1: Interface (linha 19)**

```typescript
interface EventBlockProps {
  event: CalendarEvent
  style: {...}
  onClick?: (event: CalendarEvent) => void  // ✅ Mudar de () => void para (event) => void
  className?: string
}
```

**Mudança 2: Renderização Normal (linha ~97)**

```typescript
// Atualizar para passar o evento
<div
  onClick={(e) => {
    e.stopPropagation()
    onClick?.(event)  // ✅ Passar o evento do EventBlock
  }}
>
```

**Mudança 3: Renderização Badge (linha 79)**

```typescript
<AggregatedEventsPopover
  trigger={badgeElement}
  events={event.aggregatedEvents}
  date={event.createdAt || event.start}
  onEventClick={onClick}  // ✅ Agora onClick aceita evento, então funciona!
/>
```

**Arquivo 2: `components/admin/advanced-calendar/daily-view.tsx`**

**Mudança: Linha 260**

```typescript
// ANTES:
<EventBlock
  onClick={() => onEventClick?.(pos.event)}  // ❌ Closure captura pos.event
/>

// DEPOIS:
<EventBlock
  onClick={(event) => onEventClick?.(event)}  // ✅ Recebe evento como parâmetro
/>
```

**Mas espera!** O problema é que `pos.event` no caso do badge é o evento
agregador, não os eventos individuais. Então precisamos de uma abordagem
diferente:

**Solução Alternativa (Mais Segura):**

**Arquivo: `components/admin/advanced-calendar/event-block.tsx`**

**Mudança na renderização do badge:**

```typescript
// Em vez de passar onClick diretamente, criar handler que recebe evento
const handleAggregatedEventClick = (clickedEvent: CalendarEvent) => {
  // onClick agora precisa aceitar evento, então:
  onClick?.(clickedEvent)  // Passa o evento clicado no popover
}

return (
  <AggregatedEventsPopover
    trigger={badgeElement}
    events={event.aggregatedEvents}
    date={event.createdAt || event.start}
    onEventClick={handleAggregatedEventClick}  // ✅ Handler específico
  />
)
```

### Opção 2: Criar Handler Específico no EventBlock

**Arquivo:** `components/admin/advanced-calendar/event-block.tsx`

```typescript
// Dentro do componente EventBlock
const handleAggregatedEventClick = (clickedEvent: CalendarEvent) => {
  // Chama o onClick original, mas com o evento correto
  // Precisaria mudar onClick para aceitar evento também
  onClick?.()
}
```

### Opção 3: Passar onEventClick Diretamente do DailyView

**Arquivo:** `components/admin/advanced-calendar/daily-view.tsx`

```typescript
// Ao renderizar EventBlock com badge
{pos.event.isAggregatedIndicator ? (
  <AggregatedEventsPopover
    trigger={badgeElement}
    events={pos.event.aggregatedEvents}
    date={pos.event.createdAt || pos.event.start}
    onEventClick={onEventClick}  // ✅ Passar diretamente do DailyView
  />
) : (
  <EventBlock
    onClick={() => onEventClick?.(pos.event)}
  />
)}
```

---

## 📝 Checklist para Correção

- [ ] Identificar onde `onEventClick` é definido no componente pai (DailyView)
- [ ] Verificar se `onEventClick` recebe `CalendarEvent` como parâmetro
- [ ] Corrigir tipo de `onClick` em `EventBlockProps` para aceitar evento
- [ ] Atualizar todas as chamadas de `onClick` para passar o evento
- [ ] Testar clique em EventBlock normal (deve continuar funcionando)
- [ ] Testar clique em evento do popover (deve abrir dialog)
- [ ] Remover logs de debug após correção
- [ ] Validar que não há regressões

---

## 🔗 Arquivos para Revisar

1. **`components/admin/advanced-calendar/daily-view.tsx`**
   - Linha 260: Como `onClick` é passado para EventBlock
   - Linha 29: Definição de `onEventClick` prop

2. **`components/admin/advanced-calendar/event-block.tsx`**
   - Linha 8-20: Interface `EventBlockProps`
   - Linha 47-81: Renderização do badge agregador
   - Linha 79: Como `onClick` é passado para AggregatedEventsPopover

3. **`components/admin/advanced-calendar/aggregated-events-popover.tsx`**
   - Linha 13-18: Interface `AggregatedEventsPopoverProps`
   - Linha 28-35: Handler `handleEventClick`
   - Linha 50-53: Clique nos eventos do popover

4. **`app/admin/rentals/page.tsx`** (ou onde DailyView é usado)
   - Como `onEventClick` é definido e passado para DailyView

---

## 🎓 Conclusão

O problema está na **incompatibilidade de tipos** entre `EventBlock.onClick` e
`AggregatedEventsPopover.onEventClick`. O `onClick` do EventBlock não recebe o
evento como parâmetro, então quando o popover tenta passar o evento, ele é
ignorado.

**A solução mais direta é:**

1. Mudar `EventBlock.onClick` para `(event: CalendarEvent) => void`
2. Atualizar todas as chamadas para passar o evento
3. Garantir que o popover passe o evento correto para o handler

---

---

## 📋 Instruções Passo a Passo para Correção

### Passo 1: Atualizar Interface do EventBlock

**Arquivo:** `components/admin/advanced-calendar/event-block.tsx`

**Linha 19:**

```typescript
// ANTES:
onClick?: () => void

// DEPOIS:
onClick?: (event: CalendarEvent) => void
```

### Passo 2: Atualizar Renderização Normal do EventBlock

**Arquivo:** `components/admin/advanced-calendar/event-block.tsx`

**Linha ~97 (dentro do return do componente):**

```typescript
// ANTES:
<div
  onClick={onClick}
  // ...
>

// DEPOIS:
<div
  onClick={(e) => {
    e.stopPropagation()
    onClick?.(event)  // Passa o evento do EventBlock
  }}
  // ...
>
```

### Passo 3: Atualizar Renderização do Badge Agregador

**Arquivo:** `components/admin/advanced-calendar/event-block.tsx`

**Linha ~47-81:**

```typescript
// ANTES:
<AggregatedEventsPopover
  onEventClick={onClick}  // ❌ onClick não aceita evento
/>

// DEPOIS:
const handleAggregatedEventClick = (clickedEvent: CalendarEvent) => {
  onClick?.(clickedEvent)  // ✅ Passa o evento clicado
}

return (
  <AggregatedEventsPopover
    trigger={badgeElement}
    events={event.aggregatedEvents}
    date={event.createdAt || event.start}
    onEventClick={handleAggregatedEventClick}  // ✅ Handler específico
  />
)
```

### Passo 4: Atualizar Chamada no DailyView

**Arquivo:** `components/admin/advanced-calendar/daily-view.tsx`

**Linha 260:**

```typescript
// ANTES:
<EventBlock
  onClick={() => onEventClick?.(pos.event)}
/>

// DEPOIS:
<EventBlock
  onClick={(event) => onEventClick?.(event)}  // ✅ Recebe evento como parâmetro
/>
```

### Passo 5: Remover Logs de Debug

**Arquivo:** `components/admin/advanced-calendar/aggregated-events-popover.tsx`

**Linhas 28-35:**

```typescript
// Remover console.logs:
const handleEventClick = (event: CalendarEvent) => {
  setOpen(false)
  setTimeout(() => {
    onEventClick?.(event)
  }, 100)
}
```

### Passo 6: Testar

1. ✅ Criar 4+ eventos simultâneos
2. ✅ Clicar no badge "+N"
3. ✅ Clicar em um evento no popover
4. ✅ Verificar se a dialog abre
5. ✅ Verificar se o evento correto é exibido

---

## 🎯 Resumo Executivo para Outra IA

**Problema:** Clique em eventos do popover agregador não abre dialog de
detalhes.

**Causa Raiz:** Incompatibilidade de tipos - `EventBlock.onClick` é
`() => void`, mas precisa ser `(event: CalendarEvent) => void` para funcionar
com o popover.

**Solução:**

1. Mudar tipo de `onClick` em `EventBlockProps` para aceitar `CalendarEvent`
2. Atualizar todas as chamadas de `onClick` para passar o evento
3. Criar handler específico no badge que recebe evento do popover

**Arquivos a Modificar:**

- `components/admin/advanced-calendar/event-block.tsx` (3 mudanças)
- `components/admin/advanced-calendar/daily-view.tsx` (1 mudança)
- `components/admin/advanced-calendar/aggregated-events-popover.tsx` (remover
  logs)

**Tempo Estimado:** 15-20 minutos

**Complexidade:** Baixa (mudanças de tipo e handlers)

---

**Documento criado em:** 23 de Dezembro de 2025 **Última atualização:** 23 de
Dezembro de 2025 **Status:** Aguardando correção
