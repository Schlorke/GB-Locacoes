# 🏗️ Sistema Administrativo Completo - GB Locações

> **Documentação completa do painel administrativo: design system, componentes,
> guias e implementação**

## 📋 Índice

- [🎯 Visão Geral](#-visão-geral)
- [🚀 Quick Start Guide](#-quick-start-guide)
- [🎨 Design System](#-design-system)
- [🧩 Componentes Reutilizáveis](#-componentes-reutilizáveis)
- [⚙️ Configurações e Settings](#️-configurações-e-settings)
- [📊 Dashboard e Analytics](#-dashboard-e-analytics)
- [🔐 Autenticação e Permissões](#-autenticação-e-permissões)

---

## 🎯 Visão Geral

O sistema administrativo do GB-Locações é uma interface moderna e intuitiva
construída com:

- **Next.js 16** com App Router
- **React 19** com Server Components
- **TypeScript** para type safety
- **Tailwind CSS** para estilização
- **Framer Motion** para animações
- **Radix UI** para componentes acessíveis

### 🎯 **Características Principais**

- **📱 Responsivo** - Funciona perfeitamente em desktop, tablet e mobile
- **⚡ Performance** - Otimizado para velocidade e experiência fluida
- **♿ Acessível** - Compatível com leitores de tela e navegação por teclado
- **🎨 Consistente** - Design system unificado e componentizado
- **🔐 Seguro** - Autenticação robusta e controle de permissões

---

## 🚀 Quick Start Guide

### **Template Base para Nova Página**

```tsx
"use client"

import { AdminFilterCard } from "@/components/admin/admin-filter-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { ArrowLeft, Save, Package } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function NovaPagina() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

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
                  <p className="text-orange-50 font-medium">
                    Subtítulo explicativo
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 w-fit">
                <Package className="w-5 h-5 text-orange-50" />
                <span className="font-semibold text-white">
                  Informação contextual
                </span>
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
              <CardTitle className="text-xl font-semibold text-gray-900">
                Título do Card
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10 space-y-8">
              {/* Seu conteúdo aqui */}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
```

### **Elementos Essenciais**

#### **1. Seção de Formulário**

```tsx
<div className="space-y-6">
  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
    <Package className="w-5 h-5 text-orange-600" />
    <h3 className="text-lg font-semibold text-gray-900">Informações Básicas</h3>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-2">
      <Label htmlFor="nome">Nome</Label>
      <Input id="nome" placeholder="Digite o nome..." />
    </div>
    <div className="space-y-2">
      <Label htmlFor="categoria">Categoria</Label>
      <Input id="categoria" placeholder="Selecione a categoria..." />
    </div>
  </div>
</div>
```

#### **2. Botões de Ação**

```tsx
<div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
  <Button
    type="submit"
    disabled={loading}
    className="bg-orange-600 hover:bg-orange-700"
  >
    {loading ? "Salvando..." : "Salvar"}
    <Save className="w-4 h-4 ml-2" />
  </Button>
  <Button variant="outline" type="button">
    Cancelar
  </Button>
</div>
```

---

## 🎨 Design System

### **🎨 Paleta de Cores**

#### **Cores Primárias**

- **Orange 600** (`#ea580c`) - Cor principal da marca
- **Orange 500** (`#f97316`) - Hover states
- **Orange 700** (`#c2410c`) - Active states

#### **Cores Neutras**

- **Slate 50** (`#f8fafc`) - Background claro
- **Slate 100** (`#f1f5f9`) - Background cards
- **Slate 800** (`#1e293b`) - Texto principal
- **Slate 600** (`#475569`) - Texto secundário

#### **Cores de Status**

- **Green 600** (`#16a34a`) - Sucesso
- **Red 600** (`#dc2626`) - Erro/Perigo
- **Yellow 600** (`#ca8a04`) - Aviso
- **Blue 600** (`#2563eb`) - Informação

### **📝 Tipografia**

#### **Hierarquia de Títulos**

```css
/* H1 - Títulos principais de página */
.admin-h1 {
  @apply text-3xl font-bold text-white drop-shadow-sm;
}

/* H2 - Títulos de seção */
.admin-h2 {
  @apply text-xl font-semibold text-gray-900;
}

/* H3 - Subtítulos */
.admin-h3 {
  @apply text-lg font-semibold text-gray-900;
}

/* Body - Texto padrão */
.admin-body {
  @apply text-base text-gray-700;
}

/* Small - Texto auxiliar */
.admin-small {
  @apply text-sm text-gray-600;
}
```

### **🎭 Animações**

#### **Animações de Entrada**

```tsx
// Fade in com slide up
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>

// Stagger para listas
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
}
```

### **📐 Layout e Spacing**

#### **Container Principal**

```tsx
<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
  <div className="max-w-7xl mx-auto space-y-6 p-6">{/* Conteúdo */}</div>
</div>
```

#### **Grid System**

```tsx
// Grid responsivo
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Grid com auto-fit
<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
```

---

## 🧩 Componentes Reutilizáveis

### **1. AdminPageHeader**

```tsx
interface AdminPageHeaderProps {
  title: string
  subtitle: string
  backHref?: string
  icon: React.ReactNode
  badge?: {
    icon: React.ReactNode
    text: string
  }
}

export function AdminPageHeader({
  title,
  subtitle,
  backHref,
  icon,
  badge
}: AdminPageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            {backHref && (
              <Button variant="ghost" size="icon" asChild>
                <Link href={backHref}>
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
            )}
            <div className="flex items-center gap-3">
              {icon}
              <div>
                <h1 className="text-3xl font-bold text-white drop-shadow-sm">
                  {title}
                </h1>
                <p className="text-orange-50 font-medium">{subtitle}</p>
              </div>
            </div>
          </div>
          {badge && (
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 w-fit">
              {badge.icon}
              <span className="font-semibold text-white">{badge.text}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
```

### **2. AdminCard**

```tsx
interface AdminCardProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function AdminCard({ title, children, className }: AdminCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

      <CardHeader className="relative z-10">
        <CardTitle className="text-xl font-semibold text-gray-900">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10">{children}</CardContent>
    </Card>
  )
}
```

### **3. AdminFilterCard**

```tsx
interface AdminFilterCardProps {
  onSearch: (term: string) => void
  onCategoryFilter: (category: string) => void
  onStatusFilter: (status: string) => void
  searchPlaceholder?: string
}

export function AdminFilterCard({
  onSearch,
  onCategoryFilter,
  onStatusFilter,
  searchPlaceholder = "Buscar..."
}: AdminFilterCardProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="search">Buscar</Label>
            <Input
              id="search"
              placeholder={searchPlaceholder}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="category">Categoria</Label>
            <Select onValueChange={onCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="equipments">Equipamentos</SelectItem>
                <SelectItem value="tools">Ferramentas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={onStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
```

#### **Layout (coluna única em resoluções intermediárias)**

Algumas telas (ex.: `app/admin/orcamentos/page.tsx`) podem ficar “apertadas” em
tablet/`md`. Para isso, o `AdminFilterCard` suporta um modo que **força coluna
única** para todos os elementos do card:

```tsx
<AdminFilterCard layout="stacked" />
```

---

## 🗂️ Gerenciamento de Categorias

### **Página Admin de Categorias**

O fluxo legado de categorias foi temporariamente desativado enquanto o novo
componente de dialog unificado é desenvolvido. A página
`app/admin/categorias/page.tsx` permanece acessível, mas exibe um aviso de
manutenção até que o novo modal entre em produção. Quando o componente estiver
estável, esta seção voltará a oferecer busca, grade responsiva e ações
contextuais construídas sobre a nova base.

### **Paginação Inteligente**

- 📦 Itens por página: `9` (constante `ITEMS_PER_PAGE`)
- 🔁 Estado controlado com `currentPage` e `SmartPagination`
- ♿ Controles anteriores/próximos com rótulos acessíveis PT-BR
- ⚡ Paginador oculta automaticamente quando existe apenas uma página

```tsx
const ITEMS_PER_PAGE = 9
const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE)
const effectiveCurrentPage =
  totalPages > 0 ? Math.min(currentPage, totalPages) : 1
const paginatedCategories = filteredCategories.slice(
  (effectiveCurrentPage - 1) * ITEMS_PER_PAGE,
  effectiveCurrentPage * ITEMS_PER_PAGE
)

return (
  <>
    {/* Grade de categorias */}
    <SmartPagination
      currentPage={effectiveCurrentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  </>
)
```

> ℹ️ O componente `SmartPagination` está disponível em
> `components/ui/smart-pagination.tsx` e utiliza internamente o sistema de
> paginação padronizado (`components/ui/pagination.tsx`), garantindo estilos
> consistentes com hover, foco e labels em português.

---

## ⚙️ Configurações e Settings

### **Sistema de Settings**

O admin possui um sistema robusto de configurações baseado em:

- **Zustand** para gerenciamento de estado global
- **React Hook Form** para formulários
- **Zod** para validação
- **LocalStorage** para persistência

#### **Hook de Settings**

```tsx
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AdminSettings {
  theme: "light" | "dark" | "system"
  sidebarCollapsed: boolean
  notificationsEnabled: boolean
  autoSave: boolean
  language: "pt" | "en"

  // Actions
  setTheme: (theme: "light" | "dark" | "system") => void
  toggleSidebar: () => void
  toggleNotifications: () => void
  toggleAutoSave: () => void
  setLanguage: (language: "pt" | "en") => void
}

export const useAdminSettings = create<AdminSettings>()(
  persist(
    (set) => ({
      theme: "system",
      sidebarCollapsed: false,
      notificationsEnabled: true,
      autoSave: true,
      language: "pt",

      setTheme: (theme) => set({ theme }),
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      toggleNotifications: () =>
        set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
      toggleAutoSave: () => set((state) => ({ autoSave: !state.autoSave })),
      setLanguage: (language) => set({ language })
    }),
    {
      name: "admin-settings"
    }
  )
)
```

### **Página de Settings**

A página de configurações é dividida em seções:

1. **Preferências Gerais**
2. **Notificações**
3. **Aparência**
4. **Segurança**
5. **Integrações**

---

## 📊 Dashboard e Analytics

### **Componentes de Dashboard**

#### **1. StatsCard**

```tsx
interface StatsCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    trend: "up" | "down"
  }
  icon: React.ReactNode
}

export function StatsCard({ title, value, change, icon }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <p
                className={cn(
                  "text-sm flex items-center gap-1",
                  change.trend === "up" ? "text-green-600" : "text-red-600"
                )}
              >
                {change.trend === "up" ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {Math.abs(change.value)}%
              </p>
            )}
          </div>
          <div className="text-orange-600">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}
```

#### **2. ChartCard**

```tsx
interface ChartCardProps {
  title: string
  data: any[]
  type: "line" | "bar" | "pie"
}

export function ChartCard({ title, data, type }: ChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Integração com Recharts ou Chart.js */}
        <ResponsiveContainer width="100%" height={300}>
          {type === "line" && <LineChart data={data}>...</LineChart>}
          {type === "bar" && <BarChart data={data}>...</BarChart>}
          {type === "pie" && <PieChart data={data}>...</PieChart>}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
```

---

## 🔐 Autenticação e Permissões

### **Sistema de Roles**

```typescript
enum Role {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  OPERATOR = "OPERATOR",
  CLIENT = "CLIENT"
}

enum Permission {
  // Equipments
  EQUIPMENT_CREATE = "EQUIPMENT_CREATE",
  EQUIPMENT_READ = "EQUIPMENT_READ",
  EQUIPMENT_UPDATE = "EQUIPMENT_UPDATE",
  EQUIPMENT_DELETE = "EQUIPMENT_DELETE",

  // Users
  USER_MANAGE = "USER_MANAGE",
  USER_VIEW = "USER_VIEW",

  // Settings
  SETTINGS_MANAGE = "SETTINGS_MANAGE",

  // Analytics
  ANALYTICS_VIEW = "ANALYTICS_VIEW"
}

const rolePermissions: Record<Role, Permission[]> = {
  [Role.ADMIN]: Object.values(Permission),
  [Role.MANAGER]: [
    Permission.EQUIPMENT_CREATE,
    Permission.EQUIPMENT_READ,
    Permission.EQUIPMENT_UPDATE,
    Permission.USER_VIEW,
    Permission.ANALYTICS_VIEW
  ],
  [Role.OPERATOR]: [Permission.EQUIPMENT_READ, Permission.EQUIPMENT_UPDATE],
  [Role.CLIENT]: [Permission.EQUIPMENT_READ]
}
```

### **Hook de Permissões**

```tsx
export function usePermissions() {
  const { data: session } = useSession()

  const hasPermission = (permission: Permission): boolean => {
    if (!session?.user?.role) return false

    const userRole = session.user.role as Role
    return rolePermissions[userRole]?.includes(permission) ?? false
  }

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some((permission) => hasPermission(permission))
  }

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every((permission) => hasPermission(permission))
  }

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    role: session?.user?.role as Role
  }
}
```

### **Middleware de Proteção**

```tsx
// middleware/require-admin.ts
export async function requireAdmin(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  const userRole = session.user.role as Role
  const adminRoles = [Role.ADMIN, Role.MANAGER]

  if (!adminRoles.includes(userRole)) {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 })
  }

  return NextResponse.next()
}
```

---

## 🔗 Links Relacionados

- **[../getting-started/development.md](../getting-started/development.md)** -
  Setup de desenvolvimento
- **[../guides/storybook.md](../guides/storybook.md)** - Documentação do
  Storybook
- **[design-system.md](./design-system.md)** - Sistema de design completo
- **[../architecture/overview.md](../architecture/overview.md)** - Arquitetura
  do sistema

---

_Última atualização: novembro 2025_
