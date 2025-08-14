# 🔧 Solução de Problemas do Prisma

Este documento contém soluções para problemas comuns do Prisma no projeto
GB-Locacoes.

## 🚨 CRÍTICO: Prisma 6.14.0 + Next.js 15.4.6 Incompatibilidade

### **⚠️ PROBLEMA CONHECIDO**

A versão **Prisma 6.14.0** é **INCOMPATÍVEL** com **Next.js 15.4.6**, causando
erro durante o build:

```bash
Error: @prisma/client did not initialize yet. Please run "prisma generate" and try to import it again.
```

### **✅ SOLUÇÃO OBRIGATÓRIA**

**MANTER PRISMA EM 6.13.0:**

```bash
# ❌ NÃO ATUALIZAR para 6.14.0
# ✅ MANTER na versão estável
pnpm add @prisma/client@6.13.0 prisma@6.13.0

# Regenerar cliente
pnpm db:generate

# Verificar se funciona
pnpm run build
```

### **🔍 Como Detectar o Problema**

```bash
# Se você atualizou o Prisma e o build quebrou:
pnpm run build
# ❌ Erro: "@prisma/client did not initialize yet"

# Verificar versão atual
pnpm list @prisma/client
# Se mostrar 6.14.0, REVERTER para 6.13.0
```

### **🛡️ Prevenção**

```bash
# SEMPRE testar build após atualizar Prisma
pnpm update @prisma/client prisma
pnpm run build  # <- CRÍTICO: Este passo detecta problemas

# Se build falhar, reverter imediatamente
pnpm add @prisma/client@6.13.0 prisma@6.13.0
```

## 🚨 Erro: "Module '@prisma/client' has no exported member 'PrismaClient'"

### **Causa**

O cliente do Prisma não foi gerado ou está desatualizado.

### **Solução Rápida**

```bash
# Gerar o cliente do Prisma
pnpm db:generate

# Verificar se está funcionando
pnpm check:prisma
```

### **Solução Completa**

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

## 🛠️ Scripts Disponíveis

### **Verificação do Prisma**

```bash
# Verifica se o Prisma está configurado corretamente
pnpm check:prisma

# Gera o cliente e verifica
pnpm ci:prisma-only
```

### **Scripts de CI/CD**

```bash
# Teste completo (inclui verificação do Prisma)
pnpm ci:full

# Apenas verificação do Prisma
pnpm ci:prisma-only
```

## 🔄 Configurações Automáticas

### **Hooks Automáticos**

- `postinstall`: Gera o cliente do Prisma automaticamente após `pnpm install`
- `prebuild`: Gera o cliente do Prisma antes do build
- `preci:test`: Verifica o Prisma antes dos testes
- `preci:build`: Verifica o Prisma antes do build

### **GitHub Actions**

O workflow `.github/workflows/ci.yml` inclui:

- Geração automática do cliente do Prisma
- Verificação específica do Prisma
- Cache otimizado para dependências

## 📁 Estrutura de Arquivos

```
GB-Locacoes/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   └── seed.ts               # Dados iniciais
├── lib/
│   └── prisma.ts             # Cliente do Prisma
├── scripts/
│   └── check-prisma.js       # Script de verificação
└── .github/workflows/
    └── ci.yml                # Workflow do CI/CD
```

## 🚀 Comandos Úteis

### **Desenvolvimento**

```bash
# Iniciar desenvolvimento
pnpm dev

# Gerar cliente do Prisma
pnpm db:generate

# Abrir Prisma Studio
pnpm db:studio

# Executar seed
pnpm db:seed
```

### **CI/CD**

```bash
# Verificação completa
pnpm ci:full

# Apenas Prisma
pnpm ci:prisma-only

# Build de produção
pnpm build
```

## 🔍 Diagnóstico

### **Verificar Status do Prisma**

```bash
# Verificar se o schema existe
ls prisma/schema.prisma

# Verificar se o cliente foi gerado
ls node_modules/.prisma/client/index.d.ts

# Testar importação
pnpm check:prisma
```

### **Logs de Erro**

Se houver problemas, verifique:

1. Se o arquivo `.env` existe com `DATABASE_URL`
2. Se o schema do Prisma está válido
3. Se as dependências estão instaladas corretamente

## 🆘 Problemas Comuns

### **Erro: "Cannot find module '@prisma/client'"**

```bash
# Reinstalar dependências
pnpm install

# Gerar cliente
pnpm db:generate
```

### **Erro: "PrismaClient is not a constructor"**

```bash
# Limpar cache
rm -rf node_modules/.prisma

# Regenerar cliente
pnpm db:generate
```

### **Erro: "Database connection failed"**

Verifique:

- Se o `DATABASE_URL` está correto no `.env`
- Se o banco de dados está acessível
- Se as credenciais estão corretas

## 📞 Suporte

Se os problemas persistirem:

1. Execute `pnpm check:prisma` e verifique a saída
2. Verifique os logs do GitHub Actions
3. Consulte a [documentação oficial do Prisma](https://www.prisma.io/docs)
4. Abra uma issue no repositório

---

**⚠️ IMPORTANTE**: MANTER Prisma em **6.13.0** - NÃO atualizar para 6.14.0
devido à incompatibilidade com Next.js 15.4.6

**Última atualização**: Janeiro 2025 | **Versão do Prisma**: 6.13.0 (ESTÁVEL) |
**Versão do Next.js**: 15.4.6
