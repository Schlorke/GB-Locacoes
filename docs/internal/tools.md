# 🛠️ Ferramentas de Formatação Markdown

Este guia explica como usar as ferramentas automatizadas para corrigir warnings
de formatação em arquivos Markdown.

## 🚀 Comandos Disponíveis

### Formatação com Prettier

```bash
# Formatar todos os arquivos .md
pnpm format:md

# Verificar formatação sem alterar
pnpm format:md:check
```

### Linting com markdownlint

```bash
# Verificar problemas de formatação
pnpm lint:md

# Corrigir automaticamente problemas
pnpm lint:md:fix
```

### Comando Completo (Recomendado)

```bash
# Executar Prettier + markdownlint automaticamente
pnpm fix:md
```

### Comandos de Qualidade Geral

```bash
# Verificar qualidade de todo o projeto
pnpm quality:check

# Corrigir automaticamente todos os problemas
pnpm quality:fix
```

## 📋 Problemas Corrigidos Automaticamente

### ✅ Prettier

- **Espaços extras** no final das linhas
- **Quebras de linha** inconsistentes
- **Indentação** de listas
- **Blocos de código** mal formatados
- **Largura de linha** (80 caracteres)
- **Aspas** e pontuação

### ✅ markdownlint

- **Trailing spaces** (espaços no final)
- **Line length** (comprimento de linha)
- **List markers** (marcadores de lista)
- **Heading structure** (estrutura de títulos)
- **Code blocks** (blocos de código)
- **Links** mal formatados

## 🔧 Configuração

### Prettier (.prettierrc)

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "proseWrap": "always",
  "overrides": [
    {
      "files": "*.md",
      "options": {
        "proseWrap": "always",
        "printWidth": 80,
        "tabWidth": 2,
        "useTabs": false,
        "semi": false,
        "singleQuote": false,
        "trailingComma": "none"
      }
    }
  ]
}
```

### markdownlint (.markdownlint.json)

```json
{
  "default": true,
  "MD013": false,
  "MD033": false,
  "MD041": false
}
```

## 🎯 Workflow Recomendado

### 1. **Antes de Commitar**

```bash
# Corrigir todos os problemas de Markdown
pnpm fix:md

# Verificar se não há problemas restantes
pnpm lint:md
```

### 2. **Verificação Completa de Qualidade**

```bash
# Verificar formatação, linting e Markdown
pnpm quality:check

# Corrigir automaticamente todos os problemas
pnpm quality:fix
```

### 3. **No CI/CD**

```bash
# Verificar formatação
pnpm format:md:check

# Verificar linting
pnpm lint:md
```

### 4. **Desenvolvimento Diário**

```bash
# Formatar arquivo específico
pnpm prettier --write docs/meu-arquivo.md

# Verificar arquivo específico
pnpm markdownlint docs/meu-arquivo.md
```

## 🔄 Integração com Editores

### VS Code

Instale as extensões:

- **Prettier - Code formatter**
- **markdownlint**

Configure o VS Code para formatar automaticamente:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### Outros Editores

- **WebStorm**: Suporte nativo ao Prettier
- **Sublime Text**: Plugin Prettier
- **Atom**: Package prettier-atom

## 🚨 Troubleshooting

### Problemas Comuns

1. **Prettier não formata Markdown**
   - Verifique se o arquivo `.prettierrc` está na raiz
   - Confirme que o `proseWrap` está configurado

2. **markdownlint muito restritivo**
   - Ajuste as regras no `.markdownlint.json`
   - Desabilite regras específicas se necessário

3. **Conflitos entre ferramentas**
   - Execute `pnpm fix:md` para usar ambas
   - Prettier primeiro, depois markdownlint

4. **ESLint com erros em scripts**
   - Arquivos `.cjs` e `.js` em `/scripts/` são ignorados automaticamente
   - Use `pnpm quality:check` para verificar apenas arquivos relevantes

### Comandos de Debug

```bash
# Ver configuração do Prettier
pnpm prettier --find-config-path docs/accessibility-improvements.md

# Ver regras do markdownlint
pnpm markdownlint --help

# Verificar versões
pnpm list prettier markdownlint

# Verificar qualidade completa
pnpm quality:check
```

## 📚 Recursos Adicionais

- [Prettier Documentation](https://prettier.io/docs/en/)
- [markdownlint Rules](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md)
- [VS Code Markdown Guide](https://code.visualstudio.com/docs/languages/markdown)

---

**💡 Dica**: Use `pnpm fix:md` sempre que quiser corrigir todos os problemas de
formatação de Markdown de uma vez!

**🎯 Dica Avançada**: Use `pnpm quality:fix` para corrigir automaticamente todos
os problemas de formatação, linting e Markdown do projeto!
