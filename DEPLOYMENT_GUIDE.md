# 🚀 Guia de Deploy e Produção - GB-Locacoes

> **Guia completo para deploy e configuração de produção do projeto
> GB-Locacoes**

## 📋 Índice

- [🎯 Visão Geral](#-visão-geral)
- [☁️ Deploy na Vercel](#️-deploy-na-vercel)
- [🐳 Deploy com Docker](#-deploy-com-docker)
- [🔧 Configuração de Produção](#-configuração-de-produção)
- [📊 Monitoramento](#-monitoramento)
- [🛡️ Segurança](#️-segurança)
- [🔄 CI/CD](#-cicd)
- [📈 Performance](#-performance)

---

## 🎯 Visão Geral

Este guia fornece instruções completas para deploy e configuração de produção do
projeto GB-Locacoes.

### 🎯 Objetivos

- **Deploy Automatizado** - CI/CD pipeline
- **Performance Otimizada** - Core Web Vitals
- **Segurança Robusta** - Headers e validações
- **Monitoramento Completo** - Analytics e logs
- **Escalabilidade** - Preparado para crescimento

---

## ☁️ Deploy na Vercel

### 🚀 Deploy Automático

#### **1. Conectar Repositório**

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Clique em "New Project"
4. Selecione o repositório `GBLocacoes/GB-Locacoes`
5. Configure as variáveis de ambiente

#### **2. Configuração do Projeto**

```json
// vercel.json
{
  "buildCommand": "pnpm run build",
  "installCommand": "pnpm install --frozen-lockfile=false",
  "framework": "nextjs",
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

#### **3. Variáveis de Ambiente**

Configure as seguintes variáveis no painel da Vercel:

```bash
# Database
DATABASE_URL=postgresql://username:password@host:port/database?schema=public
DIRECT_URL=postgresql://username:password@host:port/database?schema=public

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# NextAuth
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-here

# Payments
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
MERCADO_PAGO_TOKEN=your-mercado-pago-token

# Email
RESEND_API_KEY=your-resend-api-key
SENDGRID_API_KEY=your-sendgrid-api-key

# Contracts
ZAPSIGN_TOKEN=your-zapsign-token

# Logistics
MELHOR_ENVIO_TOKEN=your-melhor-envio-token

# Logs
LOG_LEVEL=info
```

#### **4. Domínio Personalizado**

1. No painel da Vercel, vá para "Settings" > "Domains"
2. Adicione seu domínio: `gblocacoes.com.br`
3. Configure os registros DNS:

   ```
   Type: A
   Name: @
   Value: 76.76.19.19

   Type: CNAME
   Name: www
   Value: your-project.vercel.app
   ```

### 🔧 Configurações Avançadas

#### **Edge Functions**

```typescript
// app/api/equipment/route.ts
import { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  // Lógica da API
}
```

#### **ISR (Incremental Static Regeneration)**

```typescript
// app/equipamentos/page.tsx
export const revalidate = 3600 // 1 hora

export default async function EquipmentPage() {
  const equipment = await getEquipment()

  return (
    <div>
      {/* Renderização dos equipamentos */}
    </div>
  )
}
```

---

## 🐳 Deploy com Docker

### 🐳 Dockerfile

```dockerfile
# Dockerfile
FROM node:22-alpine AS deps
WORKDIR /app

# Instalar dependências
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

# Build da aplicação
FROM node:22-alpine AS builder
WORKDIR /app

# Copiar dependências
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Gerar Prisma client
RUN pnpm exec prisma generate

# Build da aplicação
RUN pnpm build

# Produção
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Criar usuário não-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar arquivos necessários
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

# Mudar propriedade dos arquivos
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### 🐙 Docker Compose

```yaml
# docker-compose.yml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

### 🚀 Deploy com Docker

```bash
# Build da imagem
docker build -t gb-locacoes .

# Executar container
docker run -d \
  --name gb-locacoes \
  -p 3000:3000 \
  --env-file .env.production \
  gb-locacoes

# Com Docker Compose
docker-compose up -d
```

---

## 🔧 Configuração de Produção

### 🛡️ Security Headers

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
            key: "X-DNS-Prefetch-Control",
            value: "on"
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block"
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()"
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://api.stripe.com https://api.resend.com",
              "frame-src https://js.stripe.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'"
            ].join("; ")
          }
        ]
      }
    ]
  }
}
```

### 🔒 Rate Limiting

```typescript
// lib/rate-limit.ts
import { NextRequest, NextResponse } from "next/server"

const rateLimit = new Map()

export function rateLimitMiddleware(request: NextRequest) {
  const ip = request.ip || "unknown"
  const pathname = request.nextUrl.pathname
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutos

  // Limites por endpoint
  const limits = {
    "/api/equipment": 100,
    "/api/quotes": 50,
    "/api/contact": 10,
    "/api/admin": 200
  }

  const limit = limits[pathname] || 100
  const key = `${ip}:${pathname}`

  const userRequests = rateLimit.get(key) || []
  const validRequests = userRequests.filter(
    (timestamp: number) => now - timestamp < windowMs
  )

  if (validRequests.length >= limit) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "RATE_LIMIT_EXCEEDED",
          message: "Too many requests. Please try again later.",
          retryAfter: Math.ceil(windowMs / 1000)
        }
      },
      { status: 429 }
    )
  }

  validRequests.push(now)
  rateLimit.set(key, validRequests)

  return NextResponse.next()
}
```

### 🔐 Middleware de Segurança

```typescript
// middleware.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default withAuth(
  function middleware(req: NextRequest) {
    // Rate limiting
    const rateLimitResult = rateLimitMiddleware(req)
    if (rateLimitResult.status === 429) {
      return rateLimitResult
    }

    // Security headers
    const response = NextResponse.next()

    // Adicionar headers de segurança
    response.headers.set("X-Content-Type-Options", "nosniff")
    response.headers.set("X-Frame-Options", "DENY")
    response.headers.set("X-XSS-Protection", "1; mode=block")

    return response
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

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"]
}
```

---

## 📊 Monitoramento

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

### 📝 Logging Estruturado

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
  },
  base: {
    env: process.env.NODE_ENV,
    revision: process.env.VERCEL_GIT_COMMIT_SHA
  }
})

// Middleware de logging
export function logMiddleware(req: NextRequest) {
  const start = Date.now()

  logger.info("Request started", {
    method: req.method,
    url: req.url,
    userAgent: req.headers.get("user-agent"),
    ip: req.ip
  })

  return {
    logResponse: (response: NextResponse) => {
      const duration = Date.now() - start

      logger.info("Request completed", {
        method: req.method,
        url: req.url,
        status: response.status,
        duration
      })
    }
  }
}
```

### 🔍 Error Tracking

```typescript
// lib/error-tracking.ts
export function trackError(error: Error, context?: Record<string, any>) {
  logger.error('Application error', {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  })

  // Integração com Sentry (opcional)
  if (process.env.SENTRY_DSN) {
    Sentry.captureException(error, {
      extra: context,
    })
  }
}

// Error boundary para produção
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

## 🔄 CI/CD

### 🐙 GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready --health-interval 10s --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Generate Prisma client
        run: pnpm db:generate

      - name: Run database migrations
        run: pnpm db:push
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db

      - name: Run tests
        run: pnpm test
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db

      - name: Run linting
        run: pnpm lint

      - name: Type check
        run: pnpm type-check

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Generate Prisma client
        run: pnpm db:generate

      - name: Build application
        run: pnpm build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}
          STRIPE_SECRET_KEY: ${{ secrets.STRIPE_SECRET_KEY }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"
```

### 🔧 Secrets do GitHub

Configure os seguintes secrets no repositório:

```bash
# Database
DATABASE_URL=postgresql://username:password@host:port/database?schema=public

# NextAuth
NEXTAUTH_SECRET=your-secret-here

# Payments
STRIPE_SECRET_KEY=sk_live_...

# Vercel
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
```

---

## 📈 Performance

### ⚡ Otimizações

#### **Next.js Config**

```typescript
// next.config.mjs
const nextConfig = {
  // Otimizações de imagem
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60
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
  },

  // Output standalone para Docker
  output: "standalone"
}
```

#### **Database Optimization**

```sql
-- Índices para performance
CREATE INDEX CONCURRENTLY idx_equipment_category ON equipments(categoryId);
CREATE INDEX CONCURRENTLY idx_equipment_available ON equipments(available);
CREATE INDEX CONCURRENTLY idx_quote_user ON quotes(userId);
CREATE INDEX CONCURRENTLY idx_quote_status ON quotes(status);
CREATE INDEX CONCURRENTLY idx_rental_user ON rentals(userId);
CREATE INDEX CONCURRENTLY idx_rental_status ON rentals(status);

-- Particionamento (para tabelas grandes)
CREATE TABLE quotes_2024 PARTITION OF quotes
FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
```

#### **Caching Strategy**

```typescript
// lib/cache.ts
import { Redis } from "ioredis"

const redis = new Redis(process.env.REDIS_URL)

export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    const data = await redis.get(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    logger.error("Cache get error", { key, error })
    return null
  }
}

export async function setCachedData<T>(
  key: string,
  data: T,
  ttl = 3600
): Promise<void> {
  try {
    await redis.setex(key, ttl, JSON.stringify(data))
  } catch (error) {
    logger.error("Cache set error", { key, error })
  }
}

// Uso em queries
export async function getEquipmentWithCache(options: any) {
  const cacheKey = `equipment:${JSON.stringify(options)}`

  // Tentar cache primeiro
  const cached = await getCachedData(cacheKey)
  if (cached) return cached

  // Buscar do banco
  const data = await getEquipment(options)

  // Salvar no cache
  await setCachedData(cacheKey, data, 300) // 5 minutos

  return data
}
```

### 📊 Core Web Vitals

#### **LCP (Largest Contentful Paint)**

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

#### **FID (First Input Delay)**

```typescript
// Code splitting
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  ssr: false,
  loading: () => <Skeleton />
})
```

#### **CLS (Cumulative Layout Shift)**

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

---

## 🎯 Conclusão

Este guia fornece todas as informações necessárias para deploy e configuração de
produção do projeto GB-Locacoes. Lembre-se de:

- **Configurar corretamente** as variáveis de ambiente
- **Implementar monitoramento** adequado
- **Otimizar performance** continuamente
- **Manter segurança** atualizada
- **Testar** antes de cada deploy

Para dúvidas específicas, consulte a documentação técnica ou entre em contato
com a equipe.
