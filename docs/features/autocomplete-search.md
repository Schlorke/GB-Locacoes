# 🔍 Autocomplete Search Bar - Documentação Completa

## 📋 Visão Geral

O sistema de Autocomplete Search Bar é um componente avançado de busca
implementado na Hero section da homepage. Ele oferece busca em tempo real no
banco de dados com sugestões inteligentes, navegação por teclado e
redirecionamento contextual.

## 🏗️ Arquitetura

### Componentes Principais

1. **`components/ui/autocomplete.tsx`** - Componente reutilizável de
   autocomplete
2. **`components/hero.tsx`** - Integração na página inicial
3. **`app/api/equipamentos/search/route.ts`** - API endpoint para busca

### Fluxo de Dados

```
Usuário digita → Debounce 300ms → API Call → Prisma Query → Suggestions → UI Update
                                                    ↓
                                            Filtro: available=true
                                            Limite: 8 resultados
                                            Ordem: alfabética
```

## 🎯 Funcionalidades

### 1. Busca em Tempo Real

- **Debounce**: 300ms para otimizar performance
- **Mínimo de caracteres**: 2 para iniciar busca
- **Loading state**: Spinner animado durante busca
- **Error handling**: Tratamento gracioso de falhas

### 2. Navegação por Teclado

- **↑/↓**: Navegar entre sugestões
- **Enter**: Selecionar item destacado ou buscar texto
- **Escape**: Fechar dropdown e limpar seleção
- **Tab**: Navegação padrão mantida

### 3. Interação por Mouse

- **Click em sugestão**: Seleciona e atualiza input
- **Click fora**: Fecha dropdown
- **Hover**: Destaque visual nas opções
- **Scroll**: Auto-scroll para item selecionado

### 4. Feedback Visual

- **Ring verde**: Indica seleção válida
- **Highlight laranja**: Item selecionado/hover
- **Cores semânticas**: Categoria em laranja, preço em cinza
- **Animações suaves**: Transições CSS

### 5. Redirecionamento Inteligente

- **Item selecionado + Lupa**: → `/equipamentos/[id]` (detalhes)
- **Texto livre + Lupa**: → `/equipamentos?search=texto` (busca)
- **Seleção de sugestão**: Aguarda ação do usuário

## 💻 Implementação Técnica

### Estado do Componente

```typescript
const [query, setQuery] = useState("") // Texto digitado
const [suggestions, setSuggestions] = useState<Equipment[]>([]) // Sugestões
const [isOpen, setIsOpen] = useState(false) // Dropdown visível
const [selectedIndex, setSelectedIndex] = useState(-1) // Índice navegação
const [isLoading, setIsLoading] = useState(false) // Loading state
const [hasValidSelection, setHasValidSelection] = useState(false) // Seleção válida
const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
  null
)
```

### API Endpoint

```typescript
// GET /api/equipamentos/search?q=termo
const equipments = await prisma.equipment.findMany({
  where: {
    OR: [
      { name: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } }
    ],
    available: true
  },
  select: {
    id: true,
    name: true,
    description: true,
    pricePerDay: true,
    category: { select: { name: true } },
    images: true
  },
  take: 8,
  orderBy: { name: "asc" }
})
```

### Posicionamento e Z-Index

```tsx
// Container principal
<div className="relative w-full">
  // Container do search bar no Hero
  <div className="relative z-[9998]">
    // Dropdown de sugestões
    <div className="absolute top-full z-[99999]">
```

## 🐛 Problemas Conhecidos e Soluções

### 1. Dropdown Aparece Atrás de Outras Seções

**Problema**: Z-index insuficiente ou stacking context incorreto

**Solução**:

- Container com `z-[9998]`
- Dropdown com `z-[99999]`
- Remover `overflow-hidden` de parents
- Criar novo stacking context com `relative`

### 2. Input Não Atualiza com Seleção

**Problema**: React batching e timing de eventos

**Solução**:

