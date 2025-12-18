# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em
[Keep a Changelog](HTTPS://keepachangelog.com/pt-BR/1.0.0/), e este projeto
adere ao [Versionamento Semântico](HTTPS://semver.org/lang/pt-BR/).

## [Unreleased]

### Added ✨

- **Download de PDF de orçamentos (cliente e admin)**: Implementados endpoints
  para download de PDF de orçamentos tanto na área do cliente quanto no painel
  administrativo.
  - **Arquivos Criados**:
    - `app/api/quotes/[id]/download/route.ts` - Endpoint para cliente baixar PDF
      do próprio orçamento
    - `app/api/admin/quotes/[id]/download/route.ts` - Endpoint para admin baixar
      PDF de qualquer orçamento
  - **Arquivos Modificados**:
    - `app/area-cliente/orcamentos/page.tsx` - Adicionado botão de download de
      PDF no modal de detalhes do orçamento
    - `app/admin/orcamentos/page.tsx` - Adicionado botão de download de PDF no
      modal de detalhes do orçamento
  - **Nota**: A geração real de PDF será implementada em breve usando biblioteca
    como `@react-pdf/renderer` ou `puppeteer`. Por enquanto, os endpoints
    retornam JSON com os dados do orçamento.
  - **Data**: 2025-12-17

- **Guia completo de testes para boletos Asaas**: Documentação passo a passo
  para testar o fluxo completo de boletos Asaas no Postman/Insomnia, incluindo:
  - Geração de boleto com exemplos de headers e body
  - Simulação de webhooks (pago, vencido, cancelado, refund)
  - Conciliação manual de pagamentos
  - Verificações no painel Asaas e no banco de dados
  - Troubleshooting completo e checklist de validação
  - **Arquivos criados**:
    - `docs/guides/asaas-boleto-testing.md` - Guia técnico completo
    - `docs/guides/asaas-boleto-testing-iniciantes.md` - Guia passo a passo para
      iniciantes
  - **Data**: 2025-12-16

- **Comandos de formatação e lint combinados**: Adicionados novos comandos npm
  para facilitar o workflow de desenvolvimento
  - `pnpm format:all` - Executa `format` e `format:md` juntos, formatando todos
    os arquivos do projeto (código e Markdown)
  - `pnpm lint:all` - Executa `lint:fix` e `lint` em sequência, corrigindo
    automaticamente problemas e depois verificando o restante
  - **Data**: 2025-12-16

- **Integracao de boletos Asaas (sandbox)**: Gateway de boleto configurado para
  gerar e consultar cobrancas via Asaas, incluindo webhook autenticado e
  verificador de status.
  - **Arquivos Criados**: `lib/payment-gateways/asaas.ts`
  - **Arquivos Modificados**:
    - `lib/payment-gateways/boleto.ts`
    - `app/api/payments/boleto/webhook/route.ts`
    - `app/api/payments/boleto/verify/route.ts`
    - `.env.example`
  - **Data**: 2025-12-16

- **Locacoes pendentes exibem solicitacoes**: Orçamentos agora geram
  locacoes-placeholder PENDING (não bloqueiam estoque) para aparecer em
  `/admin/rentals`; disponibilidade ignora PENDING com orçamento não aprovado.
  - **Arquivos Modificados**:
    - `app/api/quotes/route.ts`
    - `lib/equipment-availability.ts`
  - **Data**: 2025-12-16

### Fixed 🐛

- **Hover dos botões \"Ver Detalhes\" no admin**: Ajustado CSS global para que
  os botões `admin-action-button` mantenham fundo branco e permitam `scale`
  suave no hover, evitando que regras `!important` anulem `hover:scale-105`.
  - **Arquivos Modificados**: `app/globals.css`
  - **Data**: 2025-12-17

- **Locações pendentes de orçamentos rejeitados não aparecem mais**: A API agora
  exclui locações de orçamentos `REJECTED` e esconde órfãs por padrão; o script
  `pnpm db:clean:rejected-rentals` também cancela registros sem `quoteId` ou com
  `quote` inexistente, limpando bases já afetadas.
  - **Arquivos Modificados**:
    - `app/api/admin/rentals/route.ts`
    - `scripts/clean-rejected-quote-rentals.ts`
  - **Data**: 2025-12-17

- **Confirmação de exclusão de orçamento travava modal no admin**: Ao clicar em
  "Excluir Permanentemente" em orçamentos rejeitados, a confirmação ficava atrás
  do dialog Base UI e o focus trap bloqueava toda a página.
  - **Causa Raiz**: `AlertDialog` usava `z-50` fora do `Dialog.BodyContent`,
    enquanto o modal pai usa `z-[var(--layer-dialog)]`, deixando a confirmação
    invisível e com overlay ativo.
  - **Arquivos Modificados**:
    - `app/admin/orcamentos/page.tsx`
    - `components/ui/alert-dialog.tsx`
  - **Data**: 2025-12-17
- **Sombra dos cards Rejeitado no Kanban**: Sombra aplicada nos cards da coluna
  "Rejeitado" agora é quase imperceptível no estado normal e levemente reforçada
  no hover, com espaçamento do contêiner para não cortar o efeito.
  - **Causa Raiz**: A coluna usa contêiner com `overflow-y-auto`, tornando a
    sombra sutil praticamente invisível quando o item encosta no limite.
  - **Arquivos Modificados**:
    - `app/admin/orcamentos/page.tsx`
    - `components/admin/kanban-pipeline.tsx`
  - **Data**: 2025-12-17

- **Upload de avaria isolado do carrossel público**: O upload de fotos em
  "Registro de Perdas de Peças e Avarias" agora usa inputs únicos por instância,
  evitando que imagens de avaria sejam adicionadas ao carrossel público do
  equipamento.
  - **Causa Raiz**: Ambos os `ImageUpload` compartilhavam `id="file-upload"`, e
    o botão do bloco de avarias acionava o input de imagens públicas.
  - **Arquivos Modificados**:
    - `components/ui/image-upload.tsx`
    - `docs/features/equipment-parts-loss.md`
  - **Data**: 2025-12-17

- **Remoção automática de imagens do Supabase Storage**: Implementada remoção
  automática de imagens do Supabase Storage quando:
  - Uma imagem é removida durante a edição de um equipamento
  - Um equipamento é completamente deletado
  - Isso evita acúmulo de arquivos órfãos ocupando espaço de armazenamento
  - **Arquivos criados**:
    - `lib/storage-utils.ts` - Funções utilitárias para gerenciar remoção de
      arquivos do Storage
    - `scripts/cleanup-orphaned-images.ts` - Script para limpar imagens órfãs
      existentes
  - **Arquivos modificados**:
    - `app/api/admin/equipments/[id]/route.ts` - Rotas PUT e DELETE agora
      removem arquivos do Storage
  - **Data**: 2025-12-16

### Added ✨

- **Automa��o de cron jobs sem upgrade Vercel**: Workflow do GitHub Actions
  .github/workflows/cron-dispatch.yml dispara os 5 cron jobs extras via HTTP
  (fora do limite Hobby), com fallback manual (workflow_dispatch) e segredos
  CRON_BASE_URL + CRON_SECRET. Documenta��o atualizada em
  docs/issues/vercel-deploy-cron-jobs-limit.md.
  - **Data**: 2025-12-15

- **Especificação Gantt (Admin Manutenção/Logística)**: Documento detalhando
  header inspirado no Notion (dropdown diário/semanal/mensal, setas, Hoje,
  mini-calendário), estrutura de linhas/colunas para unidades físicas e
  veículos, barras/legendas de status, interações MVP e evoluções futuras (drag
  & drop na fase 2).
  - **Arquivos Criados**: `docs/features/gantt-admin.md`
  - **Data**: 2025-12-15
- **Sistema de Gestão de Unidades Físicas**: Implementado sistema completo para
  gerenciar unidades físicas individuais de equipamentos
  - **Modelo EquipmentUnit**: Novo modelo no Prisma para representar unidades
    físicas individuais com:
    - Código único por unidade (ex: "BET-001", "COMP-042")
    - Status granular (AVAILABLE, RESERVED, RENTED, MAINTENANCE, RETIRED)
    - Horímetro e odômetro por unidade
    - Número de série e notas
  - **APIs RESTful**: Endpoints completos para CRUD de unidades físicas:
    - `GET /api/admin/equipment-units` - Listar unidades (com filtros por
      equipamento, status, busca)
    - `POST /api/admin/equipment-units` - Criar nova unidade
    - `GET /api/admin/equipment-units/[id]` - Buscar unidade específica
    - `PATCH /api/admin/equipment-units/[id]` - Atualizar unidade (status,
      horímetro, odômetro, etc.)
    - `DELETE /api/admin/equipment-units/[id]` - Deletar unidade (com validação
      de uso)
  - **Componente EquipmentUnitsManager**: Interface completa para gerenciar
    unidades na página de detalhes do equipamento:
    - Listagem de todas as unidades com status visual
    - Criação e edição de unidades via dialog
    - Atualização de horímetro/odômetro por unidade
    - Exibição de número de série e notas
    - Validação de código único
    - Prevenção de exclusão de unidades em uso
  - **Integração na Página de Equipamentos**: Seção "Unidades Físicas"
    adicionada em `/admin/equipamentos/[id]`
  - **Enum EquipmentUnitStatus**: Novo enum com status: AVAILABLE, RESERVED,
    RENTED, MAINTENANCE, RETIRED
  - **Arquivos Criados**:
    - `app/api/admin/equipment-units/route.ts`
    - `app/api/admin/equipment-units/[id]/route.ts`
    - `components/admin/equipment-units-manager.tsx`
  - **Arquivos Modificados**:
    - `prisma/schema.prisma` (adicionado modelo EquipmentUnit e enum
      EquipmentUnitStatus)
    - `app/admin/equipamentos/[id]/page.tsx` (integração do componente)
  - **Data**: 2025-12-13

### Added ✨

- **Script de limpeza de orçamentos**: Criado script `scripts/clean-quotes.ts`
  para limpar todos os registros de orçamentos do banco de dados, útil para
  testes e reset do sistema
  - **Funcionalidades**:
    - Deleta todos os orçamentos (Quote) e seus itens (QuoteItem)
      automaticamente via cascade
    - Exibe estatísticas antes e depois da limpeza
    - Verifica e alerta sobre pagamentos órfãos e locações vinculadas
  - **Comando**: `pnpm db:clean:quotes`
  - **Arquivos Criados**: `scripts/clean-quotes.ts`
  - **Arquivos Modificados**: `package.json` (adicionado script
    `db:clean:quotes`)
  - **Dependências**: Adicionado `dotenv` como dev dependency para carregar
    variáveis de ambiente
  - **Data**: 2025-12-13
- **Documentação interna organizada**: Arquivos de progresso financeiro e
  regeneração do Prisma foram movidos para o diretório `docs/internal` com links
  no índice
  - **Arquivos Criados**: `docs/internal/orcamento-e-progresso.md`,
    `docs/internal/prisma-client-regeneration.md`
  - **Arquivos Modificados**: `docs/README.md`
  - **Data**: 2025-12-15

### Fixed 🛠️

- **Indicador de horário atual no calendário**: Linha laranja volta ao topo após
  23:59, usando o passo real do slot (altura da hora + borda) para evitar
  estouro abaixo da última linha.
  - **Arquivos Modificados**:
    `components/admin/advanced-calendar/time-indicator.tsx`,
    `components/admin/advanced-calendar/constants.ts`,
    `components/admin/advanced-calendar/daily-view.tsx`,
    `components/admin/advanced-calendar/weekly-view.tsx`
  - **Data**: 2025-12-16

- **Warning `--localstorage-file` no build Next**: Persistência do carrinho
  acessava `localStorage` durante o SSR, gerando avisos ao gerar páginas
  estáticas. O store agora é marcado como client-only e ignora o storage quando
  a janela não existe.
  - **Arquivos Modificados**: `stores/useCartStore.ts`
  - **Data**: 2025-12-15

- **Grade diária do calendário em `/admin/maintenance`**: Inclusão da linha de
  00:00 como primeira hora, alinhando a visão diária/semanal para mostrar a
  meia-noite no topo da coluna de horas.
  - **Arquivos Modificados**:
    `components/admin/advanced-calendar/daily-view.tsx`,
    `components/admin/advanced-calendar/weekly-view.tsx`
  - **Data**: 2025-12-15

- **Visão diária do calendário em `/admin/maintenance`**: A grade diária agora
  renderiza uma coluna padrão mesmo quando não há recursos filtrados e mantém
  linhas horizontais por hora, evitando que a área de eventos fique em branco.
  - **Arquivos Modificados**:
    `components/admin/advanced-calendar/daily-view.tsx`
  - **Data**: 2025-12-15

- **Labels de 00:00 ocultos na visão diária/semanal**: A primeira linha da grade
  (meia-noite) permanece visível mas sem texto para reduzir ruído visual,
  mantendo o restante das horas etiquetadas normalmente.
  - **Arquivos Modificados**:
    `components/admin/advanced-calendar/daily-view.tsx`,
    `components/admin/advanced-calendar/weekly-view.tsx`
  - **Data**: 2025-12-15
- **Indicador de horário atual alinhado ao grid**: Linha de tempo real ajustada
  para alinhar pixel a pixel às linhas do calendário, evitando deslocamento
  visual entre a marcação e as linhas de hora.
  - **Arquivos Modificados**:
    `components/admin/advanced-calendar/time-indicator.tsx`
  - **Data**: 2025-12-15

- **Dropdowns de filtros em `/admin/maintenance`**: Ajustado o `CustomSelect`
  para renderizar via portal com posicionamento fixo e camada de popover,
  garantindo que as listas de opções não fiquem atrás do calendário ou de outros
  cards na página.
  - **Arquivos Modificados**: `components/ui/custom-select.tsx`
  - **Data**: 2025-12-15

- **Filtro padrão na página de Locações (Admin)**: Restaurado comportamento onde
  a página `/admin/rentals` exibe por padrão apenas locações com status
  "Pendente" (PENDING), similar ao comportamento da primeira seção em
  `/admin/settings`. Este comportamento havia sido removido acidentalmente em
  uma atualização anterior.
  - **Arquivos Modificados**: `app/admin/rentals/page.tsx`,
    `docs/features/admin-system.md`
  - **Comentário no código**: Adicionado comentário crítico explicando que o
    filtro padrão deve ser 'PENDING' e nunca alterado para 'all' sem consultar o
    usuário
  - **Documentação**: Adicionada seção específica em
    `docs/features/admin-system.md` documentando este comportamento crítico
  - **Data**: 2025-12-12

### Security 🔐

- **RLS nas unidades físicas (`equipment_units`)**: RLS habilitado com políticas
  explícitas para corrigir alerta `rls_disabled_in_public`.
  - Leitura liberada para `authenticated` e `service_role`
  - Escrita (INSERT/UPDATE/DELETE) restrita a usuários com `role = 'ADMIN'`
  - `FORCE ROW LEVEL SECURITY` aplicado para evitar bypass
  - **Arquivos Criados**:
    - `prisma/migrations/20251215_enable_rls_equipment_units.sql`
  - **Documentação**: `docs/architecture/security.md` atualizada com o escopo

### Removed ❌

- Arquivos `ORCAMENTO_E_PROGRESSO.md` e `PRISMA_REGENERATE_REQUIRED.md`
  removidos da raiz; documentação consolidada em
  `docs/internal/orcamento-e-progresso.md` e
  `docs/internal/prisma-client-regeneration.md`
  - **Data**: 2025-12-15

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
- **Geração de contrato para locações (Admin)**: endpoint dedicado para
  criar/atualizar contrato vinculado à locação e ação no modal de detalhes para
  emitir/atualizar contrato.
  - **Arquivos Criados**: `app/api/admin/rentals/[id]/contract/route.ts`,
    `docs/features/contracts.md`
  - **Arquivos Modificados**: `app/api/admin/rentals/route.ts`,
    `app/admin/rentals/page.tsx`
  - **Data**: 2025-12-12

### Fixed 🛠️

- **Layout em coluna única nos filtros de Orçamentos (Admin) no tablet/`md`**:
  Em resoluções `md`, os filtros/ações ficam em **coluna única** (stack
  vertical) para evitar compactação; em `lg+` o layout volta a ficar **inline**.
  - **Arquivos Modificados**: `components/admin/admin-filter-card.tsx`,
    `app/admin/orcamentos/page.tsx`
  - **Data**: 2025-12-12

- **Direcao da animacao da tabela de Orcamentos (Admin)**: Linhas agora entram
  da esquerda para a direita e saem levemente para a direita, evitando a
  percepcao de slide invertido ao mudar filtros.
  - **Arquivos Modificados**: `app/admin/orcamentos/page.tsx`
  - **Data**: 2025-12-12

- **Toggle de visualização (Kanban/Tabela) nos filtros de Orçamentos (Admin)**:
  Ajustado wrapper para manter o visual flat e alinhar com os outros controles
  do filtro (mesma **altura `h-10`** e **border radius `rounded-md`** no `lg+`).
  - **Arquivos Modificados**: `app/admin/orcamentos/page.tsx`
  - **Data**: 2025-12-12

- **Animação da tabela e Kanban de Orçamentos ao aplicar filtros (Admin)**:
  Corrigido flick/flash e entrada “bruta” sem animação; agora os itens **saem um
  a um de cima para baixo** e **entram um a um de cima para baixo** (sequência
  determinística com `AnimatePresence` `mode="wait"` + transição em duas fases).
  - **Modo Tabela**: linhas animam sequencialmente de cima para baixo
  - **Modo Kanban**: cards em cada coluna animam independentemente, de cima para
    baixo
  - **Ajuste fino**: animação levemente mais lenta para transição mais suave
  - **Ajuste fino (Kanban)**: entrada agora vem da esquerda para a direita
  - **Correção (Kanban)**: evita loop `Maximum update depth exceeded` ao aplicar
    filtros
  - **Arquivos Modificados**: `app/admin/orcamentos/page.tsx`,
    `components/admin/kanban-pipeline.tsx`, `docs/issues/known-issues.md`
  - **Data**: 2025-12-12

- **Posicionamento de toasts no Admin**: Ajustado offset do Sonner para o
  domínio administrativo, mantendo o comportamento das páginas públicas (toast
  abaixo do header).

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
