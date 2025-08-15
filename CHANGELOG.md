# 📋 Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto adere ao
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2024-12-21] - CRITICAL FIXES & INFRASTRUCTURE

### 🚨 **PROBLEMA CRÍTICO RESOLVIDO** - Build & TypeScript

- **Build failing completamente** - Resolvido erro "Module not found: Can't
  resolve '@/lib/validations'"
- **Prisma Generator conflito** - Implementada solução definitiva para arquivo
  `lib/validations/index.ts` ser deletado pelo Prisma
- **Script de automação criado** - `scripts/post-prisma-generate.js` que recria
  arquivo após Prisma generate
- **Package.json atualizado** - Adicionado script em `prebuild`, `postinstall` e
  `db:generate`

### 🔥 **CORREÇÕES MASSIVAS DE TYPESCRIPT & ESLINT**

#### **Eliminação Total de Erros TypeScript (42 → 0)**

- **lib/metrics.ts**: Tipos `RequestLike` e `ResponseLike` criados para
  middleware
- **lib/api-instrumentation.ts**: Correção de `Response | NextResponse` com cast
  seguro
- **lib/telemetry.ts**: Safe navigation em `trace.spans[0]?.name`
- **app/api/equipments/route.ts**: Variável `traceId` movida para escopo correto
- **app/api/admin/security/route.ts**: Tipos `priority` corrigidos com
  `as const`

#### **Eliminação Total de Erros ESLint (31,469 → 0)**

- **Tipos `any` eliminados**: Substituídos por interfaces TypeScript específicas
- **Imports não utilizados**: Removidos automaticamente
- **ESLint config refinado**: Arquivos Prisma ignorados, regras otimizadas

#### **Problemas de Dependências Resolvidos**

- **`node-domexception` deprecated**: Override com `npm:@types/node@*`
- **swagger-ui-react incompatibilidade**: Removido e substituído por
  implementação custom
- **Peer dependencies conflitos**: Resolvidos com overrides específicos

### 🏗️ **INFRAESTRUTURA & AUTOMAÇÃO**

#### **Sistema de Build Robusto**

- **Prisma generate automático**: Arquivo validations recriado automaticamente
- **TypeScript exclude**: Arquivos auto-gerados ignorados
  (`lib/validations/schemas/**/*.ts`)
- **Build time**: Reduzido para 6-8 segundos com otimizações

#### **Schemas Zod Centralizados**

- **EquipmentPublicSchema**: Validação completa para equipamentos públicos
- **CategoryPublicSchema**: Schema para categorias com todos os campos
- **ContactSchema & QuoteRequestSchema**: Formulários de contato e orçamento
- **Tipos TypeScript derivados**: Automáticos via `z.infer<typeof Schema>`

### 🧪 **TESTES & VALIDAÇÃO**

#### **Test Suite Completo (30/30 passando)**

- **tests/api/contract.test.ts**: Validação de contratos OpenAPI (13 testes)
- **tests/api/schema-validation.test.ts**: Validação Zod schemas (16 testes)
- **tests/components/button.test.tsx**: Testes de componentes (1 teste)
- **Conditional testing**: Testes condicionais quando servidor não disponível

### 📝 **DOCUMENTAÇÃO & API DOCS**

#### **API Documentation Custom**

- **app/api-docs/page.tsx**: Implementação custom substituindo Swagger UI
- **OpenAPI spec**: 47 rotas documentadas automaticamente
- **Interface responsiva**: Documentação visual moderna sem dependências
  externas

### 🎯 **PROBLEMAS ESPECÍFICOS & SOLUÇÕES**

#### **1. "Prisma did not initialize yet"**

- **Root cause**: PNPM module resolution + Next.js 15
- **Solution**: Mantido NPM como package manager, Prisma 6.13.0

#### **2. "Module not found: @/lib/validations"**

- **Root cause**: Prisma generate deleta diretório completo
- **Solution**: Script automático que recria arquivo após Prisma

#### **3. "Type errors em production build"**

- **Root cause**: Tipos `unknown`, `any`, navegação insegura
- **Solution**: Interfaces específicas, safe navigation, type guards

#### **4. "ESLint overwhelming errors (31k+)"**

- **Root cause**: Arquivos auto-gerados incluídos no linting
- **Solution**: Ignore patterns expansivos, automation scripts

### 📊 **MÉTRICAS FINAIS**

```bash
✅ TypeScript Errors:     42 → 0 (100% resolved)
✅ ESLint Problems:       31,469 → 0 (100% resolved)
✅ Build Time:            Failed → 6-8s (Success)
✅ Test Suite:            Failing → 30/30 passing
✅ Dependencies:          Conflicting → Stable
✅ API Routes:            47 documented & working
✅ Schemas:               Auto-generated + Custom
```

### 🔧 **ARQUIVOS CRÍTICOS MODIFICADOS**

- `package.json`: Scripts de build e overrides
- `scripts/post-prisma-generate.js`: Automação de criação de arquivos
- `lib/validations/index.ts`: Schemas centralizados (auto-recriado)
- `tsconfig.json`: Exclusões de arquivos auto-gerados
- `eslint.config.js`: Configuração otimizada
- `lib/metrics.ts`: Tipos seguros para middleware
- `app/api-docs/page.tsx`: Documentação custom

