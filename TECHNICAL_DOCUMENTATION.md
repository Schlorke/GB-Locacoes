# 📚 Documentação Técnica - GB-Locacoes

> **Documentação técnica completa e detalhada do projeto GB-Locacoes**

## 📋 Índice

- [🏗️ Arquitetura do Sistema](#️-arquitetura-do-sistema)
- [🗄️ Modelo de Dados](#️-modelo-de-dados)
- [🔐 Sistema de Autenticação](#-sistema-de-autenticação)
- [🎨 Design System](#-design-system)
- [🧪 Estratégia de Testes](#-estratégia-de-testes)
- [🚀 Performance e Otimização](#-performance-e-otimização)
- [🔧 Configurações e Deploy](#-configurações-e-deploy)
- [📊 Monitoramento e Analytics](#-monitoramento-e-analytics)
- [🛡️ Segurança](#️-segurança)
- [📱 PWA e Mobile](#-pwa-e-mobile)

---

## 🏗️ Arquitetura do Sistema

### 🏛️ Visão Geral da Arquitetura

O GB-Locacoes segue uma arquitetura moderna baseada em **Next.js 15 App Router**
com **Server Components** e **Server Actions**, proporcionando uma experiência
de desenvolvimento e usuário excepcional.

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[Next.js App Router]
        B[React 19.1.1]
        C[TypeScript 5.9.2]
        D[Tailwind CSS 3.4.17]
    end

    subgraph "Component Layer"
        E[Radix UI Components]
        F[Custom Components]
        G[Design System]
    end

    subgraph "State Management"
        H[Zustand 5.0.7]
        I[React Hook Form 7.62.0]
        J[NextAuth.js 4.24.11]
    end

    subgraph "API Layer"
        K[Next.js API Routes]
        L[Server Actions]
        M[Middleware]
    end

    subgraph "Data Layer"
        N[Prisma ORM 6.13.0]
        O[PostgreSQL 15+]
        P[Supabase]
    end

    subgraph "External Services"
        Q[Stripe API]
        R[ZapSign API]
        S[Resend API]
        T[Melhor Envio API]
        U[Vercel Blob]
    end

    A --> B
    B --> C
    C --> D
    A --> E
    E --> F
    F --> G
    A --> H
    H --> I
    I --> J
    A --> K
    K --> L
    L --> M
    M --> N
    N --> O
    O --> P
    K --> Q
    K --> R
    K --> S
    K --> T
    K --> U

    style A fill:#007acc,stroke:#333,stroke-width:2px,color:#fff
    style O fill:#336791,stroke:#333,stroke-width:2px,color:#fff
    style Q fill:#6772e5,stroke:#333,stroke-width:2px,color:#fff
```

### 🔄 Fluxo de Dados

```mermaid
sequenceDiagram
    participant U as Usuário
    participant N as Next.js
    participant A as API Routes
    participant P as Prisma
    participant D as Database
    participant E as External APIs

    U->>N: Requisição HTTP
    N->>A: Server Action/API Route
    A->>P: Query/Mutation
    P->>D: SQL Query
    D->>P: Result
    P->>A: Data
    A->>E: External API Call
    E->>A: Response
    A->>N: Processed Data
    N->>U: HTML/JSON Response
```

### 🏢 Estrutura de Camadas

#### **1. Presentation Layer (UI)**

- **Next.js App Router** - Roteamento e renderização
- **React Components** - Interface do usuário
- **Tailwind CSS** - Estilização
- **Radix UI** - Componentes acessíveis

#### **2. Business Logic Layer**

- **Server Actions** - Lógica de negócio
- **API Routes** - Endpoints REST
- **Custom Hooks** - Lógica reutilizável
- **Zustand** - Gerenciamento de estado

#### **3. Data Access Layer**

- **Prisma ORM** - Mapeamento objeto-relacional
- **Database Queries** - Consultas otimizadas
- **Caching** - Estratégias de cache

#### **4. External Services Layer**

- **Payment APIs** - Stripe, Mercado Pago
- **Email Services** - Resend, SendGrid
- **Storage Services** - Supabase, Vercel Blob
- **Contract Services** - ZapSign

---

## 🗄️ Modelo de Dados

### 📊 Schema do Banco de Dados

O projeto utiliza **PostgreSQL** com **Prisma ORM** para gerenciamento de dados.

#### **Entidades Principais**

```prisma
// Usuários e Autenticação
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  password      String?
  role          Role      @default(CLIENT)
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relacionamentos
  accounts      Account[]
  quotes        Quote[]
  rentals       rentals[]
  sessions      Session[]
}

// Categorias de Equipamentos
model Category {
  id          String      @id @default(uuid()) @db.Uuid
  name        String
  description String?
  icon        String?
  iconColor   String      @default("#3B82F6")
  bgColor     String      @default("#EFF6FF")
  fontColor   String      @default("#1E40AF")
  slug        String      @unique
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  // Relacionamentos
  equipments  Equipment[]
}

// Equipamentos
model Equipment {
  id           String         @id @default(cuid())
  name         String
  description  String?
  pricePerDay  Decimal
  images       String[]
  available    Boolean        @default(true)
  categoryId   String         @db.Uuid
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt

  // Relacionamentos
  category     Category       @relation(fields: [categoryId], references: [id])
  quoteItems   QuoteItem[]
  rental_items rental_items[]
}

// Orçamentos
model Quote {
  id              String      @id @default(cuid())
  userId          String
  status          QuoteStatus @default(PENDING)
  totalAmount     Decimal
  deliveryType    DeliveryType
  deliveryAddress String?
  startDate       DateTime
  endDate         DateTime
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  // Relacionamentos
  user            User        @relation(fields: [userId], references: [id])
  items           QuoteItem[]
  payments        Payment[]
  rentals         rentals[]
}

// Itens do Orçamento
model QuoteItem {
  id          String   @id @default(cuid())
  quoteId     String
  equipmentId String
  quantity    Int
  days        Int
  pricePerDay Decimal
  totalPrice  Decimal
  createdAt   DateTime @default(now())

  // Relacionamentos
  quote       Quote     @relation(fields: [quoteId], references: [id])
  equipment   Equipment @relation(fields: [equipmentId], references: [id])
}

// Locações
model rentals {
  id              String       @id @default(cuid())
  quoteId         String
  userId          String
  status          RentalStatus @default(ACTIVE)
  startDate       DateTime
  endDate         DateTime
  totalAmount     Decimal
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  // Relacionamentos
  quote           Quote        @relation(fields: [quoteId], references: [id])
  user            User         @relation(fields: [userId], references: [id])
  items           rental_items[]
  payments        Payment[]
}

// Itens da Locação
model rental_items {
  id         String           @id @default(cuid())
  rentalId   String
  equipmentId String
  quantity   Int
  days       Int
  pricePerDay Decimal
  totalPrice Decimal
  status     RentalItemStatus @default(ACTIVE)
  createdAt  DateTime         @default(now())

  // Relacionamentos
  rental     rentals          @relation(fields: [rentalId], references: [id])
  equipment  Equipment        @relation(fields: [equipmentId], references: [id])
}

// Pagamentos
model Payment {
  id            String        @id @default(cuid())
  rentalId      String?
  quoteId       String?
  amount        Decimal
  method        PaymentMethod
  type          PaymentType
  status        PaymentStatus @default(PENDING)
  transactionId String?
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  // Relacionamentos
  rental        rentals?      @relation(fields: [rentalId], references: [id])
  quote         Quote?        @relation(fields: [quoteId], references: [id])
}

// Configurações do Sistema
model Setting {
  id    String @id @default(cuid())
  key   String @unique
  value String
  type  String @default("string")
}
```

### 🔄 Relacionamentos

```mermaid
erDiagram
    User ||--o{ Quote : creates
    User ||--o{ rentals : has
    User ||--o{ Account : has
    User ||--o{ Session : has

    Category ||--o{ Equipment : contains
    Equipment ||--o{ QuoteItem : included_in
    Equipment ||--o{ rental_items : rented_in

    Quote ||--o{ QuoteItem : contains
    Quote ||--o{ Payment : receives
    Quote ||--o{ rentals : becomes

    rentals ||--o{ rental_items : contains
    rentals ||--o{ Payment : receives

    QuoteItem }o--|| Equipment : references
    rental_items }o--|| Equipment : references
```

### 📈 Índices e Performance

```sql
-- Índices principais para performance
CREATE INDEX idx_equipment_category ON equipments(categoryId);
CREATE INDEX idx_equipment_available ON equipments(available);
CREATE INDEX idx_quote_user ON quotes(userId);
CREATE INDEX idx_quote_status ON quotes(status);
CREATE INDEX idx_rental_user ON rentals(userId);
CREATE INDEX idx_rental_status ON rentals(status);
CREATE INDEX idx_payment_status ON payments(status);
```

---

## 🔐 Sistema de Autenticação

### 🏗️ Arquitetura de Autenticação

O sistema utiliza **NextAuth.js 4.24.11** com **JWT** para autenticação e
autorização.

```mermaid
graph TB
    subgraph "Authentication Flow"
        A[Login Form] --> B[NextAuth.js]
        B --> C[Credentials Provider]
        C --> D[Database Check]
        D --> E[JWT Token]
        E --> F[Session]
        F --> G[Protected Routes]
    end

    subgraph "Authorization"
        H[Role Check] --> I[Admin Routes]
        H --> J[Client Routes]
        H --> K[Public Routes]
    end

    subgraph "Security"
        L[Password Hashing] --> M[bcryptjs]
        N[Session Management] --> O[JWT]
        P[CSRF Protection] --> Q[NextAuth]
    end
```

### 🔑 Estrutura de Roles

```typescript
enum Role {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT"
}

interface User {
  id: string
  email: string
  name?: string
  role: Role
  emailVerified?: Date
  image?: string
}
```

### 🛡️ Middleware de Proteção

```typescript
// middleware.ts
import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Lógica de middleware
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Rotas públicas
        if (pathname === "/admin/login") return true

        // Rotas administrativas
        if (pathname.startsWith("/admin")) {
          return token?.role === "ADMIN"
        }

        return true
      }
    }
  }
)
```

### 🔒 Segurança

- **Password Hashing**: bcryptjs com salt rounds
- **JWT Tokens**: Configuração segura com expiração
- **CSRF Protection**: NextAuth.js built-in
- **Rate Limiting**: Proteção contra ataques
- **Input Validation**: Zod schemas

---

## 🎨 Design System

### 🎯 Princípios do Design System

O Design System do GB-Locacoes segue os princípios de **Atomic Design** e
**Design Tokens**.

#### **1. Design Tokens**

```json
{
  "colors": {
    "primary": {
      "50": "#fff7ed",
      "100": "#ffedd5",
      "500": "#ea580c",
      "600": "#dc2626",
      "900": "#7c2d12"
    },
    "secondary": {
      "50": "#eff6ff",
      "100": "#dbeafe",
      "500": "#3b82f6",
      "600": "#2563eb",
      "900": "#1e3a8a"
    }
  },
  "typography": {
    "fontFamily": {
      "sans": ["Inter", "sans-serif"],
      "heading": ["Jost", "sans-serif"]
    },
    "fontSize": {
      "h1": ["clamp(2.5rem, 5vw, 3.5rem)", { "lineHeight": "1.2" }],
      "h2": ["clamp(2rem, 4vw, 3rem)", { "lineHeight": "1.3" }],
      "h3": ["clamp(1.5rem, 3vw, 2.25rem)", { "lineHeight": "1.4" }],
      "base": ["clamp(1rem, 2vw, 1.125rem)", { "lineHeight": "1.6" }],
      "small": ["clamp(0.875rem, 1.5vw, 1rem)", { "lineHeight": "1.5" }]
    }
  },
  "spacing": {
    "xs": "0.25rem",
    "sm": "0.5rem",
    "md": "1rem",
    "lg": "1.5rem",
    "xl": "2rem",
    "2xl": "3rem",
    "3xl": "4rem"
  },
  "borderRadius": {
    "sm": "0.25rem",
    "md": "0.375rem",
    "lg": "0.5rem",
    "xl": "0.75rem",
    "2xl": "1rem"
  }
}
```

#### **2. Componentes Base**

```typescript
// Estrutura de componente
interface ComponentProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  children?: React.ReactNode
}

const componentVariants = cva("base-classes", {
  variants: {
    variant: {
      default: "bg-primary-600 text-white hover:bg-primary-700",
      destructive: "bg-red-600 text-white hover:bg-red-700",
      outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      ghost: "hover:bg-gray-100",
      link: "text-primary-600 underline-offset-4 hover:underline"
    },
    size: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4",
      lg: "h-12 px-6 text-lg",
      xl: "h-14 px-8 text-xl"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
})
```

#### **3. Sistema de Cores**

| Categoria      | Cor        | Hex       | Uso                           |
| -------------- | ---------- | --------- | ----------------------------- |
| **Primária**   | Orange-600 | `#ea580c` | Ações principais, CTAs        |
| **Secundária** | Blue-500   | `#3b82f6` | Links, informações            |
| **Sucesso**    | Green-500  | `#10b981` | Confirmações, status positivo |
| **Aviso**      | Yellow-500 | `#f59e0b` | Alertas, atenção              |
| **Erro**       | Red-500    | `#ef4444` | Erros, exclusões              |
| **Neutro**     | Gray-500   | `#6b7280` | Texto secundário              |

#### **4. Tipografia**

```css
/* Fontes */
:root {
  --font-inter: "Inter", sans-serif;
  --font-jost: "Jost", sans-serif;
}

/* Escalas responsivas */
.text-h1 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  line-height: 1.2;
  font-weight: 700;
}

.text-h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.3;
  font-weight: 600;
}

.text-h3 {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  line-height: 1.4;
  font-weight: 600;
}

.text-base {
  font-size: clamp(1rem, 2vw, 1.125rem);
  line-height: 1.6;
}

.text-small {
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  line-height: 1.5;
}
```

### 📱 Responsividade

#### **Breakpoints**

```css
/* Mobile First */
@media (min-width: 640px) {
  /* sm */
}
@media (min-width: 768px) {
  /* md */
}
@media (min-width: 1024px) {
  /* lg */
}
@media (min-width: 1280px) {
  /* xl */
}
@media (min-width: 1536px) {
  /* 2xl */
}
```

#### **Grid System**

```css
/* Grid responsivo */
.grid-responsive {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Container responsivo */
.container-responsive {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .container-responsive {
    padding: 0 2rem;
  }
}
```

---

## 🧪 Estratégia de Testes

### 🎯 Pirâmide de Testes

```mermaid
graph TB
    subgraph "E2E Tests (Poucos)"
        A[Playwright]
        B[User Flows]
        C[Critical Paths]
    end

    subgraph "Integration Tests (Alguns)"
        D[API Routes]
        E[Database]
        F[External APIs]
    end

    subgraph "Unit Tests (Muitos)"
        G[Components]
        H[Utilities]
        I[Hooks]
        J[Schemas]
    end

    A --> B
    B --> C
    D --> E
    E --> F
    G --> H
    H --> I
    I --> J
```

### 🧪 Tipos de Testes

#### **1. Unit Tests (Vitest)**

```typescript
// components/ui/button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('applies variant classes correctly', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-red-600')
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    screen.getByRole('button').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

#### **2. Integration Tests**

```typescript
// tests/api/equipment.test.ts
import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { createMocks } from "node-mocks-http"
import { GET } from "@/app/api/equipment/route"

describe("/api/equipment", () => {
  it("returns equipment list", async () => {
    const { req } = createMocks({
      method: "GET"
    })

    const response = await GET(req)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
  })
})
```

#### **3. E2E Tests (Playwright)**

```typescript
// tests/e2e/equipment-catalog.spec.ts
import { test, expect } from "@playwright/test"

test.describe("Equipment Catalog", () => {
  test("should display equipment list", async ({ page }) => {
    await page.goto("/equipamentos")

    // Verificar se a lista carrega
    await expect(page.locator('[data-testid="equipment-list"]')).toBeVisible()

    // Verificar se há equipamentos
    const equipmentCards = page.locator('[data-testid="equipment-card"]')
    await expect(equipmentCards).toHaveCount.greaterThan(0)
  })

  test("should filter equipment by category", async ({ page }) => {
    await page.goto("/equipamentos")

    // Selecionar categoria
    await page.selectOption('[data-testid="category-filter"]', "escavadeiras")

    // Verificar se os filtros foram aplicados
    await expect(
      page.locator('[data-testid="equipment-card"]')
    ).toHaveCount.greaterThan(0)
  })
})
```

#### **4. Visual Regression Tests (Chromatic)**

```typescript
// stories/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    chromatic: {
      viewports: [320, 768, 1024, 1440]
    }
  }
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
```

### 📊 Cobertura de Testes

```bash
# Gerar relatório de cobertura
pnpm test:coverage

# Configuração vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/*.stories.*'
      ]
    }
  }
})
```

---

## 🚀 Performance e Otimização

### ⚡ Estratégias de Performance

#### **1. Next.js Optimizations**

```typescript
// next.config.mjs
const nextConfig = {
  // Otimizações de imagem
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },

  // Compressão
  compress: true,

  // Bundle analyzer
  bundleAnalyzer: process.env.ANALYZE === "true",

  // Experimental features
  experimental: {
    optimizeCss: true,
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js"
        }
      }
    }
  }
}
```

#### **2. Code Splitting**

```typescript
// Lazy loading de componentes
const EquipmentCard = dynamic(() => import('@/components/equipment-card'), {
  loading: () => <EquipmentCardSkeleton />,
  ssr: false
})

// Lazy loading de páginas
const AdminDashboard = dynamic(() => import('@/app/admin/dashboard/page'), {
  loading: () => <DashboardSkeleton />
})
```

#### **3. Database Optimization**

```typescript
// Prisma query optimization
const equipments = await prisma.equipment.findMany({
  where: {
    available: true,
    categoryId: categoryId
  },
  include: {
    category: {
      select: {
        name: true,
        icon: true
      }
    }
  },
  take: 20,
  orderBy: {
    createdAt: "desc"
  }
})
```

#### **4. Caching Strategies**

```typescript
// React Query para cache
import { useQuery } from "@tanstack/react-query"

const useEquipment = (id: string) => {
  return useQuery({
    queryKey: ["equipment", id],
    queryFn: () => fetchEquipment(id),
    staleTime: 5 * 60 * 1000, // 5 minutos
    cacheTime: 10 * 60 * 1000 // 10 minutos
  })
}

// Next.js cache
export const revalidate = 3600 // 1 hora
```

### 📊 Core Web Vitals

#### **1. LCP (Largest Contentful Paint)**

```typescript
// Otimização de imagens
import Image from 'next/image'

export function HeroImage() {
  return (
    <Image
      src="/hero-image.jpg"
      alt="Hero"
      width={1200}
      height={600}
      priority // Para LCP
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  )
}
```

#### **2. FID (First Input Delay)**

```typescript
// Code splitting para reduzir bundle
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  ssr: false,
  loading: () => <Skeleton />
})
```

#### **3. CLS (Cumulative Layout Shift)**

```css
/* Prevenir layout shift */
.image-container {
  aspect-ratio: 16/9;
  background-color: #f3f4f6;
}

.responsive-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### 🔍 Bundle Analysis

```bash
# Analisar bundle
ANALYZE=true pnpm build

# Verificar tamanho dos chunks
pnpm build --debug
```

---

## 🔧 Configurações e Deploy

### 🐳 Docker Configuration

```dockerfile
# Dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm exec prisma generate
RUN pnpm build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
CMD ["pnpm", "start"]
```

```yaml
# docker-compose.yml
version: "3.8"
services:
  app:
    build: .
    env_file: .env.docker
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: gblocacoes
    ports:
      - "5432:5432"
    volumes:
      - db-data:/var/lib/postgresql/data
volumes:
  db-data:
```

### ☁️ Vercel Deployment

```json
// vercel.json
{
  "buildCommand": "pnpm run build",
  "installCommand": "pnpm install --frozen-lockfile=false",
  "images": {
    "formats": ["image/avif", "image/webp"],
    "sizes": [16, 32, 48, 64, 96, 128, 256, 384, 512, 1024, 2048]
  },
  "env": {
    "DATABASE_URL": "@database-url",
    "NEXTAUTH_SECRET": "@nextauth-secret",
    "STRIPE_SECRET_KEY": "@stripe-secret-key"
  }
}
```

### 🔧 Environment Variables

```bash
# .env.example
# Database
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"
DIRECT_URL="postgresql://username:password@host:port/database?schema=public"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# Payments
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
MERCADO_PAGO_TOKEN="your-mercado-pago-token"

# Email
RESEND_API_KEY="your-resend-api-key"
SENDGRID_API_KEY="your-sendgrid-api-key"

# Contracts
ZAPSIGN_TOKEN="your-zapsign-token"

# Logistics
MELHOR_ENVIO_TOKEN="your-melhor-envio-token"

# Logs
LOG_LEVEL="info"
```

---

## 📊 Monitoramento e Analytics

### 📈 Vercel Analytics

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### 📝 Logging (Pino)

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
```

### 🔍 Error Tracking

```typescript
// lib/error-tracking.ts
export function trackError(error: Error, context?: Record<string, any>) {
  // Integração com Sentry ou similar
  console.error('Error tracked:', {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  })
}

// Error boundary
export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={<ErrorFallback />}
      onError={(error) => trackError(error)}
    >
      {children}
    </ErrorBoundary>
  )
}
```

---

## 🛡️ Segurança

### 🔐 Security Headers

```typescript
// next.config.mjs
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin"
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
          }
        ]
      }
    ]
  }
}
```

### 🔒 Input Validation

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

### 🛡️ Rate Limiting

```typescript
// lib/rate-limit.ts
import { NextRequest, NextResponse } from "next/server"

