# 🔧 Scripts de Diagnóstico do Supabase

## 📋 Visão Geral

Estes scripts permitem verificar diretamente do projeto local:

- ✅ Status das políticas RLS
- ✅ Índices de performance criados
- ✅ Primary keys e foreign keys
- ✅ Warnings do Performance Advisor
- ✅ Status das otimizações

## 🚀 Scripts Disponíveis

### 1. **check-supabase-performance.js** (Recomendado)

Script simples que usa apenas Prisma para conectar e verificar o banco.

#### Como usar:

```bash
# Executar diretamente
node scripts/check-supabase-performance.js

# Ou via pnpm script
pnpm run check:supabase
```

#### O que verifica:

- ✅ Conexão com banco de dados
- ✅ Políticas RLS existentes
- ✅ Índices de performance
- ✅ Primary keys
- ✅ Foreign keys
- ✅ Gera relatório completo

### 2. **supabase-diagnostics.js** (Avançado)

Script mais completo que usa Supabase SDK + Prisma.

#### Como usar:

```bash
# Executar diretamente
node scripts/supabase-diagnostics.js

# Ou via pnpm script
pnpm run diagnose:supabase
```

#### Requisitos:

- `@supabase/supabase-js` instalado
- `SUPABASE_SERVICE_ROLE_KEY` no .env

## 📦 Configuração

### 1. Instalar Dependências (se necessário)

```bash
# Para script avançado
pnpm add @supabase/supabase-js

# Prisma já deve estar instalado
pnpm add @prisma/client
```

### 2. Configurar Variáveis de Ambiente

No seu `.env.local` ou `.env`:

```env
# Obrigatório para ambos os scripts
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"

# Apenas para script avançado
NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
SUPABASE_SERVICE_ROLE_KEY="[service-role-key]"
```

### 3. Adicionar Scripts ao package.json

```json
{
  "scripts": {
    "check:supabase": "node scripts/check-supabase-performance.js",
    "diagnose:supabase": "node scripts/supabase-diagnostics.js",
    "supabase:status": "node scripts/check-supabase-performance.js"
  }
}
```

## 🎯 Exemplo de Uso

### Verificação Rápida

```bash
pnpm run check:supabase
```

**Output esperado:**

```
🚀 Iniciando Verificação de Performance do Supabase...
====================================================
🔌 Testando conexão com o banco...
✅ Conexão com banco estabelecida!

🔍 Verificando Políticas RLS...
✅ Encontradas 15 políticas RLS
✅ Todas as políticas estão otimizadas!

🔍 Verificando Índices de Performance...
✅ Encontrados 12 índices de performance
✅ Todos os índices esperados estão presentes!

🔍 Verificando Primary Keys...
✅ Encontradas 8 primary keys
✅ verificationtokens tem primary key!

🔍 Verificando Foreign Keys...
✅ Encontradas 12 foreign keys

📊 RELATÓRIO DE PERFORMANCE
============================

📈 Resumo:
   - Políticas RLS: 15
   - Índices de performance: 12
   - Primary keys: 8
   - Foreign keys: 12

⚠️  Warnings encontrados: 0

🎉 Parabéns! Seu banco está 100% otimizado!
```

### Verificação com Warnings

```bash
pnpm run check:supabase
```

**Output com problemas:**

```
⚠️  Warnings encontrados: 5

   - Políticas RLS não otimizadas: 3
   - Índices faltando: 2

💡 Recomendações:
   - Execute a migration V4 ULTRA para otimizar políticas RLS
   - Execute a migration V4 ULTRA para criar índices faltantes
```

## 🔍 Interpretando os Resultados

### ✅ Tudo OK

- **0 warnings**: Banco 100% otimizado
- **Todas as políticas otimizadas**: Usando `SELECT auth.uid()`
- **Todos os índices presentes**: Performance máxima
- **Primary keys corretas**: Integridade garantida

### ⚠️ Precisa de Otimização

- **Políticas não otimizadas**: Execute V4 ULTRA
- **Índices faltando**: Execute V4 ULTRA
- **Primary keys faltando**: Execute V4 ULTRA

### ❌ Problemas Críticos

- **Erro de conexão**: Verifique DATABASE_URL
- **Erro de permissão**: Verifique credenciais
- **Erro de schema**: Banco pode estar corrompido

## 🛠️ Troubleshooting

### Erro: "Cannot find module '@prisma/client'"

```bash
npx prisma generate
pnpm add @prisma/client
```

### Erro: "Connection refused"

```bash
# Verificar se DATABASE_URL está correto
echo $DATABASE_URL

# Testar conexão manual
npx prisma db pull
```

### Erro: "Permission denied"

```bash
# Verificar se a chave tem permissões de admin
# Use SUPABASE_SERVICE_ROLE_KEY (não anon key)
```

### Erro: "Schema not found"

```bash
# Verificar se o banco existe
npx prisma db push
```

## 📊 Integração com IA

### Para usar com Cursor/VS Code:

1. **Execute o script**:

   ```bash
   npm run check:supabase
   ```

2. **Copie o output** e cole na conversa com a IA

3. **A IA pode analisar**:
   - Quantos warnings existem
   - Quais políticas precisam de otimização
   - Quais índices estão faltando
   - Status geral do banco

### Exemplo de prompt para IA:

```
Executei o script de diagnóstico do Supabase e obtive este resultado:

[COLE O OUTPUT AQUI]

Pode me ajudar a interpretar os resultados e sugerir próximos passos?
```

## 🎯 Próximos Passos

Após executar o diagnóstico:

1. **Se 0 warnings**: ✅ Banco otimizado!
2. **Se há warnings**: Execute a migration V4 ULTRA
3. **Se há erros**: Verifique configuração e permissões
4. **Monitore**: Execute periodicamente para manter otimizado

## 📚 Arquivos Relacionados

- `prisma/migrations/performance_optimization_supabase_v4_ULTRA.sql` - Migration
  principal
- `prisma/migrations/V4_ULTRA_GUIDE.md` - Guia da migration
- `prisma/migrations/README.md` - Instruções gerais

---

**Pronto para diagnosticar?** Execute `pnpm run check:supabase` e veja o status
do seu banco! 🚀
