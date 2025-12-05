# 📧 Templates de Email - Referência Rápida

> **Versão**: 2.0.0 | **Status**: ✅ Produção | **Compatibilidade**: 100%

---

## ⚡ Uso Rápido

### **Formulário de Contato Simples**

```typescript
import { generateContactEmailHTML } from "@/lib/email-templates"

const html = generateContactEmailHTML({
  name: "Nome do Cliente",
  email: "cliente@email.com",
  phone: "51999887766",
  message: "Mensagem aqui",
  // Opcionais:
  company: "Nome da Empresa",
  equipment: "Equipamento de Interesse",
  cpf: "123.456.789-00",
  cnpj: "12.345.678/0001-90"
})
```

### **Orçamento Completo**

```typescript
import { generateQuoteEmailHTML } from "@/lib/email-templates"

const html = generateQuoteEmailHTML(
  {
    customerName: "Nome do Cliente",
    customerEmail: "cliente@email.com",
    customerPhone: "51999887766",
    customerCompany: "Empresa (opcional)",
    message: "Mensagem (opcional)"
  },
  [
    {
      name: "Andaime Suspenso 10m",
      category: "Andaimes",
      quantity: 2,
      days: 15,
      pricePerDay: 120.0,
      total: 3600.0
    }
  ],
  3600.0,
  "quoteId123"
)
```

---

## 🎨 Padrões de Design

### **Cores**

```css
/* Header */
Background: linear-gradient(135deg, #334155, #475569)
Logo: linear-gradient(135deg, #f97316, #ea580c, #c2410c)
Texto: #ffffff

/* "Orçamento" */
Color: #ffd700
Glow: 0 0 20px rgba(255,215,0,0.8), 0 0 30px rgba(255,215,0,0.5)

/* Card */
Background: #ffffff
Shadow: 0 4px 12px rgba(0,0,0,0.05)
```

### **Emojis**

```
👤 Nome       ✉️ Email      📞 Telefone
📄 CPF        📋 CNPJ       🏢 Empresa
🛠️ Equipamento  💬 Mensagem   🎯 Alvo
⏰ Data/Hora  📦 Produtos
```

---

## ✅ Checklist de Validação

- [ ] Header com texto branco (#ffffff)
- [ ] Logo GB sem glow
- [ ] "Orçamento" com glow dourado
- [ ] Emojis visíveis em todos os ícones
- [ ] Sombra sutil no card
- [ ] Layout 2 colunas no header
- [ ] Links clicáveis (email, tel)
- [ ] Responsivo

---

## ⚠️ Regras Críticas

### **✅ SEMPRE:**

1. Use `<table>` para layout
2. Use emojis (não SVG)
3. Use `#ffffff` (não rgba)
4. Use inline styles
5. Teste em Gmail + Outlook

### **❌ NUNCA:**

1. Não use flexbox/grid
2. Não use SVG inline
3. Não use rgba() em texto
4. Não use CSS externo
5. Não use position absolute

---

## 📁 Arquivos Principais

```
lib/email-templates.ts          # Geradores de HTML ⭐
app/api/contact/route.ts        # API contato
app/api/orcamentos/route.ts     # API orçamentos homepage
app/api/quotes/route.ts         # API orçamentos /orcamento
public/email-templates/         # Template base para edição visual
docs/features/email-templates.md # Documentação completa
```

---

## 🔧 Troubleshooting Rápido

| Problema              | Solução                             |
| --------------------- | ----------------------------------- |
| Texto preto no header | Usar `#ffffff` ao invés de `rgba()` |
| Ícones não aparecem   | Usar emojis ao invés de SVG         |
| Layout quebrado       | Usar `<table>` ao invés de divs     |
| Sombra não aparece    | Normal - é enhancement progressivo  |

---

## 📚 Documentação Completa

- [Guia Completo](./email-templates.md)
- [Sistema de Orçamentos](./quote-email-system.md)
- [Design System](./design-system.md)

---

**Última atualização**: Dezembro 2024
