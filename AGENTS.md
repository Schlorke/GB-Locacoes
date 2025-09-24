# 🤖 AGENTS.md - Instruções Principais para Agentes de IA

> **ARQUIVO CRÍTICO**: Este é o primeiro arquivo que toda IA deve ler ao
> interagir com o projeto GB-Locações

## 📚 **DOCUMENTAÇÃO COMO FONTE DE VERDADE ABSOLUTA**

### ⚠️ **PROTOCOLO ANTI-ALUCINAÇÃO OBRIGATÓRIO**

1. **🚨 NUNCA ALUCINE**: Se não souber algo, consulte `docs/` PRIMEIRO
2. **📖 LEIA ANTES DE AGIR**: Consulte a documentação antes de implementar
3. **🎯 SIGA OS PADRÕES**: Use apenas componentes e práticas documentadas
4. **📝 DOCUMENTE MUDANÇAS**: SEMPRE atualize o `CHANGELOG.md` após alterações
5. **🗓️ NUNCA INVENTE DATAS**: SEMPRE use datas reais dos commits Git para o
   CHANGELOG
   - Use `git log --pretty=format:"%h %ad %s" --date=short` para verificar datas
     reais
   - NUNCA invente datas como "2024-12-20" ou "2025-01-15" sem verificar commits
   - SEMPRE consulte o histórico Git antes de adicionar entradas ao CHANGELOG

### **📁 ESTRUTURA DA DOCUMENTAÇÃO (ATUALIZADA - JAN 2025)**

```
📁 docs/                          # CONSULTAR SEMPRE PRIMEIRO
├── 📄 README.md                  # Índice geral da documentação
├── 📁 getting-started/           # Setup, desenvolvimento, deploy
│   ├── 📄 installation.md       # Setup inicial + compatibilidade CRÍTICA
│   ├── 📄 development.md        # Padrões de desenvolvimento OBRIGATÓRIOS
│   ├── 📄 deployment.md         # Deploy e produção
│   └── 📄 troubleshooting.md    # Soluções de problemas + compatibilidade
├── 📁 architecture/              # Arquitetura técnica
│   ├── 📄 overview.md           # Stack + arquitetura COMPLETA
│   ├── 📄 api.md                # Documentação das APIs
│   └── 📄 security.md           # Aspectos de segurança
├── 📁 features/                  # Funcionalidades específicas
│   ├── 📄 admin-system.md       # Sistema admin COMPLETO
│   ├── 📄 design-system.md      # Identidade visual + componentes
│   └── 📄 autocomplete-search.md # 🆕 Sistema de busca autocomplete
├── 📁 guides/                    # Guias específicos
│   ├── 📄 storybook.md          # Documentação Storybook
│   ├── 📄 accessibility.md      # Melhorias de acessibilidade
│   └── 📄 scroll-reveal.md      # Sistema scroll reveal
├── 📁 references/                # Referências técnicas
│   └── 📄 dependencies.md       # Compatibilidade dependências CRÍTICA
└── 📁 internal/                  # Documentação interna
    ├── 📄 cursor-setup.md       # Setup específico Cursor
    ├── 📄 project-decisions.md  # Decisões arquiteturais
    └── 📄 tools.md              # Ferramentas internas
```

---

## 🎯 **CONTEXTO DO PROJETO GB-LOCAÇÕES**

**GB-Locações** é uma plataforma moderna de locação de equipamentos para
construção civil, desenvolvida com Next.js 15, TypeScript, Prisma, PostgreSQL e
design system robusto.

### **🏛️ Stack Tecnológico Principal**

- **Framework**: Next.js 15.4.6 (App Router)
- **Linguagem**: TypeScript 5.9.2
- **UI**: React 19.1.1 + Tailwind CSS 3.4.17
- **Database**: PostgreSQL + Prisma
- **Auth**: NextAuth.js 4.24.11
- **State**: Zustand 5.0.7 + React Hook Form 7.62.0
- **Testing**: Vitest + Testing Library + Playwright
- **Design System**: Storybook 9.1.1 + Radix UI

