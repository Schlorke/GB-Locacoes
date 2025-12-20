# 📅 Sistema de Calendário Avançado - Documentação Completa

## 🎯 Visão Geral

O **Sistema de Calendário Avançado** (`AdvancedCalendar`) é um componente
robusto e flexível implementado no projeto GB-Locações para visualização
temporal de eventos operacionais. Ele oferece quatro modos de visualização
distintos (Diário, Semanal, Mensal e Timeline/Equipamentos) que permitem aos
administradores gerenciar e monitorar diferentes aspectos das operações da
empresa de locação de equipamentos.

---

## 📍 Onde Está Implementado

O sistema de calendário está implementado nas seguintes páginas administrativas:

### 1. **`/admin/maintenance`** - Calendário de Manutenções

- **Propósito**: Visualizar e gerenciar manutenções preventivas, corretivas e
  inspeções de equipamentos
- **Recursos**: Suporta múltiplos equipamentos como "recursos" (colunas
  separadas na visão diária)
- **Eventos**: Manutenções agendadas, em andamento, concluídas e canceladas
- **Cores**:
  - 🟢 Verde (`#10B981`) - Manutenções Preventivas
  - 🟡 Amarelo (`#F59E0B`) - Manutenções Corretivas
  - 🔵 Índigo (`#6366F1`) - Inspeções

### 2. **`/admin/logistics`** - Calendário de Logística

- **Propósito**: Gerenciar entregas e coletas de equipamentos
- **Recursos**: Veículos e rotas de entrega
- **Eventos**: Entregas e coletas agendadas
- **Duração**: Fixa de 2 horas por evento (janela de entrega/coleta)

### 3. **`/admin/rentals`** - Calendário de Locações

- **Propósito**: Visualizar todas as locações ativas e futuras
- **Recursos**: Equipamentos locados
- **Eventos**: Períodos de locação (início e fim)
- **Informações**: Nomes dos equipamentos, cliente, obra

### 4. **`/admin/orcamentos`** - Calendário de Orçamentos

- **Propósito**: Visualizar orçamentos por período
- **Recursos**: Orçamentos pendentes, aprovados e rejeitados
- **Eventos**: Períodos de interesse dos clientes (datas de início e fim
  solicitadas)

---

## 🎨 Os Quatro Modos de Visualização

### 1. 📆 **VISÃO DIÁRIA** (`daily`)

#### **Características Técnicas**

- **Grade de Horas**: 24 horas (00:00 até 23:00)
- **Altura Total**: 1440px (60px por hora × 24 horas)
- **Precisão**: Posicionamento por minuto (1px = 1 minuto)
- **Colunas de Recursos**: Suporta múltiplas colunas quando há recursos
  definidos (ex.: equipamentos diferentes)

#### **Estrutura Visual**

```
┌─────────┬──────────────┬──────────────┬──────────────┐
│ Horas   │ Recurso 1    │ Recurso 2    │ Recurso 3    │
├─────────┼──────────────┼──────────────┼──────────────┤
│ 00:00   │              │              │              │
│ 01:00   │  [Evento]    │              │              │
│ 02:00   │              │  [Evento]    │              │
│ ...     │              │              │              │
│ 23:00   │              │              │              │
└─────────┴──────────────┴──────────────┴──────────────┘
```

#### **Funcionalidades Específicas**

- **Indicador de Tempo Atual**: Linha laranja que mostra a hora atual
  (atualizada a cada minuto)
- **Clique em Horário**: Permite criar eventos em horários específicos
- **Eventos Pendentes**: Eventos sem data/hora definida aparecem com altura
  automática e posicionados pelo horário de criação
- **Scroll Horizontal**: Quando há múltiplos recursos, permite navegar entre
  colunas

#### **Casos de Uso**

- ✅ **Manutenções**: Visualizar manutenções agendadas por equipamento ao longo
  do dia
- ✅ **Logística**: Planejar janelas de entrega/coleta por veículo
- ✅ **Operações**: Agendar atividades com precisão de hora/minuto
- ✅ **Conflitos**: Identificar sobreposições de eventos no mesmo recurso

#### **Navegação**

