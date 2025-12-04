# 🔗 Guia de Compatibilidade de Dependências - GB-Locacoes

> **Documentação crítica sobre versões de dependências testadas e
> incompatibilidades conhecidas**

## 📋 Índice

- [🎯 Introdução](#-introdução)
- [🚨 Incompatibilidades Críticas](#-incompatibilidades-críticas)
- [✅ Versões Testadas](#-versões-testadas)
- [🔄 Processo de Atualização](#-processo-de-atualização)
- [🛡️ Estratégias de Prevenção](#️-estratégias-de-prevenção)
- [📚 Histórico de Problemas](#-histórico-de-problemas)

---

## 🎯 Introdução

Este guia documenta **versões de dependências testadas** e **incompatibilidades
conhecidas** no projeto GB-Locacoes. É fundamental seguir estas diretrizes para
evitar quebras no sistema.

### ⚠️ Por que este guia existe?

- **Prisma 6.14.0** quebra o build com Next.js 16.0.3
- **Tailwind CSS 4.x** quebra o design system
- Atualizações "seguras" podem causar problemas inesperados
- Time perdido debuggando problemas de compatibilidade

---

## 🚨 Incompatibilidades Críticas

### **❌ Prisma 6.14.0 + Next.js 16.0.3 (Histórico)**

#### **Problema:**

```bash
Error: @prisma/client did not initialize yet.
Please run "prisma generate" and try to import it again.
```

#### **Solução (migração para Prisma 7):**

- Adicionar `@prisma/adapter-pg`, `pg` e `postgres-array`
- Criar `prisma.config.ts` com `datasource.url = env("DATABASE_URL")` (e
  `shadowDatabaseUrl` opcional)
- Instanciar `PrismaClient` sempre com adapter:

```bash
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = process.env.DATABASE_URL
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) })
```

#### **Status:** ✅ **Migrado** - Projeto usa **Prisma 7.1.0** com driver adapter pg

---

### **❌ Tailwind CSS 4.x + Design System**

#### **Problema:**

- Quebra sistema de design tokens
- Classes CSS não reconhecidas
- Componentes com estilo quebrado

#### **Solução:**

```bash
# ❌ NÃO ATUALIZAR
pnpm update tailwindcss

# ✅ MANTER versão atual
# tailwindcss@3.4.17 (não atualizar)
```

#### **Status:** 🔴 **BLOQUEADOR** - Quebra visual completo

---

## ✅ Versões Testadas

### 🏗️ **Framework Core**

| Dependência    | Versão Estável | Status     | Notas                    |
| -------------- | -------------- | ---------- | ------------------------ |
| **Next.js**    | 16.0.3         | ✅ Estável | App Router funcionando   |
| **React**      | 19.1.1         | ✅ Estável | Sem problemas conhecidos |
| **TypeScript** | 5.9.2          | ✅ Estável | Strict mode habilitado   |

### 🗄️ **Database & ORM**

| Dependência        | Versão Estável | Status       | Notas                                     |
| ------------------ | -------------- | ------------ | ----------------------------------------- |
| **@prisma/client** | **7.1.0**      | ✅ Funcional | ✅ Requer adapter pg + `prisma.config.ts` |
| **prisma**         | **7.1.0**      | ✅ Funcional | ✅ CLI usando `prisma.config.ts`          |

### 🎨 **Styling & UI**

| Dependência                  | Versão Estável | Status     | Notas                      |
| ---------------------------- | -------------- | ---------- | -------------------------- |
| **tailwindcss**              | **3.4.17**     | ✅ Estável | ⚠️ NÃO atualizar para 4.x  |
| **@radix-ui/react-\***       | Latest         | ✅ Seguro  | Pode atualizar normalmente |
| **class-variance-authority** | 0.7.1          | ✅ Estável | Usado no design system     |

### 🧪 **Testing**

| Dependência                   | Versão Estável | Status     | Notas                      |
| ----------------------------- | -------------- | ---------- | -------------------------- |
| **vitest**                    | 3.2.4          | ✅ Estável | Pode atualizar normalmente |
| **@testing-library/jest-dom** | 6.7.0          | ✅ Estável | Atualizada recentemente    |
| **playwright**                | 1.54.2         | ✅ Estável | E2E funcionando            |

### 🔧 **Development Tools**

| Dependência       | Versão Estável | Status     | Notas                         |
| ----------------- | -------------- | ---------- | ----------------------------- |
| **@storybook/\*** | 9.1.2          | ⚠️ Parcial | Warnings de peer dependencies |
| **eslint**        | Latest         | ✅ Seguro  | Pode atualizar normalmente    |
| **prettier**      | Latest         | ✅ Seguro  | Pode atualizar normalmente    |

---

## 🔄 Processo de Atualização

### 📋 **Checklist Pré-Atualização**

```bash
# ✅ 1. Verificar dependências desatualizadas
pnpm outdated

# ✅ 2. Consultar este guia para incompatibilidades
# Verificar se alguma dependência está na lista de bloqueadas

# ✅ 3. Fazer backup da versão atual
git add .
git commit -m "backup: antes da atualização de dependências"
```

### 🎯 **Estratégia por Categorias**

#### **🟢 Categoria 1: SEGURO (pode atualizar)**

```bash
# UI Components (Radix UI)
pnpm update @radix-ui/react-*

# Testing Libraries
pnpm update @testing-library/*

# Development Tools
pnpm update eslint prettier

# Utility Libraries
pnpm update date-fns clsx lucide-react
```

#### **🟡 Categoria 2: CUIDADO (testar build)**

```bash
# State Management
pnpm update zustand

# Forms & Validation
pnpm update react-hook-form zod

# Database/ORM (Prisma 7.x)
pnpm update @prisma/client prisma prisma-zod-generator
# Necessário: @prisma/adapter-pg + prisma.config.ts + rebuild

# SEMPRE testar após estas atualizações
pnpm run build
pnpm test
```

#### **🔴 Categoria 3: BLOQUEADO (NÃO atualizar)**

```bash
# ❌ Styling - VERSÃO FIXA
# tailwindcss@3.4.17

# ❌ Framework Core - APENAS com aprovação
# next@16.0.3
# react@19.1.1
```

### 🔍 **Processo Passo-a-Passo**

```bash
# 1. Atualizar categoria segura
pnpm update @radix-ui/react-accordion @radix-ui/react-dialog
pnpm run build  # ✅ Verificar

# 2. Atualizar categoria cuidado (uma por vez)
pnpm update zustand
pnpm run build  # ✅ Verificar
pnpm test       # ✅ Verificar

# 3. Se algo quebrar, reverter imediatamente
git checkout package.json pnpm-lock.yaml
pnpm install
```

---

## 🛡️ Estratégias de Prevenção

### 🔒 **Lockfile e Versionamento**

```bash
# ✅ Sempre commitar pnpm-lock.yaml
git add pnpm-lock.yaml
git commit -m "fix: lock dependency versions"

# ✅ Usar versões exatas para dependências críticas
# package.json:
{
  "@prisma/client": "7.1.0",  // Versão estável
  "tailwindcss": "3.4.17"     // Exata, não ^3.4.17
}
```

### 🤖 **Automação e CI/CD**

```bash
# ✅ Build test automático no CI
pnpm install
pnpm run build  # Falha se incompatibilidades
pnpm test      # Falha se regressões

# ✅ Dependabot configurado para excluir dependências críticas
# .github/dependabot.yml
ignore:
  - dependency-name: "@prisma/client"
  - dependency-name: "prisma"
  - dependency-name: "tailwindcss"
```

### 📊 **Monitoramento**

```bash
# ✅ Script de verificação de compatibilidade
pnpm type-check

# ✅ Alertas automáticos para atualizações críticas
pnpm outdated | grep -E "(prisma|tailwind|next)"
```

---

## 📚 Histórico de Problemas

### 🗓️ **Janeiro 2025**

#### **Prisma 6.14.0 Incompatibilidade**

- **Data**: Janeiro 2025
- **Problema**: Build falha com erro "client did not initialize yet"
- **Causa**: Mudanças internas no Prisma 6.14.0 incompatíveis com Next.js 16.0.3
- **Solução**: Migração para Prisma 7.1.0 usando `@prisma/adapter-pg` +
  `prisma.config.ts` (URLs saem do schema)
- **Status**: ✅ **Migrado** - Driver adapter ativo (04/12/2025)

#### **Tailwind CSS 4.x Breaking Changes**

- **Data**: Dezembro 2024
- **Problema**: Sistema de design tokens quebrado
- **Causa**: Mudanças na API do Tailwind CSS 4.x
- **Solução**: Manter em 3.4.17 até migração
- **Status**: 🔴 **BLOQUEADO** - Aguardando migração

### 📈 **Lições Aprendidas**

1. **Build testing é crítico** - Sempre testar após atualizações
2. **Atualizações por categoria** - Nunca atualizar tudo junto
3. **Documentação é essencial** - Registrar problemas conhecidos
4. **Reversão rápida** - Ter processo para reverter mudanças

---

## 🔧 Scripts Úteis

### 🎯 **Verificação de Compatibilidade**

```bash
# package.json - Adicionar scripts úteis
{
  "scripts": {
    "check:types": "pnpm type-check",
    "check:outdated": "pnpm outdated | grep -E '(prisma|tailwind|next)'",
    "safe:update": "pnpm update @radix-ui/* @testing-library/*",
    "verify:build": "pnpm run build && pnpm test"
  }
}
```

### 📝 **Script de Verificação**

```javascript
// scripts/check-types.js
const { execSync } = require("child_process")
const fs = require("fs")

const BLOCKED_UPDATES = {
  "@prisma/client": "7.1.0",
  prisma: "latest",
  tailwindcss: "3.4.17"
}

function checkCompatibility() {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"))

  // Verificar versões bloqueadas
  Object.entries(BLOCKED_UPDATES).forEach(([pkg, version]) => {
    const current =
      packageJson.dependencies[pkg] || packageJson.devDependencies[pkg]
    if (current && !current.includes(version)) {
      console.error(
        `❌ ${pkg}: Versão ${current} não é compatível. Use ${version}`
      )
      process.exit(1)
    }
  })

  console.log("✅ Compatibilidade verificada com sucesso!")
}

checkCompatibility()
```

---

## 📞 Suporte e Contato

### 🆘 **Quando algo quebrar:**

1. **Não panic!** 🧘‍♂️
2. **Verificar este guia** 📖
3. **Reverter mudanças** ⏪
4. **Reportar problema** 📝

### 📖 **Documentação Relacionada:**

- **[PRISMA_TROUBLESHOOTING.md](./PRISMA_TROUBLESHOOTING.md)** - Problemas
  específicos do Prisma
- **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)** - Guia geral de
  desenvolvimento
- **[README.md](./README.md)** - Visão geral do projeto

---

**⚠️ LEMBRE-SE**: Sempre testar `pnpm run build` após qualquer atualização!

**Última atualização**: Janeiro 2025 | **Mantenedor**: Equipe GB-Locacoes
