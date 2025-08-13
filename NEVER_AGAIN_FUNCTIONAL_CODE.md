# 🔥 NEVER AGAIN - CÓDIGO FUNCIONAL PROTEGIDO

**AVISO CRÍTICO:** Este arquivo documenta código que **FUNCIONAVA
PERFEITAMENTE** antes de tentativas catastróficas de "otimização".

---

## ✅ CÓDIGO FUNCIONAL - NÃO ALTERAR SEM MOTIVO REAL

### 📁 lib/prisma.ts - VERSÃO QUE FUNCIONA

```typescript
import { PrismaClient } from "@prisma/client"

declare global {
  var __prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"]
  })
}

// Lazy initialization to avoid build-time issues
let _prisma: PrismaClient | undefined

const getPrismaClient = () => {
  if (_prisma) return _prisma

  if (process.env.NODE_ENV === "production") {
    _prisma = new PrismaClient({
      log: ["error"]
    })
  } else {
    if (!globalThis.__prisma) {
      globalThis.__prisma = prismaClientSingleton()
    }
    _prisma = globalThis.__prisma
  }

  return _prisma
}

// Export the client instance
export const prisma = getPrismaClient()
export default getPrismaClient
```

**CARACTERÍSTICAS DESTA VERSÃO:**

- ✅ Importação DIRETA do PrismaClient
- ✅ Singleton pattern SIMPLES
- ✅ Zero eval(), zero lazy loading complexo
- ✅ Funciona em build E runtime
- ✅ Passou em todos os testes

---

## ❌ CÓDIGO PROBLEMÁTICO - NUNCA USAR

### 🚨 VERSÕES QUE QUEBRARAM TUDO:

#### ❌ Versão com eval() (DESASTRE)

```typescript
// NUNCA MAIS USAR ISSO
const createPrismaClient = () => {
  try {
    if (!PrismaClientClass) {
      const prismaModule = eval('require')('@prisma/client') // ← MAL
      PrismaClientClass = prismaModule.PrismaClient
    }
    return new PrismaClientClass(...)
  } catch (error) {
    return createMockPrisma() // ← COMPLEXIDADE DESNECESSÁRIA
  }
}
```

#### ❌ Sistema de Mock Gigantesco (DESASTRE)

```typescript
// NUNCA MAIS CRIAR MOCKS ASSIM
const createMockPrisma = () => ({
  user: {
    /* 100+ linhas de mock */
  },
  equipment: {
    /* 100+ linhas de mock */
  }
  // ... mais 500 linhas de mock desnecessário
})
```

---

## 🛡️ CONFIGURAÇÕES FUNCIONAIS - NÃO ALTERAR

### 📁 next.config.mjs - VERSÃO SIMPLES QUE FUNCIONA

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "picsum.photos"
      }
    ]
  },
  env: {
    CHROMATIC_PROJECT_TOKEN: "chpt_ed7c61c0587a8b0"
  }
}

export default nextConfig
```

**CARACTERÍSTICAS:**

- ✅ Configuração MÍNIMA necessária
- ✅ SEM webpack config para Prisma
- ✅ SEM serverExternalPackages
- ✅ SEM IgnorePlugin desnecessário

### ❌ Versão que quebrou (NUNCA MAIS)

```javascript
// NUNCA MAIS ADICIONAR ISSO
webpack: (config, { isServer, webpack }) => {
  if (isServer) {
    config.externals.push({
      '@prisma/client': 'commonjs @prisma/client', // ← PROBLEMÁTICO
    })
    config.plugins.push(new webpack.IgnorePlugin(...)) // ← DESNECESSÁRIO
  }
  return config
},
serverExternalPackages: ['@prisma/client'], // ← CAUSOU PROBLEMAS
```

---

## 📋 CHECKLIST ANTES DE ALTERAR CÓDIGO FUNCIONAL

### ✅ PERGUNTAS OBRIGATÓRIAS:

1. **❓ O código atual está falhando?**
   - Se **NÃO** → **NÃO ALTERE**

2. **❓ Há erro real reportado por usuários?**
   - Se **NÃO** → **NÃO ALTERE**

3. **❓ O build está falhando?**
   - Se **NÃO** → **NÃO ALTERE**

4. **❓ A produção está quebrada?**
   - Se **NÃO** → **NÃO ALTERE**

5. **❓ A alteração SIMPLIFICA o código?**
   - Se **NÃO** → **NÃO ALTERE**

6. **❓ Você testou completamente a mudança?**
   - Se **NÃO** → **NÃO FAÇA**

### ✅ PROCESSO OBRIGATÓRIO SE PRECISAR ALTERAR:

1. **📝 Documente o MOTIVO REAL**
2. **🔄 Faça backup do código funcional**
3. **🧪 Teste localmente**
4. **🚀 Teste deploy**
5. **✅ Valide em produção**
6. **📋 Documente as mudanças**

---

## 🚨 SINAIS DE ALARME

### ❌ SE VOCÊ ESTIVER PENSANDO EM:

- ❌ "Otimizar" código que já funciona
- ❌ Adicionar `eval()` para qualquer motivo
- ❌ Criar sistemas de mock complexos
- ❌ "Lazy loading" com detecção de build
- ❌ Configurações webpack para resolver Prisma
- ❌ serverExternalPackages para Prisma
- ❌ Remover fallbacks de APIs funcionais

### 🛑 **PARE IMEDIATAMENTE**

Releia este documento e o `DISASTER_RECOVERY_REPORT.md`.

---

## 📊 HISTÓRICO DE COMMITS FUNCIONAIS

### ✅ **COMMIT DOURADO: `585eb94`**

- **Status:** FUNCIONAVA PERFEITAMENTE
- **Build:** ✅ Local e Vercel
- **Deploy:** ✅ Produção estável
- **Características:** Código simples e eficaz

### ❌ **COMMITS PROBLEMÁTICOS (EVITAR):**

- `75f92dc` - Lazy loading com eval()
- `b4f6603` - Remoção de mocks (mas manteve complexidade)
- `9619c4f` - Lazy loading total
- `3edee8f` - Correção "definitiva" que não funcionou

---

## 💡 PRINCÍPIOS FUNDAMENTAIS

### 1. **KISS - Keep It Simple, Stupid**

Código simples é:

- ✅ Mais fácil de debugar
- ✅ Mais fácil de manter
- ✅ Menos propenso a bugs
- ✅ Mais performático

### 2. **DRY - Don't Repeat Yourself**

Mas **NÃO** ao custo de complexidade desnecessária.

### 3. **YAGNI - You Aren't Gonna Need It**

Não adicione funcionalidade até precisar REALMENTE.

### 4. **Se funciona, não mexa**

A regra mais importante de todas.

---

## 🔒 PROTEÇÃO PERMANENTE

Este arquivo serve como **DOCUMENTAÇÃO PERMANENTE** de:

1. **O que funcionava** (para restaurar se necessário)
2. **O que quebrou** (para nunca repetir)
3. **Como prevenir** (checklist e processo)
4. **Por que aconteceu** (lições aprendidas)

---

**Criado em:** 12 de Agosto de 2025  
**Motivo:** Prevenir repetição de desastre com tentativas de "otimização"  
**Status:** DOCUMENTO PERMANENTE - NÃO REMOVER

---

> **LEMBRETE:** Este documento existe porque código funcionando foi quebrado por
> tentativas desnecessárias de "melhoria". Não deixe isso acontecer novamente.