- **Setas ◀ ▶**: Move ±1 dia
- **Botão "Hoje"**: Retorna para o dia atual
- **Título**: Mostra data formatada (ex.: "15 de janeiro, 2025")

---

### 2. 📊 **VISÃO SEMANAL** (`weekly`) - **PADRÃO**

#### **Características Técnicas**

- **Dias da Semana**: 7 colunas (Segunda a Domingo)
- **Semana Inicia**: Segunda-feira (`weekStartsOn: 1`)
- **Grade de Horas**: Mesma estrutura da visão diária (24 horas)
- **Altura Total**: 1440px por coluna
- **Largura Mínima**: 700px (scroll horizontal em telas menores)

#### **Estrutura Visual**

```
┌─────────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┐
│ Horas   │ Seg  │ Ter  │ Qua  │ Qui  │ Sex  │ Sáb  │ Dom  │
├─────────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┤
│ 00:00   │      │      │      │      │      │      │      │
│ 01:00   │      │[Evt] │      │      │      │      │      │
│ 02:00   │      │      │      │      │      │      │      │
│ ...     │      │      │      │      │      │      │      │
│ 23:00   │      │      │      │      │      │      │      │
└─────────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┘
```

#### **Funcionalidades Específicas**

- **Destaque do Dia Atual**: Círculo laranja com fundo branco no número do dia
- **Indicador de Tempo Atual**: Linha laranja na coluna do dia atual
- **Eventos Multi-Dia**: Eventos que atravessam múltiplos dias são renderizados
  em cada coluna correspondente
- **Headers Fixos**: Cabeçalhos dos dias ficam fixos durante scroll vertical
  (`sticky top-0`)

#### **Casos de Uso**

- ✅ **Planejamento Semanal**: Visualizar toda a semana de uma vez
- ✅ **Disponibilidade**: Verificar disponibilidade de equipamentos na semana
- ✅ **Rotas**: Planejar rotas de entrega/coleta ao longo da semana
- ✅ **Capacidade**: Avaliar carga de trabalho semanal

#### **Navegação**

- **Setas ◀ ▶**: Move ±1 semana (7 dias)
- **Botão "Hoje"**: Retorna para a semana atual
- **Título**: Mostra range da semana (ex.: "Semana de 13 Jan – 19 Jan, 2025")

---

### 3. 📅 **VISÃO MENSAL** (`monthly`) - **"CALENDÁRIO"**

#### **Características Técnicas**

- **Grade**: 7 colunas × ~5-6 linhas (dependendo do mês)
- **Dias do Mês**: Inclui dias do mês anterior/posterior para completar semanas
- **Altura Mínima**: 120px por célula de dia
- **Dias do Mês Anterior/Posterior**: Opacidade reduzida (40%) e fundo cinza
  claro

#### **Estrutura Visual**

```
┌──────┬──────┬──────┬──────┬──────┬──────┬──────┐
│ Seg  │ Ter  │ Qua  │ Qui  │ Sex  │ Sáb  │ Dom  │
├──────┼──────┼──────┼──────┼──────┼──────┼──────┤
│      │      │  1   │  2   │  3   │  4   │  5   │
│      │      │[Evt] │[Evt] │      │      │      │
├──────┼──────┼──────┼──────┼──────┼──────┼──────┤
│  6   │  7   │  8   │  9   │ 10   │ 11   │ 12   │
│      │[Evt] │      │      │      │      │      │
├──────┼──────┼──────┼──────┼──────┼──────┼──────┤
│ ...  │ ...  │ ...  │ ...  │ ...  │ ...  │ ...  │
└──────┴──────┴──────┴──────┴──────┴──────┴──────┘
```

#### **Funcionalidades Específicas**

- **Destaque do Dia Atual**: Círculo laranja com fundo branco
- **Limite de Eventos**: Mostra até 3 eventos por dia, com indicador "+X mais"
  se houver mais
- **Eventos Compactos**: Barras finas com título truncado
- **Cores por Tipo**: Cada evento mantém sua cor (verde, amarelo, azul, etc.)
- **Clique no Dia**: Abre detalhes ou permite criar novo evento

