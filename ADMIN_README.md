# 📖 Como Usar o Admin Design System

## 📁 Arquivos do Design System

1. **`ADMIN_DESIGN_SYSTEM.md`** - Documentação completa com fundamentos, cores, tipografia e padrões
2. **`ADMIN_QUICK_GUIDE.md`** - Guia rápido com templates prontos para uso
3. **`ADMIN_COMPONENTS.md`** - Componentes reutilizáveis já implementados
4. **`ADMIN_README.md`** - Este arquivo com instruções de uso

## 🚀 Começando uma Nova Página

### Passo 1: Copie o Template Base

Use o template do `ADMIN_QUICK_GUIDE.md` como ponto de partida:

```bash
# Crie o arquivo da nova página
touch app/admin/nova-secao/page.tsx

# Copie o template base e personalize
```

### Passo 2: Personalize o Header

```tsx
<AdminPageHeaderFull
  title="Sua Nova Seção"
  subtitle="Descrição da funcionalidade"
  backHref="/admin/dashboard" // Ajuste conforme necessário
  icon={<SeuIcone className="w-6 h-6 text-orange-200" />}
  badge={{
    icon: <IconeContextual className="w-5 h-5 text-orange-50" />,
    text: 'Informação relevante',
  }}
/>
```

### Passo 3: Estruture o Conteúdo

Para páginas de **listagem**:

```tsx
// Use AdminFilterCard + Grid de cards
<AdminFilterCard />
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards dos items */}
</div>
```

Para páginas de **formulário**:

```tsx
// Use FormSection para organizar campos
<AdminCard title="Dados">
  <FormSection title="Seção 1" number={1}>
    <FormField label="Campo" required>
      <Input />
    </FormField>
  </FormSection>

  <ActionButtons cancelHref="/admin/voltar" />
</AdminCard>
```

## 🎨 Guia de Cores por Contexto

### Ações Principais

- **Criar/Salvar**: `bg-slate-700 hover:bg-slate-600`
- **Editar**: `text-blue-600 hover:bg-blue-50`
- **Excluir**: `text-red-600 hover:bg-red-50`
- **Visualizar**: `text-gray-600 hover:bg-gray-50`

### Status

```tsx
// Use o componente StatusBadge
<StatusBadge status="active" />     // Verde
<StatusBadge status="pending" />    // Amarelo
<StatusBadge status="inactive" />   // Cinza
<StatusBadge status="error" />      // Vermelho
```

### Seções de Formulário

- **Seção 1**: `bg-blue-100 text-blue-600` (Azul)
- **Seção 2**: `bg-green-100 text-green-600` (Verde)
- **Seção 3**: `bg-purple-100 text-purple-600` (Roxo)
- **Seção 4**: `bg-orange-100 text-orange-600` (Laranja)

## 📱 Responsividade Padrão

### Breakpoints

```scss
xs: 475px   // Móveis pequenos
sm: 640px   // Móveis
md: 768px   // Tablets
lg: 1024px  // Desktop pequeno
xl: 1280px  // Desktop
2xl: 1536px // Desktop grande
```

### Grid Responsivo

```tsx
// Listagens
className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';

// Formulários (2 colunas)
className = 'grid grid-cols-1 xl:grid-cols-2 gap-8';

// Botões
className = 'flex flex-col sm:flex-row gap-3 w-full sm:w-auto';
```

## 🔄 Estados Comuns

### Loading

```tsx
{isLoading ? (
  <LoadingPage message="Carregando dados..." />
) : (
  // Conteúdo normal
)}
```

### Lista Vazia

```tsx
<EmptyState
  icon={<Package className="w-12 h-12" />}
  title="Nenhum item encontrado"
  description="Clique no botão abaixo para adicionar o primeiro item"
  action={{
    text: 'Novo Item',
    href: '/admin/novo-item',
  }}
/>
```

### Feedback do Usuário

```tsx
// Sucesso
toast({
  title: 'Sucesso!',
  description: 'Item criado com sucesso.',
});

// Erro
toast({
  title: 'Erro',
  description: 'Não foi possível salvar o item.',
  variant: 'destructive',
});
```

