# 🏢 Valores Padrão da Empresa GB Locações

> **CRÍTICO**: Estes são os valores oficiais da empresa que NUNCA devem ser
> perdidos

## 📋 Dados Oficiais da GB Locações

### 📞 Contatos

- **Telefone Fixo**: `(51) 2313-6262`
- **WhatsApp/Celular**: `(51) 99820-5163`
- **E-mail**: `contato@locacoesgb.com.br`

### 📍 Endereço

```
Travessa Doutor Heinzelmann, 365
Humaitá, Porto Alegre/RS
CEP 90240-100
```

### 📝 Sobre Nós (Descrição SEO)

```
Especializada em locação de equipamentos para construção civil em Porto Alegre há mais de 10 anos. Andaimes suspensos, cadeiras elétricas, betoneiras, compressores e equipamentos para altura.
```

### 🎨 Logo

- **Padrão**: Logo "GB" (texto)
- **Configurável via**: `/admin/settings` → Logo da Empresa
- **Quando vazio**: Mostra logo "GB" padrão

---

## 🔧 Como o Sistema Funciona

### 1. **Estado Inicial** (Primeira vez)

Quando o usuário acessa `/admin/settings` pela primeira vez:

```typescript
formData = {
  companyPhone: "(51) 2313-6262", // ✅ Valor padrão
  whatsappNumber: "(51) 99820-5163", // ✅ Valor padrão
  contactEmail: "contato@locacoesgb.com.br", // ✅ Valor padrão
  companyAddress: "Travessa Doutor Heinzelmann...", // ✅ Valor padrão
  aboutUsText: "Especializada em locação...", // ✅ Valor padrão
  companyIconUrl: "" // ✅ Vazio = Logo "GB"
}
```

### 2. **Ao Clicar em "Resetar"**

Todos os campos voltam para os valores padrão acima:

```typescript
getDefaultValues("company") // → Retorna valores padrão
```

### 3. **No Frontend (Header/Footer)**

A aplicação busca os dados via API pública:

```typescript
// Se banco estiver vazio → usa valores padrão
// Se banco tiver dados → usa dados salvos
// Se houver erro → fallback para valores padrão
```

---

## 📁 Arquivos que Garantem os Valores Padrão

| Arquivo                                              | Propósito                    |
| ---------------------------------------------------- | ---------------------------- |
| `app/admin/settings/page.tsx`                        | Estado inicial do formulário |
| `app/admin/settings/page.tsx` → `getDefaultValues()` | Valores para reset           |
| `app/api/settings/public/route.ts`                   | Fallback na API              |
| `hooks/use-public-settings.ts`                       | Fallback no frontend         |
| `scripts/seed-company-default-data.ts`               | Seed para banco de dados     |

---

## 🔒 Garantias de Segurança

### ✅ **Tripla Camada de Proteção**

1. **Camada 1 - Frontend (React State)**:

   ```typescript
   // app/admin/settings/page.tsx
   const [formData, setFormData] = useState({
     companyPhone: "(51) 2313-6262" // ✅ Hardcoded
     // ...
   })
   ```

2. **Camada 2 - API Pública**:

   ```typescript
   // app/api/settings/public/route.ts
   const defaultSettings = {
     companyPhone: "(51) 2313-6262" // ✅ Hardcoded
     // ...
   }
   ```

3. **Camada 3 - Hook Frontend**:
   ```typescript
   // hooks/use-public-settings.ts
   const defaultSettings = {
     companyPhone: "(51) 2313-6262" // ✅ Hardcoded
     // ...
   }
   ```

### ✅ **Resultado:**

**IMPOSSÍVEL** perder os dados da empresa, mesmo que:

- ❌ Banco de dados seja limpo
- ❌ Configurações sejam resetadas
- ❌ Haja erro na API
- ❌ Haja erro no carregamento

---

## 🎯 Locais Onde os Dados Aparecem

### **Telefones**

- ✅ Header (barra superior azul)
- ✅ Footer (seção de contato)
- ✅ WhatsApp FAB (botão flutuante)
- ✅ Structured Data (Schema.org)
- ✅ Preview do Google (settings)

### **Endereço**

- ✅ Footer (seção de contato)
- ✅ Structured Data (Schema.org)
- ✅ Preview do Google (settings)

### **Email**

- ✅ Footer (seção de contato)
- ✅ Structured Data (Schema.org)
- ✅ Preview do Google (settings)

### **Sobre Nós**

- ✅ Structured Data (description do LocalBusiness)
- ✅ Preview do Google (settings)
- ✅ Meta descriptions (futuro)

### **Logo**

- ✅ Header (desktop/mobile)
- ✅ Footer (seção da empresa)
- ✅ Favicon (quando configurado)
- ✅ Open Graph (quando configurado)

---

## 🚀 Como Testar

### **Testar Reset:**

1. Acesse: `http://localhost:3000/admin/settings`
2. Altere qualquer campo (telefone, email, etc.)
3. Clique em "Resetar"
4. ✅ Todos os campos voltam para os valores acima

### **Testar Fallback:**

1. Limpe o banco de dados (opcional)
2. Acesse o site
3. ✅ Header/Footer mostram valores padrão
4. ✅ WhatsApp funciona com número padrão

### **Testar Banco Vazio:**

```bash
npx tsx scripts/seed-company-default-data.ts
```

✅ Valores são criados/atualizados no banco

---

## 📝 Manutenção

### **Para Atualizar Valores Padrão:**

Se os dados da empresa mudarem no futuro, atualize em **4 lugares**:

1. `app/admin/settings/page.tsx` (linha 65 e 410)
2. `app/api/settings/public/route.ts` (linha 19)
3. `hooks/use-public-settings.ts` (linha 14)
4. `scripts/seed-company-default-data.ts` (linha 11)

### **Comando para Aplicar:**

```bash
npx tsx scripts/seed-company-default-data.ts
```

---

## ✅ Status Atual

- [x] Valores padrão definidos em todo o sistema
- [x] Reset funcional
- [x] Fallbacks implementados
- [x] Seed script criado
- [x] Documentação completa
- [x] Testes validados

**Os dados da GB Locações estão 100% protegidos contra perda!** 🛡️

---

_Última atualização: Janeiro 2025_ _Responsável: Sistema de Configurações GB
Locações_
