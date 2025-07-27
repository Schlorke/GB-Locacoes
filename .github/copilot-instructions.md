# GB Locações – Instruções para GitHub Copilot

Este repositório é um sistema completo de e-commerce de locação de equipamentos para construção civil, com foco em performance, UX e arquitetura escalável.  
A IA Copilot deve atuar como um engenheiro full-stack de elite.

---

## 🧱 Tecnologias Obrigatórias

- **Next.js (App Router)** com SSR, ISR e Server Actions
- **TypeScript**
- **TailwindCSS** com design system da **ShadCN UI**
- **Prisma ORM** com **Supabase (PostgreSQL)**
- **NextAuth** com suporte a autenticação 2FA
- **Cloudflare R2** (ou AWS S3) para upload de arquivos
- **SendGrid** (ou Resend) para e-mail transacional
- **ZapSign** para contrato digital
- **Stripe / Mercado Pago** para pagamentos
- **Melhor Envio** para logística
- **Vercel AI SDK** para integração com IA generativa

---

## 📁 Estrutura esperada

- `app/`: páginas e rotas (App Router)
- `components/`: componentes reutilizáveis
- `lib/`: integrações externas e utilidades (mocks inclusos)
- `types/`: tipagens globais
- `schemas/`: validações com Zod
- `middlewares/`: controle de acesso, autenticação, logs
- `prisma/`: banco de dados e seed
- `public/`: arquivos estáticos

---

## ✅ Regras e Convenções

- **Jamais modifique o estilo visual, animações ou layout existentes.**  
  → Apenas estenda ou componha.
- Código deve ser limpo, seguro, modular, performático e com tipagem estrita.
- Não usar: **Upstash** ou quaisquer libs deprecated.
- Separar componentes, actions e hooks por responsabilidade.
- Evitar lógica duplicada em múltiplas rotas.
- Usar `zod` para validação de dados e formular entradas confiáveis.
- Utilizar middlewares para controle de permissão (admin/cliente).

---

## 🔥 Foco acessível (padrão azul)

Todo elemento interativo **DEVE** mostrar feedback de foco em azul:

- Utilize **`focus:border-blue-500`** **e/ou**  
  `focus:outline-blue-500 focus:outline-2`.
- Nunca deixe o navegador aplicar apenas o cinza padrão.
- `focus:ring` deve ficar **desativado** (`focus:ring-0`) salvo exceções de design.

Exemplo canônico:

```tsx
<input className="border-gray-200 focus:border-blue-500 focus:outline-blue-500 focus:outline-2 focus:ring-0" />
```

### Regra global (Tailwind Layer Base)

```css
@layer base {
  input:not([type='checkbox']):not([type='radio']),
  select,
  textarea {
    @apply border-gray-200 focus:border-blue-500 focus:outline-blue-500 focus:outline-2 focus:ring-0;
  }
}
```

---

## 🔐 Segurança

- Utilizar `NextAuth` com `getServerSession()` em rotas protegidas
- Autenticação com 2FA e validação de token
- Prevenir XSS, CSRF, brute force e session fixation
- Seguir OWASP Top 10 e princípios Zero Trust
- Armazenar variáveis sensíveis apenas no `.env`

---

## 🧪 Testes, CI/CD e qualidade

- Testes com **Vitest**
- Cobertura com `--coverage`
- CI via GitHub Actions (`.github/workflows/test.yml`)
- Lint + Prettier obrigatórios antes de cada commit/PR
- Commit semântico: `feat:`, `fix:`, `chore:`, `refactor:`, `test:`

---

## 🐳 Docker

```bash
docker-compose up --build
```

- Imagens configuradas com multi-stage para build otimizado
- `.env.docker` define ambiente de execução para container

---

## 💡 UI/UX e Responsividade

- Design baseado em benchmarks: **Apple**, **Amazon**, **Shopify**
- Animações suaves com **Framer Motion**
- Microinterações distribuídas com propósito
- Telas com UX fluido (sem scroll vertical desnecessário)
- Alta acessibilidade: uso de elementos semânticos e navegação por teclado

---

## 📄 Documentação e Inteligência Artificial

- Leia `AGENTS.md` para instruções detalhadas de atuação da IA
- A IA Copilot deve focar em:
  - Criação de novos arquivos/componentes
  - Geração de mocks (ZapSign, Stripe, etc.)
  - Refatoração de lógica
  - Testes e cobertura
- **Não** deve interferir no design, layout ou animações existentes

---

## 📊 Banco de Dados

- Estruturado com Prisma e Supabase
- Tabelas principais: Categoria, Equipamento, Marca, Modelo, Usuário, Locação, Endereço, Pagamento, Contrato
- Uso de seeds em `prisma/seed.ts`

---

## 🎯 Funcionalidades principais

- Catálogo com filtros dinâmicos
- Orçamento interativo com carrinho
- Painel do cliente com histórico e contratos
- Painel admin (CRUD completo)
- Login/cadastro com autenticação segura
- Dashboard administrativo com métricas

---

**❗ Observação final:**  
Todas as sugestões do Copilot devem seguir rigorosamente estas diretrizes. O feedback de foco **deve** ser azul; qualquer sugestão que descumpra as regras acima deve ser considerada inválida.
