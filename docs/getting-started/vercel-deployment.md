# 🚀 Deploy na Vercel - Guia Completo

## 📋 **Variáveis de Ambiente Obrigatórias**

### **⚠️ CRÍTICO: Configure estas variáveis na Vercel**

Acesse: **Vercel Dashboard → Projeto → Settings → Environment Variables**

```bash
# 🗄️ DATABASE (OBRIGATÓRIO)
DATABASE_URL=postgresql://user:pass@host:port/db?schema=public
DIRECT_URL=postgresql://user:pass@host:port/db?schema=public

# 🔐 NEXTAUTH (OBRIGATÓRIO)
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-minimum-32-characters

# 📧 SUPABASE (OBRIGATÓRIO)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# 📨 EMAIL (OBRIGATÓRIO)
RESEND_API_KEY=re_your-resend-key

# 🔧 OPCIONAL (mas recomendado)
STRIPE_SECRET_KEY=sk_live_your-stripe-key
ZAPSIGN_TOKEN=your-zapsign-token
MELHOR_ENVIO_TOKEN=your-melhor-envio-token
LOG_LEVEL=info
```

---

## 🔧 **Build Commands - Configuração da Vercel**

### **Settings → General → Build & Development Settings**

```bash
# Framework Preset: Next.js
# Node.js Version: 18.x ou 20.x

# Build Command:
pnpm run build

# Install Command:
pnpm install --frozen-lockfile=false

# Output Directory:
.next
```

---

## 🚨 **Problemas Comuns e Soluções**

### **1. Erro: "Prisma Client did not initialize yet"**

**Causa**: Prisma não foi gerado corretamente durante o build

**Solução**: Verificar se `prebuild` e `postinstall` estão executando

```json
// package.json - Verificar se existe:
{
  "scripts": {
    "prebuild": "prisma generate && node scripts/post-prisma-generate.js",
    "postinstall": "prisma generate && node scripts/post-prisma-generate.js"
  }
}
```

### **2. Erro: "Next.js plugin not detected in ESLint"**

**Causa**: ESLint config não compatível com Vercel

**Solução**: Usar configuração compatível (já configurado no projeto)

### **3. Build Timeouts**

**Causa**: Dependências pesadas ou scripts longos

**Solução**: Otimizar `vercel.json`:

```json
{
  "buildCommand": "pnpm run build",
  "installCommand": "pnpm install --frozen-lockfile=false",
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

---

## ✅ **Checklist de Deploy**

### **Antes do Deploy**

- [ ] Todas as variáveis de ambiente configuradas na Vercel
- [ ] `DATABASE_URL` e `DIRECT_URL` com URLs de produção
- [ ] `NEXTAUTH_URL` com domínio correto da Vercel
- [ ] `NEXTAUTH_SECRET` com pelo menos 32 caracteres
- [ ] Build local funcionando: `pnpm run build`

### **Durante o Deploy**

- [ ] Monitor logs de build na Vercel
- [ ] Verificar se `prisma generate` executou com sucesso
- [ ] Conferir se APIs retornam 200 (não 503)

### **Após o Deploy**

- [ ] Testar autenticação
- [ ] Verificar conexão com banco de dados
- [ ] Validar APIs críticas: `/api/health`, `/api/auth/session`

---

## 🔍 **Debug de Problemas**

### **Logs da Vercel**

1. **Build Logs**: Vercel Dashboard → Deployments → View Build Logs
2. **Function Logs**: Vercel Dashboard → Functions → View Logs
3. **Real-time**: `vercel logs --follow`

### **Comandos Debug Locais**

```bash
# Testar build exatamente como na Vercel
pnpm install --frozen-lockfile=false
pnpm run build

# Verificar Prisma
pnpm prisma generate
pnpm prisma db push --preview-feature

# Testar variáveis de ambiente
node -e "console.log(process.env.DATABASE_URL)"
```

---

## 📞 **Troubleshooting Rápido**

| Erro                               | Causa Provável | Solução                                     |
| ---------------------------------- | -------------- | ------------------------------------------- |
| `Prisma Client did not initialize` | ENV ou scripts | Verificar `DATABASE_URL` + `prebuild`       |
| `503 Service Unavailable`          | DB connection  | Validar `DATABASE_URL` e `DIRECT_URL`       |
| `NextAuth configuration error`     | Auth ENV       | Conferir `NEXTAUTH_URL` e `NEXTAUTH_SECRET` |
| `Build timeout`                    | Heavy deps     | Otimizar dependencies ou aumentar timeout   |

---

## 🚀 **Deploy Automatizado**

### **GitHub Integration**

1. Conectar repositório na Vercel
2. Configurar branch de produção (`main`)
3. Deploy automático a cada push

### **Preview Deployments**

- Pull Requests geram deploys de preview automaticamente
- URLs temporárias para teste antes do merge

---

**✅ Seguindo este guia, o deploy na Vercel deve funcionar perfeitamente!**
