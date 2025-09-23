# Projeto: GB Locações – Plataforma de Locação de Equipamentos para Construção Civil

> **STATUS**: 🟢 **100% ESTÁVEL** - Problemas críticos resolvidos
> (Dezembro 2024)

## Stack Tecnológica

- Next.js 15 com App Router (SSR/ISR)
- TypeScript **100% TYPE SAFE** (0 erros)
- TailwindCSS
- ShadCN UI
- Prisma ORM 6.13.0 com Supabase (PostgreSQL) ⚠️ **NÃO ATUALIZAR**
- Server Actions + Edge Functions
- Autenticação com NextAuth + 2FA
- Integrações: ZapSign, Stripe, Mercado Pago, Melhor Envio, SendGrid
- Deploy com Vercel e AI SDK

## 🚨 REGRAS CRÍTICAS (NÃO QUEBRAR ESTABILIDADE)

### **❌ NÃO FAÇA**

- ❌ **NÃO DELETE** `scripts/post-prisma-generate.js` - crítico para build
- ❌ **NÃO USE** tipos `any` - sempre interfaces específicas
- ❌ **NÃO ATUALIZE** Prisma para 6.14.0+ - quebra build
- ❌ **NÃO USE** swagger-ui-react - incompatível React 19
- ❌ **NÃO INCLUA** arquivos auto-gerados no linting
- ❌ **NUNCA INVENTE DATAS** no CHANGELOG - sempre verificar `git log` primeiro

### **✅ SEMPRE FAÇA**

- ✅ **SEMPRE** use safe navigation (`?.`) em objetos undefined
- ✅ **SEMPRE** consulte `docs/` antes de implementar
- ✅ **SEMPRE** atualize `CHANGELOG.md` após mudanças
- ✅ **SEMPRE** teste build após mudanças críticas

## Regras de Projeto

- Nunca alterar os estilos visuais existentes
- Usar animações com Framer Motion
- Utilizar ShadCN UI como base de componentes
- Garantir modularidade, segurança (OWASP) e performance
- Evitar bibliotecas não autorizadas (Upstash)

## 📊 Métricas de Sucesso Atuais

```
✅ TypeScript Errors:     0 (Zero!)
✅ ESLint Problems:       0 (Zero!)
✅ Build Status:          SUCCESS (6-8s)
✅ Test Status:           30/30 passing
✅ Dependency Status:     Stable
```

## Estrutura do Projeto

- `app/`: App Router (Next.js 13+)
- `components/`: Componentes reutilizáveis com ShadCN
- `lib/`: Helpers, autenticação, server actions
- `prisma/`: `schema.prisma`, seeds, migrações
- `public/`: Imagens estáticas e arquivos
- `.env`: Variáveis sensíveis de ambiente