#### **Casos de Uso**

- ✅ **Visão Macro**: Planejamento mensal de capacidade
- ✅ **Manutenção Preventiva**: Visualizar agendamentos mensais
- ✅ **Capacidade da Frota**: Avaliar disponibilidade mensal
- ✅ **Relatórios**: Análise de tendências mensais

#### **Navegação**

- **Setas ◀ ▶**: Move ±1 mês
- **Botão "Hoje"**: Retorna para o mês atual
- **Título**: Mostra mês e ano (ex.: "janeiro 2025")

### 4. 🧭 **VISÃO TIMELINE** (`timeline`) - **"EQUIPAMENTOS"**

#### **Características Técnicas**

- **Linhas por recurso**: cada equipamento em uma swimlane fixa
- **Altura padrão**: 60px por linha, incluindo o cabeçalho
- **Cabeçalho alinhado**: altura do cabeçalho igual às linhas para manter a
  grade consistente
- **Período variável**: suporta zoom diário, semanal e mensal na timeline

#### **Notas de Layout**

- **Altura sincronizada**: manter `TIMELINE_HEADER_HEIGHT` igual a
  `TIMELINE_ROW_HEIGHT` para evitar desalinhamento
- **Separação visual**: linhas usam `border-b` com `last:border-b-0` para evitar
  linha residual no fim
- **Scroll horizontal**: manter `overflow-x-hidden` no grid para evitar espaco
  extra no rodape

#### **Casos de Uso**

- ✅ **Disponibilidade por equipamento**: visão rápida de bloqueios e reservas
- ✅ **Planejamento operacional**: comparação de recursos lado a lado

---

## 🎛️ Componente Principal: `AdvancedCalendar`

### **Localização**

```
components/admin/advanced-calendar/
├── index.tsx              # Componente principal
├── calendar-header.tsx    # Cabeçalho com controles
├── daily-view.tsx         # Visão diária
├── weekly-view.tsx        # Visão semanal
├── monthly-view.tsx       # Visão mensal
├── timeline-view.tsx      # Visão timeline (equipamentos)
├── event-block.tsx        # Bloco de evento individual
├── time-indicator.tsx     # Linha do tempo atual
├── types.ts               # Definições TypeScript
└── constants.ts           # Constantes (alturas, etc.)
```

### **Props do Componente**

```typescript
interface AdvancedCalendarProps {
  events: CalendarEvent[] // Array de eventos a exibir
  resources?: CalendarResource[] // Recursos (equipamentos, veículos, etc.)
  onEventClick?: (event) => void // Callback ao clicar em evento
  onDateClick?: (date) => void // Callback ao clicar em data/hora
  onEventDrop?: (id, start, end) => void // Drag & drop (futuro)
  defaultViewMode?: ViewMode // Modo padrão: 'daily' | 'weekly' | 'monthly' | 'timeline'
  defaultDate?: Date // Data inicial
  className?: string // Classes CSS adicionais
}
```

### **Estrutura de Evento**

```typescript
interface CalendarEvent {
  id: string // ID único
  title: string // Título do evento
  start: Date // Data/hora de início
  end: Date // Data/hora de fim
  resourceId?: string // ID do recurso (equipamento, veículo)
  color: string // Cor hexadecimal (ex: '#10B981')
  type: "delivery" | "pickup" | "maintenance" | "rental"
  status: string // Status do evento
  metadata?: Record<string, unknown> // Dados adicionais
  createdAt?: Date // Para eventos pendentes
  isPendingRequest?: boolean // Se é solicitação pendente
}
```

---

## 🎯 Propósito e Controle

### **O Que o Sistema Controla**

#### 1. **Gestão Temporal de Operações**

- ✅ **Agendamentos**: Visualizar quando eventos estão programados
- ✅ **Conflitos**: Identificar sobreposições de eventos
- ✅ **Disponibilidade**: Verificar quando recursos estão livres/ocupados
- ✅ **Capacidade**: Avaliar carga de trabalho por período

#### 2. **Monitoramento de Status**

- ✅ **Manutenções**: Acompanhar status (Agendada, Em Andamento, Concluída,
  Cancelada)