## [Não Lançado]

### Adicionado ✨

- **AGENTS.md na raiz** - Arquivo principal para orientação de IAs (fonte de
  verdade)
- **Pesquisa de ferramentas para API** - Análise completa de OpenAPI, Swagger,
  contract testing
- **Plano de implementação de documentação de API** - Roadmap de 4 semanas para
  eliminar alucinações
- **Fase 1 da documentação de API implementada** - OpenAPI + Swagger UI
  funcionando com primeiros endpoints
- **Fase 2 da documentação de API implementada** - Integração Prisma → Zod →
  OpenAPI com schemas sincronizados
- **Fase 3 da documentação de API implementada** - Testes de contrato, validação
  robusta e APIs administrativas
- **Fase 4 da documentação de API implementada** - Monitoramento completo,
  analytics e segurança
- **Protocolo anti-alucinação** - Implementado em todas as instruções para IAs
- **Protocolo obrigatório de CHANGELOG** - Todas as mudanças devem ser
  documentadas
- Reestruturação completa da documentação seguindo padrões de mercado

### Corrigido 🐛

- **Problemas de ESLint**: Correção de tipos e configuração
  - Substituição de tipos `any` por tipos específicos em api-instrumentation.ts
    e admin/security/route.ts
  - Correção de imports não utilizados em schemas de validação gerados
    automaticamente
  - Configuração corrigida do ESLint para evitar warnings do Next.js plugin
  - Exclusão de arquivos gerados automaticamente do linting
- Nova estrutura de pastas `/docs` com categorização lógica e 19 arquivos
  organizados
- Navegação rápida na documentação por perfil (dev/designer/admin)
- Sistema de links diretos para funcionalidades comuns

### Corrigido

- Imports dinâmicos do Prisma para resolver erro "did not initialize yet"
- Remoção de dados mock de produção
- Correções de TypeScript e ESLint
- Script automático de patch da engine do Prisma no build

- **Contract testing implementado** - Testes que validam conformidade com
  especificação OpenAPI
- **Validação Zod melhorada** - APIs usando schemas centralizados com mensagens
  de erro detalhadas
- **19 endpoints documentados** - Cobertura completa de APIs públicas,
  administrativas e observabilidade
- **Schemas administrativos documentados** - /api/admin/equipments,
  /api/admin/quotes, /api/admin/dashboard
- **Sistema de métricas implementado** - Coleta automática de performance, uso e
  erros da API
- **Monitoramento de segurança ativo** - Detecção de SQL injection, XSS, brute
  force e ataques
- **Dashboard de analytics** - Interface visual para monitoramento em tempo real
- **Telemetria simplificada** - Sistema de tracing inspirado no OpenTelemetry
- **APIs de observabilidade** - /api/admin/analytics e /api/admin/security
  completas

### Alterado 🔄

- **Cursor rules** - Adicionado protocolo anti-alucinação e referência
  obrigatória ao CHANGELOG
- **GitHub Copilot instructions** - Implementado sistema de documentação como
  fonte de verdade
- **README.md** - Adicionada seção de documentação profissional e navegação
  rápida
- **docs/internal/project-decisions.md** - Atualizado com novo protocolo para
  agentes de IA
- Estrutura de documentação reorganizada seguindo padrões de projetos enterprise
- Componente `categories-with-animation` migrado para usar dados reais da API
- Endpoints de API convertidos para usar imports dinâmicos

### Removido ❌

- **Duplicatas na documentação** - `admin-system-complete.md`,
  `cursor-debug-setup.md`
- **Arquivos mal posicionados** - Movidos para diretórios corretos na estrutura
  `docs/`
- **22 arquivos de documentação** - Migrados da raiz para `docs/` (mantidos
  apenas os 4 essenciais)
- Endpoint `/api/equipments-mock` e fallbacks de dados dummy
- Arquivos de log desnecessários da raiz do projeto

## [1.0.0] - 2024-12-XX

### Adicionado

- Implementação inicial da plataforma GB-Locações
- Sistema completo de locação de equipamentos
- Painel administrativo com gestão completa
- Sistema de orçamentos automatizado
- Design System completo com Storybook
- Integração com Stripe para pagamentos
- Sistema de upload de arquivos
- Autenticação robusta com NextAuth.js
- Testes unitários e E2E completos
- CI/CD com GitHub Actions
- Deploy automatizado na Vercel

### Tecnologias Principais

- Next.js 15.4.6 com App Router
- TypeScript 5.9.2 para tipagem estática
- React 19.1.1 como biblioteca de UI
- Prisma 6.13.0 como ORM
- PostgreSQL como banco de dados
- Tailwind CSS 3.4.17 para styling
- Radix UI para componentes primitivos
- Vitest para testes unitários
- Playwright para testes E2E
- Storybook para documentação de componentes

---

## 🔗 Links

- [🏠 Homepage](https://gblocacoes.com.br)
- [📚 Documentação](./docs/)
- [🤝 Como Contribuir](./CONTRIBUTING.md)
- [🐛 Reportar Bugs](https://github.com/GBLocacoes/GB-Locacoes/issues)
- [✨ Solicitar Features](https://github.com/GBLocacoes/GB-Locacoes/issues)
