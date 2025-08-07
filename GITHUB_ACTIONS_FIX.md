# 🔧 Correção do GitHub Actions - STORE_PATH

## 🚨 Problema: Erro do STORE_PATH

### **Erro Original**

```
Error: The STORE_PATH environment variable is not set
```

### **Causa**

O comando `pnpm store path --silent` não estava funcionando corretamente no
ambiente do GitHub Actions, causando falha na configuração do cache.

## ✅ Solução Implementada

### **Antes (Problemático)**

```yaml
- name: Get pnpm store directory
  shell: bash
  run: |
    echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV

- name: Setup pnpm cache
  uses: actions/cache@v4
  with:
    path: ${{ env.STORE_PATH }}
    key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
```

### **Depois (Corrigido)**

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: "20"
    cache: "pnpm" # Cache automático do pnpm

- name: Setup pnpm
  uses: pnpm/action-setup@v4
  with:
    version: 10

- name: Install dependencies
  run: pnpm install --frozen-lockfile
```

## 🎯 Benefícios da Correção

### **1. Simplicidade**

- Removida a necessidade de calcular manualmente o STORE_PATH
- Cache automático gerenciado pelo GitHub Actions

### **2. Confiabilidade**

- Não depende de comandos que podem falhar
- Usa a implementação oficial do pnpm

### **3. Performance**

- Cache otimizado automaticamente
- Menos passos no workflow

## 📋 Workflow Final

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  quality:
    name: Tests & Quality
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "pnpm"

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Generate Prisma client
        run: pnpm db:generate

      - name: Check Prisma setup
        run: pnpm check:prisma

      - name: Run linting
        run: pnpm lint

      - name: Run tests
        run: pnpm test

      - name: Type check
        run: pnpm type-check

      - name: Build application
        run: pnpm build
```

## 🔍 Verificação

### **Teste Local**

```bash
# Verificar se o Prisma está funcionando
pnpm ci:prisma-only

# Teste completo
pnpm ci:full
```

### **Teste no GitHub**

- Push para `main` ou `develop`
- Verificar se o workflow roda sem erros
- Confirmar que o cache está funcionando

## 🚀 Comandos Úteis

### **Desenvolvimento**

```bash
# Instalar dependências
pnpm install

# Gerar Prisma
pnpm db:generate

# Verificar Prisma
pnpm check:prisma
```

### **CI/CD**

```bash
# Verificação específica do Prisma
pnpm ci:prisma-only

# Teste completo
pnpm ci:full
```

## 📞 Troubleshooting

### **Se o erro persistir**

1. Verificar se o `pnpm-lock.yaml` está atualizado
2. Limpar cache local: `pnpm store prune`
3. Reinstalar dependências: `rm -rf node_modules && pnpm install`

### **Logs do GitHub Actions**

- Verificar se o cache está sendo usado
- Confirmar que o Prisma está sendo gerado
- Verificar se não há erros de permissão

---

**Status**: ✅ Resolvido **Data**: $(date) **Versão do pnpm**: 10.x