- ✅ **Locações**: Visualizar períodos de locação ativos
- ✅ **Entregas/Coletas**: Gerenciar janelas de logística
- ✅ **Orçamentos**: Ver períodos de interesse dos clientes

#### 3. **Planejamento Estratégico**

- ✅ **Preventiva**: Agendar manutenções preventivas com antecedência
- ✅ **Rotas**: Planejar rotas de entrega/coleta
- ✅ **Recursos**: Alocar equipamentos e veículos de forma otimizada
- ✅ **Capacidade**: Prever picos e vales de demanda

#### 4. **Operacional**

- ✅ **Tempo Real**: Indicador de hora atual nas visões diária/semanal
- ✅ **Interatividade**: Clicar em eventos para ver detalhes
- ✅ **Criação Rápida**: Clicar em data/hora para criar eventos
- ✅ **Navegação Intuitiva**: Setas, botão "Hoje", troca de modo

---

## 🔧 Funcionalidades Técnicas Avançadas

### **1. Posicionamento Preciso de Eventos**

O sistema calcula a posição exata dos eventos baseado em:

- **Minutos desde início do dia**: `differenceInMinutes(eventStart, dayStart)`
- **Duração em minutos**: `differenceInMinutes(eventEnd, eventStart)`
- **Altura por minuto**: `MINUTE_HEIGHT = 1px` (60px por hora ÷ 60 minutos)

### **2. Eventos Pendentes**

Eventos sem data/hora definida (`isPendingRequest: true`):

- Usam `createdAt` para posicionamento
- Altura automática (não baseada em duração)
- Mostram horário de criação e tempo relativo ("há 2 horas")

### **3. Indicador de Tempo Atual**

- **Atualização**: A cada 60 segundos (`setInterval`)
- **Visual**: Linha laranja de 2px de altura
- **Posicionamento**: Calculado em tempo real baseado na hora atual
- **Visibilidade**: Apenas na visão diária/semanal, no dia atual

### **4. Recursos (Resources)**

Quando há múltiplos recursos (ex.: equipamentos):

- **Visão Diária**: Cada recurso vira uma coluna separada
- **Filtragem**: Eventos são filtrados por `resourceId`
- **Headers Fixos**: Nome do recurso fica fixo durante scroll

### **5. Responsividade**

- **Mobile**: Scroll horizontal para visões diária/semanal
- **Tablet**: Layout adaptado com breakpoints
- **Desktop**: Visualização completa otimizada

---

## 📊 Exemplos de Uso por Página

### **`/admin/maintenance`**

```typescript
<AdvancedCalendar
  events={maintenances.map(m => ({
    id: m.id,
    title: `${typeConfig[m.type]} - ${m.equipment.name}`,
    start: parseISO(m.scheduledAt),
    end: m.completedAt ? parseISO(m.completedAt) : addHours(start, 4),
    resourceId: m.equipment.id,
    color: m.type === 'PREVENTIVE' ? '#10B981' : '#F59E0B',
    type: 'maintenance',
    status: m.status,
  }))}
  resources={equipments.map(e => ({ id: e.id, name: e.name }))}
  onEventClick={(event) => openMaintenanceDetails(event.id)}
/>
```

**Controle**: Manutenções por equipamento, status, tipo, técnico responsável

---

### **`/admin/logistics`**

```typescript
<AdvancedCalendar
  events={deliveries.map(d => ({
    id: d.id,
    title: `${d.type === 'DELIVERY' ? 'Entrega' : 'Coleta'} - ${d.clientName}`,
    start: parseISO(d.scheduledAt),
    end: addHours(start, 2), // Duração fixa de 2h
    resourceId: d.vehicleId,
    color: d.type === 'DELIVERY' ? '#3B82F6' : '#8B5CF6',
    type: d.type === 'DELIVERY' ? 'delivery' : 'pickup',
    status: d.status,
  }))}
  resources={vehicles.map(v => ({ id: v.id, name: v.name }))}
  onEventClick={(event) => openDeliveryDetails(event.id)}
/>
```

**Controle**: Entregas/coletas por veículo, rota, cliente, status

