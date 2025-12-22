# 📊 Sistema de Hover Interativo - TimelineView

> **Documentação Completa**: Sistema de hover interativo que permite destacar
> colunas inteiras (dias) e linhas inteiras (recursos) ao passar o mouse sobre
> elementos específicos.

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura do Sistema](#arquitetura-do-sistema)
3. [Estados React](#estados-react)
4. [Elementos Ativadores](#elementos-ativadores)
5. [Elementos Receptores](#elementos-receptores)
6. [Sistema de CSS Groups](#sistema-de-css-groups)
7. [Overlays e Posicionamento](#overlays-e-posicionamento)
8. [Fluxo de Interação Completo](#fluxo-de-interação-completo)
9. [Cores e Estilos](#cores-e-estilos)
10. [Lógica de Sincronização](#lógica-de-sincronização)
11. [Exemplos Práticos](#exemplos-práticos)

---

## 🎯 Visão Geral

O sistema de hover interativo do `TimelineView` permite que o usuário passe o
mouse sobre elementos específicos e veja um destaque visual em **colunas
inteiras** (dias) ou **linhas inteiras** (recursos/equipamentos). Isso melhora
significativamente a experiência do usuário ao navegar pela timeline.

### Comportamentos Principais

1. **Hover em Header "Equipamentos"**: Destaca TODA a linha de cabeçalho (todos
   os dias)
2. **Hover em Recurso na Lista Lateral**: Destaca a LINHA INTEIRA do recurso na
   timeline
3. **Hover em Header de Dia**: Destaca a COLUNA INTEIRA do dia (todas as linhas)
4. **Hover em Swimlane**: Destaca a LINHA INTEIRA do recurso na timeline

---

## 🏗️ Arquitetura do Sistema

O sistema funciona através de uma combinação de:

- **Estados React** (`useState`) para rastrear qual elemento está com hover
- **Event Handlers** (`onMouseEnter`/`onMouseLeave`) para detectar hover
- **CSS Groups do Tailwind** (`group/header`, `group/resource`) para estilização
- **Overlays Absolutos** para destacar colunas inteiras
- **Estilos Inline Condicionais** para aplicar cores de fundo

```
┌─────────────────────────────────────────────────────────────┐
│                    TimelineView Component                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────────────────────────────┐  │
│  │   Estados    │  │      Elementos Visuais              │  │
│  │              │  │                                      │  │
│  │ • hoveredDay │  │  ┌──────────┐  ┌─────────────────┐  │  │
│  │ • hoveredRes │  │  │ Headers  │  │  Swimlanes      │  │  │
│  │ • isHeader   │  │  │ (Dias)   │  │  (Recursos)      │  │  │
│  │              │  │  └──────────┘  └─────────────────┘  │  │
│  └──────────────┘  │                                      │  │
│         │           │  ┌──────────┐  ┌─────────────────┐  │  │
│         │           │  │ Lista    │  │  Overlays      │  │  │
│         └───────────┼─▶│ Lateral  │  │  (Colunas)     │  │  │
│                     │  └──────────┘  └─────────────────┘  │  │
│                     └──────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Estados React

O componente `TimelineView` gerencia **3 estados principais** para controlar o
hover:

### 1. `hoveredDayIndex` (Colunas/Dias)

```typescript
const [hoveredDayIndex, setHoveredDayIndex] = useState<number | null>(null)
```

**Propósito**: Rastreia qual **coluna (dia)** está com hover.

**Tipo**: `number | null`

- `null`: Nenhum dia com hover
- `number`: Índice do dia (0-6 para semana)

**Onde é Ativado**:

- Headers dos dias (linha 291)
- Overlays de colunas (linha 430)

**Onde é Usado**:

- Headers dos dias (linha 287)
- Overlays de colunas (linha 430)

---

### 2. `hoveredResourceId` (Linhas/Recursos)

```typescript
const [hoveredResourceId, setHoveredResourceId] = useState<string | null>(null)
```

**Propósito**: Rastreia qual **recurso (equipamento)** está com hover.

**Tipo**: `string | null`

- `null`: Nenhum recurso com hover
- `string`: ID do recurso (ex: `"equipment-123"`)

**Onde é Ativado**:

- Recursos na lista lateral (linha 218)
- Swimlanes na timeline (linha 353)

**Onde é Usado**:

- Recursos na lista lateral (linha 214)
- Swimlanes na timeline (linha 349)

---

### 3. `isHeaderHovered` (Header "Equipamentos")

```typescript
const [isHeaderHovered, setIsHeaderHovered] = useState(false)
```

**Propósito**: Rastreia se o header **"Equipamentos"** está com hover.

**Tipo**: `boolean`

- `false`: Header não está com hover
- `true`: Header está com hover

**Onde é Ativado**:

- Header "Equipamentos" (linha 169)

**Onde é Usado**:

- Header "Equipamentos" (linha 165)
- Headers dos dias (linha 287, 303, 312)

---

## 🎯 Elementos Ativadores

Elementos que **disparam** o hover quando o mouse passa sobre eles.

### 1. Header "Equipamentos" (Lista Lateral)

**Localização**: Linha 159-199

```typescript
<div
  className="flex-shrink-0 bg-slate-50 border-b border-slate-200 z-10 cursor-pointer transition-colors group/header"
  style={{
    backgroundColor: isHeaderHovered
      ? 'rgba(254, 243, 199, 0.3)'
      : undefined,
  }}
  onMouseEnter={() => setIsHeaderHovered(true)}  // ✅ ATIVA
  onMouseLeave={() => setIsHeaderHovered(false)}  // ✅ DESATIVA
>
  <div className="flex h-full w-full flex-col justify-center items-center px-3">
    <div className="text-sm font-semibold text-gray-700 whitespace-nowrap leading-none group-hover/header:text-orange-600 transition-colors">
      Equipamentos
    </div>
  </div>
</div>
```

**Comportamento**:

- Ao passar o mouse: `setIsHeaderHovered(true)`
- Ao sair do mouse: `setIsHeaderHovered(false)`
- **Efeito**: Destaca o próprio header E todos os headers dos dias

---

### 2. Recursos na Lista Lateral

**Localização**: Linha 209-243

```typescript
<div
  key={resource.id}
  className="px-3 flex items-center whitespace-nowrap border-b border-slate-200 last:border-b-0 cursor-pointer transition-colors group/resource"
  style={{
    backgroundColor:
      hoveredResourceId === resource.id
        ? 'rgba(254, 243, 199, 0.3)'
        : undefined,
  }}
  onMouseEnter={() => setHoveredResourceId(resource.id)}  // ✅ ATIVA
  onMouseLeave={() => setHoveredResourceId(null)}         // ✅ DESATIVA
>
  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: ... }} />
    <span className="text-sm font-medium text-gray-900 group-hover/resource:text-orange-600 transition-colors">
      {resource.name}
    </span>
  </div>
</div>
```

**Comportamento**:

- Ao passar o mouse: `setHoveredResourceId(resource.id)`
- Ao sair do mouse: `setHoveredResourceId(null)`
- **Efeito**: Destaca o próprio recurso E a swimlane correspondente na timeline

---

### 3. Headers dos Dias (Colunas)

**Localização**: Linha 282-319

```typescript
<div
  key={day.toISOString()}
  className="flex-1 border-r border-slate-200 last:border-r-0 flex flex-col justify-center items-center bg-slate-50 cursor-pointer transition-colors group/header"
  style={{
    backgroundColor:
      isHeaderHovered || hoveredDayIndex === dayIndex
        ? 'rgba(254, 243, 199, 0.3)'
        : undefined,
  }}
  onMouseEnter={() => setHoveredDayIndex(dayIndex)}  // ✅ ATIVA
  onMouseLeave={() => setHoveredDayIndex(null)}      // ✅ DESATIVA
>
  {/* Conteúdo do header */}
</div>
```

**Comportamento**:

- Ao passar o mouse: `setHoveredDayIndex(dayIndex)`
- Ao sair do mouse: `setHoveredDayIndex(null)`
- **Efeito**: Destaca o próprio header E a coluna inteira (overlay)

---

### 4. Swimlanes (Linhas de Recursos na Timeline)

**Localização**: Linha 339-361

```typescript
<div
  key={resource.id}
  className="relative border-b border-slate-200 last:border-b-0 cursor-pointer transition-colors"
  style={{
    backgroundColor:
      hoveredResourceId === resource.id
        ? 'rgba(254, 243, 199, 0.3)'
        : 'transparent',
  }}
  onMouseEnter={() => setHoveredResourceId(resource.id)}  // ✅ ATIVA
  onMouseLeave={() => setHoveredResourceId(null)}          // ✅ DESATIVA
>
  {/* Eventos na swimlane */}
</div>
```

**Comportamento**:

- Ao passar o mouse: `setHoveredResourceId(resource.id)`
- Ao sair do mouse: `setHoveredResourceId(null)`
- **Efeito**: Destaca a própria swimlane E o recurso correspondente na lista
  lateral

---

## 📥 Elementos Receptores

Elementos que **respondem** ao hover ativado por outros elementos.

### 1. Header "Equipamentos" (Auto-resposta)

**Localização**: Linha 165-167

```typescript
style={{
  backgroundColor: isHeaderHovered
    ? 'rgba(254, 243, 199, 0.3)'
    : undefined,
}}
```

**Responde a**: Próprio hover (`isHeaderHovered`)

---

### 2. Headers dos Dias (Resposta Múltipla)

**Localização**: Linha 286-289

```typescript
style={{
  backgroundColor:
    isHeaderHovered || hoveredDayIndex === dayIndex
      ? 'rgba(254, 243, 199, 0.3)'
      : undefined,
}}
```

**Responde a**:

- `isHeaderHovered`: Quando o header "Equipamentos" está com hover
- `hoveredDayIndex === dayIndex`: Quando o próprio dia está com hover

**Lógica**: `isHeaderHovered || hoveredDayIndex === dayIndex`

- Se **qualquer um** for verdadeiro, o header é destacado

---

### 3. Recursos na Lista Lateral (Auto-resposta)

**Localização**: Linha 213-216

```typescript
style={{
  backgroundColor:
    hoveredResourceId === resource.id
      ? 'rgba(254, 243, 199, 0.3)'
      : undefined,
}}
```

**Responde a**: Próprio hover (`hoveredResourceId === resource.id`)

---

### 4. Swimlanes (Resposta Sincronizada)

**Localização**: Linha 348-351

```typescript
style={{
  backgroundColor:
    hoveredResourceId === resource.id
      ? 'rgba(254, 243, 199, 0.3)'
      : 'transparent',
}}
```

**Responde a**: `hoveredResourceId === resource.id`

- Quando um recurso na lista lateral está com hover, a swimlane correspondente é
  destacada
- Quando uma swimlane está com hover, o recurso correspondente na lista lateral
  é destacado

---

### 5. Overlays de Colunas (Resposta a Dias)

**Localização**: Linha 416-436

```typescript
{visiblePeriod.days.map((day, dayIndex) => {
  const totalDays = visiblePeriod.days.length
  const columnWidth = 100 / totalDays
  const left = (dayIndex * 100) / totalDays

  return (
    <div
      key={`overlay-${day.toISOString()}`}
      className="absolute top-0 bottom-0 pointer-events-none transition-colors z-10"
      style={{
        left: `${left}%`,
        width: `${columnWidth}%`,
        backgroundColor:
          hoveredDayIndex === dayIndex
            ? 'rgba(254, 243, 199, 0.3)'
            : 'transparent',
      }}
    />
  )
})}
```

**Responde a**: `hoveredDayIndex === dayIndex`

**Características**:

- **Posicionamento Absoluto**: Cobre toda a altura da timeline
- **Largura Calculada**: `100 / totalDays` (14.28% para 7 dias)
- **Left Calculado**: `(dayIndex * 100) / totalDays`
- **Z-Index**: `z-10` (abaixo dos eventos que têm `z-20`)
- **Pointer Events**: `none` (não interfere com cliques)

**Propósito**: Destacar a **coluna inteira** quando um dia está com hover

---

## 🎨 Sistema de CSS Groups

O Tailwind CSS permite criar **grupos nomeados** para aplicar estilos
condicionais baseados em hover.

### Sintaxe

```css
/* Grupo nomeado */
group/header

/* Filho responde ao hover do grupo */
group-hover/header:text-orange-600
```

### Grupos Utilizados

#### 1. `group/header`

**Onde é Aplicado**:

- Header "Equipamentos" (linha 160)
- Headers dos dias (linha 284)

**Onde é Usado**:

- Texto "Equipamentos" (linha 195): `group-hover/header:text-orange-600`
- Texto dos dias (linha 305, 314): `group-hover/header:text-orange-600`

**Comportamento**:

- Quando o mouse passa sobre um elemento com `group/header`, os filhos com
  `group-hover/header:*` mudam de cor

---

#### 2. `group/resource`

**Onde é Aplicado**:

- Recursos na lista lateral (linha 211)

**Onde é Usado**:

- Nome do recurso (linha 238): `group-hover/resource:text-orange-600`

**Comportamento**:

- Quando o mouse passa sobre um recurso, o nome muda para laranja

---

## 🎯 Overlays e Posicionamento

### Estrutura de Overlays

Os overlays são elementos **absolutos** posicionados sobre a timeline para
destacar colunas inteiras.

```typescript
{visiblePeriod.days.map((day, dayIndex) => {
  const totalDays = visiblePeriod.days.length  // 7 para semana
  const columnWidth = 100 / totalDays          // 14.28%
  const left = (dayIndex * 100) / totalDays     // 0%, 14.28%, 28.56%, etc.

  return (
    <div
      className="absolute top-0 bottom-0 pointer-events-none transition-colors z-10"
      style={{
        left: `${left}%`,
        width: `${columnWidth}%`,
        backgroundColor: hoveredDayIndex === dayIndex
          ? 'rgba(254, 243, 199, 0.3)'
          : 'transparent',
      }}
    />
  )
})}
```

### Cálculo de Posição

Para uma semana (7 dias):

| Dia | Índice | Left (%) | Width (%) |
| --- | ------ | -------- | --------- |
| Seg | 0      | 0%       | 14.28%    |
| Ter | 1      | 14.28%   | 14.28%    |
| Qua | 2      | 28.56%   | 14.28%    |
| Qui | 3      | 42.84%   | 14.28%    |
| Sex | 4      | 57.12%   | 14.28%    |
| Sáb | 5      | 71.40%   | 14.28%    |
| Dom | 6      | 85.68%   | 14.28%    |

### Z-Index Hierarchy

```
z-20  → Eventos na timeline (clicáveis)
z-10  → Overlays de colunas (não clicáveis, pointer-events-none)
z-10  → Headers (clicáveis)
base  → Swimlanes e outros elementos
```

---

## 🔄 Fluxo de Interação Completo

### Cenário 1: Hover no Header "Equipamentos"

```
1. Usuário passa mouse sobre "Equipamentos"
   ↓
2. onMouseEnter → setIsHeaderHovered(true)
   ↓
3. Estado atualizado: isHeaderHovered = true
   ↓
4. Elementos que respondem:
   ├─ Header "Equipamentos" (linha 165)
   │  └─ backgroundColor: 'rgba(254, 243, 199, 0.3)'
   │
   └─ Todos os Headers dos Dias (linha 287)
      └─ backgroundColor: 'rgba(254, 243, 199, 0.3)'
         (porque isHeaderHovered || hoveredDayIndex === dayIndex)
   ↓
5. CSS Group também ativa:
   └─ Texto "Equipamentos" → text-orange-600
   └─ Textos dos dias → text-orange-600
```

---

### Cenário 2: Hover em Recurso na Lista Lateral

```
1. Usuário passa mouse sobre "Pendente" (recurso)
   ↓
2. onMouseEnter → setHoveredResourceId("resource-123")
   ↓
3. Estado atualizado: hoveredResourceId = "resource-123"
   ↓
4. Elementos que respondem:
   ├─ Recurso na Lista Lateral (linha 214)
   │  └─ backgroundColor: 'rgba(254, 243, 199, 0.3)'
   │
   └─ Swimlane Correspondente (linha 349)
      └─ backgroundColor: 'rgba(254, 243, 199, 0.3)'
         (porque hoveredResourceId === resource.id)
   ↓
5. CSS Group também ativa:
   └─ Nome do recurso → text-orange-600
```

---

### Cenário 3: Hover em Header de Dia

```
1. Usuário passa mouse sobre "SEG 15" (header do dia)
   ↓
2. onMouseEnter → setHoveredDayIndex(0)
   ↓
3. Estado atualizado: hoveredDayIndex = 0
   ↓
4. Elementos que respondem:
   ├─ Header do Dia (linha 287)
   │  └─ backgroundColor: 'rgba(254, 243, 199, 0.3)'
   │
   └─ Overlay da Coluna (linha 430)
      └─ backgroundColor: 'rgba(254, 243, 199, 0.3)'
         (porque hoveredDayIndex === dayIndex)
      └─ Cobre TODA a altura da timeline (top-0 bottom-0)
   ↓
5. CSS Group também ativa:
   └─ Texto do dia → text-orange-600
```

---

### Cenário 4: Hover em Swimlane

```
1. Usuário passa mouse sobre uma swimlane (linha de recurso)
   ↓
2. onMouseEnter → setHoveredResourceId("resource-123")
   ↓
3. Estado atualizado: hoveredResourceId = "resource-123"
   ↓
4. Elementos que respondem:
   ├─ Swimlane (linha 349)
   │  └─ backgroundColor: 'rgba(254, 243, 199, 0.3)'
   │
   └─ Recurso na Lista Lateral (linha 214)
      └─ backgroundColor: 'rgba(254, 243, 199, 0.3)'
         (porque hoveredResourceId === resource.id)
```

---

## 🎨 Cores e Estilos

### Cor de Destaque

```typescript
"rgba(254, 243, 199, 0.3)"
```

**Valores**:

- **RGB**: `254, 243, 199` (amarelo claro - `yellow-100` do Tailwind)
- **Alpha**: `0.3` (30% de opacidade)
- **Resultado Visual**: Fundo laranja claro translúcido

**Equivalente Tailwind**: `bg-yellow-100/30` (mas não usado diretamente)

---

### Cor de Texto no Hover

```css
text-orange-600
```

**Valor**: `#ea580c` (cor primária do projeto)

**Aplicado via CSS Groups**:

- `group-hover/header:text-orange-600`
- `group-hover/resource:text-orange-600`

---

### Transições

```css
transition-colors
```

**Aplicado em**:

- Todos os elementos com hover
- Garante transição suave de cores (200ms padrão do Tailwind)

---

## 🔗 Lógica de Sincronização

### Sincronização Bidirecional: Recurso ↔ Swimlane

Quando o usuário passa o mouse sobre um recurso na lista lateral, a swimlane
correspondente é destacada, e vice-versa.

**Mecanismo**:

1. Ambos os elementos usam o **mesmo estado**: `hoveredResourceId`
2. Ambos verificam a **mesma condição**: `hoveredResourceId === resource.id`
3. Ambos aplicam o **mesmo estilo**:
   `backgroundColor: 'rgba(254, 243, 199, 0.3)'`

**Código**:

```typescript
// Lista Lateral (linha 214)
style={{
  backgroundColor:
    hoveredResourceId === resource.id
      ? 'rgba(254, 243, 199, 0.3)'
      : undefined,
}}

// Swimlane (linha 349)
style={{
  backgroundColor:
    hoveredResourceId === resource.id
      ? 'rgba(254, 243, 199, 0.3)'
      : 'transparent',
}}
```

---

### Sincronização Múltipla: Header "Equipamentos" ↔ Todos os Dias

Quando o usuário passa o mouse sobre "Equipamentos", todos os headers dos dias
são destacados simultaneamente.

**Mecanismo**:

1. Header "Equipamentos" ativa: `isHeaderHovered = true`
2. Todos os headers dos dias verificam:
   `isHeaderHovered || hoveredDayIndex === dayIndex`
3. Como `isHeaderHovered` é `true`, todos são destacados

**Código**:

```typescript
// Header "Equipamentos" (linha 165)
style={{
  backgroundColor: isHeaderHovered
    ? 'rgba(254, 243, 199, 0.3)'
    : undefined,
}}

// Headers dos Dias (linha 287)
style={{
  backgroundColor:
    isHeaderHovered || hoveredDayIndex === dayIndex
      ? 'rgba(254, 243, 199, 0.3)'
      : undefined,
}}
```

---

### Sincronização: Header de Dia ↔ Overlay de Coluna

Quando o usuário passa o mouse sobre um header de dia, o overlay da coluna
correspondente é destacado.

**Mecanismo**:

1. Header do dia ativa: `hoveredDayIndex = dayIndex`
2. Overlay verifica: `hoveredDayIndex === dayIndex`
3. Overlay cobre toda a altura da coluna

**Código**:

```typescript
// Header do Dia (linha 291)
onMouseEnter={() => setHoveredDayIndex(dayIndex)}

// Overlay (linha 430)
style={{
  backgroundColor:
    hoveredDayIndex === dayIndex
      ? 'rgba(254, 243, 199, 0.3)'
      : 'transparent',
}}
```

---

## 💡 Exemplos Práticos

### Exemplo 1: Destacar Coluna Inteira

**Objetivo**: Quando o usuário passa o mouse sobre "SEG 15", destacar toda a
coluna de segunda-feira.

**Implementação**:

```typescript
// 1. Header do dia detecta hover
<div
  onMouseEnter={() => setHoveredDayIndex(0)}  // Segunda = índice 0
  onMouseLeave={() => setHoveredDayIndex(null)}
>
  SEG 15
</div>

// 2. Overlay responde ao estado
<div
  className="absolute top-0 bottom-0"
  style={{
    left: '0%',           // Primeira coluna
    width: '14.28%',      // 1/7 da largura
    backgroundColor:
      hoveredDayIndex === 0
        ? 'rgba(254, 243, 199, 0.3)'
        : 'transparent',
  }}
/>
```

---

### Exemplo 2: Destacar Linha Inteira

**Objetivo**: Quando o usuário passa o mouse sobre "Pendente" na lista lateral,
destacar toda a linha do recurso na timeline.

**Implementação**:

```typescript
// 1. Recurso na lista lateral detecta hover
<div
  onMouseEnter={() => setHoveredResourceId("resource-123")}
  onMouseLeave={() => setHoveredResourceId(null)}
>
  Pendente
</div>

// 2. Swimlane responde ao estado
<div
  style={{
    backgroundColor:
      hoveredResourceId === "resource-123"
        ? 'rgba(254, 243, 199, 0.3)'
        : 'transparent',
  }}
>
  {/* Eventos do recurso */}
</div>
```

---

### Exemplo 3: Destacar Todos os Dias

**Objetivo**: Quando o usuário passa o mouse sobre "Equipamentos", destacar
todos os headers dos dias.

**Implementação**:

```typescript
// 1. Header "Equipamentos" detecta hover
<div
  onMouseEnter={() => setIsHeaderHovered(true)}
  onMouseLeave={() => setIsHeaderHovered(false)}
>
  Equipamentos
</div>

// 2. Todos os headers dos dias respondem
{visiblePeriod.days.map((day, dayIndex) => (
  <div
    style={{
      backgroundColor:
        isHeaderHovered || hoveredDayIndex === dayIndex
          ? 'rgba(254, 243, 199, 0.3)'
          : undefined,
    }}
  >
    {format(day, 'd')}
  </div>
))}
```

---

## 🔍 Detalhes Técnicos

### Performance

- **Estados Locais**: Todos os estados são locais ao componente, não causam
  re-renders desnecessários
- **Transições CSS**: Usa `transition-colors` para animações suaves
  (GPU-accelerated)
- **Pointer Events**: Overlays usam `pointer-events-none` para não interferir
  com cliques

### Acessibilidade

- **Cursor Pointer**: Todos os elementos clicáveis têm `cursor-pointer`
- **Transições Suaves**: `transition-colors` garante feedback visual claro
- **Contraste**: Cor de destaque (`rgba(254, 243, 199, 0.3)`) mantém
  legibilidade

### Compatibilidade

- **Tailwind CSS 3.4.17**: Suporta grupos nomeados (`group/header`,
  `group/resource`)
- **React 19.1.1**: Hooks `useState` funcionam perfeitamente
- **TypeScript**: Tipos seguros para todos os estados

---

## 📝 Resumo das Propriedades

### Estados

| Estado              | Tipo             | Propósito                      | Ativado Por           | Usado Por              |
| ------------------- | ---------------- | ------------------------------ | --------------------- | ---------------------- |
| `hoveredDayIndex`   | `number \| null` | Rastreia coluna com hover      | Headers dos dias      | Headers + Overlays     |
| `hoveredResourceId` | `string \| null` | Rastreia recurso com hover     | Recursos + Swimlanes  | Recursos + Swimlanes   |
| `isHeaderHovered`   | `boolean`        | Rastreia header "Equipamentos" | Header "Equipamentos" | Header + Todos os dias |

### Classes CSS

| Classe              | Aplicado Em        | Efeito                           |
| ------------------- | ------------------ | -------------------------------- |
| `group/header`      | Headers            | Permite `group-hover/header:*`   |
| `group/resource`    | Recursos           | Permite `group-hover/resource:*` |
| `transition-colors` | Todos os elementos | Transição suave de cores         |

### Cores

| Propriedade               | Valor                      | Uso             |
| ------------------------- | -------------------------- | --------------- |
| `backgroundColor` (hover) | `rgba(254, 243, 199, 0.3)` | Fundo destacado |
| `text-orange-600`         | `#ea580c`                  | Texto no hover  |

---

## 🎯 Conclusão

O sistema de hover interativo do `TimelineView` é uma implementação sofisticada
que combina:

1. **Estados React** para rastreamento preciso
2. **CSS Groups do Tailwind** para estilização condicional
3. **Overlays absolutos** para destacar colunas inteiras
4. **Sincronização bidirecional** entre elementos relacionados

O resultado é uma experiência de usuário fluida e intuitiva, onde o hover em um
elemento destaca visualmente elementos relacionados, facilitando a navegação e
compreensão da timeline.

---

_Última atualização: Janeiro 2025 | Versão: 1.0_
