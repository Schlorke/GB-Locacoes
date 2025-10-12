# 🔧 Exemplo de Configuração OAuth - GB Locações

> **Guia prático com exemplos reais para configurar autenticação social**

## 📋 Checklist Rápido

### ✅ **1. Variáveis de Ambiente**

Crie o arquivo `.env.local` na raiz do projeto:

```bash
# NextAuth (OBRIGATÓRIO)
NEXTAUTH_SECRET="sua-chave-secreta-32-caracteres"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (OBRIGATÓRIO)
GOOGLE_CLIENT_ID="123456789-abcdefghijklmnop.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-abcdefghijklmnopqrstuvwxyz"

# Facebook OAuth (OBRIGATÓRIO)
FACEBOOK_CLIENT_ID="123456789012345"
FACEBOOK_CLIENT_SECRET="abcdefghijklmnopqrstuvwxyz123456"
```

### ✅ **2. URLs de Redirecionamento**

#### **Google Cloud Console**

```
Authorized JavaScript origins:
- http://localhost:3000
- https://seudominio.com

Authorized redirect URIs:
- http://localhost:3000/api/auth/callback/google
- https://seudominio.com/api/auth/callback/google
```

#### **Facebook Developers**

```
Valid OAuth Redirect URIs:
- http://localhost:3000/api/auth/callback/facebook
- https://seudominio.com/api/auth/callback/facebook
```

### ✅ **3. Teste Rápido**

Após configurar, teste no navegador:

1. Acesse `http://localhost:3000/login`
2. Clique em "Google" ou "Facebook"
3. Complete a autorização
4. Verifique se foi redirecionado para `/area-cliente`

---

## 🚨 **Problemas Comuns e Soluções**

### **Erro: "Invalid redirect_uri"**

**Causa**: URL não configurada corretamente

**Solução**:

```bash
# Verifique se as URLs estão EXATAMENTE iguais:

# No Google Cloud Console:
http://localhost:3000/api/auth/callback/google

# No Facebook Developers:
http://localhost:3000/api/auth/callback/facebook

# ⚠️ IMPORTANTE: Sem barra no final, com protocolo correto
```

### **Erro: "App not verified" (Google)**

**Solução para Desenvolvimento**:

1. Vá em **OAuth consent screen**
2. Adicione **Test users**:
   ```
   Test users:
   - seu@email.com
   - outro@email.com
   ```

### **Erro: "App in development mode" (Facebook)**

**Solução**:

1. Vá em **App Review > Roles**
2. Adicione **Testers**:
   ```
   Testers:
   - seu@email.com
   - outro@email.com
   ```

### **Erro: "Environment variables missing"**

**Verificação**:

```bash
# No terminal, dentro do projeto:
echo $GOOGLE_CLIENT_ID
echo $FACEBOOK_CLIENT_ID
echo $NEXTAUTH_SECRET

# Deve retornar os valores configurados
```

---

## 🔧 **Configuração de Produção**

### **1. Atualizar URLs**

```bash
# .env.production
NEXTAUTH_URL="https://seudominio.com"

# Google Cloud Console - Adicionar:
https://seudominio.com/api/auth/callback/google

# Facebook Developers - Adicionar:
https://seudominio.com/api/auth/callback/facebook
```

### **2. Verificação do App**

#### **Google**

- Submeta para verificação (opcional para apps pequenos)
- Ou mantenha em modo de teste com usuários específicos

#### **Facebook**

- Para apps públicos, submeta para verificação
- Ou mantenha em modo desenvolvimento com testers

---

## 📱 **Teste em Dispositivos**

### **Desktop**

```bash
# Teste no Chrome/Firefox/Safari
http://localhost:3000/login
```

### **Mobile (Emulador)**

```bash
# Android Studio / Xcode
http://10.0.2.2:3000/login  # Android
http://localhost:3000/login  # iOS
```

### **Dispositivo Real**

```bash
# Use o IP da sua máquina
http://192.168.1.100:3000/login
```

---

## 🎯 **Validação Final**

### **Checklist de Funcionamento**

- [ ] ✅ Botão Google abre popup/redireciona
- [ ] ✅ Botão Facebook abre popup/redireciona
- [ ] ✅ Autorização é solicitada corretamente
- [ ] ✅ Callback retorna para `/area-cliente`
- [ ] ✅ Usuário é criado no banco automaticamente
- [ ] ✅ Dados do perfil são sincronizados
- [ ] ✅ Login subsequente funciona
- [ ] ✅ Logout funciona corretamente

### **Logs de Debug**

Para ativar logs detalhados:

```bash
# .env.local
NEXTAUTH_DEBUG=true
```

Logs aparecerão no terminal do servidor Next.js.

---

## 🔗 **Links Úteis**

- **Google Cloud Console**: https://console.cloud.google.com/
- **Facebook Developers**: https://developers.facebook.com/
- **NextAuth Docs**: https://next-auth.js.org/
- **OAuth 2.0 Spec**: https://tools.ietf.org/html/rfc6749

---

_Última atualização: janeiro 2025 | Versão: 1.0_
