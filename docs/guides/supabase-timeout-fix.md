# 🔧 Guia: Resolver Timeouts do Supabase (Erro P1001)

> **Problema**:
> `Can't reach database server at aws-0-us-east-1.pooler.supabase.com:5432`
> **Causa**: Database pausa após inatividade (Plano Gratuito) **Solução**:
> Aumentar timeout + manter database acordado

---

## 📊 Entendendo o Problema

### **Comportamento do Supabase Free Tier:**

```
Inatividade > 1 hora
       ↓
Database PAUSA automaticamente
       ↓
Primeira requisição chega
       ↓
Database começa a ACORDAR (8-15 segundos)
       ↓
Prisma aguarda apenas 5 segundos ❌
       ↓
TIMEOUT → Erro P1001
       ↓
Database acorda (mas tarde demais)
       ↓
Próxima requisição funciona ✅
```

**Erro típico:**

```
PrismaClientInitializationError: Can't reach database server
errorCode: P1001
clientVersion: 6.18.0
```

---

## ✅ Solução 1: Aumentar Timeout (RÁPIDO)

### **1.1. Editar `.env.local`:**

**❌ Antes:**

```env
DATABASE_URL="postgresql://postgres:password@aws-0-us-east-1.pooler.supabase.com:5432/postgres?pgbouncer=true"
```

**✅ Depois:**

```env
DATABASE_URL="postgresql://postgres:password@aws-0-us-east-1.pooler.supabase.com:5432/postgres?pgbouncer=true&connect_timeout=15&connection_limit=1"
```

### **Parâmetros:**

| Parâmetro          | Valor  | Descrição                             |
| ------------------ | ------ | ------------------------------------- |
| `connect_timeout`  | `15`   | Aguarda 15s (suficiente para acordar) |
| `pgbouncer`        | `true` | Usa connection pooling                |
| `connection_limit` | `1`    | Evita múltiplas conexões              |

### **1.2. Reiniciar servidor:**

```bash
rm -rf .next
pnpm dev
```

---

## ✅ Solução 2: Health Check Automático (RECOMENDADO)

### **2.1. Endpoint já implementado:**

O projeto já tem o endpoint `/api/health` que:

- ✅ Executa `SELECT 1` no database
- ✅ Mantém conexão ativa
- ✅ Retorna status em JSON

### **2.2. Configuração Vercel Cron:**

O arquivo `vercel.json` já está configurado:

```json
{
  "crons": [
    {
      "path": "/api/health",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

**Schedule:** `*/5 * * * *` = A cada 5 minutos

### **2.3. Testar localmente:**

```bash
# Acessar endpoint
curl http://localhost:3000/api/health

# Resposta esperada:
{
  "status": "healthy",
  "timestamp": "2025-01-30T12:00:00.000Z",
  "database": "connected"
}
```

### **2.4. Deploy na Vercel:**

```bash
git add .
git commit -m "fix: adicionar health check para Supabase"
git push origin main
```

**Após deploy:** Vercel executará automaticamente `/api/health` a cada 5
minutos.

---

## ✅ Solução 3: Upgrade do Supabase (DEFINITIVO)

### **Comparação Planos:**

| Recurso        | Gratuito         | Pro ($25/mês)  |
| -------------- | ---------------- | -------------- |
| **Auto-pause** | ✅ Sim (após 1h) | ❌ Nunca pausa |
| **RAM**        | 500 MB           | 8 GB           |
| **Database**   | 500 MB           | 8 GB           |
| **Banda**      | 5 GB             | 250 GB         |
| **Backups**    | ❌ Não           | ✅ Diários     |

### **Quando fazer upgrade:**

- ✅ Aplicação em produção com tráfego real
- ✅ Mais de 100 usuários ativos/mês
- ✅ Operações críticas de negócio
- ✅ Necessita de SLA e suporte

### **Como fazer upgrade:**

1. Acesse [Supabase Dashboard](https://app.supabase.com)
2. Selecione seu projeto
3. Settings → Billing
4. Escolha "Pro Plan" ($25/mês)
5. **Resultado:** Database nunca mais pausa!

---

## 🧪 Verificar Conexão

### **Script de diagnóstico:**

```bash
# Executar script de diagnóstico
node scripts/diagnose-connection.js
```

**Verifica:**

- ✅ DATABASE_URL válida
- ✅ Conectividade com Supabase
- ✅ Timeout atual
- ✅ Status do database (paused/active)

---

## 🚨 Troubleshooting

### **Erro persiste após aumentar timeout:**

**1. Verificar variáveis no Vercel:**

- Settings → Environment Variables
- Conferir `DATABASE_URL` em Production

**2. Verificar Supabase:**

- Dashboard → Settings → Database
- Checar se project está "Active" (não "Paused")

**3. Verificar logs:**

```bash
# Vercel CLI
vercel logs --follow
```

### **Health check não funciona:**

**1. Verificar deploy:**

```bash
vercel --prod
```

**2. Verificar cron configuration:**

- Vercel Dashboard → Settings → Cron Jobs
- Deve aparecer: `/api/health` (Runs every 5 minutes)

**3. Forçar execução manual:**

```bash
curl https://seu-dominio.vercel.app/api/health
```

---

## 📊 Monitoramento

### **Logs de Health Check:**

```bash
# Vercel Dashboard → Functions → /api/health
# Deve mostrar execuções a cada 5 minutos:

[GET] /api/health - 200 OK (45ms)
[GET] /api/health - 200 OK (42ms)
[GET] /api/health - 200 OK (38ms)
```

### **Métricas de Supabase:**

1. Acesse Supabase Dashboard
2. Reports → Database
3. Verifique:
   - **Active connections**: Deve ter pelo menos 1
   - **Last activity**: Não deve passar de 5 minutos
   - **Status**: "Active" (não "Paused")

---

## 🎯 Resumo da Solução

### **Para Desenvolvimento:**

✅ Aumentar `connect_timeout=15` no `.env.local`

### **Para Produção:**

✅ Aumentar timeout + Health Check automático (Vercel Cron)

### **Para Aplicações Críticas:**

✅ Upgrade para Supabase Pro ($25/mês)

---

## 📚 Referências

- [Prisma Connection Pooling](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#connection-pool-timeout)
- [Supabase Connection Pooler](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)
- [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)
- [Análise Crítica do Problema](../internal/prisma-6-15-engine-none-analysis.md)

---

**✅ Problema resolvido!** O database agora se mantém acordado e não sofre mais
timeouts.
