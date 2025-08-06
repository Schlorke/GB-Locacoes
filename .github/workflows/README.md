# 🔄 GitHub Actions Workflows

Este diretório contém os workflows de CI/CD para o projeto GB-Locacoes.

## 📋 Workflows Disponíveis

### 1. **CI/CD Pipeline** (`ci.yml`)

Workflow principal que executa:

- ✅ **Quality**: Testes, linting e type checking
- ✅ **Storybook**: Build e upload do Storybook
- ✅ **Chromatic**: Publicação automática (apenas em push para main/develop)

### 2. **Tests & Quality** (`test.yml`)

Workflow focado em qualidade de código:

- ✅ Testes unitários
- ✅ Linting (ESLint + Prettier)
- ✅ Type checking
- ✅ Build do Storybook

## 🚀 Scripts Otimizados

### **Para Desenvolvimento:**

```bash
# Testes locais
pnpm ci:test

# Build do Storybook
pnpm ci:build

# Chromatic local
pnpm chromatic
```

### **Para CI/CD:**

```bash
# Chromatic sem falhar em mudanças
pnpm chromatic:ci

# Chromatic aceitando mudanças automaticamente
pnpm chromatic:accept
```

### **Design System:**

```bash
# Build e publish
pnpm design-system:publish

# Linting do design system
pnpm design-system:lint
```

## ⚙️ Configurações

### **Chromatic** (`.chromaticrc.json`)

- `exitZeroOnChanges`: Não falha em mudanças visuais
- `autoAcceptChanges`: Não aceita automaticamente
- `onlyChanged`: Só testa componentes alterados
- `traceChanged`: Rastreia mudanças

### **Secrets Necessários**

- `CHROMATIC_PROJECT_TOKEN`: Token do projeto Chromatic

## 🔧 Troubleshooting

### **Warnings Comuns:**

1. **"ELIFECYCLE Command failed"**: Comportamento normal do Chromatic
2. **"Found X visual changes"**: Mudanças visuais detectadas (esperado)
3. **"Missing project token"**: Configure o secret `CHROMATIC_PROJECT_TOKEN`

### **Soluções:**

- Use `pnpm chromatic:ci` para não falhar em mudanças
- Use `pnpm chromatic:accept` para aceitar mudanças automaticamente
- Configure o token do Chromatic nos secrets do GitHub

## 📊 Status dos Workflows

- ✅ **Quality**: Sempre executa em PRs e pushes
- ✅ **Storybook**: Build em paralelo com testes
- ✅ **Chromatic**: Só em push para main/develop
- ✅ **Cache**: Otimizado com cache do pnpm
- ✅ **Performance**: Jobs paralelos quando possível
