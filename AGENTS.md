# AGENTS.md

Este documento orienta colaboradores humanos e agentes automatizados sobre como trabalhar neste repositório.

---

## 🧱 Estrutura e estilo do código

- Projeto em **Next.js 15** e **TypeScript**.
- Nomes de arquivos e pastas devem estar em inglês e minúsculo.
- Execute eslint e prettier antes de enviar pull requests.
- Utilize TailwindCSS conforme os padrões já existentes no projeto.
- Não alterar design, animações ou responsividade já implementados.

---

## ⚙️ Configurações e scripts

- Variáveis de ambiente estão documentadas em `.env.example`.
- Para rodar localmente:
  ```bash
  pnpm install
  pnpm dev
  ```
- Testes e lint:
  ```bash
  pnpm lint
  pnpm test
  ```

---

## 🗂️ Estrutura recomendada de pastas

- `app/` – Rotas da aplicação (Next.js App Router)
- `components/` – Componentes visuais reutilizáveis
- `lib/` – Funções auxiliares e integrações externas
- `types/` – Tipos globais TypeScript
- `schemas/` – Validações com Zod
- `middlewares/` – Middlewares de autenticação, logs e proteção
- `prisma/` – Schema do banco de dados e seeds
- `public/` – Arquivos estáticos

---

## 🔐 Variáveis de ambiente críticas

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `ZAPSIGN_API_KEY`
- `SENDGRID_API_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 🚀 Comandos úteis

- `pnpm dev` – Rodar o projeto localmente
- `pnpm lint` – Verificar estilo e erros de formatação
- `pnpm test` – Rodar testes unitários com Vitest
- `docker-compose up --build` – Subir ambiente local com Docker + PostgreSQL
- `prisma migrate dev` – Aplicar migrations localmente
- `prisma studio` – Acessar o banco de dados em modo visual

---

## 🔄 Política de branches e commits

- Use branches descritivas, ex.: `feature/add-login`, `fix/navbar-bug`
- Commits devem ser curtos, claros e escritos no imperativo
- Exemplo: `feat: implementa botão de orçamento`

---

## 📥 Revisão e Pull Requests

- PRs precisam de descrição clara do que foi feito e como testar.
- Use o seguinte template:

```md
## Objetivo

[Descreva brevemente o que foi feito.]

## Como testar

[Explique os passos para validar as alterações.]

## Checklist

- [ ] Código limpo
- [ ] Testes passando
- [ ] Sem alteração de design
```

---

## 🤖 Agentes e responsabilidades automatizadas

- `quote-agent`: Gera orçamentos com base no catálogo
- `contract-agent`: Dispara assinatura digital com ZapSign
- `email-agent`: Envia e-mails com Resend/SendGrid
- `logger-agent`: Registra ações sensíveis (logs com Pino)
- `cleanup-agent`: Remove resquícios de Neon/Upstash

---

## 🔒 Regras obrigatórias para agentes de IA

- NÃO modificar estilos, animações, delays ou identidades visuais existentes
- NÃO sobrescrever componentes reutilizáveis
- NÃO adicionar dependências sem justificativa clara
- Priorizar modularidade, segurança e legibilidade
- Usar Zod em todas as validações
- Usar middlewares para controle de acesso (admin/client)

---

## ✅ Em caso de dúvida

A IA deve:

- Priorizar segurança, clareza e organização
- Gerar novos arquivos/modificações sem alterar estilos existentes
- Solicitar aprovação antes de mudanças sensíveis
