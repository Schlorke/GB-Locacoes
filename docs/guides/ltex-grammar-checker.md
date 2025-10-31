# LTeX - Correção Gramatical PT-BR no VS Code

Guia completo de instalação e uso do LTeX para correção automática de gramática
em português brasileiro.

## 🚀 Instalação Rápida

### **Método 1: Via Prompt do VS Code (Recomendado)**

Quando você abrir o VS Code, aparecerá um prompt recomendando extensões:

1. Clique em **"Show Recommendations"**
2. Procure por **"LTeX - LanguageTool grammar/spell checking"**
3. Clique em **"Install"**

### **Método 2: Via Marketplace**

1. Abra o VS Code
2. Aperte `Ctrl+Shift+X` (Extensões)
3. Pesquise: **"LTeX"** ou **"valentjn.vscode-ltex"**
4. Clique em **"Install"** na extensão **"LTeX - LanguageTool..."**

### **Método 3: Via Linha de Comando**

```bash
code --install-extension valentjn.vscode-ltex
```

## ⚙️ Configuração Já Aplicada

A configuração já está em `.vscode/settings.json`:

```json
{
  "ltex.language": "pt-BR",
  "ltex.enabled": ["markdown", "plaintext", "mdx"],
  "ltex.checkFrequency": "save",
  "ltex.diagnosticSeverity": "information",
  "ltex.markdown.nodes": {
    "CodeBlock": "ignore",
    "FencedCodeBlock": "ignore",
    "Code": "ignore",
    "Link": "dummy"
  }
}
```

## 🎯 Como Usar

### **Automático**

Depois de instalar, o LTeX funcionará automaticamente:

1. **Abra qualquer arquivo `.md`** (como `CHANGELOG.md`)
2. **Erros gramaticais** aparecerão sublinhados em azul
3. **Clique** na palavra/frase sublinhada
4. **Aperte** `Ctrl+.` (quick fix)
5. **Selecione** a correção sugerida

### **Atalhos Úteis**

| Atalho         | Função                    |
| -------------- | ------------------------- |
| `Ctrl+.`       | Menu de correções rápidas |
| `F8`           | Próximo erro/warning      |
| `Shift+F8`     | Erro/warning anterior     |
| `Ctrl+Shift+M` | Abrir painel de Problems  |

## 🔍 Tipos de Erros Detectados

### **1. Concordância**

```markdown
❌ "Os equipamento está disponível" ✅ "Os equipamentos estão disponíveis"
```

### **2. Crases**

```markdown
❌ "Navegue á direita" ✅ "Navegue à direita"

❌ "À partir de agora" ✅ "A partir de agora"
```

### **3. Acentuação**

```markdown
❌ "Implementação dinamica" ✅ "Implementação dinâmica"
```

### **4. Ortografia**

```markdown
❌ "Corrigido problema de enconding" ✅ "Corrigido problema de encoding"
```

### **5. Vírgulas e Pontuação**

```markdown
❌ "Adicionado novo recurso que funciona perfeitamente e está testado" ✅
"Adicionado novo recurso que funciona perfeitamente e que está testado"
```

## 🎨 Personalizações

### **Adicionar Palavras ao Dicionário**

Quando o LTeX marca uma palavra técnica correta como erro:

1. **Clique** na palavra sublinhada
2. **Aperte** `Ctrl+.`
3. **Selecione** "Add to dictionary"

Ou adicione manualmente em `.vscode/settings.json`:

```json
{
  "ltex.dictionary": {
    "pt-BR": ["Next.js", "TypeScript", "Prisma", "Supabase"]
  }
}
```

### **Desabilitar Regras Específicas**

Se alguma regra do LTeX for muito chata:

```json
{
  "ltex.disabledRules": {
    "pt-BR": ["MORFOLOGIK_RULE_PT_BR", "COMMA_PARENTHESIS_WHITESPACE"]
  }
}
```

### **Habilitar Apenas em Markdown**

```json
{
  "ltex.enabled": ["markdown"]
}
```

## ⚡ Performance

### **Se o LTeX Ficar Lento**

O LTeX pode ser pesado em arquivos grandes. Para otimizar:

```json
{
  // Verificar apenas ao salvar (não em tempo real)
  "ltex.checkFrequency": "save",

  // Ou desabilitar em arquivos grandes
  "ltex.disabled": {
    "maximumFileSize": 100000 // 100KB
  }
}
```

## 🆚 LTeX vs cSpell

| Recurso           | LTeX      | cSpell      |
| ----------------- | --------- | ----------- |
| **Ortografia**    | ✅ Sim    | ✅ Sim      |
| **Gramática**     | ✅✅ SIM  | ❌ Não      |
| **Concordância**  | ✅ Sim    | ❌ Não      |
| **Crase**         | ✅ Sim    | ❌ Não      |
| **Pontuação**     | ✅ Sim    | ❌ Não      |
| **Auto-correção** | ✅ Sim    | ⚠️ Sugestão |
| **PT-BR nativo**  | ✅ Sim    | ⚠️ Limitado |
| **Performance**   | ⚠️ Pesado | ✅ Leve     |

**Recomendação**: Use **ambos**!

- **LTeX**: Para gramática e correções complexas
- **cSpell**: Para ortografia rápida

## 🎯 Fluxo de Trabalho Recomendado

### **Ao Editar CHANGELOG.md**

1. **Escreva** normalmente
2. **Salve** (`Ctrl+S`)
3. **LTeX detecta** erros gramaticais
4. **Aperte** `F8` para ir ao próximo erro
5. **Aperte** `Ctrl+.` para ver correções
6. **Selecione** a correção desejada
7. Repita até eliminar todos os erros

### **Atalhos de Produtividade**

```bash
# 1. Abrir CHANGELOG.md
code CHANGELOG.md

# 2. Ir para próximo erro
F8

# 3. Ver correções
Ctrl+.

# 4. Aceitar primeira sugestão
Enter
```

## 🔥 Comandos Úteis do LTeX

### **Command Palette** (`Ctrl+Shift+P`)

- `LTeX: Check Current Document` - Verificar documento atual
- `LTeX: Check All Documents in Workspace` - Verificar todos os arquivos
- `LTeX: Clear Diagnostics` - Limpar diagnósticos
- `LTeX: Show Status Information` - Ver status do LTeX

## 📝 Integração com Projeto GB-Locações

### **Arquivos que se Beneficiam do LTeX**

- ✅ `CHANGELOG.md` - Correções de histórico
- ✅ `README.md` - Documentação principal
- ✅ `CONTRIBUTING.md` - Guia de contribuição
- ✅ `docs/**/*.md` - Toda documentação
- ✅ `stories/**/*.mdx` - Stories do Storybook

### **Workflow Combinado**

```bash
# 1. Corrigir encoding (se necessário)
pnpm fix:encoding

# 2. Editar arquivo no VS Code com LTeX ativo
code CHANGELOG.md

# 3. Salvar e deixar LTeX sugerir correções
# (use Ctrl+. em cada erro)

# 4. Formatar markdown
pnpm format:md

# 5. Verificar se está tudo OK
pnpm lint:md
```

## 🚨 Troubleshooting

### **LTeX Não Está Funcionando**

1. **Verificar se está instalado**:
   - `Ctrl+Shift+X` → Pesquise "LTeX"
   - Deve aparecer "Installed"

2. **Verificar se está habilitado**:
   - Abra um arquivo `.md`
   - Olhe na barra de status (canto inferior direito)
   - Deve aparecer "LTeX" com ícone verde

3. **Recarregar VS Code**:
   - `Ctrl+Shift+P` → "Reload Window"

### **LTeX Muito Lento**

Configure para verificar apenas ao salvar:

```json
{
  "ltex.checkFrequency": "save"
}
```

### **Muitos Falsos Positivos**

Adicione palavras técnicas ao dicionário:

```json
{
  "ltex.dictionary": {
    "pt-BR": ["Prisma", "Next.js", "TypeScript"]
  }
}
```

## 📚 Links Úteis

- [LTeX no Marketplace](https://marketplace.visualstudio.com/items?itemName=valentjn.vscode-ltex)
- [Documentação Oficial](https://valentjn.github.io/ltex/)
- [LanguageTool.org](https://languagetool.org/pt-BR)
- [GitHub do LTeX](https://github.com/valentjn/vscode-ltex)

---

**Última atualização**: 31/10/2025