## 🧩 Componentes Prontos

### Componentes Básicos (já implementados)

- `AdminFilterCard` - Filtros com busca e reset
- `ImageUpload` - Upload de múltiplas imagens
- `CurrencyInput` - Campos de valor monetário
- `CustomSelect` - Seleção customizada

### Componentes do Design System (para implementar)

- `AdminPageHeaderFull` - Header completo com gradiente
- `AdminCard` - Card com efeitos de profundidade
- `FormSection` - Seção numerada de formulário
- `FormField` - Campo com label e validação
- `ActionButtons` - Botões de cancelar/salvar
- `EditableList` - Lista editável com remoção
- `StatusBadge` - Badge de status colorido
- `DetailModal` - Modal de visualização
- `LoadingPage` - Página de carregamento
- `EmptyState` - Estado vazio com ação

## 📋 Checklist de Qualidade

### Antes de Fazer Deploy

- [ ] Header com gradiente laranja implementado
- [ ] Cards com efeitos de profundidade
- [ ] Animações de entrada (motion)
- [ ] Estados de loading tratados
- [ ] Feedback com toast implementado
- [ ] Responsividade testada (mobile/desktop)
- [ ] Estados vazios tratados
- [ ] Validação de formulário
- [ ] Acessibilidade (aria-labels)
- [ ] Navegação (botão voltar)

### Performance

- [ ] Componentes otimizados com `useCallback`
- [ ] Estados locais minimizados
- [ ] Imagens otimizadas
- [ ] Lazy loading quando aplicável

### UX/UI

- [ ] Feedback visual imediato
- [ ] Estados de carregamento claros
- [ ] Mensagens de erro específicas
- [ ] Confirmações para ações destrutivas
- [ ] Navegação intuitiva

## 🎯 Exemplos Práticos

### 1. Página de Listagem Simples

```tsx
export default function MinhaListagem() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <AdminPageHeaderFull
          title="Minha Seção"
          subtitle="Gerencie os items da seção"
          icon={<Package className="w-6 h-6 text-orange-200" />}
          badge={{
            icon: <Hash className="w-5 h-5 text-orange-50" />,
            text: `${items.length} items encontrados`,
          }}
        />

        <AdminFilterCard
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          actionButtons={
            <Button asChild className="bg-slate-700 hover:bg-slate-600">
              <Link href="/admin/nova-secao/novo">
                <Plus className="w-4 h-4 mr-2" />
                Novo Item
              </Link>
            </Button>
          }
        />

        {loading ? (
          <LoadingPage />
        ) : items.length === 0 ? (
          <EmptyState
            icon={<Package className="w-12 h-12" />}
            title="Nenhum item encontrado"
            description="Adicione o primeiro item para começar"
            action={{ text: 'Novo Item', href: '/admin/nova-secao/novo' }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Seus cards aqui */}
          </div>
        )}
      </div>
    </div>
  );
}
```

### 2. Página de Formulário

```tsx
export default function MeuFormulario() {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto space-y-6 p-6">
        <AdminPageHeaderFull
          title="Novo Item"
          subtitle="Adicione um novo item ao sistema"
          backHref="/admin/minha-secao"
          icon={<Plus className="w-6 h-6 text-orange-200" />}
        />

        <form onSubmit={handleSubmit}>
          <AdminCard title="Dados do Item">
            <FormSection title="Informações Básicas" number={1}>
              <FormField label="Nome" required>
                <Input className="focus:border-blue-500" />
              </FormField>
            </FormSection>

            <ActionButtons cancelHref="/admin/minha-secao" isLoading={isLoading} />
          </AdminCard>
        </form>
      </div>
    </div>
  );
}
```

## 🔗 Links Úteis

- **Tailwind CSS**: <https://tailwindcss.com/docs>
- **Framer Motion**: <https://www.framer.com/motion/>
- **Lucide Icons**: <https://lucide.dev/>
- **shadcn/ui**: <https://ui.shadcn.com/>

---

**💡 Dica**: Mantenha sempre a consistência visual seguindo este design system.
Quando em dúvida, consulte as páginas existentes como referência!
