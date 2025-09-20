# 🤖 AGENTS.md - Instruções Principais para Agentes de IA

> **ARQUIVO CRÍTICO**: Este é o primeiro arquivo que toda IA deve ler ao
> interagir com o projeto GB-Locações

## 📚 **DOCUMENTAÇÃO COMO FONTE DE VERDADE ABSOLUTA**

### ⚠️ **PROTOCOLO ANTI-ALUCINAÇÃO OBRIGATÓRIO**

1. **🚨 NUNCA ALUCINE**: Se não souber algo, consulte `docs/` PRIMEIRO
2. **📖 LEIA ANTES DE AGIR**: Consulte a documentação antes de implementar
3. **🎯 SIGA OS PADRÕES**: Use apenas componentes e práticas documentadas
4. **📝 DOCUMENTE MUDANÇAS**: SEMPRE atualize o `CHANGELOG.md` após alterações

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
- **Database**: PostgreSQL + Prisma 6.13.0 ⚠️ **NÃO ATUALIZAR** - Ver
  `docs/references/dependencies.md`
- **Auth**: NextAuth.js 4.24.11
- **State**: Zustand 5.0.7 + React Hook Form 7.62.0
- **Testing**: Vitest + Testing Library + Playwright
- **Design System**: Storybook 9.1.1 + Radix UI

### **⚠️ COMPATIBILIDADES CRÍTICAS & PROBLEMAS CONHECIDOS**

> **OBRIGATÓRIO**: Consulte `docs/references/dependencies.md` antes de atualizar
> dependências

#### **🚨 PROBLEMAS CRÍTICOS RESOLVIDOS (DEZ 2024 - JAN 2025)**

- **Prisma**: Manter em 6.13.0 (6.14.0+ causa erro "did not initialize yet")
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

## 🚨 **ALERTAS CRÍTICOS PARA IAs**

### **❌ NÃO FAÇA (Anti-Padrões)**

1. **❌ NÃO** atualize Prisma para 6.14.0+ (quebra build)
2. **❌ NÃO** mude Tailwind CSS (usuário prefere versão atual)
3. **❌ NÃO** use PNPM (causa conflitos, preferir NPM)
4. **❌ NÃO** crie componentes fora do design system
5. **❌ NÃO** ignore o protocolo de CHANGELOG
6. **❌ NÃO** modifique animações/responsividade existentes
7. **❌ NÃO** use `any` em TypeScript
8. **❌ NÃO** implemente sem consultar docs/
9. **❌ NÃO** delete ou modifique `scripts/post-prisma-generate.js` (crítico
   para build)
10. **❌ NÃO** modifique `package.json` scripts de build sem entender
    dependências

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
- **Solução**: Use NPM, mantenha Prisma 6.13.0
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

### **🔍 Autocomplete Search Bar (NOVO - JAN 2025)**

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
