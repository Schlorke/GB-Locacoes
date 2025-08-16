# 🛡️ GUIA COMPLETO - CORRIGIR PROBLEMAS DE RLS NO SUPABASE

## 🚨 **PROBLEMA IDENTIFICADO**

O Supabase está mostrando **12 erros de segurança** porque o **Row Level
Security (RLS)** não está habilitado nas suas tabelas.

## 📋 **TABELAS AFETADAS**

- `public.equipments` - Equipamentos
- `public.users` - Usuários
- `public.quotes` - Orçamentos
- `public.categories` - Categorias
- `public.accounts` - Contas NextAuth
- `public.sessions` - Sessões
- `public.rentals` - Locações
- `public.settings` - Configurações
- `public.verificationtokens` - Tokens de verificação
- `public.quote_items` - Itens de orçamento
- `public.rental_items` - Itens de locação
- `public._prisma_migrations` - Migrações Prisma

## 🛡️ **SOLUÇÃO COMPLETA**

### **Passo 1: Acessar o Supabase Dashboard**

1. Vá para [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Faça login na sua conta
3. Selecione o projeto **GB-Locações**

### **Passo 2: Abrir o SQL Editor**

1. No menu lateral esquerdo, clique em **"SQL Editor"**
2. Clique em **"New query"** para criar uma nova consulta

### **Passo 3: Executar o Script de Correção**

1. **Copie todo o conteúdo** do arquivo `supabase-rls-fix.sql`
2. **Cole no SQL Editor** do Supabase
3. Clique em **"Run"** para executar

### **Passo 4: Verificar o Resultado**

Após executar, você deve ver:

- ✅ **0 erros** na aba "Errors" do Supabase
- ✅ **Ícones de escudo** ativos em todas as tabelas
- ✅ **Segurança** aplicada automaticamente

## 🔒 **O QUE O SCRIPT FAZ**

### **1. Habilita RLS em todas as tabelas**

- `ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;`
- `ALTER TABLE public.equipments ENABLE ROW LEVEL SECURITY;`
- E assim por diante...

### **2. Cria políticas de segurança**

- **Usuários**: Veem apenas seus próprios dados
- **Equipamentos**: Visíveis para todos, modificáveis apenas por admins
- **Categorias**: Visíveis para todos, modificáveis apenas por admins
- **Orçamentos**: Usuários veem os próprios, admins veem todos
- **Configurações**: Apenas admins podem acessar

### **3. Protege dados sensíveis**

- **NextAuth tables**: Apenas admins podem acessar
- **Configurações**: Apenas admins podem modificar
- **Dados pessoais**: Cada usuário vê apenas os próprios

## ⚠️ **IMPORTANTE - ANTES DE EXECUTAR**

### **✅ Verificações necessárias:**

- [ ] Você tem acesso de admin ao Supabase
- [ ] O projeto está funcionando normalmente
- [ ] Você fez backup dos dados (se possível)

### **🚨 O que acontece após executar:**

- **RLS será ativado** em todas as tabelas
- **Políticas de segurança** serão criadas
- **Acesso aos dados** será restringido por role
- **APIs continuarão funcionando** normalmente

## 🔍 **VERIFICAÇÃO APÓS EXECUÇÃO**

### **1. Verificar Status das Tabelas**

Vá em **"Database" > "Tables"** e confirme que:

- Todas as tabelas têm o **ícone de escudo** ativo
- Não há mais erros na aba "Errors"

### **2. Testar Funcionalidades**

- ✅ **Página inicial**: Deve carregar normalmente
- ✅ **Catálogo**: Equipamentos devem aparecer
- ✅ **Login**: Deve funcionar normalmente
- ✅ **Admin**: Deve ter acesso total

### **3. Verificar Logs**

- Vá em **"Logs"** no menu lateral
- Verifique se não há erros de permissão
- Confirme que as queries estão funcionando

## 🚀 **RESULTADO ESPERADO**

Após executar o script, você deve ver:

```
📊 VERIFICAÇÃO FINAL
============================================
✅ RLS ATIVO em todas as 12 tabelas
✅ 25+ políticas de segurança criadas
✅ 0 erros na aba "Errors"
✅ Segurança aplicada automaticamente
```

## 🆘 **SE ALGO DER ERRADO**

### **1. Reverter RLS (se necessário)**

```sql
-- Desabilitar RLS em uma tabela específica
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Remover todas as políticas
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
```

### **2. Verificar Logs de Erro**

- Vá em **"Logs"** no Supabase
- Procure por erros relacionados ao script
- Verifique se todas as tabelas existem

### **3. Contato para Suporte**

- Verifique se o schema está correto
- Confirme se as tabelas têm os nomes exatos
- Teste em uma tabela por vez se necessário

## 📚 **ARQUIVOS CRIADOS**

1. **`supabase-rls-fix.sql`** - Script SQL completo
2. **`SUPABASE-RLS-FIX-GUIDE.md`** - Este guia

## 🎯 **PRÓXIMOS PASSOS**

1. **Execute o script** no SQL Editor do Supabase
2. **Verifique o resultado** na aba "Errors"
3. **Teste as funcionalidades** do site
4. **Monitore os logs** por alguns dias
5. **Comemore** - seu projeto estará 100% seguro! 🎉

---

**⚠️ IMPORTANTE**: Este script resolve TODOS os 12 erros de RLS de uma vez.
Execute com confiança!