const rateLimit = new Map()

export function rateLimitMiddleware(request: NextRequest) {
  const ip = request.ip || "unknown"
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutos
  const maxRequests = 100

  const userRequests = rateLimit.get(ip) || []
  const validRequests = userRequests.filter(
    (timestamp: number) => now - timestamp < windowMs
  )

  if (validRequests.length >= maxRequests) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  validRequests.push(now)
  rateLimit.set(ip, validRequests)

  return NextResponse.next()
}
```

---

## 📱 PWA e Mobile

### 📱 PWA Configuration

```json
// public/manifest.json
{
  "name": "GB Locações",
  "short_name": "GB Loc",
  "description": "Plataforma de locação de equipamentos",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#ea580c",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  manifest: "/manifest.json",
  themeColor: "#ea580c",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1"
}
```

### 📱 Mobile Optimizations

```css
/* Mobile-first CSS */
.mobile-optimized {
  /* Touch targets */
  min-height: 44px;
  min-width: 44px;

  /* Smooth scrolling */
  -webkit-overflow-scrolling: touch;

  /* Prevent zoom on input focus */
  font-size: 16px;
}

/* Responsive images */
.responsive-image {
  width: 100%;
  height: auto;
  max-width: 100%;
}

/* Mobile navigation */
.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e5e7eb;
  padding: 0.5rem;
  z-index: 50;
}
```

---

## 📚 Conclusão

Esta documentação técnica fornece uma visão completa e detalhada da arquitetura,
implementação e boas práticas do projeto GB-Locacoes. O projeto segue as
melhores práticas de desenvolvimento moderno, com foco em:

- **Performance** - Otimizações de Core Web Vitals
- **Segurança** - Headers, validação e rate limiting
- **Escalabilidade** - Arquitetura modular e bem estruturada
- **Manutenibilidade** - Código limpo e bem documentado
- **Acessibilidade** - WCAG 2.1 AA compliance
- **Testabilidade** - Cobertura completa de testes

Para mais informações, consulte os outros arquivos de documentação do projeto.
