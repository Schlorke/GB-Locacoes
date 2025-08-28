# 🔄 Playbook: Regeneração Prisma Client (Windows 11)

**Objetivo**: Procedimento idempotente para regenerar Prisma Client sem falhas  
**Compatibilidade**: Windows 11, Node 24+, PNPM 10+, Prisma 6.13.0  
**Tempo estimado**: 3-5 minutos  
**Última atualização**: 2025-08-28

## 🚨 Quando Usar Este Playbook

Execute este procedimento quando encontrar:

- ❌ `@prisma/client did not initialize yet`
- ❌ `Error: P6001` (Data Proxy validation)
- ❌ `engine=none` na saída do `prisma generate`
- ❌ `EPERM` errors no Windows durante build
- ❌ APIs retornando 500 com erros Prisma
- ❌ TypeScript errors relacionados a `PrismaClient`

## 📋 Pré-Requisitos

```powershell
# Verificar versões
node --version     # Deve ser >= 20.0.0
pnpm --version     # Deve ser >= 8.0.0
pwsh --version     # PowerShell 7+ recomendado
```

## 🛠️ Procedimento Completo

### **Etapa 1: Preparação do Ambiente**

```powershell
# 1.1 - Parar todos os servidores de desenvolvimento
# Pressione Ctrl+C em todos os terminais com:
# - pnpm dev
# - pnpm storybook
# - pnpm test:watch

# 1.2 - Forçar encerramento de processos Node.js (Windows)
taskkill /F /IM node.exe 2>$null | Out-Null
Write-Host "✅ Processos Node.js encerrados" -ForegroundColor Green

# 1.3 - Verificar se não há processos travando arquivos
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Format-Table ProcessName, Id
```

### **Etapa 2: Limpeza Completa**

```powershell
# 2.1 - Backup atual (opcional)
if (Test-Path "node_modules/@prisma/client") {
    Copy-Item "prisma/schema.prisma" "prisma/schema.prisma.bak"
    Write-Host "✅ Backup do schema criado" -ForegroundColor Green
}

# 2.2 - Remover node_modules e lockfile
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force pnpm-lock.yaml -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# 2.3 - Limpar cache PNPM
pnpm store prune

Write-Host "✅ Limpeza completa finalizada" -ForegroundColor Green
```

### **Etapa 3: Validação do Schema**

```powershell
# 3.1 - Verificar se schema.prisma está correto
$schemaContent = Get-Content "prisma/schema.prisma" -Raw

# 3.2 - Verificar se NÃO tem output customizado (problemático)
if ($schemaContent -match 'output\s*=') {
    Write-Host "❌ ATENÇÃO: Encontrado 'output' customizado no generator client" -ForegroundColor Red
    Write-Host "   Remova a linha 'output = ...' do generator client" -ForegroundColor Yellow
    exit 1
}

# 3.3 - Verificar configuração correta
if ($schemaContent -match 'generator client') {
    Write-Host "✅ Generator client encontrado" -ForegroundColor Green
} else {
    Write-Host "❌ Generator client não encontrado no schema" -ForegroundColor Red
    exit 1
}
```

### **Etapa 4: Instalação e Regeneração**

```powershell
# 4.1 - Instalar dependências
Write-Host "🔄 Instalando dependências..." -ForegroundColor Yellow
pnpm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Falha na instalação de dependências" -ForegroundColor Red
    exit 1
}

# 4.2 - Verificar versão Prisma instalada
$prismaVersion = pnpm prisma --version
Write-Host "📦 Prisma instalado: $prismaVersion" -ForegroundColor Cyan

# 4.3 - Gerar Prisma Client
Write-Host "🔄 Gerando Prisma Client..." -ForegroundColor Yellow
pnpm prisma generate

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Falha na geração do Prisma Client" -ForegroundColor Red
    exit 1
}
```

### **Etapa 5: Validação da Regeneração**