```typescript
const handleSelect = useCallback((equipment: Equipment) => {
  // Fecha dropdown imediatamente
  setIsOpen(false)

  // Atualiza estado com delay
  setTimeout(() => {
    setQuery(equipment.name)
    setHasValidSelection(true)

    // Força atualização do DOM se necessário
    if (inputRef.current) {
      inputRef.current.value = equipment.name
      inputRef.current.dispatchEvent(new Event("input", { bubbles: true }))
    }
  }, 0)
}, [])
```

### 3. Erro "pricePerDay.toFixed is not a function"

**Problema**: Prisma retorna Decimal como string/objeto

**Solução**:

```typescript
Number(equipment.pricePerDay).toFixed(2)
```

### 4. Problemas de Acessibilidade (ARIA)

**Problema**: ESLint warnings sobre aria-selected

**Solução**:

```typescript
const isSelected = selectedIndex === index
const ariaSelected = isSelected ? 'true' : 'false'
return (
  <li role="option" aria-selected={ariaSelected}>
```

### 5. Click em Sugestão Fecha Dropdown Prematuramente

**Problema**: Event bubbling e click outside handler

**Solução**:

- Mudar de `onClick` para `onMouseDown`
- Adicionar `preventDefault()` e `stopPropagation()`
- Verificar se click foi dentro do dropdown

## 🎨 Customização

### Props do Componente

```typescript
interface AutocompleteProps {
  placeholder?: string // Texto do placeholder
  onSelect?: (equipment: Equipment) => void // Callback de seleção
  onSearch?: (query: string) => void // Callback de busca
  className?: string // Classes CSS adicionais
  disabled?: boolean // Desabilitar componente
}
```

### Estilos e Temas

```tsx
// Input com ring verde quando há seleção válida
className={cn(
  "pr-20 text-gray-900 bg-white",
  hasValidSelection && "ring-2 ring-green-500 ring-opacity-50"
)}

// Sugestão selecionada/hover
className={cn(
  'px-4 py-3 cursor-pointer transition-colors',
  isSelected
    ? 'bg-orange-50 text-orange-900'  // Selecionado
    : 'hover:bg-gray-50'               // Hover
)}
```

## 📊 Performance

### Otimizações Implementadas

1. **Debounce**: Evita requests excessivos
2. **Limite de resultados**: Máximo 8 sugestões
3. **Select específico**: Apenas campos necessários
4. **useCallback**: Previne re-criação de funções
5. **Lazy loading**: Sugestões carregadas sob demanda

### Métricas

- **Tempo de resposta**: < 200ms (local)
- **Bundle size**: ~15KB (componente + dependências)
- **Re-renders**: Minimizados com React.memo e useCallback

## 🔒 Segurança

1. **SQL Injection**: Protegido pelo Prisma ORM
2. **XSS**: React escapa automaticamente
3. **Rate limiting**: Implementar se necessário
4. **Validação**: Query sanitizada no backend

## 🧪 Testes

### Casos de Teste Essenciais

1. **Busca básica**: Digite e verifique sugestões
2. **Navegação teclado**: Teste todas as teclas
3. **Seleção mouse**: Click em diferentes sugestões
4. **Edge cases**:
   - Sem resultados
   - Erro de API
   - Texto muito longo
   - Caracteres especiais

### Comandos de Teste

```bash
# Testes unitários
pnpm test components/ui/autocomplete.test.tsx

# Testes E2E
pnpm test:e2e tests/autocomplete.spec.ts
```

## 🚀 Uso em Produção

### Checklist de Deploy

- [ ] Verificar índices do banco para queries de busca
- [ ] Configurar cache de API se necessário
- [ ] Monitorar performance das queries
- [ ] Implementar rate limiting
- [ ] Analytics de termos buscados

### Monitoramento

```typescript
// Adicionar telemetria
const searchEquipments = async (query: string) => {
  // Track search
  telemetry.track("autocomplete_search", {
    query,
    resultCount: data.length,
    responseTime: Date.now() - startTime
  })
}
```

## 📚 Referências

- [React Autocomplete Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
- [Prisma Text Search](https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#filter-on-relations)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Tailwind CSS Utilities](https://tailwindcss.com/docs)

---

**Última atualização**: Janeiro 2025 **Versão**: 1.0.0 **Mantido por**: Equipe
de Desenvolvimento GB-Locações
