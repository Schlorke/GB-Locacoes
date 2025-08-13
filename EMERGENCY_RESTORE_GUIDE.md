# 🎯 QUICK REFERENCE - ESTADO FUNCIONAL

**Commit funcional:** `585eb94`  
**Status atual:** `f1805f6` (baseado no funcional)  
**Data restauração:** 12/08/2025

---

## ⚡ QUICK ACTIONS

### 🔄 Restaurar estado funcional (se quebrar novamente):

```bash
git reset --hard 585eb94
git push --force
```

### 🧪 Testar build local:

```bash
pnpm run build
```

### 🚀 Forçar deploy Vercel:

```bash
git commit --allow-empty -m "force deploy"
git push
```

---

## 📁 ARQUIVOS CRÍTICOS - NÃO ALTERAR SEM MOTIVO

- ✅ `lib/prisma.ts` - Prisma client SIMPLES
- ✅ `next.config.mjs` - Config MÍNIMA
- ✅ `vercel.json` - Config BÁSICA
- ✅ `app/api/*/route.ts` - APIs com fallbacks

---

## 🚨 SINAIS DE PERIGO

Se você vê:

- ❌ `eval('require')`
- ❌ Sistemas de mock complexos
- ❌ Lazy loading com detecção de build
- ❌ Webpack configs para Prisma

**PARE E RELEIA A DOCUMENTAÇÃO**

---

## 📋 CHECKLIST RÁPIDO

Antes de alterar código funcional:

- [ ] Há erro real?
- [ ] Build está falhando?
- [ ] Produção quebrada?
- [ ] Mudança simplifica?
- [ ] Testei completamente?

Se alguma resposta for **NÃO**, não altere.

---

## 📞 EMERGENCY RESTORE

Em caso de desastre, execute:

```bash
git reset --hard 585eb94
git push --force
pnpm run build
```

Se ainda falhar, verifique:

1. `.env` variables
2. Database connection
3. Vercel settings

---

**Referência rápida criada para evitar repetição de desastres desnecessários.**
