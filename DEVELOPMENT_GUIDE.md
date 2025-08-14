# 🚀 Guia de Desenvolvimento - GB-Locacoes

> **Guia completo para desenvolvedores trabalhando no projeto GB-Locacoes**

## 📋 Índice

- [🎯 Introdução](#-introdução)
- [🛠️ Setup do Ambiente](#️-setup-do-ambiente)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🎨 Padrões de Desenvolvimento](#-padrões-de-desenvolvimento)
- [🧪 Testes](#-testes)
- [🔧 Debugging](#-debugging)
- [📚 Recursos](#-recursos)

---

## 🎯 Introdução

Este guia fornece todas as informações necessárias para desenvolvedores
trabalharem no projeto GB-Locacoes de forma eficiente e consistente.

### 🎯 Objetivos

- **Consistência** - Padrões uniformes de código
- **Qualidade** - Código limpo e testável
- **Performance** - Otimizações contínuas
- **Colaboração** - Trabalho em equipe eficiente

---

## 🛠️ Setup do Ambiente

### 📋 Pré-requisitos

```bash
# Node.js 20+
node --version  # v20.0.0 ou superior

# PNPM 10+
pnpm --version  # v10.0.0 ou superior

# Git
git --version   # v2.0.0 ou superior
```

### ⚡ Instalação Rápida

```bash
# 1. Clone o repositório
git clone https://github.com/GBLocacoes/GB-Locacoes.git
cd GB-Locacoes

# 2. Instale dependências
pnpm install

# 3. Configure variáveis de ambiente
cp .env.example .env.local

# 4. Configure o banco
pnpm db:generate
pnpm db:push
pnpm db:seed

# 5. Inicie o desenvolvimento
pnpm dev
```

### ⚠️ Compatibilidade de Dependências

#### **🚨 VERSÕES CRÍTICAS**

| Dependência        | Versão OBRIGATÓRIA | ⚠️ NÃO ATUALIZAR              |
| ------------------ | ------------------ | ----------------------------- |
| **@prisma/client** | **6.13.0**         | ❌ 6.14.0+ (quebra build)     |
| **prisma**         | **6.13.0**         | ❌ 6.14.0+ (quebra build)     |
| **tailwindcss**    | **3.4.17**         | ❌ 4.x (quebra design system) |

#### **🔍 Processo de Atualização Segura**

```bash
# ✅ SEMPRE seguir esta ordem:
# 1. Atualizar dependências por categoria
pnpm update @radix-ui/react-*  # UI - geralmente seguro

# 2. TESTAR build após cada grupo
pnpm run build  # <- CRÍTICO!

# 3. Se build quebrar, reverter imediatamente
pnpm add @prisma/client@6.13.0 prisma@6.13.0

# 4. Nunca atualizar Prisma ou Tailwind sem aprovação
```

#### **🛡️ Verificação de Compatibilidade**

```bash
# Antes de qualquer atualização:
pnpm outdated                    # Ver o que pode ser atualizado
pnpm update [specific-packages]  # Atualizar categorias específicas
pnpm run build                   # SEMPRE testar build
pnpm test                        # SEMPRE rodar testes
```

### 🔧 Configuração do VS Code

#### **Extensões Recomendadas**

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "prisma.prisma",
    "ms-vscode.vscode-json",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-stories"
  ]
}
```

#### **Configurações do Workspace**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## 📁 Estrutura do Projeto

### 🗂️ Organização de Arquivos

```
GB-Locacoes/
├── 📁 app/                    # Next.js App Router
│   ├── 📁 admin/             # Painel administrativo
│   ├── 📁 api/               # API Routes
│   ├── 📁 (public)/          # Rotas públicas
│   └── 📄 layout.tsx         # Layout raiz
├── 📁 components/            # Componentes React
│   ├── 📁 ui/               # Componentes base (Radix UI)
│   ├── 📁 admin/            # Componentes administrativos
│   └── 📄 *.tsx             # Componentes específicos
├── 📁 lib/                  # Utilitários e configurações
│   ├── 📁 validators/       # Schemas de validação
│   └── 📄 *.ts              # Configurações e integrações
├── 📁 hooks/                # Custom hooks
├── 📁 types/                # Definições TypeScript
├── 📁 schemas/              # Schemas Zod
├── 📁 prisma/               # Schema e migrações
├── 📁 stories/              # Storybook stories
├── 📁 design-tokens/        # Sistema de design tokens
├── 📁 tests/                # Testes
└── 📁 docs/                 # Documentação adicional
```

### 📝 Convenções de Nomenclatura

| Tipo            | Padrão            | Exemplo              |
| --------------- | ----------------- | -------------------- |
| **Arquivos**    | kebab-case        | `equipment-card.tsx` |
| **Componentes** | PascalCase        | `EquipmentCard`      |
| **Hooks**       | camelCase + `use` | `useEquipment`       |
| **Types**       | PascalCase        | `EquipmentType`      |
| **Constants**   | UPPER_SNAKE_CASE  | `API_ENDPOINTS`      |
| **Functions**   | camelCase         | `formatCurrency`     |

---

## 🎨 Padrões de Desenvolvimento

### 🧩 Componentes

#### **Estrutura Padrão**

```typescript
'use client'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

const componentVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        default: 'default-classes',
        destructive: 'destructive-classes',
        outline: 'outline-classes',
      },
      size: {
        default: 'default-size',
        sm: 'small-size',
        lg: 'large-size',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Props específicas
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Component.displayName = 'Component'

export { Component, componentVariants }
```

#### **Exemplo Prático**

```typescript
// components/ui/button.tsx
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus:outline-none',
  {
    variants: {
      variant: {
        default: 'bg-slate-700 text-white hover:bg-slate-600',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-50',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        ghost: 'hover:bg-gray-100',
        link: 'text-blue-600 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-sm',
        lg: 'h-12 px-6 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
```

### 📝 Formulários

#### **React Hook Form + Zod**

```typescript
// schemas/equipment.schema.ts
import { z } from "zod"

export const equipmentSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(255),
  description: z.string().optional(),
  pricePerDay: z.number().positive("Preço deve ser positivo"),
  categoryId: z.string().uuid("ID da categoria inválido"),
  images: z.array(z.string().url()).optional()
})

export type EquipmentInput = z.infer<typeof equipmentSchema>
```

```typescript
// components/equipment-form.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { equipmentSchema, type EquipmentInput } from '@/schemas/equipment.schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export function EquipmentForm({ onSubmit }: { onSubmit: (data: EquipmentInput) => void }) {
  const form = useForm<EquipmentInput>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      name: '',
      description: '',
      pricePerDay: 0,
      categoryId: '',
      images: [],
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Equipamento</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome do equipamento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Descreva o equipamento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pricePerDay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço por Dia</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="category1">Escavadeiras</SelectItem>
                  <SelectItem value="category2">Betoneiras</SelectItem>
                  <SelectItem value="category3">Andaimes</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Salvar Equipamento
        </Button>
      </form>
    </Form>
  )
}
```

### 🎣 Custom Hooks

#### **Estrutura Padrão**

```typescript
// hooks/use-equipment.ts
import { useState, useEffect } from "react"
import type { Equipment } from "@/types/equipment"

interface UseEquipmentOptions {
  categoryId?: string
  available?: boolean
  limit?: number
}

interface UseEquipmentReturn {
  equipment: Equipment[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useEquipment(
  options: UseEquipmentOptions = {}
): UseEquipmentReturn {
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEquipment = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (options.categoryId) params.append("categoryId", options.categoryId)
      if (options.available !== undefined)
        params.append("available", options.available.toString())
      if (options.limit) params.append("limit", options.limit.toString())

      const response = await fetch(`/api/equipment?${params}`)
      const data = await response.json()

      if (!response.ok)
        throw new Error(data.error || "Erro ao carregar equipamentos")

      setEquipment(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEquipment()
  }, [options.categoryId, options.available, options.limit])

  return {
    equipment,
    loading,
    error,
    refetch: fetchEquipment
  }
}
```

### 🗄️ Database Queries

#### **Prisma Patterns**

```typescript
// lib/queries/equipment.ts
import { prisma } from "@/lib/prisma"
import type {
  Equipment,
  CreateEquipmentInput,
  UpdateEquipmentInput
} from "@/types/equipment"

export async function getEquipment(
  options: {
    categoryId?: string
    available?: boolean
    limit?: number
    offset?: number
  } = {}
) {
  const { categoryId, available, limit = 20, offset = 0 } = options

  const where: any = {}
  if (categoryId) where.categoryId = categoryId
  if (available !== undefined) where.available = available

  const [equipment, total] = await Promise.all([
    prisma.equipment.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      },
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: "desc"
      }
    }),
    prisma.equipment.count({ where })
  ])

  return {
    data: equipment,
    pagination: {
      page: Math.floor(offset / limit) + 1,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  }
}

