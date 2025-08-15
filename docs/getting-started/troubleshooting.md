# 🔧 Solução de Problemas - GB Locações

> **Guia completo para resolver problemas comuns no desenvolvimento e produção**

## 📋 Índice

- [🚨 Problemas Críticos](#-problemas-críticos)
- [🗄️ Problemas do Prisma](#️-problemas-do-prisma)
- [⚡ Problemas de Build](#-problemas-de-build)
- [🐛 Problemas de Desenvolvimento](#-problemas-de-desenvolvimento)
- [🚀 Problemas de Deploy](#-problemas-de-deploy)
- [🔧 Ferramentas de Diagnóstico](#-ferramentas-de-diagnóstico)

---

## 🚨 Problemas Críticos

### **❌ CRÍTICO: Prisma 6.14.0 + Next.js 15.4.6 Incompatibilidade**

#### **Problema:**

```bash
Error: @prisma/client did not initialize yet.
Please run "prisma generate" and try to import it again.
```

#### **Solução OBRIGATÓRIA:**

```bash
# ❌ NÃO ATUALIZAR para 6.14.0
# ✅ MANTER na versão estável
pnpm add @prisma/client@6.13.0 prisma@6.13.0

# Regenerar cliente
pnpm db:generate

# Verificar se funciona
pnpm run build
```

#### **Prevenção:**

```bash
# SEMPRE testar build após atualizar Prisma
pnpm update @prisma/client prisma
pnpm run build  # <- CRÍTICO: Este passo detecta problemas

# Se build falhar, reverter imediatamente
pnpm add @prisma/client@6.13.0 prisma@6.13.0
```

### **❌ CRÍTICO: Tailwind CSS 4.x Breaking Changes**

#### **Problema:**

- Classes CSS não reconhecidas
- Design System quebrado
- Componentes com estilo quebrado

#### **Solução:**

```bash
# ❌ NÃO ATUALIZAR para 4.x
# ✅ MANTER em 3.4.17
pnpm add tailwindcss@3.4.17

# Verificar build
pnpm run build
```

---

## 🗄️ Problemas do Prisma

### **1. Erro: "Module '@prisma/client' has no exported member 'PrismaClient'"**

#### **Causa:**

Cliente do Prisma não foi gerado ou está desatualizado.

#### **Solução Rápida:**

```bash
# Gerar o cliente do Prisma
pnpm db:generate

# Verificar se está funcionando
pnpm check:prisma
```

#### **Solução Completa:**

```bash
# 1. Limpar cache e reinstalar dependências
rm -rf node_modules
pnpm install

# 2. Gerar cliente do Prisma
pnpm db:generate

# 3. Verificar funcionamento
pnpm check:prisma

# 4. Testar build
pnpm build
```

### **2. Erro: "EPERM operation not permitted" (Windows)**

#### **Problema:**

Erro de permissão ao gerar cliente Prisma no Windows.

#### **Solução:**

```bash
# PowerShell
taskkill /f /im node.exe 2>$null
Start-Sleep -Seconds 2
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue node_modules\.prisma
pnpm db:generate
```

### **3. Erro: "Can't reach database server"**

#### **Causa:**

Problemas de conexão com banco de dados.

#### **Solução:**

```bash
# 1. Verificar variáveis de ambiente
echo $DATABASE_URL

# 2. Testar conexão
pnpm db:studio

# 3. Verificar se banco está rodando (local)
sudo systemctl status postgresql

# 4. Resetar conexão
pnpm db:push
```

### **4. Imports Dinâmicos (Solução para Vercel)**

#### **Problema:**

Erro "did not initialize yet" em produção.

#### **Solução - Usar Imports Dinâmicos:**

```typescript
// ❌ ERRO - Import estático
import { prisma } from "@/lib/prisma"

// ✅ CORRETO - Import dinâmico
export async function GET() {
  try {
    const { prisma } = await import("@/lib/prisma")
    await prisma.$connect()

    // Sua lógica aqui...
  } catch (error) {
    console.error("Database error:", error)
  }
}
```

---

## ⚡ Problemas de Build

### **1. Build Timeout**

#### **Problema:**

Build excede tempo limite.

#### **Solução:**

```bash
# Aumentar memory limit
NODE_OPTIONS="--max-old-space-size=4096" pnpm build

# Otimizar build
pnpm run build --verbose
```

### **2. TypeScript Errors**

#### **Problema:**

Erros de tipo bloqueando build.

#### **Solução:**

```bash
# Verificar erros específicos
pnpm type-check

# Corrigir erros mais comuns
pnpm fix:typescript

# Build com type checking
pnpm build
```

### **3. ESLint Errors**

#### **Problema:**

Warnings/erros de linting bloqueando build.

#### **Solução:**

```bash
# Verificar erros
pnpm lint

# Auto-fix quando possível
pnpm lint:fix

# Verificar qualidade geral
pnpm quality:check
pnpm quality:fix
```

---

## 🐛 Problemas de Desenvolvimento

### **1. PNPM vs NPM Conflicts**

#### **Problema:**

Conflitos entre package managers.

#### **Solução:**

```bash
# Limpar completamente
rm -rf node_modules package-lock.json yarn.lock

# Usar APENAS PNPM
pnpm install

# Verificar lockfile
ls -la pnpm-lock.yaml
```

### **2. Hot Reload Não Funciona**

#### **Problema:**

Changes não são detectadas em desenvolvimento.

#### **Solução:**

```bash
# Verificar se está usando Turbopack
pnpm dev  # Já configurado com --turbopack

# Alternativa sem Turbopack
next dev

# Verificar arquivos sendo watched
echo "Número de arquivos: $(find . -name '*.tsx' -o -name '*.ts' | wc -l)"
```

### **3. Environment Variables Não Carregam**

#### **Problema:**

Variáveis de ambiente não disponíveis.

#### **Solução:**

```bash
# Verificar arquivo existe
ls -la .env*

# Verificar sintaxe (sem espaços extras)
cat .env.local | grep "="

# Reiniciar dev server
pnpm dev
```

### **4. Storybook Issues**

#### **Problema:**

Storybook não inicia ou components quebrados.

#### **Solução:**

```bash
# Limpar cache do Storybook
rm -rf .storybook-static

# Reinstalar dependências
pnpm install

# Iniciar Storybook
pnpm storybook

# Debug mode
pnpm storybook --debug
```

---

## 🚀 Problemas de Deploy

### **1. Vercel Build Fails**

#### **Problema:**

Deploy falha na Vercel.

#### **Solução:**

```bash
# Verificar localmente primeiro
pnpm build

# Verificar dependências específicas da Vercel
pnpm add @vercel/node

# Verificar vercel.json
cat vercel.json
```

### **2. Environment Variables em Produção**

#### **Problema:**

Variáveis não disponíveis em produção.

#### **Solução:**

1. Verificar painel da Vercel
2. Copiar EXATAMENTE como no .env.local
3. Redeploy após mudanças
4. Verificar logs:

```bash
# Verificar logs da Vercel
vercel logs [deployment-url]
```

### **3. Database Connection em Produção**

#### **Problema:**

Não consegue conectar com banco em produção.

#### **Solução:**

```bash
# Verificar URLs de produção
echo $DATABASE_URL
echo $DIRECT_URL

# Verificar se Supabase está configurado corretamente
# Painel Supabase > Settings > Database > Connection string

# Teste de health check
curl https://your-domain.com/api/health
```

---

## 🔧 Ferramentas de Diagnóstico

### **Comandos de Verificação**

```bash
# ✅ Verificação completa do sistema
pnpm check:compatibility     # Dependências
pnpm check:prisma           # Banco de dados
pnpm type-check             # TypeScript
pnpm lint                   # Code quality
pnpm test                   # Testes
pnpm build                  # Build

# 🔍 Diagnóstico específico
pnpm ci:full                # CI completo
pnpm verify:after-update    # Após atualizações
```

### **Scripts de Debug**

```bash
# Debug de dependências
pnpm list --depth=0         # Dependências top-level
pnpm why [package]          # Por que package está instalado
pnpm outdated               # Dependências desatualizadas

# Debug de build
pnpm build --verbose        # Build detalhado
next build --debug          # Next.js debug mode

# Debug de banco
pnpm db:studio             # Interface do banco
pnpm db:push --force-reset  # Reset do schema
```

### **Logs e Monitoramento**

```typescript
// Debug logging em desenvolvimento
if (process.env.NODE_ENV === "development") {
  console.log("Debug info:", {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL?.substring(0, 20) + "...",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL
  })
}

// Structured logging em produção
import { logger } from "@/lib/logger"

logger.error("API Error", {
  error: error.message,
  stack: error.stack,
  url: request.url,
  method: request.method
})
```

---

## 🆘 Quando Buscar Ajuda

### **Informações para Incluir**

1. **Versão do Node.js**: `node --version`
2. **Versão do PNPM**: `pnpm --version`
3. **Sistema Operacional**: Windows/Mac/Linux
4. **Erro completo**: Copy/paste do erro
5. **Passos para reproduzir**: Lista detalhada
6. **Arquivos relevantes**: package.json, .env (sem senhas)

### **Onde Buscar Ajuda**

- **GitHub Issues**:
  [GB-Locacoes/issues](https://github.com/GBLocacoes/GB-Locacoes/issues)
- **Documentação**: Links nas referências abaixo
- **Discord da comunidade**: [convite-discord]

---

## 📚 Referências Relacionadas

- **[installation.md](./installation.md)** - Setup inicial
- **[development.md](./development.md)** - Desenvolvimento
- **[deployment.md](./deployment.md)** - Deploy e produção
- **[../guides/prisma.md](../guides/prisma.md)** - Guia completo do Prisma
- **[../references/dependencies.md](../references/dependencies.md)** -
  Compatibilidade

---

_Última atualização: dezembro 2024_

## 🔄 Histórico de Problemas Resolvidos

- **Dec 2024**: Prisma 6.14.0 incompatibilidade identificada e documentada
- **Dec 2024**: Imports dinâmicos implementados para resolver problemas de build
- **Dec 2024**: Script de patch do Prisma criado para Vercel
