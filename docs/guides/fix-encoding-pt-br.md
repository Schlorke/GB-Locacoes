# Correção de Encoding UTF-8 em Arquivos

Guia completo de ferramentas e comandos para corrigir problemas de encoding
UTF-8 em arquivos do projeto, especialmente caracteres especiais portugueses e
emojis.

## 🚀 Comandos Disponíveis

### **1. Corrigir CHANGELOG.md (Padrão)**

```bash
pnpm fix:changelog
# ou
pnpm fix:encoding
```

### **2. Corrigir Qualquer Arquivo**

```bash
node scripts/fix-encoding.mjs [caminho/do/arquivo]

# Exemplos:
node scripts/fix-encoding.mjs README.md
node scripts/fix-encoding.mjs docs/guides/meu-guia.md
node scripts/fix-encoding.mjs app/admin/page.tsx
```

## 🔧 Ferramentas Nativas do Sistema

### **Windows PowerShell**

```powershell
# Ler arquivo com encoding UTF-8
Get-Content -Path "CHANGELOG.md" -Encoding UTF8

# Salvar arquivo com encoding UTF-8 (sem BOM)
$content = Get-Content -Path "arquivo.md" -Raw -Encoding UTF8
$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllText("$PWD\arquivo.md", $content, $Utf8NoBomEncoding)
```

### **Linux/Mac (Terminal)**

```bash
# Verificar encoding do arquivo
file -bi CHANGELOG.md

# Converter de ISO-8859-1 para UTF-8
iconv -f ISO-8859-1 -t UTF-8 arquivo.txt -o arquivo_utf8.txt

# Converter in-place (sobrescreve o arquivo)
iconv -f ISO-8859-1 -t UTF-8 arquivo.txt > temp.txt && mv temp.txt arquivo.txt

# Usando recode (se instalado)
recode ISO-8859-1..UTF-8 arquivo.txt
```

## 📦 Ferramentas Externas

### **1. dos2unix / unix2dos**

Converte line endings e ajuda com encoding:

```bash
# Instalar (Linux)
sudo apt install dos2unix

# Instalar (Mac)
brew install dos2unix

# Converter para UTF-8
dos2unix -n input.txt output.txt
```

### **2. enca (Extremely Naive Charset Analyser)**

Detecta e converte automaticamente:

```bash
# Instalar (Linux)
sudo apt install enca

# Detectar encoding
enca arquivo.txt

# Converter para UTF-8
enca -L pt -x UTF-8 arquivo.txt
```

### **3. uchardet**

Detecta encoding de arquivos:

```bash
# Instalar (Linux)
sudo apt install uchardet

# Detectar encoding
uchardet CHANGELOG.md
```

## 🎯 Problemas Comuns e Soluções

### **Caracteres Portugueses Mal Codificados**

| Incorreto | Correto | Descrição          |
| --------- | ------- | ------------------ |
| `├º`      | `ç`     | Cedilha            |
| `├í`      | `á`     | A com acento agudo |
| `├ó`      | `ã`     | A com til          |
| `├®`     | `ê`     | E com circunflexo  |
| `├║`      | `ú`     | U com acento agudo |
| `├│`      | `ó`     | O com acento agudo |
| `├¡`      | `í`     | I com acento agudo |
| `├úo`     | `ão`    | Combinação comum   |
| `ç├úo`    | `ção`   | Terminação comum   |

### **Emojis Mal Codificados**

| Incorreto | Correto |
| --------- | ------- |
| `Ô£à`     | ✅      |
| `ÔØî`     | ❌      |
| `Ô£¿`     | ✨      |
| `­ƒÉø`    | 🐛      |
| `­ƒöä`    | 🔄      |
| `­ƒôª`    | 📦      |

## 🔍 Verificação Visual no VS Code

### **Verificar Encoding do Arquivo**

1. Abra o arquivo no VS Code
2. Olhe no canto inferior direito da janela
3. Clique em "UTF-8" ou "UTF-16" para mudar
4. Selecione "Save with Encoding" → "UTF-8"

### **Extensões Recomendadas**

- **Change String Case** - Ajuda com conversões de texto
- **Code Spell Checker** - Detecta erros de português
- **Portuguese - Code Spell Checker** - Dicionário PT-BR

## 📝 Git e Encoding

### **Configurar Git para UTF-8**

```bash
# Configurar encoding global
git config --global core.quotepath false
git config --global i18n.commitencoding utf-8
git config --global i18n.logoutputencoding utf-8

# Windows: Configurar console UTF-8
chcp 65001
```

### **Verificar Problemas no Git Diff**

```bash
# Ver diff com encoding correto
git diff --word-diff

# Ver diff ignorando mudanças de whitespace
git diff -w
```

## 🛠 Script Personalizado (fix-encoding.mjs)

### **Características**

- ✅ Corrige caracteres portugueses mal codificados
- ✅ Corrige emojis mal codificados
- ✅ Preserva formatação original
- ✅ Salva com UTF-8 (sem BOM)
- ✅ Mostra estatísticas de correções
- ✅ Funciona em qualquer arquivo

### **Como Funciona**

1. Lê o arquivo com encoding UTF-8
2. Aplica mapeamento de substituições
3. Conta e reporta mudanças
4. Salva arquivo corrigido
5. Mostra resumo das correções

## 🚨 Prevenção

### **EditorConfig**

Adicione ao `.editorconfig`:

```ini
[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
```

### **VS Code Settings**

Adicione ao `.vscode/settings.json`:

```json
{
  "files.encoding": "utf8",
  "files.autoGuessEncoding": false,
  "files.eol": "\n"
}
```

### **Git Attributes**

Adicione ao `.gitattributes`:

```
* text=auto eol=lf
*.{md,txt,json,js,ts,tsx,jsx,css,scss} text eol=lf
```

## 📚 Referências

- [UTF-8 Encoding Guide](https://www.utf8-chartable.de/)
- [Character Encoding Issues](https://en.wikipedia.org/wiki/Character_encoding)
- [Git Encoding Configuration](https://git-scm.com/docs/git-config#Documentation/git-config.txt-i18ncommitEncoding)
- [VS Code Encoding](https://code.visualstudio.com/docs/editor/codebasics#_file-encoding-support)

## 💡 Dicas

1. **Sempre use UTF-8** sem BOM para arquivos de código
2. **Configure seu editor** para salvar em UTF-8 por padrão
3. **Use o script** `fix-encoding.mjs` após cada merge problemático
4. **Verifique o encoding** antes de commitar arquivos com caracteres especiais
5. **Mantenha consistência** usando `.editorconfig` e `.gitattributes`

---

**Última atualização**: 31/10/2025
