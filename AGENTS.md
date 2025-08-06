# AGENTS.md

Este documento orienta colaboradores humanos **e agentes automatizados** sobre
como trabalhar neste repositório GB Locações.

---

## 🧱 Estrutura e estilo do código

- Projeto em **Next.js 15** (App Router) e **TypeScript**.
- Nomes de arquivos e pastas sempre em inglês e minúsculo.
- Rode **eslint** e **prettier** antes de enviar pull requests.
- Siga os utilitários **TailwindCSS** e o design system **ShadCN UI** já
  presentes.
- ❌ **NÃO** alterar design, animações ou responsividade já implementados.
- ✅ Padrão de foco: `focus:border-blue-500` **e/ou**
  `focus:outline-blue-500 focus:outline-2` para todos os elementos interativos.

---

## ⚙️ Configurações e scripts

- Variáveis de ambiente documentadas em **`.env.example`**.
- Rodar localmente:

```bash
pnpm install
pnpm dev
```

- Lint e testes:

```bash
pnpm lint
pnpm test
```

---

## 🗂️ Estrutura recomendada de pastas

- `app/` – rotas da aplicação (Next.js App Router)
- `components/` – componentes visuais reutilizáveis
- `lib/` – funções auxiliares e integrações externas
- `types/` – tipos globais TypeScript
- `schemas/` – validações com Zod
- `middlewares/` – autenticação, logs, proteção
- `prisma/` – schema do banco de dados e seeds
- `public/` – arquivos estáticos

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

| Comando                     | Descrição                                    |
| --------------------------- | -------------------------------------------- |
| `pnpm dev`                  | Rodar o projeto localmente                   |
| `pnpm lint`                 | Verificar estilo e formatação                |
| `pnpm test`                 | Executar testes unitários (Vitest)           |
| `docker-compose up --build` | Subir ambiente local com Docker + PostgreSQL |
| `prisma migrate dev`        | Aplicar migrations localmente                |
| `prisma studio`             | UI visual do banco de dados                  |

---

## 🔄 Política de branches e commits

- Use branches descritivas, ex.: `feature/add-login`, `fix/navbar-bug`.
- Commits curtos, claros e no imperativo.  
  Ex.: `feat: implement budget button`.

---

## 📥 Revisão e Pull Requests

- PRs devem conter **objetivo**, **passos de teste** e checklist:

```md
## Objetivo

[Descreva brevemente o que foi feito.]

## Como testar

[Explique os passos para validar as alterações.]

## Checklist

- [ ] Código limpo
- [ ] Testes passando
- [ ] Sem alteração de design
- [ ] Foco azul (`focus:border-blue-500` ou `focus:outline-blue-500`)
```

---

## 🤖 Agentes e responsabilidades automatizadas

| Agente           | Responsabilidade                              |
| ---------------- | --------------------------------------------- |
| `quote-agent`    | Gera orçamentos a partir do catálogo          |
| `contract-agent` | Dispara assinatura digital (ZapSign)          |
| `email-agent`    | Envia e‑mails transacionais (Resend/SendGrid) |
| `logger-agent`   | Registra ações sensíveis (Pino)               |
| `cleanup-agent`  | Remove dependências obsoletas                 |

---

## 🔒 Regras obrigatórias para **agentes de IA**

1. **Foco acessível em azul:**
   - Implementar `focus:border-blue-500` **e/ou**
     `focus:outline-blue-500 focus:outline-2`.
   - `focus:ring` deve permanecer **desativado** (`focus:ring-0`), salvo
     exceções aprovadas.
2. **Proibição de alteração visual existente:**
   - Não modificar estilos, animações, delays ou identidade já aplicada.
3. **Não sobrescrever componentes reutilizáveis existentes.**
4. **Não adicionar dependências** sem justificativa técnica.
5. Priorizar **modularidade, segurança** e **legibilidade**.
6. Usar **Zod** em todas as validações de entrada/saída.
7. Utilizar **middlewares** para controle de acesso (admin/cliente).

### Snippet global recomendado (Tailwind Layer Base)

```css
@layer base {
  input:not([type="checkbox"]):not([type="radio"]),
  select,
  textarea {
    @apply border-gray-200 focus:border-blue-500 focus:outline-blue-500 focus:outline-2 focus:ring-0;
  }
}
```

---

## ✅ Em caso de dúvida

A IA (ou contributor) deve:

- Priorizar segurança, clareza e organização.
- Criar novos arquivos ou componentes **sem alterar** estilos existentes.
- Solicitar **aprovação** antes de qualquer mudança sensível.