export async function getEquipmentById(id: string) {
  return prisma.equipment.findUnique({
    where: { id },
    include: {
      category: true
    }
  })
}

export async function createEquipment(data: CreateEquipmentInput) {
  return prisma.equipment.create({
    data,
    include: {
      category: true
    }
  })
}

export async function updateEquipment(id: string, data: UpdateEquipmentInput) {
  return prisma.equipment.update({
    where: { id },
    data,
    include: {
      category: true
    }
  })
}

export async function deleteEquipment(id: string) {
  // Verificar dependências antes de deletar
  const hasDependencies = await prisma.quoteItem.findFirst({
    where: { equipmentId: id }
  })

  if (hasDependencies) {
    throw new Error("Equipamento possui orçamentos associados")
  }

  return prisma.equipment.delete({
    where: { id }
  })
}
```

---

## 🧪 Testes

### 🎯 Estratégia de Testes

```typescript
// tests/components/button.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('applies variant classes correctly', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-red-600')
  })

  it('applies size classes correctly', () => {
    render(<Button size="lg">Large Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('h-12', 'px-6', 'text-lg')
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<Button onClick={handleClick}>Click me</Button>)

    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Button ref={ref}>Button with Ref</Button>)
    expect(ref).toHaveBeenCalled()
  })
})
```

### 🔧 Testes de API

```typescript
// tests/api/equipment.test.ts
import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { createMocks } from "node-mocks-http"
import { GET, POST } from "@/app/api/equipment/route"

