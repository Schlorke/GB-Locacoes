# 🏗️ GB-Locacoes - Plataforma de Locações de Equipamentos

[![CI](https://img.shields.io/github/actions/workflow/status/GBLocacoes/GB-Locacoes/test.yml?label=CI)](https://github.com/GBLocacoes/GB-Locacoes/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](#licença)
[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.13.0-2D3748)](https://www.prisma.io/)
[![Storybook](https://img.shields.io/badge/Storybook-9.1.1-FF4785)](https://storybook.js.org/)

> **Plataforma moderna e completa para locação de equipamentos de construção
> civil** 🚀

## 📋 Índice

- [🎯 Visão Geral](#-visão-geral)
- [🏗️ Arquitetura](#️-arquitetura)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Configuração](#️-configuração)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🎨 Design System](#-design-system)
- [🧪 Testes](#-testes)
- [📚 Documentação](#-documentação)
- [🤝 Contribuindo](#-contribuindo)
- [📄 Licença](#-licença)

---

## 📚 **DOCUMENTAÇÃO PROFISSIONAL**

> 🎯 **Nova estrutura**: Documentação completamente reorganizada em dezembro
> 2024

### **📁 Navegação Rápida na Documentação**

| Para...                       | Acesse                                                                               |
| ----------------------------- | ------------------------------------------------------------------------------------ |
| **🚀 Começar rapidamente**    | [`docs/getting-started/installation.md`](docs/getting-started/installation.md)       |
| **🏗️ Entender a arquitetura** | [`docs/architecture/overview.md`](docs/architecture/overview.md)                     |
| **🎨 Usar o design system**   | [`docs/features/design-system.md`](docs/features/design-system.md)                   |
| **⚙️ Sistema administrativo** | [`docs/features/admin-system.md`](docs/features/admin-system.md)                     |
| **🔧 Resolver problemas**     | [`docs/getting-started/troubleshooting.md`](docs/getting-started/troubleshooting.md) |
| **📖 Índice completo**        | [`docs/README.md`](docs/README.md)                                                   |

**📌 Regra de Ouro**: SEMPRE consulte `docs/` antes de implementar
funcionalidades!

### 🆕 **RECURSOS IMPLEMENTADOS (JAN 2025)**

- **📊 Dashboard de Analytics**: `/admin/analytics` - Monitoramento completo da
  API
- **🔧 Sistema de Telemetria**: Rastreamento de performance em tempo real
- **📋 Documentação OpenAPI**: `/api-docs` - Interface custom interativa da API
  (não swagger-ui-react)
- **🛡️ Monitoramento de Segurança**: Detecção automática de ameaças
- **📈 Métricas Avançadas**: 19 endpoints instrumentados com analytics

👉 **Guia Completo**:
[`docs/features/analytics-dashboard.md`](docs/features/analytics-dashboard.md)

### 🚨 **CORREÇÕES CRÍTICAS (DEZ 2024)**

> ✅ **Projeto 100% ESTÁVEL** - Todos os problemas críticos resolvidos

**Problemas Resolvidos:**

- ✅ **Build failing**: Module not found '@/lib/validations' → Script automático
  criado
- ✅ **TypeScript**: 42 erros → 0 erros com tipos seguros
- ✅ **ESLint**: 31,469 problemas → 0 problemas com automação
- ✅ **Dependencies**: Conflitos React 19 → Overrides e implementações custom
- ✅ **Prisma compatibility**: Build automation para esquemas gerados

**Métricas**: `Build: 6-8s` | `Tests: 30/30` | `Zero Warnings` | `Type Safe`

## 🎯 Visão Geral

**GB-Locacoes** é uma plataforma completa e moderna para locação de equipamentos
de construção civil, desenvolvida com as tecnologias mais avançadas de
2024/2025.

### ✨ Características Principais

- 🎨 **Design System Completo** - Sistema de design tokens e componentes
- 📱 **Responsivo** - Mobile-first com PWA capabilities
- 🔐 **Autenticação Robusta** - NextAuth.js com roles e 2FA
- 💳 **Pagamentos Integrados** - Stripe e Mercado Pago
- 📄 **Contratos Digitais** - ZapSign para assinaturas
- 📧 **Email Transacional** - Resend/SendGrid
- 🚚 **Logística** - Melhor Envio integrado
- 🧪 **Testes Completos** - Unit, Integration e E2E
- 📊 **Analytics** - Vercel Analytics e métricas
- 🎭 **Storybook** - Documentação viva de componentes

### 🎯 Funcionalidades

- **Catálogo de Equipamentos** - Busca, filtros e detalhes
- **Sistema de Orçamentos** - Cálculo automático e envio
- **Painel Administrativo** - Gestão completa
- **Área do Cliente** - Histórico e acompanhamento
- **Upload de Arquivos** - Imagens e documentos
- **Notificações** - Email e WhatsApp
- **Relatórios** - Analytics e métricas

## 🏗️ Arquitetura

### 🏛️ Stack Tecnológico

| Camada            | Tecnologia      | Versão  | Propósito                      |
| ----------------- | --------------- | ------- | ------------------------------ |
| **Frontend**      | Next.js         | 15.4.6  | Framework React com App Router |
| **Linguagem**     | TypeScript      | 5.9.2   | Tipagem estática               |
| **UI Framework**  | React           | 19.1.1  | Biblioteca de componentes      |
| **Styling**       | Tailwind CSS    | 3.4.17  | Framework CSS utilitário       |
| **Components**    | Radix UI        | Latest  | Componentes primitivos         |
| **Database**      | PostgreSQL      | 15+     | Banco relacional               |
| **ORM**           | Prisma          | 6.13.0  | Mapeamento objeto-relacional   |
| **Auth**          | NextAuth.js     | 4.24.11 | Autenticação e autorização     |
| **State**         | Zustand         | 5.0.7   | Gerenciamento de estado        |
| **Forms**         | React Hook Form | 7.62.0  | Formulários e validação        |
| **Validation**    | Zod             | 4.0.15  | Validação de schemas           |
| **Testing**       | Vitest          | 3.2.4   | Framework de testes            |
| **E2E**           | Playwright      | 1.54.2  | Testes end-to-end              |
| **Design System** | Storybook       | 9.1.1   | Documentação de componentes    |

### 🔌 Integrações Externas

- **💳 Pagamentos**: Stripe, Mercado Pago
- **📄 Contratos**: ZapSign
- **📧 Email**: Resend, SendGrid
- **🚚 Logística**: Melhor Envio
- **☁️ Storage**: Supabase, Vercel Blob
- **📊 Analytics**: Vercel Analytics, Custom Metrics
- **🔍 SEO**: Next.js SEO otimizado
- **📋 API Docs**: OpenAPI/Swagger custom implementation
- **🎨 Visual Testing**: Chromatic para regression testing

### 🏗️ Arquitetura de Sistema

```mermaid
graph TB
    A[Cliente] --> B[Next.js App Router]
    B --> C[API Routes]
    C --> D[Prisma ORM]
    D --> E[PostgreSQL]

    B --> F[NextAuth.js]
    F --> G[JWT Tokens]

    C --> H[Stripe API]
    C --> I[ZapSign API]
    C --> J[Resend API]
    C --> K[Melhor Envio API]

    B --> L[Vercel Blob]
    B --> M[Supabase Storage]

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style E fill:#bfb,stroke:#333,stroke-width:2px
```

## 🚀 Quick Start

### 📋 Pré-requisitos

- **Node.js** 20+ ([Download](https://nodejs.org/))
- **PNPM** 10+ (`npm install -g pnpm`)
- **PostgreSQL** 15+ (local ou Supabase)
- **Git** ([Download](https://git-scm.com/))

### ⚡ Instalação Rápida

```bash
# 1. Clone o repositório
git clone https://github.com/GBLocacoes/GB-Locacoes.git
cd GB-Locacoes

# 2. Instale as dependências
pnpm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local

# 4. Configure o banco de dados
pnpm db:generate
pnpm db:push
pnpm db:seed

# 5. Inicie o servidor de desenvolvimento
pnpm dev
```

🎉 **Acesse** `http://localhost:3000` e comece a usar!

### 🐳 Docker (Opcional)

```bash
# Inicie com Docker Compose
docker-compose up --build

# Acesse em http://localhost:3000
```

## ⚙️ Configuração

### 🔧 Variáveis de Ambiente

Crie um arquivo `.env.local` baseado no `.env.example`:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"
DIRECT_URL="postgresql://username:password@host:port/database?schema=public"

# Supabase (Storage e Auth)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# Pagamentos
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
MERCADO_PAGO_TOKEN="your-mercado-pago-token"

# Email
RESEND_API_KEY="your-resend-api-key"
SENDGRID_API_KEY="your-sendgrid-api-key"

# Contratos
ZAPSIGN_TOKEN="your-zapsign-token"

# Logística
MELHOR_ENVIO_TOKEN="your-melhor-envio-token"

# Logs
LOG_LEVEL="info"
```

### 🗄️ Configuração do Banco

```bash
# Gerar cliente Prisma
pnpm db:generate

# Aplicar migrations
pnpm db:push

# Popular dados iniciais
pnpm db:seed

# Abrir Prisma Studio
pnpm db:studio
```

## ⚠️ Compatibilidade de Dependências

### 🔧 Versões Testadas e Estáveis

| Dependência      | Versão Estável | ⚠️ Problemas Conhecidos                   |
| ---------------- | -------------- | ----------------------------------------- |
| **Next.js**      | 15.4.6         | ✅ Funcionando perfeitamente              |
| **Prisma**       | **6.13.0**     | ❌ **6.14.0** causa erro de inicialização |
| **React**        | 19.1.1         | ✅ Funcionando perfeitamente              |
| **TypeScript**   | 5.9.2          | ✅ Funcionando perfeitamente              |
| **Tailwind CSS** | **3.4.17**     | ❌ **4.x** quebra o projeto               |

### 🚨 Incompatibilidades Críticas

#### **Prisma 6.14.0 + Next.js 15.4.6**

```bash
# ❌ ERRO: "@prisma/client did not initialize yet"
# ✅ SOLUÇÃO: Manter Prisma em 6.13.0
pnpm add @prisma/client@6.13.0 prisma@6.13.0
```

#### **Tailwind CSS 4.x**

```bash
# ❌ PROBLEMA: Quebra o sistema de design
# ✅ SOLUÇÃO: Manter em 3.4.17
# Não atualizar até migração completa
```

### 🔍 Processo de Atualização Segura

```bash
# 1. ✅ Sempre testar build após atualizações
pnpm update [packages]
pnpm run build  # <- CRÍTICO: Este passo detecta problemas

# 2. ✅ Atualizar por categorias
# UI Components (Radix UI) - Geralmente seguro
pnpm update @radix-ui/react-*

# Database/ORM - CUIDADO! Testar sempre
pnpm update @prisma/client prisma
pnpm run build  # <- Verificar se funciona

# Framework/Core - MUITO CUIDADO!
# Ler changelog antes de atualizar Next.js, React, etc.
```

### 📚 Documentação de Troubleshooting

- **[PRISMA_TROUBLESHOOTING.md](./PRISMA_TROUBLESHOOTING.md)** - Problemas e
  soluções do Prisma
- **[TECHNICAL_DOCUMENTATION.md](./TECHNICAL_DOCUMENTATION.md)** - Detalhes
  técnicos
- **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)** - Guia de desenvolvimento

## 📁 Estrutura do Projeto

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
├── 📁 docs/                 # Documentação adicional
└── 📁 public/               # Arquivos estáticos
```

### 🗂️ Detalhamento dos Diretórios

#### `app/` - Next.js App Router

- **`admin/`** - Painel administrativo completo
- **`api/`** - API Routes para backend
- **`(public)/`** - Rotas públicas do site
- **`layout.tsx`** - Layout raiz da aplicação

#### `components/` - Componentes React

- **`ui/`** - Componentes base baseados em Radix UI
- **`admin/`** - Componentes específicos do admin
- **`*.tsx`** - Componentes de features específicas

#### `lib/` - Utilitários

- **`validators/`** - Schemas de validação Zod
- **`*.ts`** - Configurações de integrações externas

## 🎨 Design System

O projeto possui um **Design System completo** implementado com as melhores
práticas de 2025.

### 🎯 Características

- **Design Tokens** - Sistema centralizado de tokens
- **Storybook** - Documentação viva de componentes
- **Chromatic** - Visual regression testing
- **Acessibilidade** - WCAG 2.1 AA compliance
- **Responsividade** - Mobile-first approach

### 🚀 Comandos do Design System

```bash
# Design Tokens
pnpm design-system:build-tokens    # Gerar tokens
pnpm design-system:watch-tokens    # Watch mode

# Storybook
pnpm storybook                     # Desenvolvimento
pnpm build-storybook              # Build
pnpm chromatic                    # Visual regression

# Qualidade
pnpm design-system:lint           # Lint completo
pnpm design-system:lint:fix       # Auto-fix
```

### 📚 Documentação do Design System

- **[DESIGN_SYSTEM_2025.md](./DESIGN_SYSTEM_2025.md)** - Documentação completa
- **[ADMIN_DESIGN_SYSTEM.md](./ADMIN_DESIGN_SYSTEM.md)** - Guia administrativo
- **[docs/design-system.md](./docs/design-system.md)** - Detalhes técnicos

## 🎬 Sistema de Scroll Reveal

O projeto implementa um **sistema inteligente de animações** que detecta o tipo
de navegação do usuário:

### 🎯 Comportamentos

- **🎨 Primeira visita**: Animações suaves para impressionar
- **⚡ Navegação interna**: Elementos aparecem instantaneamente para fluidez

### 📁 Documentação

- **[📖 Guia Rápido](README-SCROLL-REVEAL.md)** - Como usar e adicionar
  elementos
- **[🔧 Documentação Técnica](docs/scroll-reveal-system.md)** - Arquitetura e
  troubleshooting

### 🚀 Exemplo de Uso

```tsx
// Elementos estáticos
<h2 className="section-title">Meu Título</h2>
<p className="section-subtitle">Minha descrição</p>

// Elementos dinâmicos
useEffect(() => {
  fetchData().finally(() => {
    const event = new CustomEvent('meuComponenteLoaded')
    window.dispatchEvent(event)
  })
}, [])
```

## 🧪 Testes

### 🎯 Estratégia de Testes

- **Unit Tests** - Vitest + Testing Library
- **Integration Tests** - API Routes
- **E2E Tests** - Playwright
- **Visual Tests** - Chromatic (Visual Regression Testing)
- **Accessibility Tests** - axe-core + Storybook a11y
- **API Contract Tests** - OpenAPI validation

### 🚀 Comandos de Testes

```bash
# Testes unitários
pnpm test                        # Executar testes
pnpm test:watch                  # Watch mode
pnpm test:coverage              # Relatório de cobertura
pnpm test:ui                    # Interface visual

# Testes E2E
pnpm test:e2e                   # Executar Playwright
pnpm test:e2e:ui                # Interface Playwright

# Storybook
pnpm storybook                  # Desenvolvimento
pnpm build-storybook           # Build

# Chromatic (Visual Regression Testing)
pnpm chromatic                  # Publicar no Chromatic
pnpm chromatic:test            # Teste sem falhar em mudanças
pnpm chromatic:accept          # Aceitar mudanças automaticamente
pnpm ci:chromatic              # Integração CI/CD
```

### 📊 Cobertura de Testes

```bash
# Gerar relatório de cobertura
pnpm test:coverage

# Abrir relatório no navegador
open coverage/lcov-report/index.html
```

## 📚 Documentação

> 🎯 **Documentação completamente reorganizada em dezembro 2024**

### **📁 Estrutura Completa da Documentação**

```
📁 docs/                           # DOCUMENTAÇÃO PRINCIPAL
├── 📄 README.md                   # Índice e navegação
├── 📁 getting-started/            # Para começar
│   ├── 📄 installation.md         # Setup inicial
│   ├── 📄 development.md          # Guia de desenvolvimento
│   ├── 📄 deployment.md           # Deploy e produção
│   └── 📄 troubleshooting.md      # Solução de problemas
├── 📁 architecture/               # Arquitetura técnica
│   ├── 📄 overview.md             # Visão geral da arquitetura
│   ├── 📄 api.md                  # Documentação das APIs
│   └── 📄 security.md             # Aspectos de segurança
├── 📁 features/                   # Funcionalidades
│   ├── 📄 admin-system.md         # Sistema administrativo
│   └── 📄 design-system.md        # Design System completo
├── 📁 guides/                     # Guias específicos
│   ├── 📄 storybook.md            # Documentação Storybook
│   ├── 📄 accessibility.md        # Melhorias de acessibilidade
│   └── 📄 scroll-reveal.md        # Sistema scroll reveal
├── 📁 references/                 # Referências técnicas
│   └── 📄 dependencies.md         # Compatibilidade dependências
└── 📁 internal/                   # Documentação interna
    ├── 📄 cursor-setup.md         # Setup Cursor IDE
    ├── 📄 project-decisions.md    # Decisões arquiteturais
    └── 📄 tools.md                # Ferramentas internas
```

### **🚀 Quick Links**

| **Para desenvolvedores**                                                        | **Para designers**                                            | **Para administradores**                                              |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------- |
| [`getting-started/development.md`](docs/getting-started/development.md)         | [`features/design-system.md`](docs/features/design-system.md) | [`features/admin-system.md`](docs/features/admin-system.md)           |
| [`architecture/overview.md`](docs/architecture/overview.md)                     | [`guides/storybook.md`](docs/guides/storybook.md)             | [`getting-started/deployment.md`](docs/getting-started/deployment.md) |
| [`getting-started/troubleshooting.md`](docs/getting-started/troubleshooting.md) | [`guides/accessibility.md`](docs/guides/accessibility.md)     | [`architecture/security.md`](docs/architecture/security.md)           |

### **📄 Arquivos na Raiz (Padrões do GitHub)**

- **[README.md](./README.md)** - Este arquivo (visão geral)
- **[AGENTS.md](./AGENTS.md)** - 🤖 **INSTRUÇÕES PARA IAs** (fonte de verdade)
- **[CHANGELOG.md](./CHANGELOG.md)** - Histórico de mudanças
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Como contribuir
- **[CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)** - Código de conduta

### **🛠️ Ferramentas de Desenvolvimento**

- **📋 API Documentation**: OpenAPI/Swagger custom em `/api-docs`
- **🎨 Visual Testing**: Chromatic para regression testing
- **📚 Component Library**: Storybook com acessibilidade
- **🔍 Code Quality**: ESLint, Prettier, TypeScript strict
- **🧪 Testing**: Vitest, Playwright, Contract testing

> **🤖 Para IAs/Assistentes**: Leia **[AGENTS.md](./AGENTS.md)** PRIMEIRO antes
> de qualquer implementação!

## 🚀 Scripts Disponíveis

### 🛠️ Desenvolvimento

```bash
pnpm dev                    # Servidor de desenvolvimento
pnpm build                  # Build de produção
pnpm start                  # Servidor de produção
pnpm lint                   # Linting
pnpm lint:fix               # Auto-fix linting
pnpm format                 # Formatação
pnpm format:check           # Verificar formatação
pnpm type-check             # Verificar tipos TypeScript
```

### 🗄️ Banco de Dados

```bash
pnpm db:generate           # Gerar cliente Prisma
pnpm db:push               # Push do schema
pnpm db:seed               # Seed do banco
pnpm db:studio             # Abrir Prisma Studio
```

### 🧪 Testes

```bash
pnpm test                  # Testes unitários
pnpm test:watch            # Watch mode
pnpm test:coverage         # Cobertura
pnpm test:ui               # Interface visual
pnpm test:e2e              # Testes E2E
```

### 🎨 Design System

```bash
pnpm storybook             # Storybook dev
pnpm build-storybook       # Build Storybook
pnpm design-system:build-tokens    # Build tokens
pnpm design-system:watch-tokens    # Watch tokens
```

### 🔍 Visual Testing (Chromatic)

```bash
pnpm chromatic             # Publicar no Chromatic
pnpm chromatic:test        # Teste sem falhar em mudanças
pnpm chromatic:accept      # Aceitar mudanças automaticamente
pnpm ci:chromatic          # Integração CI/CD
```

### 🔍 Qualidade

```bash
pnpm quality:check         # Verificar qualidade
pnpm quality:fix           # Corrigir qualidade
pnpm fix:md                # Formatar markdown
```

### 🔧 Compatibilidade

```bash
pnpm check:compatibility   # Verificar compatibilidade
pnpm check:outdated-safe   # Ver atualizações seguras
pnpm update:safe           # Atualizar dependências seguras
pnpm verify:after-update   # Verificar após atualizações
```

## 🤝 Contribuindo

### 📋 Como Contribuir

1. **Fork** o projeto
2. **Clone** seu fork
3. **Crie** uma branch: `git checkout -b feature/nova-funcionalidade`
4. **Commit** suas mudanças:
   `git commit -m 'feat: adiciona nova funcionalidade'`
5. **Push** para a branch: `git push origin feature/nova-funcionalidade`
6. **Abra** um Pull Request

### 🎯 Padrões de Commit

```bash
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: manutenção
```

### 🧪 Checklist de Pull Request

- [ ] Código segue os padrões do projeto
- [ ] Testes passando
- [ ] Documentação atualizada
- [ ] **📝 CHANGELOG.md atualizado** (OBRIGATÓRIO)
- [ ] Design system respeitado
- [ ] Acessibilidade verificada
- [ ] Responsividade testada

### 📖 Guias Detalhados

- **[AGENTS.md](./AGENTS.md)** - Guia completo para colaboradores
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Processo de contribuição
- **[CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)** - Código de conduta

## 🚀 Deploy

### ☁️ Vercel (Recomendado)

```bash
# 1. Conecte seu repositório ao Vercel
# 2. Configure as variáveis de ambiente
# 3. Deploy automático a cada push
```

### 🐳 Docker

```bash
# Build da imagem
docker build -t gb-locacoes .

# Executar container
docker run -p 3000:3000 gb-locacoes
```

### 📊 Monitoramento

- **Vercel Analytics** - Métricas de performance
- **Vercel Speed Insights** - Core Web Vitals
- **Pino** - Logs estruturados

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo
[LICENSE](LICENSE) para detalhes.

## 👥 Autores

**Equipe GB Locações**

- **Website**: [locacoesgb.com.br](https://locacoesgb.com.br)
- **Email**: contato@gblocacoes.com.br
- **GitHub**: [@GBLocacoes](https://github.com/GBLocacoes)

## 🙏 Agradecimentos

- **Next.js Team** - Framework incrível
- **Vercel** - Plataforma de deploy
- **Prisma** - ORM moderno
- **Radix UI** - Componentes acessíveis
- **Tailwind CSS** - Framework CSS
- **Storybook** - Documentação de componentes

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela!**

[![GitHub stars](https://img.shields.io/github/stars/GBLocacoes/GB-Locacoes?style=social)](https://github.com/GBLocacoes/GB-Locacoes/stargazers)

</div>