### **⚠️ COMPATIBILIDADES CRÍTICAS & PROBLEMAS CONHECIDOS**

> **OBRIGATÓRIO**: Consulte `docs/references/dependencies.md` antes de atualizar
> dependências

#### **🚨 PROBLEMAS CRÍTICOS RESOLVIDOS (DEZ 2024 - JAN 2025)**

- **Prisma**: Versão estável e funcional
- **Prisma 6.15.0**: Descoberta crítica - variável
  `PRISMA_GENERATE_DATAPROXY="false"` força `engine=none` causando erro P6001
- **Tailwind**: Manter em 3.4.17 (usuário prefere versão atual)
- **PNPM**: Recomendado NPM (PNPM causa conflitos com Prisma)
- **Build failing**: Script `scripts/post-prisma-generate.js` criado para
  resolver conflito do Prisma deletar `lib/validations/index.ts`
- **TypeScript errors**: 42 erros resolvidos com tipos específicos e safe
  navigation
- **ESLint overwhelming**: 31,469 problemas resolvidos com ignore patterns e
  automation
- **swagger-ui-react**: Removido por incompatibilidade React 19, substituído por
  implementação custom
- **node-domexception deprecated**: Override com `npm:@types/node@*`
  implementado

---

## 🧠 **FLUXO DE TRABALHO OBRIGATÓRIO**

### **📖 Antes de Implementar QUALQUER Funcionalidade:**

```
1. 📚 LER docs/architecture/overview.md (arquitetura)
   ↓
2. 📚 LER docs/features/design-system.md (componentes)
   ↓
3. 📚 LER docs/getting-started/development.md (padrões)
   ↓
4. 🔍 VERIFICAR docs/references/dependencies.md (compatibilidade)
   ↓
5. 🎨 USAR apenas componentes documentados
   ↓
6. 🏗️ IMPLEMENTAR seguindo padrões estabelecidos
   ↓
7. 📝 ATUALIZAR CHANGELOG.md com as mudanças
   ↓
8. ✅ TESTAR com referência na documentação
```

### **🎨 Design System - REGRAS OBRIGATÓRIAS**

