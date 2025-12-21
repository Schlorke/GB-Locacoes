# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em
[Keep a Changelog](HTTPS://keepachangelog.com/pt-BR/1.0.0/), e este projeto
adere ao [Versionamento Semântico](HTTPS://semver.org/lang/pt-BR/).

## [Unreleased]

### Added ✨

- **Column Events Panel - Sidebar de Eventos por Coluna**: Implementado novo
  componente de sidebar para visualização agregada de eventos do calendário
  - **Componente Criado**:
    `components/admin/advanced-calendar/column-events-panel.tsx`
  - **Funcionalidades**:
    - Clique no header de coluna abre sidebar com todos os eventos daquela
      coluna
    - Lista ordenada de eventos com cards compactos (cliente, equipamento,
      horário, status)
    - Cards clicáveis que abrem o Dialog de detalhes individuais
    - Empty state quando não há eventos
    - Contador de eventos no header
    - Badges de status com cores semânticas
  - **Hover Effects Implementados**:
    - Header de coluna com background laranja (`bg-orange-50`) e texto laranja
      (`text-orange-600`)
    - Coluna completa (visão diária) com background laranja suave
      (`bg-orange-50/30`)
    - Swimlanes (visão timeline) com background laranja suave
      (`bg-orange-50/20`)
  - **Arquivos Modificados**:
    - `components/admin/advanced-calendar/index.tsx` - Estado e handlers para
      sidebar
    - `components/admin/advanced-calendar/daily-view.tsx` - onClick e hover em
      colunas
    - `components/admin/advanced-calendar/timeline-view.tsx` - onClick e hover
      em dias
    - `components/admin/advanced-calendar/monthly-view.tsx` - onClick e hover em
      dias da semana
  - **Documentação Atualizada**: `docs/features/advanced-calendar-system.md`
  - **Benefícios**:
    - Elimina redundância entre Dialog e Sidebar
    - Hierarquia clara: Dialog = 1 evento, Sidebar = N eventos de uma coluna
    - Melhor organização e controle sobre categorias/períodos
    - UX aprimorada com feedback visual laranja (identidade visual do projeto)
  - **Casos de Uso**:
    - Visão Diária: Ver todos os orçamentos "Pendentes" / "Aprovados" /
      "Rejeitados"
    - Visão Semanal: Ver todas as entregas de "SEX 19" ou "TER 16"
    - Visão Mensal: Ver todas as manutenções das "Segundas" do mês
  - **Data**: 2025-12-21

### Changed 🔄

- **Atualização de dependências**: Atualizados pacotes para versões mais
  recentes
  - `@types/node`: 24.10.4 → 25.0.3 (devDependency)
  - `react-resizable-panels`: 3.0.6 → 4.0.8
    - **Breaking Changes**: API atualizada na versão 4.x
      - `PanelGroup` → `Group`
      - `PanelResizeHandle` → `Separator`
    - **Arquivos Modificados**: `components/ui/resizable.tsx`
  - **Migração Base UI**: `@base-ui-components/react@1.0.0-rc.0` (deprecated) →
    `@base-ui/react@^1.0.0`
    - Resolvido problema de depreciação do pacote antigo
    - Atualizada importação em `components/ui/dialog.tsx`
    - API do Dialog mantida compatível, sem breaking changes
    - **Arquivos Modificados**: `package.json`, `components/ui/dialog.tsx`
  - **Não atualizado**: `tailwindcss@3.4.17` (mantido conforme diretrizes do
    projeto)
  - **Validação**: Componentes `resizable.tsx` e `dialog.tsx` testados e
    funcionando corretamente
  - **Data**: 2025-12-19

### Added ✨

- **Documentação completa do Sistema de Calendário Avançado**: Criada
  documentação detalhada explicando os três modos de visualização (Diário,
  Semanal e Mensal), onde estão implementados, para que servem e o que
  controlam.
  - **Arquivo Criado**: `docs/features/advanced-calendar-system.md`
  - **Conteúdo**:
    - Descrição técnica completa das três visualizações
    - Localização de todas as implementações (4 páginas admin)
    - Propósito e controle de cada visualização
    - Exemplos de uso por página
    - Funcionalidades técnicas avançadas
    - Roadmap de funcionalidades futuras
  - **Páginas Documentadas**:
    - `/admin/maintenance` - Calendário de Manutenções
    - `/admin/logistics` - Calendário de Logística
    - `/admin/rentals` - Calendário de Locações
    - `/admin/orcamentos` - Calendário de Orçamentos
  - **Data**: 2025-01-XX

### Fixed 🐛

- **Timeline (Equipamentos) com linhas preenchendo a altura do bloco**: Linhas e
  swimlanes agora expandem para ocupar a altura disponivel quando ha poucos
  recursos, mantendo altura minima de 60px.
  - **Arquivos Modificados**:
    `components/admin/advanced-calendar/timeline-view.tsx`,
    `docs/issues/known-issues.md`, `docs/features/advanced-calendar-system.md`
  - **Data**: 2025-12-20

- **Timeline (Equipamentos) com altura consistente**: Cabeçalho e linhas de
  recursos/swinlanes agora usam a mesma altura, evitando discrepâncias visuais;
  `overflow-x-hidden` no grid evita espaço extra no rodapé.
  - **Arquivos Modificados**:
    `components/admin/advanced-calendar/timeline-view.tsx`,
    `docs/issues/known-issues.md`, `docs/features/advanced-calendar-system.md`
  - **Data**: 2025-12-19

- **Equipamento bloqueado incorretamente por manutenção agendada**: Corrigida a
  lógica de verificação de disponibilidade que bloqueava equipamentos mesmo
  quando a manutenção agendada não interferia com o período de locação
  solicitado. Agora o sistema verifica se a data da manutenção realmente
  conflita com as datas de locação antes de bloquear.
  - **Causa**: A função `isEquipmentInMaintenance` verificava apenas se havia
    manutenção agendada, sem considerar o período de locação solicitado.
  - **Solução**:
    - Modificada `isEquipmentInMaintenance` para aceitar período de locação
      opcional
    - Manutenções `IN_PROGRESS` sempre bloqueiam o equipamento
    - Manutenções `SCHEDULED` só bloqueiam se a data agendada está dentro do
      período de locação
  - **Arquivos Modificados**:
    - `lib/maintenance-automation.ts` (lógica de verificação de conflito)
    - `lib/equipment-availability.ts` (passa período para verificação)
  - **Data**: 2025-01-XX

### Changed 🔄

- **Melhoria na detecção do warning de depreciação do Zustand**: Aprimorada a
  lógica de supressão do warning do Zustand para capturar mensagens em múltiplos
  formatos (string, objetos, arrays) e interceptar também `console.log`. A
  detecção agora usa sistema de padrões múltiplos para maior precisão.
  - **Arquivos Modificados**: `app/layout.tsx`, `app/ClientLayout.tsx`,
    `docs/issues/known-issues.md`
  - **Data**: 2025-01-XX

- **Script patch-prisma.js em modo silencioso**: O script agora roda
  silenciosamente por padrão, mostrando apenas warnings e erros. Logs
  informativos de sucesso foram removidos para manter o output do build mais
  limpo. Para debug, use `PATCH_PRISMA_VERBOSE=true pnpm build` para ver logs
  detalhados.
  - **Arquivos Modificados**: `scripts/patch-prisma.js`,
    `docs/issues/known-issues.md`
  - **Data**: 2025-01-XX

- **Atualização de dependências (Next/React/Prisma/Vitest)**: Atualizados
  pacotes core e ferramentas para versões estáveis, respeitando bloqueios
  documentados.
  - **Pacotes**: `next` 16.1.0, `react`/`react-dom` 19.2.3, `@prisma/client` e
    `prisma` 7.2.0 (+ `@prisma/adapter-pg` 7.2.0), `@eslint/js` 9.39.2,
    `@typescript-eslint/*` 8.50.0, `eslint-config-next` 16.1.0, `@vitest/*`
    4.0.16, `lucide-react` 0.562.0, `three`/`@types/three` 0.182.0,
    `markdownlint-cli` 0.47.0, `next-openapi-gen` 0.9.0, `lenis` 1.3.16.
  - **Mantido por compatibilidade**: `@base-ui-components/react` (pedido do
    usuário), `tailwindcss` 3.4.17 (bloqueio), `react-resizable-panels` 3.x
    (major sem validação), `@types/node` 24.x.
  - **Validação**: `pnpm run build -- --webpack` ✅ (Turbopack falha no Windows
    por falta de privilégio de symlink) e `pnpm test` ✅ (testes de contrato
    pulam sem servidor ativo).
  - **Data**: 2025-12-19

### Fixed 🐛

- **Prisma 7.1.0 - Erro "datasource property url is no longer supported" -
  CRÍTICO**: Corrigida configuração do Prisma 7 que estava causando erro de
  validação no build.
  - **Causa**: No Prisma 7, as propriedades `url` e `directUrl` não podem mais
    estar no `schema.prisma` - elas devem estar apenas no `prisma.config.ts`.
  - **Solução**:
    - Removidas propriedades `url` e `directUrl` do `prisma/schema.prisma`
    - Configurado apenas `url` no `prisma.config.ts` (já tinha `url`)
    - `directUrl` não é suportado no `datasource` do `prisma.config.ts` no
      Prisma 7.1.0
    - `DIRECT_URL` é usado automaticamente via variável de ambiente para
      migrations
    - Schema agora contém apenas `provider = "postgresql"`
  - **Arquivos Modificados**:
    - `prisma/schema.prisma` (removidas propriedades de URL)
    - `prisma.config.ts` (adicionado directUrl)
    - `docs/issues/known-issues.md` (documentação do problema)
  - **Data**: 2025-01-XX

- **Deploy na Vercel falhando com "pnpm install" exited with 1 - CRÍTICO**:
  Corrigido script `postinstall` que estava causando falha no deploy da Vercel.
  - **Causa**: O `postinstall` executava `prisma generate` incondicionalmente
    durante o `pnpm install`, mas na Vercel as variáveis de ambiente
    (`DATABASE_URL`) podem não estar disponíveis durante a instalação, causando
    falha no processo.
  - **Solução**:
    - Criado script `scripts/safe-postinstall.js` que detecta ambiente CI/Vercel
    - Script pula Prisma generate se `DATABASE_URL` não estiver disponível
    - Script não falha o build (sai com código 0 mesmo em caso de erro)
    - Prisma generate continua sendo executado no `prebuild` (já configurado)
  - **Arquivos Modificados**:
    - `package.json` (postinstall atualizado)
    - `scripts/safe-postinstall.js` (novo script seguro)
    - `docs/issues/known-issues.md` (documentação do problema)
  - **Data**: 2025-01-XX

- **Configuração incorreta do Supabase para serverless (Vercel) - CRÍTICO**:
  Corrigida configuração de `DATABASE_URL` que estava causando erros "Max
  clients reached" em produção.
  - **Causa**: Documentação local desatualizada recomendava Session Pooler
    (porta 5432) com `connection_limit=1`, que é inadequado para ambientes
    serverless (Vercel) devido ao limite baixo de conexões simultâneas.
  - **Solução**:
    - Atualizado para usar **Transaction Pooler (porta 6543)** conforme
      recomendação oficial do Supabase e Prisma para serverless
    - Removido `connection_limit=1` que estava causando exaustão do pool
    - Configurado `DIRECT_URL` corretamente para migrations
    - Atualizado `schema.prisma` e `prisma.config.ts` para usar `directUrl`
    - Documentação corrigida em `docs/guides/supabase-timeout-fix.md` e
      `docs/getting-started/deployment.md`
  - **Recomendação Oficial**:
    - **Produção (Serverless)**: Transaction Pooler (porta 6543) com
      `?pgbouncer=true`
    - **Migrations**: Direct Connection (porta 5432) via `DIRECT_URL`
    - **Desenvolvimento**: Direct Connection (porta 5432) sem pooler
  - **Arquivos Modificados**:
    - `prisma/schema.prisma` (adicionado `directUrl`)
    - `prisma.config.ts` (habilitado `directUrl`)
    - `docs/guides/supabase-timeout-fix.md` (corrigida recomendação)
    - `docs/getting-started/deployment.md` (adicionada seção sobre Supabase)
  - **Referências Oficiais**:
    - [Supabase: Connection Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)
    - [Prisma: Supabase Integration](https://www.prisma.io/docs/orm/overview/databases/supabase)
    - [Supabase: Prisma Guide](https://supabase.com/docs/guides/database/prisma)
  - **Data**: 2025-12-19

- **Warning de depreciação do default export do Zustand (Vercel Analytics/Speed
  Insights)**: Warning agora é suprimido antes da hidratação; código do projeto
  segue usando import { create }.
  - **Causa**: @vercel/analytics e @vercel/speed-insights ainda importam Zustand
    via default export em seus scripts de instrumentação, disparando o warning
    nos navegadores.
  - **Solução**: - Script global movido para ext/script com
    strategy="beforeInteractive" em pp/layout.tsx, interceptando
    console.warn/console.error antes do script instrument.\* da Vercel. -
    Mantido fallback em pp/ClientLayout.tsx para warnings assíncronos; sem
    alteração em dependências ou stores. - Documentação do problema atualizada
    em docs/issues/known-issues.md.
  - **Arquivos Modificados**: pp/layout.tsx, docs/issues/known-issues.md
  - **Data**: 2025-12-19

- **Build falhando com erro 3221226505 no postbuild (patch-prisma.js)**:
  Corrigido problema crítico onde o build falhava na etapa `postbuild` com
  código de erro `3221226505` no Windows.
  - **Causa**: O script `patch-prisma.js` usava `fs.cpSync()` que falha
    silenciosamente no Windows quando há arquivos bloqueados, caminhos longos ou
    problemas de permissões. O método não lida bem com erros individuais durante
    a cópia.
  - **Solução**:
    - Refatorado para usar função `copyDirectory` customizada que trata erros
      individuais de arquivos
    - Adicionada detecção automática do caminho correto do Prisma Client
      (compatível com npm, yarn e pnpm)
    - Melhor tratamento de erros com logging detalhado
    - Verificações de segurança antes de copiar arquivos
  - **Arquivos Modificados**:
    - `scripts/patch-prisma.js` - Refatorado completamente com cópia recursiva
      robusta
    - `docs/issues/known-issues.md` - Documentação detalhada do problema e
      solução
  - **Data**: 2025-12-18

- **Select de frete bloqueava scroll e criava barra branca**: Corrigido problema
  crítico onde o dropdown de opções de frete em `/orcamento` bloqueava o scroll
  vertical da página e adicionava uma barra branca invisível que deslocava todo
  o conteúdo para a esquerda.
  - **Causa**: Radix Select acionava `RemoveScroll` mesmo com `modal={false}`,
    adicionando `data-scroll-locked="1"` ao body e criando wrapper que aplicava
    `margin-right: 10px` via variável `--removed-body-scroll-bar-size`
  - **Solução**:
    - CSS com alta especificidade para neutralizar `data-scroll-locked` e forçar
      `--removed-body-scroll-bar-size: 0`
    - JavaScript que remove o wrapper de scroll lock e usa `setProperty` com
      `!important` para sobrescrever estilos inline do Radix
    - Execução contínua (10ms) enquanto select está aberto
  - **Arquivos Modificados**:
    - `components/ui/select.tsx` - Lógica de remoção de scroll lock
    - `app/globals.css` - Regras CSS preventivas
    - `docs/issues/known-issues.md` - Documentação detalhada do problema e
      solução
  - **Data**: 2025-12-18

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

- **Select de frete em `/orcamento` nao bloqueia mais o scroll nem cria faixa
  branca**: O `Select` do design system passa a abrir em modo nao modal por
  padrao, evitando `RemoveScroll` no `body` e mantendo o dropdown alinhado sem
  faixas laterais; CSS global neutraliza `body[data-scroll-locked]` para remover
  padding/margin extra e liberar o scroll.
  - **Arquivos Modificados**: `components/ui/select.tsx`, `app/globals.css`,
    `docs/issues/known-issues.md`, `docs/features/orcamento-page.md`,
    `AGENTS.md`
  - **Data**: 2025-12-18

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
  Melhorada supressão do warning `[DEPRECATED] Default export is deprecated` no
  console do navegador com solução em duas camadas
  - **Problema**: Múltiplos warnings apareciam no console devido a dependências
    externas da Vercel (`@vercel/analytics` e `@vercel/speed-insights`) que
    ainda usam sintaxe antiga do Zustand internamente
  - **Causa Raiz**: Dependências da Vercel ainda utilizam
    `import zustand from 'zustand'` em vez de `import { create } from 'zustand'`
  - **Solução Melhorada**: Implementada interceptação em duas camadas:
    1. Script inline no `<head>` do `layout.tsx` para interceptação precoce
       (antes do React hidratar)
    2. `useEffect` no `ClientLayout.tsx` para garantir cobertura de warnings
       assíncronos
    - Verificação robusta com múltiplas variações da mensagem de warning
    - Também intercepta `console.error` caso o warning seja emitido como erro
  - **Nota**: O código do projeto está correto (`stores/useCartStore.ts` usa
    sintaxe moderna). Aguardando atualização da Vercel para resolução definitiva
  - **Arquivos Modificados**: `app/layout.tsx`, `app/ClientLayout.tsx`,
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
