# 🚨 Incident Report: Prisma P6001 & Client Initialization Failures

**Data**: 2025-08-28  
**Severidade**: Alta  
**Status**: Resolvido  
**Duração**: ~4 horas

## 📋 Resumo Executivo

Falhas críticas do Prisma Client em ambiente de desenvolvimento Windows 11,
manifestadas como erros P6001 e "did not initialize yet", causadas por
configuração incorreta do generator client e incompatibilidades entre PNPM,
Next.js 15 e Prisma 6.15.0. Solução aplicada com downgrade para Prisma 6.13.0 e
correção da configuração do schema.

## ⏰ Linha do Tempo

| Horário | Evento                                                    |
| ------- | --------------------------------------------------------- |
| 14:00   | Tentativa de upgrade Prisma 6.13.0 → 6.15.0               |
| 14:15   | Primeiro erro: `@prisma/client did not initialize yet`    |
| 14:30   | Erro P6001: validação de datasource falhando              |
| 15:00   | Identificação: `engine=none` na geração                   |
| 15:30   | EPERM: `query_engine-windows.dll.node.tmp` rename failure |
| 16:00   | Root cause: `output` customizado no generator client      |
| 16:30   | **Solução aplicada**: remoção output + downgrade 6.13.0   |
| 17:00   | ✅ **Validação**: APIs retornando 200, build SUCCESS      |

## 🔍 Sintomas Observados

### Erro Primário

```
@prisma/client did not initialize yet. Please run "prisma generate"
```

### Erro P6001 (Data Proxy Validation)

```
Error validating datasource 'db': the URL must start with 'prisma://' or 'prisma+postgres://'
```

### Engine Generation Issue

```
✔ Generated Prisma Client (v6.15.0) to ./node_modules/@prisma/client in XXms
engine=none
```

### Windows EPERM

```
EPERM: operation not permitted, rename 'query_engine-windows.dll.node.tmp' -> 'query_engine-windows.dll.node'
```

## 📊 Impacto

- **Desenvolvimento**: Bloqueado completamente
- **APIs**: Todas as rotas falhando com erro 500
- **Build**: Falhando em TypeScript compilation
- **Testes**: 30 testes passando → 0 funcionais (server offline)

## 🔬 Evidências Técnicas

### Configuração Problemática

```prisma
// ❌ PROBLEMÁTICO
generator client {
  provider = "prisma-client-js"
  output   = "../node_modules/.prisma/client"  // ← CAUSA RAIZ
  engineType = "node-api"
}
```

### Configuração Corrigida

```prisma
// ✅ CORRIGIDO
generator client {
  provider = "prisma-client-js"
  // output removido - usa localização padrão
}
```

## 🏗️ Ambiente & Versões

| Componente    | Versão           | Status                          |
| ------------- | ---------------- | ------------------------------- |
| Node.js       | 24.6.0           | ✅ Estável                      |
| PNPM          | 10.15.0          | ⚠️ Conflitos resolution         |
| Next.js       | 15.5.2           | ✅ Compatível                   |
| React         | 19.1.1           | ✅ Estável                      |
| TypeScript    | 5.9.2            | ✅ Estável                      |
| Prisma Client | 6.13.0           | ✅ **Versão estável escolhida** |
| Prisma CLI    | 6.13.0           | ✅ **Versão estável escolhida** |
| OS            | Windows 11 26100 | ⚠️ EPERM issues                 |
| PowerShell    | 7.6.0-preview.4  | ✅ Atualizado                   |

## 🎯 Causa-Raiz Técnica

### 1. **Output Customizado Desincroniza Client/Engine**

O `output = "../node_modules/.prisma/client"` no generator client quebra o
acoplamento esperado entre client e engines:

```
PNPM Structure (Symlinks):
node_modules/@prisma/client -> .pnpm/@prisma+client@6.x.x/
node_modules/.prisma/client  -> ❌ Path absoluto customizado
```

Resultado: Client gerado não encontra engines na localização esperada →
`engine=none`

### 2. **Engine=None Ativa Validação Data Proxy**

Quando `engine=none`, Prisma assume uso via Data Proxy e valida URLs:

```typescript
// Validação ativada com engine=none
if (engine === "none" && !url.startsWith("prisma://")) {
  throw new Error("P6001: URL must start with prisma://")
}
```

### 3. **PNPM + Windows Resolver Issues**

PNPM 10.15.0 + Windows 11 + Custom output paths = Race conditions no module
resolution:

```
Prisma Generate → Custom Output Path → PNPM Symlink Resolution → Engine Mismatch
```

### 4. **Windows EPERM (Defender + Node Processes)**

Windows Defender + processos Node.js ativos impedem rename de DLLs:

```
node.exe (dev server) → locks query_engine-windows.dll.node → EPERM rename tmp file
```

## ⚙️ Fatores Contribuintes

1. **Versão Prisma 6.15.0**: Introduziu validações mais rígidas
2. **PNPM Module Resolution**: Symlinks + custom paths = problemas
3. **Windows File Locking**: Defender + Node processes = EPERM
4. **TypeScript Strict**: Tipos `PrismaClientOptions` mais rígidos
5. **Next.js 15 Build**: Mudanças no sistema de módulos

## ✅ Solução Aplicada

### **Etapa 1: Correção Schema Prisma**

```prisma
generator client {
  provider = "prisma-client-js"
  // ✅ Removido: output customizado
  // ✅ Removido: engineType (auto-detectado)
}
```

### **Etapa 2: Downgrade Controlado**

```json
{
  "@prisma/client": "6.13.0",
  "prisma": "6.13.0"
}
```

### **Etapa 3: Limpeza Completa**

```powershell
taskkill /F /IM node.exe 2>NUL
Remove-Item -Recurse -Force node_modules
Remove-Item -Force pnpm-lock.yaml
pnpm install
pnpm prisma generate
```

### **Etapa 4: Correção TypeScript**

```typescript
// ✅ ANTES (problemático)
new PrismaClient({
  log: ["error"] as const // readonly array issue
})

// ✅ DEPOIS (correto)
new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL }
  }
})
```

## 🎯 Alternativas Consideradas

1. **Manter Prisma 6.15.0**: Rejeitada por instabilidade
2. **Usar Data Proxy**: Rejeitada por latência + custo
3. **Migrar para npm**: Considerada, mas PNPM funciona com correções
4. **Docker Development**: Futura consideração para uniformidade

## 🛡️ Ações Preventivas

### **Imediatas**

- [x] Travar versões Prisma em 6.13.0
- [x] Remover output customizado permanentemente
- [x] Adicionar validação no CI
- [x] Documentar playbook de regeneração

### **Médio Prazo**

- [ ] Script automático de health check
- [ ] Monitoramento de compatibilidade de versões
- [ ] Consideração Docker para dev environment
- [ ] Testes automatizados de upgrade Prisma

### **Detecção Precoce**

```typescript
// Health check adicionado
export async function validatePrismaSetup() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return { status: "ok", engine: "node-api" }
  } catch (error) {
    return { status: "error", details: error.message }
  }
}
```

## 📈 Métricas de Resolução

| Métrica         | Antes          | Depois      |
| --------------- | -------------- | ----------- |
| Build Success   | ❌ 0%          | ✅ 100%     |
| API Response    | ❌ 500         | ✅ 200      |
| Test Pass Rate  | ❌ 0/30        | ✅ 30/30    |
| Build Time      | ❌ FAIL        | ✅ 6.4s     |
| Prisma Generate | ❌ engine=none | ✅ node-api |

## 📚 Referências

- [Prisma Client Generation](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client)
- [PNPM Module Resolution](https://pnpm.io/how-peers-are-resolved)
- [Next.js 15 Release Notes](https://nextjs.org/blog/next-15)
- [Windows File Locking Issues](https://docs.microsoft.com/en-us/windows/win32/fileio/file-locking)

## 📞 Escalação

- **Engenharia**: Problema resolvido
- **DevOps**: Validar CI/CD compatibility
- **Segurança**: Confirmar .env.example atualizado

---

**Status**: ✅ **RESOLVIDO**  
**Responsável**: Equipe de Desenvolvimento  
**Próxima Revisão**: 2025-09-15 (upgrade path Prisma 6.16+)