```powershell
# 5.1 - Verificar se client foi gerado corretamente
if (Test-Path "node_modules/@prisma/client") {
    Write-Host "✅ Prisma Client encontrado" -ForegroundColor Green
} else {
    Write-Host "❌ Prisma Client não foi gerado" -ForegroundColor Red
    exit 1
}

# 5.2 - Verificar engine (deve ser Node-API, não 'none')
$engineCheck = pnpm prisma version 2>&1 | Out-String
if ($engineCheck -match "Query Engine.*Node-API") {
    Write-Host "✅ Query Engine: Node-API (correto)" -ForegroundColor Green
} elseif ($engineCheck -match "engine.*none") {
    Write-Host "❌ Engine=none detectado (problemático)" -ForegroundColor Red
    Write-Host "   Verifique se há 'output' customizado no schema" -ForegroundColor Yellow
    exit 1
} else {
    Write-Host "⚠️ Engine status não claro, continuando..." -ForegroundColor Yellow
}

# 5.3 - Verificar se arquivos DLL existem (Windows)
$engineFiles = Get-ChildItem "node_modules/.pnpm" -Recurse -Filter "query_engine-windows.dll.node" -ErrorAction SilentlyContinue
if ($engineFiles.Count -gt 0) {
    Write-Host "✅ Query engine DLL encontrada" -ForegroundColor Green
} else {
    Write-Host "⚠️ Query engine DLL não encontrada (pode ser normal)" -ForegroundColor Yellow
}
```

### **Etapa 6: Teste de Build**

```powershell
# 6.1 - Testar build
Write-Host "🔄 Testando build..." -ForegroundColor Yellow
pnpm build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build bem-sucedido" -ForegroundColor Green
} else {
    Write-Host "❌ Build falhou" -ForegroundColor Red
    Write-Host "   Verifique logs acima para erros específicos" -ForegroundColor Yellow
}
```

### **Etapa 7: Teste de Conectividade**

```powershell
# 7.1 - Iniciar servidor (background)
Write-Host "🔄 Iniciando servidor para teste..." -ForegroundColor Yellow
Start-Process -FilePath "pnpm" -ArgumentList "dev" -WindowStyle Hidden

# 7.2 - Aguardar servidor inicializar
Start-Sleep -Seconds 10

# 7.3 - Testar endpoint de health
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/health" -Method GET -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ API respondendo (Status: $($response.StatusCode))" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️ API não respondeu (normal se não houver /api/health)" -ForegroundColor Yellow
}

# 7.4 - Testar endpoint real
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/equipments" -Method GET -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ API /equipments funcionando (Status: $($response.StatusCode))" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ API /equipments falhou: $($_.Exception.Message)" -ForegroundColor Red
}

# 7.5 - Parar servidor
taskkill /F /IM node.exe 2>$null | Out-Null
```

## 🛡️ Troubleshooting Windows 11

### **EPERM: Operation Not Permitted**

```powershell
# Problema: Windows Defender ou processo travando arquivo

# Solução 1: Exclusão temporária Defender
Add-MpPreference -ExclusionPath "C:\Projetos\GB-Locacoes\node_modules"
Write-Host "⚠️ Exclusão temporária adicionada ao Defender" -ForegroundColor Yellow

# Solução 2: Verificar processos travando
Get-Process | Where-Object {$_.ProcessName -like "*prisma*" -or $_.ProcessName -like "*node*"}

# Solução 3: Reiniciar como Administrator (último recurso)
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "⚠️ Execute como Administrador se EPERM persistir" -ForegroundColor Yellow
}
```

### **Module Resolution Issues**

```powershell
# Problema: PNPM não resolve @prisma/client corretamente

# Verificar estrutura
Get-ChildItem "node_modules/@prisma" -ErrorAction SilentlyContinue
Get-ChildItem "node_modules/.pnpm" -Filter "*prisma*" -ErrorAction SilentlyContinue

# Se não encontrar, limpar cache PNPM completamente
pnpm store prune --force
Remove-Item -Recurse -Force ~/.pnpm-store -ErrorAction SilentlyContinue
```

## ✅ Checklist de Validação Final

Antes de considerar o procedimento concluído:

- [ ] `pnpm prisma version` mostra "Query Engine (Node-API)"
- [ ] `pnpm build` executa sem erros
- [ ] APIs retornam status 200 (não 500)
- [ ] Não há mensagens "did not initialize yet"
- [ ] TypeScript compila sem erros Prisma
- [ ] Testes passam (`pnpm test`)

## 🚨 Escalação

Se este procedimento não resolver:

1. **Capturar logs completos**:
   `pnpm prisma generate --verbose > prisma-debug.log 2>&1`
2. **Verificar incident docs**: `docs/incidents/2025-08-28-prisma-p6001-*`
3. **Consultar troubleshooting**: `docs/troubleshooting/prisma-common-errors.md`
4. **Abrir issue** com logs e configuração do ambiente

## 📚 Referências

- [Prisma Client Generation](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client)
- [PNPM Troubleshooting](https://pnpm.io/troubleshooting)
- [Windows Development Setup](../getting-started/installation.md)

---

**Versão**: 1.0  
**Compatibilidade**: Windows 11, Prisma 6.13.0  
**Próxima revisão**: 2025-09-28
