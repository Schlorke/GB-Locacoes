# 🔍 Explicação: Por que `connection_limit=1` NÃO resolve o problema em Serverless

## ❓ A Pergunta

> "`connection_limit=1` não limita que haja múltiplas conexões com vários
> clientes??"

## ✅ A Resposta: SIM, mas não como você pensa!

### **O que `connection_limit=1` realmente faz:**

`connection_limit=1` limita o número de conexões **POR INSTÂNCIA** do Prisma
Client, não o total de conexões no banco.

### **O Problema em Serverless (Vercel):**

Em ambientes serverless, cada requisição pode criar uma **nova instância** do
Prisma Client:

```
Requisição 1 → Nova instância Prisma → 1 conexão (connection_limit=1)
Requisição 2 → Nova instância Prisma → 1 conexão (connection_limit=1)
Requisição 3 → Nova instância Prisma → 1 conexão (connection_limit=1)
...
Requisição 10 → Nova instância Prisma → 1 conexão (connection_limit=1)

TOTAL: 10 conexões simultâneas no banco! ❌
```

### **Limites do Session Pooler (porta 5432):**

O Session Pooler do Supabase tem limites **TOTAIS** muito baixos:

| Plano Supabase | Limite de Conexões Simultâneas |
| -------------- | ------------------------------ |
| **Free**       | ~15-20 conexões                |
| **Pro**        | ~60-100 conexões               |

### **O Que Acontece:**

```
10 requisições simultâneas
    ↓
10 instâncias do Prisma (cada uma com connection_limit=1)
    ↓
10 conexões simultâneas no Session Pooler
    ↓
Mais 5 requisições chegam
    ↓
15 conexões simultâneas
    ↓
Session Pooler: "Max clients reached" ❌
```

### **Por que o código atual resolve:**

```typescript
// lib/prisma.ts
const pool =
  global.__pool ||
  new Pool({
    connectionString,
    max: isTransactionPooler ? 2 : 1 // Limite POR INSTÂNCIA
  })

// SEMPRE salvar no global para compartilhar pool
global.__pool = pool
```

**O que isso faz:**

1. **Compartilha o pool globalmente**: Todas as requisições serverless na mesma
   instância do Vercel compartilham o mesmo pool
2. **Limita conexões por instância**: `max: 1` ou `max: 2` limita conexões por
   instância do Vercel
3. **Mas ainda pode ter múltiplas instâncias**: Vercel pode ter várias
   instâncias rodando simultaneamente

### **A Solução Real: Transaction Pooler (porta 6543)**

O Transaction Pooler suporta **MUITO MAIS** conexões simultâneas:

| Pooler                 | Limite de Conexões | Uso Recomendado |
| ---------------------- | ------------------ | --------------- |
| **Session (5432)**     | 15-100 conexões    | ❌ Serverless   |
| **Transaction (6543)** | 1000+ conexões     | ✅ Serverless   |

### **Comparação Visual:**

#### **❌ Session Pooler (5432) + connection_limit=1:**

```
Instância Vercel 1: 1 conexão
Instância Vercel 2: 1 conexão
Instância Vercel 3: 1 conexão
...
Instância Vercel 20: 1 conexão

TOTAL: 20 conexões → "Max clients reached" ❌
```

#### **✅ Transaction Pooler (6543) + max: 2:**

```
Instância Vercel 1: 2 conexões
Instância Vercel 2: 2 conexões
Instância Vercel 3: 2 conexões
...
Instância Vercel 100: 2 conexões

TOTAL: 200 conexões → ✅ Funciona perfeitamente!
```

## 🎯 Conclusão

- **`connection_limit=1`** limita conexões **POR INSTÂNCIA**, não o total
- Em serverless, você pode ter **MUITAS instâncias** simultâneas
- Session Pooler (5432) tem limite **TOTAL** muito baixo
- Transaction Pooler (6543) suporta **MUITO MAIS** conexões totais
- **Solução**: Usar Transaction Pooler (6543) para serverless

---

_Última atualização: 2025-12-19_
