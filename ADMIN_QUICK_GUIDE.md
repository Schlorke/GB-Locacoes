# 🚀 Guia Rápido - Admin Dashboard

## Template Base para Nova Página

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

export default function NovaPagina() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto space-y-6 p-6">
        {/* HEADER OBRIGATÓRIO */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/6 to-orange-700/8"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white"
                >
                  <Link href="/admin/voltar">
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                </Button>
                <div>
                  <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-sm">
                    Título da Página
                  </h1>
                  <p className="text-orange-50 font-medium">Subtítulo explicativo</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 w-fit">
                <Package className="w-5 h-5 text-orange-50" />
                <span className="font-semibold text-white">Informação contextual</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CONTEÚDO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

            <CardHeader className="relative z-10">
              <CardTitle className="text-xl font-semibold text-gray-900">Título do Card</CardTitle>
            </CardHeader>

            <CardContent className="relative z-10 space-y-8">{/* Seu conteúdo aqui */}</CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
```

## Elementos Essenciais

### 1. Seção de Formulário

```tsx
<div className="space-y-6">
  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
      <span className="text-xs font-medium text-blue-600">1</span>
    </div>
    <h3 className="text-lg font-medium text-gray-900">Nome da Seção</h3>
  </div>
  <div className="space-y-4">{/* Campos */}</div>
</div>
```

### 2. Campo de Input

```tsx
<div>
  <Label htmlFor="campo" className="text-sm font-medium">
    Campo *
  </Label>
  <Input
    id="campo"
    value={valor}
    onChange={onChange}
    placeholder="Placeholder"
    className="mt-1 focus:border-blue-500"
  />
</div>
```

### 3. Botões de Ação

```tsx
<div className="flex justify-end pt-6 mt-8 border-t border-gray-100">
  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
    <Button variant="outline" asChild className="w-full sm:w-auto bg-transparent">
      <Link href="/admin/voltar">Cancelar</Link>
    </Button>
    <Button type="submit" disabled={loading} className="w-full sm:w-auto">
      <Save className="h-4 w-4 mr-2" />
      {loading ? 'Salvando...' : 'Salvar'}
    </Button>
  </div>
</div>
```

### 4. Lista com AdminFilterCard

```tsx
<AdminFilterCard
  searchPlaceholder="Buscar..."
  searchValue={searchTerm}
  onSearchChange={setSearchTerm}
  filters={[
    {
      label: 'Status',
      value: statusFilter,
      onValueChange: setStatusFilter,
      placeholder: 'Filtrar por status',
      options: [
        { value: 'all', label: 'Todos' },
        { value: 'active', label: 'Ativos' },
      ],
    },
  ]}
  actionButtons={
    <Button asChild className="bg-slate-700 hover:bg-slate-600">
      <Link href="/admin/novo">
        <Plus className="w-4 h-4 mr-2" />
        Novo Item
      </Link>
    </Button>
  }
/>
```

## Paleta de Cores

```scss
// Principais
--orange-500: #f97316 --orange-600: #ea580c --slate-700: #334155 // Estados
  --success: #10b981 --error: #ef4444 --warning: #f59e0b // Background
  bg-gradient-to-br from-slate-50 to-blue-50;
```

## Checklist Rápido

- [ ] Header com gradiente laranja
- [ ] Container principal com gradiente de fundo
- [ ] Cards com efeitos de profundidade
- [ ] Animações motion (initial, animate)
- [ ] Estados de loading
- [ ] Toast para feedback
- [ ] Responsividade (sm:, md:, lg:, xl:)
- [ ] Botão voltar no header
- [ ] Badge informativo no header

## Estados Comuns

```tsx
// Loading
{
  loading && <Loader2 className="h-12 w-12 animate-spin" />;
}

// Toast Sucesso
toast({ title: 'Sucesso!', description: 'Operação realizada.' });

// Toast Erro
toast({ title: 'Erro', description: 'Erro ao realizar operação.', variant: 'destructive' });

// Lista Vazia
{
  items.length === 0 && (
    <div className="text-center py-12">
      <Icon className="w-12 h-12 mx-auto mb-3 text-gray-400" />
      <p className="text-lg font-medium">Nenhum item encontrado</p>
    </div>
  );
}
```

## Grid Responsivo Padrão

```tsx
className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';
```

## Animações Padrão

```tsx
// Entrada da página
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}

// Entrada de cards
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.1 }}

// Lista items
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
transition={{ delay: index * 0.05 }}
```
