# 🚨 Prisma - Erros Comuns e Soluções

**Versão**: 1.0  
**Última atualização**: 2025-08-28  
**Ambiente**: Windows 11, Node 24+, PNPM 10+, Prisma 6.13.0

## 🔍 Tabela Rápida de Diagnóstico

| Erro                                     | Causa Provável                         | Fix Testado                          | Severidade |
| ---------------------------------------- | -------------------------------------- | ------------------------------------ | ---------- |
| `@prisma/client did not initialize yet`  | Output customizado no generator        | Remover `output = "..."` + regenerar | 🔴 Alta    |
| `P6001: URL must start with 'prisma://'` | Engine=none ativa validação Data Proxy | Corrigir generator client            | 🔴 Alta    |
| `engine=none` na geração                 | Output path incorreto                  | Usar localização padrão              | 🔴 Alta    |
| `EPERM: operation not permitted`         | Windows Defender + Node process        | `taskkill /F /IM node.exe`           | 🟡 Média   |
| `ERR_PNPM_NO_MATCHING_VERSION`           | Versão engines incompatível            | Downgrade para 6.13.0                | 🟡 Média   |
| `Module not found: @prisma/client`       | Geração falhou silenciosamente         | `pnpm prisma generate`               | 🟡 Média   |
| `Type error: PrismaClientOptions`        | Tipagem de log incorreta               | Usar array mutável ou LogDefinition  | 🟢 Baixa   |
| `Cannot read properties of undefined`    | Client não inicializado                | Aguardar geração + imports corretos  | 🟢 Baixa   |

## 🔴 Erros Críticos (Severidade Alta)

### **1. `@prisma/client did not initialize yet`**

**Sintomas**:

```
Error: @prisma/client did not initialize yet. Please run "prisma generate"
at PrismaClient.prisma.<method>
```

**Causa Raiz**:

- Generator client com `output` customizado
- Engine não encontrada na localização esperada
- PNPM module resolution inconsistente

**Solução Testada**:

```prisma
// ❌ Problemático
generator client {
  provider = "prisma-client-js"
  output = "../node_modules/.prisma/client"  // Remove esta linha
}

// ✅ Correto
generator client {
  provider = "prisma-client-js"
}
```

**Comandos**:

```powershell
# 1. Parar todos os processos
taskkill /F /IM node.exe 2>$null

# 2. Limpeza completa
Remove-Item -Recurse -Force node_modules
Remove-Item -Force pnpm-lock.yaml

# 3. Regenerar
pnpm install
pnpm prisma generate

# 4. Verificar
pnpm prisma version  # Deve mostrar "Query Engine (Node-API)"
```

### **2. `P6001: URL must start with 'prisma://'`**

**Sintomas**:

```
Error validating datasource 'db': the URL must start with 'prisma://' or 'prisma+postgres://'
```

**Causa Raiz**:

- Engine=none ativa validação de Data Proxy
- URL postgresql:// rejeitada quando engine não está presente

**Solução Testada**:

```bash
# Verificar se engine foi gerada corretamente
pnpm prisma version
# Se mostrar "engine=none", refazer geração

# Verificar se URL está correta (.env)
echo $env:DATABASE_URL
# Deve ser: postgresql://user:pass@host:port/db
# NÃO deve ser: prisma://...
```

### **3. `engine=none` na Geração**

**Sintomas**:

```
✔ Generated Prisma Client (v6.13.0) to ./node_modules/@prisma/client in 45ms
engine=none
```

**Causa Raiz**:

- Path customizado quebra acoplamento client/engine
- PNPM symlinks não resolvidos corretamente

**Solução Testada**: Mesmo que erro #1 - remover output customizado e regenerar.

## 🟡 Erros Médios (Severidade Média)

### **4. `EPERM: operation not permitted`**

**Sintomas**:

```
EPERM: operation not permitted, rename 'query_engine-windows.dll.node.tmp' -> 'query_engine-windows.dll.node'
```

**Causa Raiz**:

- Windows Defender scanning arquivos
- Processo Node.js com lock no arquivo
- Permissões insuficientes

**Solução Testada**:

```powershell
# 1. Parar processos Node
taskkill /F /IM node.exe 2>$null
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force

# 2. Exclusão temporária Defender (opcional)
Add-MpPreference -ExclusionPath "C:\Projetos\GB-Locacoes\node_modules"

# 3. Executar como Administrator (último recurso)
Start-Process powershell -Verb RunAs
```