---

### **`/admin/rentals`**

```typescript
<AdvancedCalendar
  events={rentals.map(r => ({
    id: r.id,
    title: `${r.rental_items.map(i => i.equipments.name).join(', ')}`,
    start: parseISO(r.startdate),
    end: parseISO(r.enddate),
    color: '#EA580C', // Laranja (cor primária)
    type: 'rental',
    status: r.status,
    metadata: { clientName: r.client?.name },
  }))}
  onEventClick={(event) => openRentalDetails(event.id)}
/>
```

**Controle**: Locações ativas, períodos de locação, equipamentos locados

---

### **`/admin/orcamentos`**

```typescript
<AdvancedCalendar
  events={quotes.map(q => ({
    id: q.id,
    title: `Orçamento #${q.number} - ${q.client?.name || 'Cliente'}`,
    start: parseISO(q.startDate || q.items[0].startDate),
    end: parseISO(q.endDate || q.items[0].endDate),
    color: q.status === 'APPROVED' ? '#10B981' : '#F59E0B',
    type: 'rental',
    status: q.status,
  }))}
  onEventClick={(event) => openQuoteDetails(event.id)}
/>
```

**Controle**: Orçamentos por período, status, cliente, valor

---

## 🎨 Design System Integration

### **Cores Padronizadas**

- **Primária**: `#EA580C` (Orange-600) - Locações
- **Sucesso**: `#10B981` (Green-500) - Preventivas, Aprovados
- **Atenção**: `#F59E0B` (Yellow-500) - Corretivas, Pendentes
- **Info**: `#3B82F6` (Blue-500) - Entregas
- **Secundária**: `#8B5CF6` (Purple-500) - Coletas
- **Neutra**: `#6366F1` (Indigo-500) - Inspeções

### **Componentes Utilizados**

- `Button` - Navegação (setas, "Hoje")
- `ViewToggle` - Troca de modo (Diário/Semanal/Calendário)
- `Badge` - Status dos eventos
- `Card` - Container principal
- `Dialog` - Detalhes de eventos

---

## 🚀 Funcionalidades Futuras (Roadmap)

### **Fase 2 - Planejadas**

- [ ] **Drag & Drop**: Arrastar eventos para reagendar
- [ ] **Redimensionamento**: Ajustar duração arrastando bordas
- [ ] **Multi-seleção**: Selecionar múltiplos eventos
- [ ] **Atalhos de Teclado**: Navegação rápida (← →, T para "Hoje", etc.)
- [ ] **Snap de Horários**: Alinhar a 15/30/60 minutos
- [ ] **Zoom**: Ajustar densidade de visualização

### **Melhorias de UX**

- [ ] **Tooltips Ricos**: Mais informações ao hover
- [ ] **Filtros Avançados**: Por status, tipo, recurso
- [ ] **Exportação**: PDF, CSV, iCal
- [ ] **Notificações**: Alertas de eventos próximos

---

## 📝 Resumo Executivo

### **O Que São os Calendários?**

Quatro visualizações temporais (Diário, Semanal, Mensal, Timeline/Equipamentos)
que permitem visualizar eventos operacionais em diferentes granularidades.

### **Onde Estão?**

- `/admin/maintenance` - Manutenções
- `/admin/logistics` - Logística
- `/admin/rentals` - Locações
- `/admin/orcamentos` - Orçamentos

### **Para Que Servem?**

- **Gestão Temporal**: Agendar e visualizar eventos
- **Monitoramento**: Acompanhar status e progresso
- **Planejamento**: Planejar operações com antecedência
- **Otimização**: Identificar conflitos e otimizar recursos

### **O Que Controlam?**

- ✅ **Agendamentos**: Quando eventos estão programados
- ✅ **Recursos**: Equipamentos, veículos, rotas
- ✅ **Status**: Estado atual de cada evento
- ✅ **Capacidade**: Disponibilidade e carga de trabalho
- ✅ **Conflitos**: Sobreposições e problemas de alocação

---

**Última Atualização**: Janeiro 2025 **Versão do Componente**: 1.0 **Status**:
✅ Implementado e Funcional
