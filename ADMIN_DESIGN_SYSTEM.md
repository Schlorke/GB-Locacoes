# 🎨 Admin Dashboard Design System

## GB Locações - Sistema de Design para Painel Administrativo

---

## Índice

- [Fundamentos](#fundamentos)
- [Layout e Estrutura](#layout-e-estrutura)
- [Componentes](#componentes)
- [Padrões de Interação](#padroes-de-interacao)
- [Estados e Feedback](#estados-e-feedback)
- [Templates](#templates)
- [Guia de Implementação](#guia-de-implementacao)

---

## 🎯 Fundamentos

### Paleta de Cores

```scss
// Cores Primárias
$orange-primary: #ea580c; // Orange-600
$orange-secondary: #fed7aa; // Orange-200
$orange-accent: #f97316; // Orange-500

// Cores de Background
$bg-primary: linear-gradient(to bottom right, #f8fafc, #dbeafe); // slate-50 to blue-50
$bg-card: rgba(255, 255, 255, 0.95); // white with transparency
$bg-overlay: rgba(0, 0, 0, 0.8); // modal overlays

// Cores de Texto
$text-primary: #111827; // gray-900
$text-secondary: #6b7280; // gray-500
$text-muted: #9ca3af; // gray-400
$text-white: #ffffff;

// Cores de Estado
$success: #10b981; // emerald-500
$warning: #f59e0b; // amber-500
$error: #ef4444; // red-500
$info: #3b82f6; // blue-500
```

### Tipografia

```scss
// Hierarquia de Títulos
.title-hero: text-3xl font-bold mb-2 text-white drop-shadow-sm
.title-page: text-2xl md:text-3xl font-bold mb-1
.title-section: text-xl font-semibold text-gray-900
.title-subsection: text-lg font-medium text-gray-900
.title-card: text-lg font-medium text-gray-900

// Texto Corpo
.text-body: text-base text-gray-600
.text-small: text-sm text-gray-500
.text-caption: text-xs text-gray-400
.text-label: text-sm font-medium
```

### Espaçamento

```scss
// Sistema de Espaçamento (baseado em Tailwind)
$spacing-xs: 0.25rem;   // 1 (4px)
$spacing-sm: 0.5rem;    // 2 (8px)
$spacing-md: 1rem;      // 4 (16px)
$spacing-lg: 1.5rem;    // 6 (24px)
$spacing-xl: 2rem;      // 8 (32px)
$spacing-2xl: 3rem;     // 12 (48px)

// Espaçamentos Específicos
.section-spacing: space-y-6 (24px)
.form-spacing: space-y-4 (16px)
.button-spacing: gap-3 (12px)
```

### Bordas e Sombras

```scss
// Bordas
.border-radius-sm: rounded-lg (8px)
.border-radius-md: rounded-xl (12px)
.border-radius-lg: rounded-2xl (16px)

// Sombras
.shadow-card: shadow-xl
.shadow-modal: shadow-2xl
.shadow-button: shadow-md hover:shadow-lg
.shadow-overlay: shadow-[4px_8px_18px_2px_rgba(0,0,0,0.18)]
```

---

## 🏗️ Layout e Estrutura

### 1. Container Principal

```tsx
<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
  <div className="max-w-7xl mx-auto space-y-6 p-6">{/* Conteúdo da página */}</div>
</div>
```

### 2. Header com Gradiente (Padrão Obrigatório)

```tsx
<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
  <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl">
    {/* Camadas de profundidade */}
    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/6 to-orange-700/8"></div>

    {/* Conteúdo */}
    <div className="relative z-10">
      <div className="flex items-center gap-4 mb-4">
        {/* Botão de Voltar (se aplicável) */}
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white"
        >
          <Link href="/admin/pagina-anterior">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>

        <div>
          <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-sm">Título da Página</h1>
          <p className="text-orange-50 font-medium">Subtítulo explicativo da funcionalidade</p>
        </div>
      </div>

      {/* Badge Informativo */}
      <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 w-fit">
        <IconeAqui className="w-5 h-5 text-orange-50" />
        <span className="font-semibold text-white">Informação contextual ou contador</span>
      </div>
    </div>
  </div>
</motion.div>
```

### 3. Estrutura de Cards

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
>
  <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
    {/* Camadas de profundidade para cards */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

    <CardHeader className="relative z-10">
      <CardTitle className="text-xl font-semibold text-gray-900">Título do Card</CardTitle>
      <p className="text-sm text-gray-600 mt-1">Descrição do card</p>
    </CardHeader>

    <CardContent className="relative z-10 space-y-8">{/* Conteúdo do card */}</CardContent>
  </Card>
</motion.div>
```

---

## 🧩 Componentes

### 1. Seções de Formulário

```tsx
{
  /* Padrão para seções de formulário */
}
<div className="space-y-6">
  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
      <span className="text-xs font-medium text-blue-600">1</span>
    </div>
    <h3 className="text-lg font-medium text-gray-900">Nome da Seção</h3>
    <span className="text-sm text-gray-500">(Opcional)</span> {/* Se aplicável */}
  </div>

  <div className="space-y-4">{/* Campos do formulário */}</div>
</div>;
```

### 2. Campo de Formulário

```tsx
<div>
  <Label htmlFor="campo" className="text-sm font-medium">
    Nome do Campo *
  </Label>
  <Input
    id="campo"
    value={valor}
    onChange={onChange}
    placeholder="Placeholder descritivo"
    required
    className="mt-1 focus:border-blue-500"
  />
</div>
```

### 3. Área de Upload/Conteúdo Especial

```tsx
<div className="bg-white/50 border-2 border-dashed border-gray-300 rounded-lg p-4">
  <div className="space-y-4">
    {/* Conteúdo da área especial */}

    <Button
      type="button"
      variant="outline"
      onClick={acao}
      className="w-fit px-4 bg-transparent border-gray-200 hover:bg-background hover:text-foreground hover:scale-105 hover:shadow-sm transition-all duration-300 group"
    >
      <PlusCircle className="h-4 w-4 mr-2 group-hover:text-orange-500 transition-colors duration-200" />
      <span className="group-hover:text-orange-500 transition-colors duration-200">
        Texto do Botão
      </span>
    </Button>
  </div>
</div>
```

### 4. Lista de Items Editáveis

```tsx
{
  items.length > 0 && (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-3 border rounded-md">
          <div className="min-w-0 flex-1">
            <div className="font-medium text-sm">{item.title}</div>
            <div className="text-sm mt-1">{item.description}</div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeItem(index)}
            className="flex-shrink-0 ml-2"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ))}
    </div>
  );
}
```

### 5. Botões de Ação

```tsx
{
  /* Área de botões principal */
}
<div className="flex justify-end pt-6 mt-8 border-t border-gray-100">
  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
    <Button variant="outline" type="button" asChild className="w-full sm:w-auto bg-transparent">
      <Link href="/admin/voltar">Cancelar</Link>
    </Button>
    <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
      <Save className="h-4 w-4 mr-2" />
      {isLoading ? 'Salvando...' : 'Salvar'}
    </Button>
  </div>
</div>;
```

### 6. Modal de Zoom/Visualização

```tsx
{
  isModalOpen && (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={() => setIsModalOpen(false)}
    >
      <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
        {/* Conteúdo do modal */}

        {/* Botão de fechar */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg hover:scale-110 transition-all duration-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
```

---

## 🎭 Padrões de Interação {#padroes-de-interacao}

### 1. Animações Padrão

```tsx
// Entrada da página
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}

// Entrada de cards
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.1 }}

// Entrada de listas
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
transition={{ delay: index * 0.05 }}
```

### 2. Estados de Hover

```scss
// Botões
.hover:scale-105 .hover:shadow-lg .transition-all .duration-300

// Cards
.hover:shadow-2xl .transition-all .duration-300 .hover:scale-[1.02]

// Elementos interativos
.group-hover:opacity-100 .transition-opacity
```

### 3. Estados de Loading

```tsx
{isLoading ? (
  <div className="flex items-center justify-center h-[calc(100vh-200px)]">
    <div className="text-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
      <p className="text-lg text-muted-foreground">Carregando...</p>
    </div>
  </div>
) : (
  // Conteúdo normal
)}
```

---

## 📱 Estados e Feedback {#estados-e-feedback}

### 1. Toasts/Notificações

```tsx
// Sucesso
toast({
  title: 'Sucesso!',
  description: 'Operação realizada com sucesso.',
});

// Erro
toast({
  title: 'Erro',
  description: 'Mensagem de erro específica.',
  variant: 'destructive',
});

// Aviso
toast({
  title: 'Atenção',
  description: 'Mensagem de aviso.',
  variant: 'default',
});
```

### 2. Estados de Validação

```tsx
// Validação de campo obrigatório
if (!campo || campo.trim() === '') {
  toast({
    title: 'Erro de Validação',
    description: 'Preencha todos os campos obrigatórios (*).',
    variant: 'destructive',
  });
  return;
}
```

### 3. Estados Condicionais

```tsx
{items.length === 0 ? (
  <div className="text-center py-12">
    <div className="text-gray-400 mb-4">
      <IconeAqui className="w-12 h-12 mx-auto mb-3" />
      <p className="text-lg font-medium">Nenhum item encontrado</p>
      <p className="text-sm">Mensagem explicativa</p>
    </div>
  </div>
) : (
  // Lista de items
)}
```

---

## 📄 Templates

### 1. Template: Página de Listagem

```tsx
export default function ListagemPage() {
  // Estados padrão
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        {/* Filtros com AdminFilterCard */}
        {/* Grid/Lista de items */}
      </div>
    </div>
  );
}
```

### 2. Template: Página de Formulário

```tsx
export default function FormularioPage() {
  // Estados do formulário
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto space-y-6 p-6">
        {/* Header com gradiente */}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dados do Item</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Layout de duas colunas */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Coluna esquerda: Formulário */}
                <div className="space-y-8">{/* Seções do formulário */}</div>

                {/* Coluna direita: Upload/Visualização */}
                <div className="space-y-6">{/* Área de upload */}</div>
              </div>

              {/* Botões de ação */}
              <div className="flex justify-end pt-6 mt-8 border-t border-gray-100">
                {/* Botões */}
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
```

### 3. Template: Modal de Detalhes

```tsx
<Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle className="flex items-center gap-3 text-xl">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
          {selectedItem?.name?.charAt(0).toUpperCase()}
        </div>
        Detalhes do Item - {selectedItem?.name}
      </DialogTitle>
    </DialogHeader>

    {selectedItem && (
      <div className="space-y-6">
        {/* Cards de informações */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Icon className="w-5 h-5 text-blue-600" />
              Seção de Informações
            </CardTitle>
          </CardHeader>
          <CardContent>{/* Conteúdo */}</CardContent>
        </Card>
      </div>
    )}
  </DialogContent>
</Dialog>
```

---

## 🚀 Guia de Implementação {#guia-de-implementacao}

### 1. Checklist para Nova Página

- [ ] Container principal com gradiente de fundo
- [ ] Header com gradiente laranja e animação
- [ ] Cards com efeitos de profundidade
- [ ] Animações de entrada (motion)
- [ ] Estados de loading
- [ ] Tratamento de erros com toast
- [ ] Responsividade móvel
- [ ] Acessibilidade (aria-labels, títulos)

### 2. Estrutura de Arquivos

```text
/app/admin/nova-pagina/
├── page.tsx              # Página principal
├── components/           # Componentes específicos
├── hooks/               # Hooks customizados
└── types.ts             # Tipos TypeScript
```

### 3. Imports Padrão

```tsx
'use client';

import { AdminFilterCard } from '@/components/admin/admin-filter-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Package } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
```

### 4. Padrões de Nomenclatura

- **Componentes**: PascalCase (ex: `NovaCategoria`)
- **Funções**: camelCase (ex: `handleSubmit`)
- **Variáveis**: camelCase (ex: `formData`)
- **Estados**: descriptivos (ex: `isLoading`, `selectedItem`)
- **Props**: camelCase (ex: `onItemSelect`)

### 5. Responsividade

```scss
// Breakpoints padrão
.xs: max-width: 475px
.sm: min-width: 640px
.md: min-width: 768px
.lg: min-width: 1024px
.xl: min-width: 1280px
.2xl: min-width: 1536px

// Grid responsivo padrão
.grid .grid-cols-1 .md:grid-cols-2 .lg:grid-cols-3 .xl:grid-cols-4
```

---

## 🎨 Cores por Contexto

### Ações

- **Primária**: Orange-600 (#ea580c)
- **Secundária**: Slate-700 (#334155)
- **Sucesso**: Green-500 (#10b981)
- **Perigo**: Red-500 (#ef4444)
- **Aviso**: Yellow-500 (#eab308)

### Badges por Status

```tsx
const statusConfig = {
  active: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
  inactive: { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: XCircle },
  pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
  error: { color: 'bg-red-100 text-red-800 border-red-200', icon: AlertCircle },
};
```

---

## 📚 Recursos e Componentes Reutilizáveis

### Componentes UI Principais

- `AdminFilterCard` - Filtros padrão
- `ImageUpload` - Upload de imagens
- `CurrencyInput` - Entrada de valores monetários
- `CustomSelect` - Seleção customizada
- `Badge` - Indicadores de status
- `Dialog` - Modais
- `Card` - Containers

### Hooks Customizados

- `useToast` - Notificações
- `useIsMobile` - Detecção de dispositivo móvel

---

_Este design system deve ser seguido rigorosamente para manter a consistência
visual e de experiência do usuário em todo o painel administrativo._
