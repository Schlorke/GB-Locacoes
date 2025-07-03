# Projeto: GB Locações – Plataforma de Locação de Equipamentos para Construção Civil

## Stack Tecnológica

- Next.js 15 com App Router (SSR/ISR)
- TypeScript
- TailwindCSS
- ShadCN UI
- Prisma ORM com Supabase (PostgreSQL)
- Server Actions + Edge Functions
- Autenticação com NextAuth + 2FA
- Integrações: ZapSign, Stripe, Mercado Pago, Melhor Envio, SendGrid
- Deploy com Vercel e AI SDK

## Regras de Projeto

- Nunca alterar os estilos visuais existentes
- Usar animações com Framer Motion
- Utilizar ShadCN UI como base de componentes
- Garantir modularidade, segurança (OWASP) e performance
- Evitar bibliotecas não autorizadas (Neon, Upstash)

## Estrutura do Projeto

- `app/`: App Router (Next.js 13+)
- `components/`: Componentes reutilizáveis com ShadCN
- `lib/`: Helpers, autenticação, server actions
- `prisma/`: `schema.prisma`, seeds, migrações
- `public/`: Imagens estáticas e arquivos
- `.env`: Variáveis sensíveis de ambiente
