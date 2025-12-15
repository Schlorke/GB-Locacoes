# Gantt inspirado no Notion para Manutenção e Logística

## Objetivo

Definir a experiência de calendário/Gantt no painel admin (manutenção e
logística) com troca diária/semanal/mensal via dropdown estilo Notion, setas de
navegação, botão “Hoje” e mini-calendário em popover para salto rápido de datas.

## Header (Notion-like)

- Componentes do design system: `Button` (ghost/secondary), `DropdownMenu`,
  `Popover/Calendar`, `Badge`, `Separator`.
- Layout: título do período (ex.: “Semana de 10–16 Mar 2025” ou “Mar 2025”), à
  direita um grupo compacto: setas ◀ ▶, botão “Hoje”, dropdown de modo
  (Diário/Semanal/Mensal), botão de mini-calendário (ícone calendar) que abre um
  date picker mantendo o modo atual ao fechar.
- Filtros rápidos (inline ou popover): status (Disponível, Reservado, Locado,
  Manutenção, Entrega, Coleta, Atraso), categoria/cluster de equipamento,
  base/filial, equipe/veículo, só meus (responsável).
- Persistência do modo/intervalo: querystring (`?mode=week&date=2025-03-10`) ou
  localStorage para retornar na mesma visão.

## Modos de visualização

- Diário (agenda densa): colunas de horas (00–23h); útil para janelas de
  entrega/coleta e manutenções curtas; barras mostram início/fim com precisão de
  hora/minuto.
- Semanal (default para operações): colunas por dia, barras atravessam dias;
  ideal para disponibilidade de unidades, reservas, rotas planejadas.
- Mensal (macro): colunas por dia organizadas por semana; densidade maior com
  barras compactadas; indicado para capacidade e planejamento de
  frota/manutenção preventiva.
- Navegação: setas movem 1 unidade do modo atual (dia → ±1 dia, semana → ±7
  dias, mês → ±1 mês); “Hoje” recentraliza; mini-calendário salta para data base
  do modo.

## Estrutura da grade Gantt

- Linhas (recursos) com coluna fixa sticky:
  - Manutenção: unidades físicas (código interno) agrupadas por
    equipamento/categoria; exibir status atual e se está locada/reservada.
  - Logística: veículos ou rotas; agrupamento por base/turno ou equipe.
- Faixas de tempo:
  - Diário: horas; fundo listrado para blocos de 1h/30min.
  - Semanal: 7 colunas; linhas de hoje destacadas; finais de semana com leve
    variação de fundo se necessário.
  - Mensal: grade por semanas; suporte a barras que cruzam mês (render parcial
    nas extremidades).
- Barras (intervalos):
  - Cores/legenda: Reserva/Locação, Manutenção, Entrega/Coleta, Atraso. Usar
    tokens existentes (sem criar novas cores) e badges de status.
  - Conteúdo: título curto (cliente/obra ou ordem), horário/diário resumido,
    ícones sutis (wrench para manutenção, truck para entrega/coleta, clock/alert
    para atraso).
  - Tooltip hover: cliente/obra, janela de horário, SLA/ETA, custo estimado
    (manutenção), notas e responsável.
  - Estados: selecionado (realce discreto), conflito (borda/outline de alerta),
    atraso (borda e badge).
- Empty/loading states: skeleton das linhas; CTA “Criar ordem de manutenção” ou
  “Criar entrega/coleta”.

## Interações (MVP)

- Troca de modo via dropdown (Diário/Semanal/Mensal) sem recarregar dados;
  respeitar seleção atual no mini-calendário.
- Criação/edição via modal (sem drag & drop no MVP):
  - Manutenção: unidade, tipo (preventiva/corretiva), janela de
    indisponibilidade, custo estimado, notas.
  - Logística: veículo/equipe, janela de entrega/coleta, rota/resumo,
    obra/cliente.
- Detalhe rápido: click ou teclado abre side panel/modal com ações (editar,
  marcar concluído, reprogr. data).
- Regras de conflito:
  - Manutenção vs locação: alerta visual e bloqueio opcional ao salvar.
  - Rotas: conflito de horário para o mesmo veículo/rota.
- Filtros: status, categoria, base/filial, veículo/equipe, apenas atrasados.
- Acessibilidade: foco visível em setas, dropdown, mini-calendário; navegação
  por teclado (← → para período, Enter abre modal do item focado), tooltips
  acessíveis.

## Dados e componente sugerido

- `GanttView` props (exemplo conceitual):
  - `mode: "day" | "week" | "month"`
  - `startDate: string` (ISO base do modo)
  - `rows: Array<{ id: string; label: string; group?: string; meta?: { status: string; tags?: string[] } }>`
  - `items: Array<{ id: string; rowId: string; kind: "rental" | "maintenance" | "delivery" | "pickup" | "delay"; start: string; end: string; title: string; subtitle?: string; status?: string; conflict?: boolean }>`
  - `onNavigate(direction: "prev" | "next" | "today")`
  - `onModeChange(mode)`
  - `onDateChange(date)` (mini-calendário)
  - `onItemSelect(id)` e `onCreate(range?, rowId?)`
- Fonte de dados:
  - Manutenção: unidades físicas (status + agenda de manutenções) +
    locações/reservas para contexto.
  - Logística: veículos/rotas + entregas/coletas planejadas + atrasos.

## Responsividade e densidade

- Scroll horizontal com cabeçalho e coluna fixa sticky.
- Altura de linha compacta com espaçamento consistente; legenda fixa visível.
- Em mobile: priorizar semanal; diário abre em agenda vertical; mensal em modo
  compacto (barras finas).

## Evoluções (Fase 2)

- Drag & drop e redimensionar barras com validação de conflito em tempo real.
- Multi-seleção e bulk move de intervalos.
- Atalhos de teclado: ← → (navegar período), T (Hoje), M/W/D (modo),
  Shift+arraste (duplicar).
- Snap de horários (15/30/60 min), zoom de densidade (agenda vs barras).
