# GB Locações

![Logo](public/placeholder-logo.png)

[![CI](https://img.shields.io/github/actions/workflow/status/GBLocacoes/GB-Locacoes/test.yml?label=CI)](https://github.com/GBLocacoes/GB-Locacoes/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](#licença)

Plataforma completa para locação de equipamentos de construção civil utilizando **Next.js 15**, **TypeScript** e **Prisma**.

## Visão Geral

O projeto visa facilitar a gestão de catálogo, orçamentos e locações de
equipamentos. Conta com painel administrativo, área do cliente e integrações
para pagamentos, logística e assinaturas digitais.

## Demonstração

Coloque capturas de tela ou GIFs em `docs/assets/` e referencie aqui.

## Tabela de Conteúdo

- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso Rápido](#uso-rápido)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Design System](#-design-system)
- [Scripts](#scripts)
- [Testes](#testes)
- [Roadmap](#roadmap)
- [Contribuindo](#contribuindo)
- [Licença](#licença)
- [Autores](#autores)

## Arquitetura

<!-- prettier-ignore-start -->
```text
Browser
   │
   ▼
Next.js App Router (Edge/SSR)
   │  Server Actions
   ▼
Prisma ORM
   │
   ▼
Supabase (PostgreSQL & Storage)
```
<!-- prettier-ignore-end -->

Principais tecnologias:

- **Next.js 15** com App Router
- **ShadCN UI** e **TailwindCSS**
- **Prisma ORM** conectado ao **Supabase**
- **NextAuth** com suporte a 2FA
- **Stripe** / **Mercado Pago** para pagamentos
- **ZapSign** para contratos digitais
- **Resend/SendGrid** para e-mail
- **Melhor Envio** para logística
- **Vitest** para testes unitários

## Pré-requisitos

- Node.js 20+
- PNPM 8+
- Banco PostgreSQL (local via Docker ou Supabase)

## Instalação

```bash
git clone https://github.com/Schlorke/GB-Locacoes.git
cd GB-Locacoes
pnpm install
pnpm db:generate
pnpm db:push
pnpm dev
```

A aplicação ficará disponível em `http://localhost:3000`.

## Configuração

Copie `.env.example` para `.env` e ajuste cada chave:

```env
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"
RESEND_API_KEY="your-resend-api-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"
MERCADO_PAGO_TOKEN="your-mercado-pago-token"
```

Variáveis adicionais utilizadas no código:
`DIRECT_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ZAPSIGN_TOKEN`, `MELHOR_ENVIO_TOKEN`, `LOG_LEVEL`.

## Uso Rápido

```bash
pnpm dev
```

Acesse `http://localhost:3000` e realize um orçamento pelo catálogo.

## Estrutura de Diretórios

```text
.
├── app/                # rotas Next.js
├── components/         # componentes reutilizáveis
├── hooks/
├── lib/                # integrações e utilitários
├── middlewares/
├── prisma/             # schema e seeds
├── public/             # arquivos estáticos
├── schemas/            # validações com Zod
├── tests/              # testes Vitest
└── types/
```

## 🔱 Design System

Consulte o [Design System](docs/design-system.md) para padrões de cores, tipografia e componentes reutilizáveis.

## Scripts

- `pnpm dev` – inicia o servidor de desenvolvimento
- `pnpm build` – gera build de produção
- `pnpm lint` – executa ESLint
- `pnpm test` – roda os testes (Vitest)
- `pnpm test:coverage` – gera relatório de cobertura
- `pnpm db:push` – aplica schema no banco
- `pnpm db:seed` – popula dados iniciais

## Testes

Execute:

```bash
pnpm vitest run
```

O relatório de cobertura estará em `coverage/` quando rodado com `pnpm test:coverage`.

## Roadmap

- [ ] Painel completo do cliente
- [ ] Integração total com pagamentos
- [ ] Upload otimizado em produção
- [ ] Traduções (i18n) para EN/ES

Relate bugs e sugestões via [Issues](https://github.com/GBLocacoes/GB-Locacoes/issues).

## Contribuindo

Siga o padrão de commits `feat:`, `fix:`, `test:` etc. Rode `pnpm lint` e `pnpm vitest run` antes de enviar PR.
Consulte [AGENTS.md](AGENTS.md) para detalhes de estilo e fluxos.

## Licença

Este projeto utiliza a licença [MIT](LICENSE) © GB Locações.

## Autores

Equipe **GB Locações** – contato profissional via [website](https://gblocacoes.com.br).