### **5. `ERR_PNPM_NO_MATCHING_VERSION`**

**Sintomas**:

```
ERR_PNPM_NO_MATCHING_VERSION No matching version found for @prisma/engines-version@6.13.0
```

**Causa Raiz**:

- Override incorreto no package.json
- Versão engines não publicada
- Cache PNPM corrompido

**Solução Testada**:

```json
// Remover overrides incorretos
{
  "pnpm": {
    "overrides": {
      // ❌ Remover se existir:
      // "@prisma/engines-version": "6.13.0"
    }
  }
}
```

```powershell
# Limpar cache PNPM
pnpm store prune --force
Remove-Item -Recurse -Force ~/.pnpm-store -ErrorAction SilentlyContinue
```

## 🟢 Erros Leves (Severidade Baixa)

### **6. Type Error: PrismaClientOptions**

**Sintomas**:

```typescript
Type 'readonly ["error"]' is not assignable to type '(LogLevel | LogDefinition)[]'
```

**Solução Testada**:

```typescript
// ❌ Problemático
new PrismaClient({
  log: ["error"] as const // readonly array
})

// ✅ Correto - Opção 1
new PrismaClient({
  log: ["error"] // mutable array
})

// ✅ Correto - Opção 2
new PrismaClient({
  log: [{ level: "error", emit: "stdout" }] // LogDefinition
})

// ✅ Correto - Opção 3 (mais simples)
new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL }
  }
  // sem log config
})
```

## 🔧 Comandos de Diagnóstico

### **Health Check Completo**

```powershell
# 1. Verificar versões
Write-Host "=== VERSÕES ===" -ForegroundColor Cyan
node --version
pnpm --version
pnpm prisma --version

# 2. Verificar estrutura
Write-Host "=== ESTRUTURA ===" -ForegroundColor Cyan
Test-Path "prisma/schema.prisma"
Test-Path "node_modules/@prisma/client"
Test-Path ".env"

# 3. Verificar schema
Write-Host "=== SCHEMA ===" -ForegroundColor Cyan
$schema = Get-Content "prisma/schema.prisma" -Raw
if ($schema -match 'output\s*=') {
    Write-Host "❌ Output customizado encontrado" -ForegroundColor Red
} else {
    Write-Host "✅ Schema correto" -ForegroundColor Green
}

# 4. Testar geração
Write-Host "=== GERAÇÃO ===" -ForegroundColor Cyan
pnpm prisma generate --verbose

# 5. Testar build
Write-Host "=== BUILD ===" -ForegroundColor Cyan
pnpm build 2>&1 | Select-String "error", "✓", "❌"
```

### **Quick Fix Universal**

```powershell
# Script de emergência (1 minuto)
taskkill /F /IM node.exe 2>$null
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force pnpm-lock.yaml -ErrorAction SilentlyContinue
pnpm install
pnpm prisma generate
pnpm build

# Verificar resultado
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Quick fix bem-sucedido" -ForegroundColor Green
} else {
    Write-Host "❌ Quick fix falhou - consultar playbook completo" -ForegroundColor Red
}
```

## 📚 Referências e Escalação

### **Documentação Interna**

- [`docs/playbooks/prisma-client-regenerate.md`](../playbooks/prisma-client-regenerate.md) -
  Procedimento completo
- [`docs/incidents/2025-08-28-prisma-p6001-*`](../incidents/) - Incident report
  detalhado
- [`docs/adr/adr-0001-prisma-node-api-vs-data-proxy.md`](../adr/adr-0001-prisma-node-api-vs-data-proxy.md) -
  Decisões arquiteturais

### **Documentação Externa**

- [Prisma Client Generation](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client)
- [Prisma Error Reference](https://www.prisma.io/docs/reference/api-reference/error-reference)
- [PNPM Troubleshooting](https://pnpm.io/troubleshooting)

### **Quando Escalar**

- ⏱️ **> 30 minutos** seguindo playbook sem sucesso
- 🔄 **Errors recorrentes** após fix aparentemente bem-sucedido
- 🆕 **Novos padrões** de erro não documentados aqui
- 🏗️ **Mudanças de versão** major (Node, PNPM, Prisma, Next.js)

---

**Mantenha este documento atualizado** conforme novos erros forem identificados
e solucionados.