1. **Use APENAS** componentes de `components/ui/` (baseados em Radix UI)
2. **Consulte** `stories/` para ver componentes visuais no Storybook
3. **Cores**: Orange-600 (#ea580c) como cor primária da marca
4. **Tipografia**: Inter (sans) + Jost (headings)
5. **Não invente** novos componentes sem consultar design system

### **📱 Responsive Design**

- **Mobile-first**: Sempre comece com estilos mobile
- **Breakpoints**: sm: 640px, md: 768px, lg: 1024px, xl: 1280px
- **Teste**: Em dispositivos reais sempre

---

## 🏗️ **PADRÕES DE ARQUITETURA**

### **📁 Estrutura de Diretórios**

```
GB-Locacoes/
├── app/                    # App Router (Next.js 15)
│   ├── admin/             # Área administrativa
│   ├── api/               # API Routes
│   └── (public)/          # Rotas públicas
├── components/            # Componentes React
│   ├── ui/               # Componentes base (Radix UI) ← USAR SEMPRE
│   └── (feature)/        # Componentes específicos
├── lib/                  # Utilitários e configurações
├── hooks/                # Custom hooks
├── types/                # Definições TypeScript
├── schemas/              # Schemas de validação (Zod)
├── prisma/               # Schema e migrações
├── stories/              # Storybook stories ← CONSULTAR SEMPRE
├── design-tokens/        # Sistema de design tokens
└── tests/                # Testes
```

### **⚙️ Padrões de Desenvolvimento**

#### **TypeScript (Obrigatório)**

- **Strict Mode**: Sempre habilitado
- **Não use**: `any` (preferir tipos específicos)
- **Interfaces**: Para objetos, `types` para unions
- **Validação**: Sempre use Zod para schemas

#### **React Patterns**

- **Hooks**: Custom hooks para lógica reutilizável
- **ForwardRef**: Para componentes que precisam de ref
- **Formulários**: SEMPRE React Hook Form + Zod

#### **Nomenclatura**

- **Componentes**: PascalCase (`EquipmentCard.tsx`)
- **Hooks**: camelCase com `use` (`useQuoteForm.ts`)
- **Utilitários**: camelCase (`formatCurrency.ts`)
- **Constantes**: UPPER_SNAKE_CASE (`API_ENDPOINTS`)

---

## 🎨 **SISTEMA DE DESIGN - GUIA RÁPIDO**

### **🎨 Paleta de Cores**

```css
/* Cores Primárias */
--orange-600: #ea580c; /* Cor principal da marca */
--orange-500: #f97316; /* Hover states */
--orange-700: #c2410c; /* Active states */

/* Cores Neutras */
--slate-50: #f8fafc; /* Background claro */
--slate-800: #1e293b; /* Texto principal */
--slate-600: #475569; /* Texto secundário */
```

### **📝 Componentes Base (USAR SEMPRE)**

```tsx
// Componentes principais em components/ui/
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
// ... outros componentes documentados
```

### **🎭 Animações (Framer Motion)**

```tsx
// Padrão de entrada
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
```

---

## 🔐 **SISTEMA ADMINISTRATIVO**

### **🚀 Template Base para Páginas Admin**

> Consulte `docs/features/admin-system.md` para template completo

```tsx
"use client"

import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { AdminCard } from "@/components/admin/admin-card"
import { motion } from "framer-motion"

export default function NovaPaginaAdmin() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto space-y-6 p-6">
        <AdminPageHeader
          title="Título da Página"
          subtitle="Subtítulo explicativo"
          icon={<Package className="w-8 h-8" />}
        />

        <AdminCard title="Conteúdo">{/* Seu conteúdo aqui */}</AdminCard>
      </div>
    </div>
  )
}
```

### **🎨 Header Obrigatório Admin**

```tsx
// SEMPRE use este padrão para páginas admin
<div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl">
  {/* Gradientes de fundo */}
  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/6 to-orange-700/8"></div>

  <div className="relative z-10">{/* Conteúdo do header */}</div>
</div>
```

---

## 🧪 **TESTES - ESTRATÉGIA OBRIGATÓRIA**

### **🎯 Tipos de Teste**

- **Unit Tests**: Vitest + Testing Library
- **Integration Tests**: API Routes
- **E2E Tests**: Playwright
- **Visual Tests**: Storybook + Chromatic
- **Accessibility Tests**: axe-core

### **🚀 Comandos Principais**

```bash
# Desenvolvimento
pnpm dev                    # Servidor desenvolvimento
pnpm build                  # Build produção
pnpm type-check             # Verificar tipos

# Database
pnpm db:generate           # Gerar cliente Prisma
pnpm db:push               # Push schema
pnpm db:studio             # Prisma Studio

# Testes
pnpm test                  # Testes unitários
pnpm test:e2e              # Testes E2E
pnpm storybook             # Storybook

# Quality
pnpm lint                  # ESLint
pnpm lint:fix              # Auto-fix
pnpm format                # Prettier
```

---

## 📝 **PROTOCOLO DE CHANGELOG OBRIGATÓRIO**

### **🚨 REGRA CRÍTICA**: Toda alteração DEVE ser documentada no `CHANGELOG.md`

### **🗓️ PROTOCOLO DE DATAS - OBRIGATÓRIO**

**⚠️ ERRO CRÍTICO COMETIDO**: Em 22/09/2025, foram inventadas datas falsas no
CHANGELOG, causando perda de histórico real.

**✅ PROTOCOLO CORRETO PARA DATAS:**

1. **SEMPRE verifique datas reais**:

   ```bash
   git log --pretty=format:"%h %ad %s" --date=short -10
   ```

2. **NUNCA invente datas** como:
   - ❌ "2024-12-20" (projeto não existia)
   - ❌ "2025-01-15" (datas inventadas)
   - ❌ Qualquer data sem verificação Git

3. **Use APENAS datas dos commits reais**:
   - ✅ Verificar `git log` antes de adicionar entrada
   - ✅ Usar data do commit atual para mudanças novas
   - ✅ Manter histórico real intacto

4. **Comando para verificar datas atuais**:
   ```bash
   git log --oneline -5  # Últimos 5 commits com datas
   ```

#### **Formato Obrigatório:**

```markdown
## [Data] - Tipo de Mudança

### Added ✨

- Nova funcionalidade implementada
- Novo componente criado

### Changed 🔄

- Funcionalidade existente modificada
- Atualização de dependência

### Fixed 🐛

- Bug corrigido
- Problema de compatibilidade resolvido

### Removed ❌

- Funcionalidade removida
- Código legado eliminado

### Security 🔐

- Vulnerabilidade corrigida
- Melhoria de segurança
```

#### **Exemplos Práticos:**

```markdown
## [2024-12-20] - Atualização Sistema Admin

### Added ✨

- Componente AdminPageHeader para padronização
- Template base para páginas administrativas
- Documentação completa em docs/features/admin-system.md

### Changed 🔄

- Reorganizada estrutura de documentação em docs/
- Atualizado README.md com nova navegação
- Melhorado protocolo anti-alucinação para IAs

### Fixed 🐛

- Corrigido problema de compatibilidade Prisma 6.14.0
- Removidas duplicatas na documentação

### Security 🔐

- Implementado middleware de autenticação admin
- Validação aprimorada com Zod schemas
```

---

## 🚨 **PROTOCOLO ANTI-ALUCINAÇÃO (OBRIGATÓRIO)**

> **⚠️ LEIA PRIMEIRO**: Antes de implementar QUALQUER funcionalidade, siga este
> protocolo EXATO

### **🔍 PROTOCOLO DE VERIFICAÇÃO (OBRIGATÓRIO)**

#### **Antes de criar qualquer componente, SEMPRE perguntar:**

1. **"Este componente já existe?"**
   - ✅ Consulte `docs/internal/seo-optimization-implementation.md`
   - ✅ Verifique `/components/ui/` e `/components/`
   - ✅ Procure por variantes ou similares

2. **"Posso usar um componente existente?"**
   - ✅ `QuoteForm` para qualquer formulário multi-step
   - ✅ `CTAButton` para qualquer botão de ação
   - ✅ `EquipmentCard` para cards de produto
   - ✅ `Breadcrumb` para navegação

3. **"Os dados estruturados já estão implementados?"**
   - ✅ `StructuredData` já tem LocalBusiness + Product + Breadcrumb
   - ✅ `DEFAULT_LOCAL_BUSINESS` já configurado para GB Locações
   - ✅ **NÃO** recriar schemas JSON-LD

#### **📝 CHECKLIST OBRIGATÓRIO ANTES DE CODIFICAR**

- [ ] Li `docs/internal/seo-optimization-implementation.md`
- [ ] Verifiquei se componente similar já existe
- [ ] Confirmei que não há duplicação de funcionalidade
- [ ] Revisei os componentes pré-configurados disponíveis
- [ ] Entendi a arquitetura de CTAs e tracking analytics
- [ ] Verifiquei se structured data já está coberto

### **🛡️ COMPONENTES PRÉ-IMPLEMENTADOS (NÃO RECRIAR)**

| Funcionalidade               | Componente Existente                  | Localização                      |
| ---------------------------- | ------------------------------------- | -------------------------------- |
| **Formulários de orçamento** | `QuoteForm`                           | `components/quote-form.tsx`      |
| **Botões de ação/CTA**       | `CTAButton`, `QuoteCTA`, `ContactCTA` | `components/ui/cta-button.tsx`   |
| **Cards de produto**         | `EquipmentCard` (3 variantes)         | `components/equipment-card.tsx`  |
| **Navegação breadcrumb**     | `Breadcrumb`, `EquipmentBreadcrumb`   | `components/ui/breadcrumb.tsx`   |
| **SEO structured data**      | `StructuredData`                      | `components/structured-data.tsx` |
| **Metadados dinâmicos**      | `generateMetadata()`                  | `app/equipamentos/[id]/page.tsx` |
| **Sitemap**                  | `sitemap.ts`                          | `app/sitemap.ts`                 |
| **Controle de crawling**     | `robots.txt`                          | `public/robots.txt`              |

### **⚠️ PALAVRAS-CHAVE DE ALERTA**

**Se o usuário mencionar estas palavras, SEMPRE consultar componentes existentes
primeiro:**

- **"formulário"** → Use `QuoteForm`
- **"botão"** → Use `CTAButton` ou variantes
- **"card"** → Use `EquipmentCard`
- **"navegação"** → Use `Breadcrumb`
- **"SEO"** → Verifique `StructuredData` e `generateMetadata`
- **"schema"** → Use `StructuredData` existente
- **"orçamento"** → Use `QuoteForm` + `QuoteCTA`
- **"contato"** → Use `ContactCTA` + `QuoteForm`
- **"WhatsApp"** → Use `WhatsAppCTA`

### **❌ NÃO FAÇA (Anti-Padrões Expandidos)**

#### **🚫 Componentes (NÃO RECRIAR):**

1. **❌ NÃO** crie novos formulários → Use `QuoteForm` como base
2. **❌ NÃO** crie botões customizados → Use `CTAButton` system
3. **❌ NÃO** crie cards de produto → Use `EquipmentCard` variantes
4. **❌ NÃO** implemente breadcrumbs → Use `Breadcrumb` component
5. **❌ NÃO** adicione Schema.org manualmente → Use `StructuredData`
6. **❌ NÃO** crie modais de orçamento → Use `QuoteForm` variant modal

#### **🚫 Funcionalidades (NÃO RECRIAR):**

7. **❌ NÃO** implemente tracking analytics → Use `trackingId` do CTAButton
8. **❌ NÃO** crie metadados manuais → Use `generateMetadata` pattern
9. **❌ NÃO** modifique sitemap.xml → É gerado automaticamente
10. **❌ NÃO** altere robots.txt → Já configurado otimamente

#### **🚫 Técnicos (MANTER PADRÕES):**

11. **❌ NÃO** atualize Prisma para 6.14.0+ (quebra build)
12. **❌ NÃO** mude Tailwind CSS (usuário prefere versão atual)
13. **❌ NÃO** use PNPM (causa conflitos, preferir NPM)
14. **❌ NÃO** use `any` em TypeScript → Use tipos específicos
15. **❌ NÃO** use `@ts-ignore` → Use `@ts-expect-error` com descrição
16. **❌ NÃO** delete `scripts/post-prisma-generate.js` (crítico para build)
17. **❌ NÃO** modifique `package.json` scripts sem entender dependências

### **🆘 TROUBLESHOOTING - PROBLEMAS COMUNS**

#### **🚨 "Invalid url postgresql://...": Currently, only Data Proxy supported (P6001)**

- **Causa**: Variável `PRISMA_GENERATE_DATAPROXY="false"` presente no ambiente
  força `engine=none`
- **Problema**: Em JavaScript, `Boolean("false") === true`, então mesmo
  `="false"` ativa Data Proxy mode
- **Solução**: **REMOVER COMPLETAMENTE** a variável do .env - não apenas
  defini-la como "false"
- **Verificação**: `npx prisma generate` deve mostrar `engine=binary`, não
  `engine=none`
- **Detalhes**: Consulte `docs/internal/prisma-6-15-engine-none-analysis.md`

#### **🚨 "Module not found: Can't resolve '@/lib/validations'"**

- **Causa**: Prisma generate deletou o arquivo `lib/validations/index.ts`
- **Solução**: Execute `node scripts/post-prisma-generate.js` ou
  `pnpm db:generate`
- **Prevenção**: Script automático configurado em `package.json`

#### **🚨 "TypeScript errors em massa (42+ erros)"**

- **Causa**: Tipos `unknown`, `any`, navegação insegura em objetos
- **Solução**: Use interfaces específicas, safe navigation (`?.`), type guards
- **Exemplo**: `req.headers?.['content-length']` em vez de
  `req.headers['content-length']`

#### **🚨 "ESLint overwhelming errors (31k+ problemas)"**

- **Causa**: Arquivos auto-gerados do Prisma incluídos no linting
- **Solução**: Adicionar patterns em `eslint.config.js` ignores
- **Já resolvido**: Configuração atualizada exclui `lib/validations/schemas/**`

#### **🚨 "Build failing com 'Did not initialize yet'"**

- **Causa**: PNPM + Next.js 15 + Prisma incompatibilidade
- **Solução**: Use NPM para melhor compatibilidade
- **Memória**: Usuário prefere não downgrade de dependências

#### **🚨 "Swagger UI React errors com React 19"**

- **Causa**: swagger-ui-react não compatível com React 19
- **Solução**: Implementação custom em `app/api-docs/page.tsx`
- **Resultado**: Documentação API sem dependências externas

#### **🚨 "Autocomplete dropdown atrás de outras seções"**

- **Causa**: Z-index insuficiente ou stacking context incorreto
- **Solução**: Container com `z-[9998]`, dropdown com `z-[99999]`, remover
  `overflow-hidden`
- **Prevenção**: Sempre criar novo stacking context com `relative`
- **Detalhes**: Consulte `docs/features/autocomplete-search.md`

#### **🚨 "Input não atualiza após seleção no autocomplete"**

- **Causa**: React batching e timing de eventos com blur
- **Solução**: `useCallback` com `setTimeout`, mudar para `onMouseDown`
- **Força update**: `inputRef.current.value = equipment.name` quando necessário
- **Detalhes**: Consulte `docs/features/autocomplete-search.md`

#### **🚨 "Erro pricePerDay.toFixed is not a function"**

- **Causa**: Prisma retorna Decimal como string/objeto
- **Solução**: `Number(equipment.pricePerDay).toFixed(2)`
- **Prevenção**: Sempre converter Decimal para Number antes de métodos numéricos

### **✅ SEMPRE FAÇA**

1. **✅ SEMPRE** consulte `docs/` antes de implementar
2. **✅ SEMPRE** use componentes de `components/ui/`
3. **✅ SEMPRE** valide com Zod
4. **✅ SEMPRE** use TypeScript estrito
5. **✅ SEMPRE** atualize CHANGELOG.md
6. **✅ SEMPRE** teste responsividade
7. **✅ SEMPRE** siga padrões de nomenclatura
8. **✅ SEMPRE** implemente loading/error states

---

## 🔗 **LINKS RÁPIDOS CRÍTICOS**

| Situação                       | Consulte Primeiro                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------------ |
| **🚀 Começar desenvolvimento** | [`docs/getting-started/installation.md`](docs/getting-started/installation.md)       |
| **🏗️ Entender arquitetura**    | [`docs/architecture/overview.md`](docs/architecture/overview.md)                     |
| **🎨 Usar design system**      | [`docs/features/design-system.md`](docs/features/design-system.md)                   |
| **⚙️ Sistema admin**           | [`docs/features/admin-system.md`](docs/features/admin-system.md)                     |
| **🐛 Problemas/erros**         | [`docs/getting-started/troubleshooting.md`](docs/getting-started/troubleshooting.md) |
| **⚠️ Compatibilidade**         | [`docs/references/dependencies.md`](docs/references/dependencies.md)                 |
| **📖 Navegação completa**      | [`docs/README.md`](docs/README.md)                                                   |
| **🔧 Ferramentas para APIs**   | [`docs/guides/api-documentation-tools.md`](docs/guides/api-documentation-tools.md)   |

---

## 🆕 **RECURSOS IMPLEMENTADOS (JAN 2025)**

### **🎯 Sistema Completo de SEO e Conversão (NOVO - JAN 2025)**

> **⚠️ CRÍTICO**: Consulte `docs/internal/seo-optimization-implementation.md`
> antes de modificar qualquer componente relacionado

- **Status**: ✅ IMPLEMENTADO E 100% FUNCIONAL
- **Impacto**: Zero breaking changes, 100% compatível com código existente
- **Cobertura**: 8 novos componentes + 4 funcionalidades SEO

#### **📦 COMPONENTES IMPLEMENTADOS (NÃO RECRIAR)**

##### **1. StructuredData Component**

- **Localização**: `components/structured-data.tsx`
- **Função**: Gera JSON-LD schemas para SEO
- **Uso**:
  `<StructuredData localBusiness={DEFAULT_LOCAL_BUSINESS} product={productData} />`
- **Schemas**: LocalBusiness, Product, BreadcrumbList
- **⚠️ Dados configurados**: `DEFAULT_LOCAL_BUSINESS` já tem dados da GB
  Locações

##### **2. QuoteForm Component**

- **Localização**: `components/quote-form.tsx`
- **Função**: Formulário multi-step com validação Zod (3 etapas)
- **Uso**: `<QuoteForm prefilledEquipment={{ id, name }} variant="modal" />`
- **Características**: Validação tempo real, animações, loading states
- **⚠️ NÃO criar formulários similares**: Use este componente como base

##### **3. CTAButton System**

- **Localização**: `components/ui/cta-button.tsx`
- **Função**: Sistema completo de botões CTA com analytics
- **Componentes pré-configurados**:
  - `QuoteCTA`: Para orçamentos
  - `ContactCTA`: Para contato
  - `PhoneCTA`: Para chamadas
  - `WhatsAppCTA`: Para WhatsApp
- **Uso**: `<QuoteCTA href="/orcamento" />` ou `<CTAButton trackingId="..." />`
- **⚠️ Tracking automático**: Google Analytics integrado

##### **4. Breadcrumb Component**

- **Localização**: `components/ui/breadcrumb.tsx`
- **Função**: Navegação + Schema.org automático
- **Variantes**: default, minimal, pills
- **Pré-configurados**: `EquipmentBreadcrumb`, `CategoryBreadcrumb`
- **Uso**: `<EquipmentBreadcrumb currentPage={equipment.name} />`
- **⚠️ JSON-LD automático**: Não implementar Schema manualmente

##### **5. EquipmentCard Enhanced**

- **Localização**: `components/equipment-card.tsx` (MELHORADO)
- **Variantes**: default, featured, compact
- **Recursos**: Hover effects, ratings, badges, CTAs otimizados
- **Uso**: `<EquipmentCard equipment={data} variant="featured" />`
- **⚠️ Cards existentes**: Use este em vez de criar novos

#### **🔍 FUNCIONALIDADES SEO (IMPLEMENTADAS)**

##### **1. Metadados Dinâmicos**

- **Localização**: `app/equipamentos/[id]/page.tsx`
- **Função**: `generateMetadata()` completa com Open Graph + Twitter Cards
- **⚠️ Padrão estabelecido**: "Aluguel de [Nome] em Porto Alegre | GB Locações"

##### **2. Sitemap Dinâmico**

- **Localização**: `app/sitemap.ts`
- **Função**: Gera sitemap.xml com todas URLs + prioridades
- **⚠️ Auto-atualização**: Inclui equipamentos disponíveis automaticamente

##### **3. Robots.txt Otimizado**

- **Localização**: `public/robots.txt`
- **Função**: Controle de crawling + link para sitemap
- **⚠️ Configurado**: Bloqueia admin/api, permite equipamentos

##### **4. Schema.org Completo**

- **Implementado via**: StructuredData component
- **Schemas ativos**: LocalBusiness, Product, BreadcrumbList
- **⚠️ Dados configurados**: GB Locações pré-configurada

### **🔍 Autocomplete Search Bar (IMPLEMENTADO - JAN 2025)**

- **Status**: ✅ IMPLEMENTADO E FUNCIONAL
- **Localização**: `components/ui/autocomplete.tsx`
- **Integração**: Hero section da homepage
- **Características**:
  - 🔍 Busca em tempo real com debounce de 300ms
  - ⌨️ Navegação completa por teclado (setas, Enter, Escape)
  - 🖱️ Seleção por click com atualização correta do input
  - 🎯 Redirecionamento inteligente (item → detalhes, texto → busca)
  - 💚 Feedback visual com ring verde para seleção válida
  - ⚡ Loading state com spinner durante buscas
  - ♿ 100% acessível com ARIA labels corretos
  - 📱 Totalmente responsivo
- **API Endpoint**: `/api/equipamentos/search`
  - Busca por nome e descrição
  - Filtro por equipamentos disponíveis
  - Limite de 8 resultados
  - Ordenação alfabética
- **Documentação Completa**: `docs/features/autocomplete-search.md`

### **📊 Dashboard de Analytics (`/admin/analytics`)**

- **Status**: ✅ IMPLEMENTADO E FUNCIONAL
- **Localização**: `app/admin/analytics/page.tsx`
- **Características**:
  - 📈 Métricas de API em tempo real
  - 🔍 Monitoramento de performance
  - 🚨 Detecção de anomalias
  - 📊 Gráficos interativos com Recharts
  - 🎨 Design system consistente com identidade visual
  - 📱 Totalmente responsivo
  - ⚡ Auto-refresh configurável
  - 🔄 Animações suaves com Framer Motion

### **🔧 Sistema de Telemetria e Métricas**

- **Arquivos Principais**:
  - `lib/telemetry.ts` - Sistema de rastreamento simplificado
  - `lib/metrics.ts` - Coleta e análise de métricas API
  - `lib/security-monitoring.ts` - Monitoramento de segurança
  - `lib/api-instrumentation.ts` - Instrumentação automática
- **Funcionalidades**:
  - 📊 Coleta automática de métricas de performance
  - 🔒 Detecção de ameaças de segurança
  - 📈 Analytics de uso da API
  - ⚡ Rastreamento de response time
  - 🚨 Alertas de anomalias
  - 📝 Logs estruturados

### **📋 Documentação Automática de API**

- **OpenAPI/Swagger**: `/api-docs` - Interface interativa
- **Endpoints Documentados**: 19 rotas completas
- **Schemas Zod**: Integração com validação
- **Contract Testing**: Testes automatizados de contrato

### **🛠️ Melhorias de Code Quality**

- **TypeScript**: ~90% redução de warnings `any`
- **ESLint**: Correção massiva de warnings
- **Type Safety**: Tipos mais seguros e específicos
- **Error Handling**: Tratamento robusto de erros

---

## 🎯 **OBJETIVO FINAL**

Criar código que seja:

- **📖 Documentado**: Baseado na documentação oficial
- **🎨 Consistente**: Seguindo design system estabelecido
- **🔒 Seguro**: Com validações e autenticação adequadas
- **⚡ Performático**: Otimizado para velocidade
- **♿ Acessível**: Inclusivo para todos usuários
- **🧪 Testado**: Coberto por testes adequados
- **📝 Rastreável**: Com mudanças documentadas no CHANGELOG

---

**🧠 LEMBRE-SE**: Este projeto tem padrões estabelecidos, documentação
profissional e compatibilidades específicas. NUNCA alucine - sempre consulte a
documentação primeiro!

---

_Última atualização: janeiro 2025 | Versão: 2.1_