describe("/api/equipment", () => {
  it("GET returns equipment list", async () => {
    const { req } = createMocks({
      method: "GET"
    })

    const response = await GET(req)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(Array.isArray(data.data)).toBe(true)
  })

  it("POST creates new equipment", async () => {
    const equipmentData = {
      name: "Test Equipment",
      description: "Test Description",
      pricePerDay: 100,
      categoryId: "test-category-id"
    }

    const { req } = createMocks({
      method: "POST",
      body: equipmentData
    })

    const response = await POST(req)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.success).toBe(true)
    expect(data.data.name).toBe(equipmentData.name)
  })

  it("POST validates required fields", async () => {
    const { req } = createMocks({
      method: "POST",
      body: {}
    })

    const response = await POST(req)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error.code).toBe("VALIDATION_ERROR")
  })
})
```

### 🎭 Testes de Storybook

```typescript
// stories/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Botão reutilizável com múltiplas variantes e tamanhos."
      }
    }
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link"
      ]
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"]
    },
    disabled: {
      control: "boolean"
    }
  },
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button"
  }
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete"
  }
}

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button"
  }
}

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Button"
  }
}

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large Button"
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button"
  }
}
```

---

## 🔧 Debugging

### 🐛 Debugging no VS Code

#### **Configuração do Launch**

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "pnpm dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "pnpm dev",
      "serverReadyAction": {
        "pattern": "started server on .+, url: (https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ]
}
```

### 📝 Logging

```typescript
// lib/logger.ts
import pino from "pino"

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname"
    }
  }
})

// Uso
logger.info("User logged in", { userId: "123", email: "user@example.com" })
logger.error("Payment failed", { error: "Insufficient funds", userId: "123" })
logger.warn("Rate limit approaching", {
  endpoint: "/api/equipment",
  requests: 95
})
```

### 🔍 Error Boundaries

```typescript
// components/error-boundary.tsx
'use client'

import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo)

    // Log para serviço de monitoramento
    logger.error('Error boundary caught error', {
      error: error.message,
      stack: error.stack,
      errorInfo,
    })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">Algo deu errado</h2>
            <p className="mt-2 text-gray-600">
              Ocorreu um erro inesperado. Tente recarregar a página.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
```

---

## 📚 Recursos

### 🔗 Links Úteis

- **[Next.js Docs](https://nextjs.org/docs)** - Documentação oficial
- **[React Docs](https://react.dev/)** - Documentação do React
- **[TypeScript Docs](https://www.typescriptlang.org/docs/)** - Documentação do
  TypeScript
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Documentação do Tailwind
- **[Prisma Docs](https://www.prisma.io/docs)** - Documentação do Prisma
- **[Radix UI](https://www.radix-ui.com/docs)** - Documentação dos componentes

### 📖 Documentação do Projeto

- **[README.md](./README.md)** - Visão geral do projeto
- **[TECHNICAL_DOCUMENTATION.md](./TECHNICAL_DOCUMENTATION.md)** - Documentação
  técnica
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Documentação da API
- **[DESIGN_SYSTEM_2025.md](./DESIGN_SYSTEM_2025.md)** - Design System
- **[AGENTS.md](./AGENTS.md)** - Guia para IA e colaboradores

### 🛠️ Ferramentas

- **[Storybook](http://localhost:6006)** - Documentação de componentes
- **[Prisma Studio](http://localhost:5555)** - Interface do banco de dados
- **[Vitest UI](http://localhost:51204)** - Interface de testes
- **[Chromatic](https://chromatic.com)** - Visual regression testing

### 📞 Suporte

- **Issues**: [GitHub Issues](https://github.com/GBLocacoes/GB-Locacoes/issues)
- **Discussions**:
  [GitHub Discussions](https://github.com/GBLocacoes/GB-Locacoes/discussions)
- **Email**: contato@gblocacoes.com.br

---

## 🎯 Conclusão

Este guia fornece todas as informações necessárias para desenvolvedores
trabalharem eficientemente no projeto GB-Locacoes. Lembre-se de:

- **Seguir os padrões** estabelecidos
- **Escrever testes** para novas funcionalidades
- **Documentar** mudanças importantes
- **Manter a qualidade** do código
- **Colaborar** com a equipe

Para dúvidas específicas, consulte a documentação técnica ou entre em contato
com a equipe.
