# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em
[Keep a Changelog](HTTPS://keepachangelog.com/pt-BR/1.0.0/), e este projeto
adere ao [Versionamento Semântico](HTTPS://semver.org/lang/pt-BR/).

## [Unreleased]

### Added ✨

- **Otimização de Performance do Banco de Dados (Supabase)**: Adicionados
  índices em foreign keys não indexadas na tabela `quotes`
  - **Problema Identificado**: Supabase Database Linter detectou 2 foreign keys
    sem índices (`quotes_approvedBy_fkey` e `quotes_rejectedBy_fkey`) causando
    suboptimal query performance
  - **Solução**: Criados índices `quotes_approvedBy_idx` e
    `quotes_rejectedBy_idx` para otimizar JOINs e filtros
  - **Impacto**: Melhoria significativa na performance de queries envolvendo
    aprovação/rejeição de orçamentos
  - **Arquivos Criados**:
    - `prisma/migrations/20251208_fix_supabase_performance_issues.sql`
    - `scripts/execute-supabase-performance-fix.js`
    - `docs/guides/supabase-performance-analysis-december-2025.md`
  - **Arquivos Modificados**: `prisma/schema.prisma`, `package.json`
  - **Comando**: `pnpm migrate:supabase-performance`
  - **Data**: 2025-12-08

### Fixed 🛠️

- **Warning de Depreciação do Zustand (Vercel Analytics/Speed Insights)**:
  Suprimido warning `[DEPRECATED] Default export is deprecated` no console do
  navegador
  - **Problema**: Múltiplos warnings apareciam no console devido a dependências
    externas da Vercel (`@vercel/analytics` e `@vercel/speed-insights`) que
    ainda usam sintaxe antiga do Zustand internamente
  - **Causa Raiz**: Dependências da Vercel ainda utilizam
    `import zustand from 'zustand'` em vez de `import { create } from 'zustand'`
  - **Solução**: Implementado filtro no `console.warn` para suprimir apenas o
    warning específico do Zustand, mantendo outros warnings visíveis
  - **Nota**: O código do projeto está correto (`stores/useCartStore.ts` usa
    sintaxe moderna). Aguardando atualização da Vercel para resolução definitiva
  - **Arquivos Modificados**: `app/ClientLayout.tsx`,
    `docs/issues/known-issues.md`
  - **Data**: 2025-01-XX

- **Erros SVG motion.path no console**: Corrigido erro
  `Error: <path> attribute d: Expected moveto path command ('M' or 'm'), "undefined"`
  que aparecia no console durante renderização de animações de ondas
  - **Problema**: `motion.path` do Framer Motion estava renderizando com
    atributo `d` undefined durante hidratação SSR/CSR ou transições de estado
  - **Causa Raiz**: Falta de estado inicial explícito (`initial` prop) nos
    `motion.path` das animações de ondas no Hero e Hero Carousel Preview
  - **Solução**: Adicionada prop `initial` com valor explícito de `d` em todos
    os `motion.path` para garantir estado válido desde a primeira renderização
  - **Arquivos Modificados**: `components/hero.tsx`,
    `components/admin/hero-carousel-preview.tsx`
  - **Data**: 2025-12-05

- **Storybook build quebrando em `pnpm build-storybook`**: Resolvido erro
  `Rollup failed to resolve import "@storybook/blocks"` que bloqueava o build do
  Storybook 10.1.x
  - **Causa Raiz**: pacote `@storybook/blocks` não vinha instalado por padrão,
    mas é requerido pelos arquivos MDX (`Meta/Canvas/Controls`)
  - **Solução**: Pinar devDependency `@storybook/blocks@9.0.0-alpha.17` e
    atualizar guias `docs/guides/storybook*.md` com a dependência obrigatória
  - **Resultado**: `pnpm build-storybook` finaliza com sucesso (avisos esperados
    de `use client` gerados pelo Vite ao empacotar componentes Next)
  - **Data**: 2025-12-05

- **CI/CD Pipeline - pnpm install Failure Resolvido**: Corrigido erro crítico
  que causava falha no step "Install dependencies" do GitHub Actions
  - **Problema**: `pnpm install --frozen-lockfile` falhava com exit code 1
  - **Causa Raiz**: Script `postinstall` executava `prisma generate` sem
    `DATABASE_URL` disponível
  - **Solução Aplicada**: Adicionadas variáveis de ambiente dummy no step de
    install
    - `DATABASE_URL`: postgresql://dummy:dummy@localhost:5432/dummy
    - `NEXTAUTH_SECRET`: dummy-secret-for-ci
    - `NEXTAUTH_URL`: http://localhost:3000
  - **Arquivos Modificados**:
    - `.github/workflows/ci.yml`: Env vars no step "Install dependencies"
    - `.github/workflows/test.yml`: Env vars em ambos os jobs (test e
      storybook-build)
  - **Resultado**: CI/CD pipeline agora executa com sucesso, postinstall
    funciona corretamente
  - **Data**: 2025-12-05
  - **Commit**: 9ddad8a4

- **Crash ao ler `icon` em categorias**: Sanitizada a lista de categorias antes
  de mapear ícones (`components/categories.tsx` e
  `components/equipment-showcase-section.tsx`) para evitar acesso a entradas
  indefinidas retornadas pela API; previne
  `Cannot read properties of undefined (reading 'icon')`.
- **Imagens do Supabase não carregavam localmente**: `next.config.mjs` agora
  inclui o host do `NEXT_PUBLIC_SUPABASE_URL` em `images.remotePatterns`,
  liberando o carregamento de assets do storage Supabase em desenvolvimento.

### Changed 🔄

- **Índices para FKs + PK em verificationtokens (Prisma + Supabase)**: Cobertura
  completa dos FKs sinalizados pelo Performance Advisor e PK composta em
  `verificationtokens`
  - **Schema Prisma**: Adicionados `@@index` em `accounts.userId`,
    `addresses.userId`, `cart_items.equipmentId`, `equipments.categoryId`,
    `quote_items.quoteId`/`equipmentId`, `quotes.userId`,
    `rental_items.rentalid`/`equipmentid`, `rentals.userid`, `sessions.userId`,
    além de `@@id([identifier, token])` em `verificationtokens`
  - **Migration SQL**:
    `prisma/migrations/20251205_add_fk_indexes_and_verificationtokens_pk.sql`
    (usa `CREATE INDEX IF NOT EXISTS` + cria PK se ausente)
  - **Duplicate index fix**:
    `prisma/migrations/20251205_drop_verificationtokens_unique.sql` remove a
    constraint `verificationtokens_identifier_token_key`, já coberta pela PK
  - **Notas**: Em produção, prefira `CREATE INDEX CONCURRENTLY` se executar
    manualmente para evitar locks; reexecute o Performance Advisor após aplicar
  - **Data**: 2025-12-05

### Added ?
