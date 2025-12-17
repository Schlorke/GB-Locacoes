# 🎓 Guia Passo a Passo para Iniciantes - Teste de Boletos Asaas

> **Guia super detalhado para quem nunca usou Postman ou APIs antes**

## 📚 **O que você vai aprender**

- Como usar o Postman para fazer requisições
- Como obter seu token de autenticação
- Como gerar um boleto
- Como simular webhooks
- Como verificar se tudo funcionou

---

## 🚀 **PASSO 1: Preparar o Postman**

### **1.1 - Abrir o Postman**

1. Abra o Postman (já está aberto na sua tela)
2. Você verá a tela inicial "My Workspace"

### **1.2 - Criar uma Collection (Pasta para organizar)**

1. No lado esquerdo, clique em **"Collections"** (já está selecionado)
2. Clique no botão **"New"** (canto superior esquerdo)
3. Selecione **"Collection"**
4. Nomeie como: **"Testes Boletos Asaas"**
5. Clique em **"Create"**

✅ **Pronto!** Agora você tem uma pasta para guardar seus testes.

---

## 🔑 **PASSO 2: Obter seu Token de Autenticação**

### **Opção A: Usar Cookie (Mais Fácil)**

1. Abra seu navegador (Chrome, Edge, etc.)
2. Acesse: `https://locacoesgb.com.br/login`
3. Faça login com sua conta
4. Após logar, pressione **F12** (abre o DevTools)
5. Vá na aba **"Application"** (ou "Aplicativo")
6. No menu esquerdo, expanda **"Cookies"**
7. Clique em `https://locacoesgb.com.br`
8. Procure pelo cookie chamado **`next-auth.session-token`**
9. **Copie o valor** (é uma string longa)

📝 **Anote este valor!** Você vai usar em todas as requisições.

### **Opção B: Usar Bearer Token (Alternativa)**

Se você tem um token JWT/Bearer, pode usar também. Mas vamos focar no Cookie que
é mais simples.

---

## 🔍 **PASSO 2.5: Entender rentalId e quoteId**

### **O que é cada um?**

**🏠 rentalId (ID da Locação):**

- É o ID de uma **locação já criada** no sistema
- Uma locação é quando um cliente já alugou equipamentos
- Status pode ser: `PENDING`, `ACTIVE`, `COMPLETED`, etc.
- **Use quando:** Você quer gerar um boleto para uma locação que já existe

**📋 quoteId (ID do Orçamento):**

- É o ID de um **orçamento** (solicitação de orçamento)
- Um orçamento é uma solicitação que ainda não virou locação
- Status pode ser: `PENDING`, `APPROVED`, `REJECTED`, `COMPLETED`
- **Use quando:** Você quer gerar um boleto de **depósito de garantia** antes da
  locação ser criada

### **📍 Onde encontrar o rentalId?**

**Método 1: Pelo Painel Admin (Mais Fácil)**

1. Acesse: `https://locacoesgb.com.br/admin/rentals`
2. Você verá uma lista de locações
3. Clique em uma locação para abrir os detalhes
4. O **ID aparece na URL** ou nos detalhes da locação
   - Exemplo de URL: `https://locacoesgb.com.br/admin/rentals/rental_123456789`
   - O ID é: `rental_123456789`

**Método 2: Pela API (Avançado)**

1. No Postman, crie uma requisição:
   - Método: **GET**
   - URL: `https://locacoesgb.com.br/api/admin/rentals`
   - Headers: Adicione seu Cookie (mesmo do Passo 2)
2. Clique em **"Send"**
3. Você verá uma lista de locações com seus IDs

**Método 3: No Banco de Dados (Se tiver acesso)**

```sql
SELECT id, status, total, startdate, enddate
FROM "rentals"
ORDER BY createdat DESC
LIMIT 10;
```

### **📋 Onde encontrar o quoteId?**

**Método 1: Pelo Painel Admin (Mais Fácil)**

1. Acesse: `https://locacoesgb.com.br/admin/orcamentos`
2. Você verá uma lista de orçamentos
3. Clique em um orçamento para abrir os detalhes
4. O **ID aparece nos detalhes** (campo "ID do Orçamento")
   - Exemplo: `quote_abc123xyz`

**Método 2: Pela API (Avançado)**

1. No Postman, crie uma requisição:
   - Método: **GET**
   - URL: `https://locacoesgb.com.br/api/admin/quotes`
   - Headers: Adicione seu Cookie (mesmo do Passo 2)
2. Clique em **"Send"**
3. Você verá uma lista de orçamentos com seus IDs

**Método 3: No Banco de Dados (Se tiver acesso)**

```sql
SELECT id, name, email, status, total
FROM "Quote"
ORDER BY "createdAt" DESC
LIMIT 10;
```

### **💡 Qual usar?**

**Use `rentalId` quando:**

- ✅ Você já tem uma locação criada
- ✅ Quer gerar boleto para pagar uma locação existente
- ✅ A locação já está no sistema

**Use `quoteId` quando:**

- ✅ Você tem apenas um orçamento (ainda não virou locação)
- ✅ Quer gerar boleto de **depósito de garantia**
- ✅ O cliente ainda não confirmou a locação

**⚠️ IMPORTANTE:**

- Você **NÃO precisa** dos dois ao mesmo tempo
- Use **OU** `rentalId` **OU** `quoteId`
- Se usar `rentalId`, deixe `quoteId` vazio (ou não inclua no JSON)
- Se usar `quoteId`, deixe `rentalId` vazio (ou não inclua no JSON)

### **🎯 Exemplo Prático**

**Cenário 1: Tenho uma locação criada**

```json
{
  "rentalId": "rental_1734567890_abc123",
  "amount": 1500.0,
  ...
}
```

**Cenário 2: Tenho apenas um orçamento**

```json
{
  "quoteId": "quote_xyz789",
  "amount": 500.0,
  ...
}
```

---

## 📝 **PASSO 3: Criar a Primeira Requisição - Gerar Boleto**

### **3.1 - Criar Nova Requisição**

1. No Postman, clique com botão direito na Collection **"Testes Boletos Asaas"**
2. Selecione **"Add Request"**
3. Nomeie como: **"1. Gerar Boleto"**

### **3.2 - Configurar o Método e URL**

1. No topo da requisição, você verá um dropdown com **"GET"**
2. **Mude para "POST"** (clique no dropdown e selecione POST)
3. Na barra de URL, digite:
   ```
   https://locacoesgb.com.br/api/payments/boleto/generate
   ```

### **3.3 - Adicionar Headers (Cabeçalhos)**

1. Clique na aba **"Headers"** (abaixo da URL)
2. Você verá uma tabela com duas colunas: **Key** e **Value**

**Adicione estes headers:**

| Key            | Value                                     |
| -------------- | ----------------------------------------- |
| `Content-Type` | `application/json`                        |
| `Cookie`       | `next-auth.session-token=SEU_COOKIE_AQUI` |

⚠️ **IMPORTANTE:** Substitua `SEU_COOKIE_AQUI` pelo valor do cookie que você
copiou no Passo 2!

**Como adicionar:**

- Clique em **"Add Header"** ou na linha vazia
- Digite `Content-Type` na coluna Key
- Digite `application/json` na coluna Value
- Repita para o Cookie

### **3.4 - Adicionar Body (Corpo da Requisição)**

1. Clique na aba **"Body"** (ao lado de Headers)
2. Selecione a opção **"raw"** (botão de opção)
3. No dropdown ao lado de "raw", selecione **"JSON"**
4. Cole o seguinte JSON:

```json
{
  "rentalId": "SEU_RENTAL_ID_AQUI",
  "amount": 1500.0,
  "dueDate": "2025-02-15T00:00:00.000Z",
  "description": "Pagamento de locação de equipamentos",
  "customerName": "João da Silva",
  "customerDocument": "12345678900",
  "customerEmail": "joao@example.com"
}
```

⚠️ **IMPORTANTE:**

- Substitua `SEU_RENTAL_ID_AQUI` pelo ID real de uma locação de teste!
- **OU** substitua `SEU_QUOTE_ID_AQUI` pelo ID de um orçamento
- **Não use os dois ao mesmo tempo!** Use apenas um.

**📌 Não sabe onde encontrar?** Veja o **Passo 2.5** acima com instruções
detalhadas!

**OU** se você tem um `quoteId`:

```json
{
  "quoteId": "SEU_QUOTE_ID_AQUI",
  "amount": 1500.0,
  "dueDate": "2025-02-15T00:00:00.000Z",
  "description": "Depósito de garantia",
  "customerName": "João da Silva",
  "customerDocument": "12345678900",
  "customerEmail": "joao@example.com"
}
```

### **3.5 - Explicação dos Campos**

- **`rentalId`** ou **`quoteId`**: ID da locação ou orçamento (escolha um)
- **`amount`**: Valor do boleto (ex: 1500.0 = R$ 1.500,00)
- **`dueDate`**: Data de vencimento (formato: `YYYY-MM-DDTHH:mm:ss.sssZ`)
- **`description`**: Descrição do pagamento
- **`customerName`**: Nome do cliente
- **`customerDocument`**: CPF ou CNPJ (apenas números)
- **`customerEmail`**: Email do cliente

### **3.6 - Enviar a Requisição**

1. Clique no botão azul **"Send"** (canto superior direito)
2. Aguarde alguns segundos...

### **3.7 - Verificar a Resposta**

Você verá a resposta na parte inferior da tela:

**✅ Se deu certo (Status 200):**

```json
{
  "payment": {
    "id": "payment_abc123",
    "transactionId": "pay_123456789",
    "status": "PENDING",
    ...
  },
  "boleto": {
    "digitableLine": "34191.09008...",
    "pdfUrl": "https://sandbox.asaas.com/...",
    ...
  }
}
```

📝 **ANOTE ESTES VALORES:**

- `payment.id` → Exemplo: `payment_abc123`
- `payment.transactionId` → Exemplo: `pay_123456789`
- `boleto.digitableLine` → Linha digitável do boleto
- `boleto.pdfUrl` → Link para baixar o PDF

**❌ Se deu erro:**

- **401 Unauthorized**: Cookie inválido ou expirado → Faça login novamente
- **400 Validation error**: Algum campo está faltando ou inválido → Verifique o
  JSON
- **500 Internal server error**: Erro no servidor → Verifique os logs

---

## 📨 **PASSO 4: Simular Webhook - Pagamento Recebido**

### **4.1 - Criar Nova Requisição**

1. Clique com botão direito na Collection
2. Selecione **"Add Request"**
3. Nomeie como: **"2. Webhook - Pagamento Pago"**

### **4.2 - Configurar Método e URL**

1. Método: **POST**
2. URL:
   ```
   https://locacoesgb.com.br/api/payments/asaas/webhook
   ```

### **4.3 - Adicionar Headers**

| Key            | Value                           |
| -------------- | ------------------------------- |
| `Content-Type` | `application/json`              |
| `access_token` | `SEU_ASAAS_WEBHOOK_SECRET_AQUI` |

⚠️ **IMPORTANTE:**

- `SEU_ASAAS_WEBHOOK_SECRET_AQUI` é o valor da variável de ambiente
  `ASAAS_WEBHOOK_SECRET`
- Você pode encontrar no arquivo `.env` do projeto ou nas configurações do
  servidor

### **4.4 - Adicionar Body**

1. Aba **"Body"**
2. Selecione **"raw"** → **"JSON"**
3. Cole este JSON:

```json
{
  "event": "PAYMENT_RECEIVED",
  "payment": {
    "id": "pay_123456789",
    "customer": "cus_abc123",
    "value": 1500.0,
    "netValue": 1500.0,
    "originalValue": 1500.0,
    "interestValue": 0.0,
    "description": "Pagamento de locação de equipamentos",
    "billingType": "BOLETO",
    "status": "RECEIVED",
    "dueDate": "2025-02-15",
    "originalDueDate": "2025-02-15",
    "paymentDate": "2025-02-10",
    "clientPaymentDate": "2025-02-10",
    "invoiceUrl": "https://sandbox.asaas.com/...",
    "bankSlipUrl": "https://sandbox.asaas.com/...",
    "transactionReceiptUrl": null,
    "invoiceNumber": "001234",
    "externalReference": null,
    "deleted": false,
    "anticipated": false,
    "anticipable": false,
    "refund": null,
    "chargeback": null,
    "creditDate": "2025-02-10",
    "estimatedCreditDate": "2025-02-10",
    "nossoNumero": "123456789",
    "bankSlipBarcode": "34191...",
    "identificationField": "34191.09008..."
  }
}
```

⚠️ **CRÍTICO:**

- Substitua `"id": "pay_123456789"` pelo `transactionId` que você anotou no
  Passo 3!
- Este é o ID que veio na resposta do boleto gerado

### **4.5 - Enviar e Verificar**

1. Clique em **"Send"**
2. **Resposta esperada (Status 200):**

```json
{
  "success": true
}
```

✅ **Se retornou `success: true`, o webhook foi processado!**

### **4.6 - Verificar no Banco de Dados (Opcional)**

Se você tem acesso ao banco:

```sql
SELECT id, status, "paidAt", "transactionId"
FROM "Payment"
WHERE id = 'payment_abc123';
```

- `status` deve ser `PAID`
- `paidAt` deve estar preenchido

---

## ⏰ **PASSO 5: Simular Webhook - Boleto Vencido**

### **5.1 - Criar Nova Requisição**

1. **"Add Request"**
2. Nomeie: **"3. Webhook - Boleto Vencido"**

### **5.2 - Configurar**

1. Método: **POST**
2. URL: `https://locacoesgb.com.br/api/payments/asaas/webhook`
3. Headers (mesmos do Passo 4):
   - `Content-Type`: `application/json`
   - `access_token`: `SEU_ASAAS_WEBHOOK_SECRET_AQUI`

### **5.3 - Body**

```json
{
  "event": "PAYMENT_OVERDUE",
  "payment": {
    "id": "pay_123456789",
    "customer": "cus_abc123",
    "value": 1500.0,
    "netValue": 1500.0,
    "description": "Pagamento de locação de equipamentos",
    "billingType": "BOLETO",
    "status": "OVERDUE",
    "dueDate": "2025-02-15",
    "originalDueDate": "2025-02-15",
    "paymentDate": null,
    "clientPaymentDate": null,
    "invoiceUrl": "https://sandbox.asaas.com/...",
    "bankSlipUrl": "https://sandbox.asaas.com/...",
    "bankSlipBarcode": "34191...",
    "identificationField": "34191.09008..."
  }
}
```

⚠️ **Lembre-se:** Use o mesmo `transactionId` do Passo 3!

### **5.4 - Enviar**

1. **"Send"**
2. Resposta esperada: `{"success": true}`

✅ **O pagamento agora deve estar como `OVERDUE` no banco.**

---

## ❌ **PASSO 6: Simular Webhook - Cancelado**

### **6.1 - Criar Requisição**

1. **"Add Request"**
2. Nomeie: **"4. Webhook - Cancelado"**

### **6.2 - Configurar**

1. Método: **POST**
2. URL: `https://locacoesgb.com.br/api/payments/asaas/webhook`
3. Headers (mesmos anteriores)

### **6.3 - Body (Cancelado)**

```json
{
  "event": "PAYMENT_DELETED",
  "payment": {
    "id": "pay_123456789",
    "customer": "cus_abc123",
    "value": 1500.0,
    "description": "Pagamento de locação de equipamentos",
    "billingType": "BOLETO",
    "status": "CANCELLED",
    "dueDate": "2025-02-15",
    "deleted": true
  }
}
```

### **6.4 - Body (Estornado - Alternativa)**

Se quiser testar estorno:

```json
{
  "event": "PAYMENT_REFUNDED",
  "payment": {
    "id": "pay_123456789",
    "customer": "cus_abc123",
    "value": 1500.0,
    "description": "Pagamento de locação de equipamentos",
    "billingType": "BOLETO",
    "status": "REFUNDED",
    "dueDate": "2025-02-15",
    "refund": {
      "value": 1500.0,
      "date": "2025-02-12",
      "status": "COMPLETED"
    }
  }
}
```

---

## 🔍 **PASSO 7: Verificação Manual (Conciliação)**

### **7.1 - Criar Requisição**

1. **"Add Request"**
2. Nomeie: **"5. Verificar Pagamento (Admin)"**

### **7.2 - Configurar**

1. Método: **POST**
2. URL: `https://locacoesgb.com.br/api/payments/boleto/verify`
3. Headers:
   - `Content-Type`: `application/json`
   - `Cookie`: `next-auth.session-token=SEU_COOKIE_ADMIN_AQUI`

⚠️ **IMPORTANTE:**

- Use o cookie de um usuário **ADMIN**
- Este endpoint só funciona para admins!

### **7.3 - Body**

```json
{
  "paymentId": "payment_abc123"
}
```

⚠️ **Use o `payment.id` que você anotou no Passo 3!**

### **7.4 - Enviar e Verificar**

1. **"Send"**
2. Resposta esperada:

```json
{
  "payment": {
    "id": "payment_abc123",
    "status": "PAID",
    "amount": "1500.00",
    "method": "BOLETO",
    "transactionId": "pay_123456789",
    "paidAt": "2025-02-10T10:30:00.000Z"
  },
  "verification": {
    "status": "paid",
    "paidAt": "2025-02-10T10:30:00.000Z",
    "amount": 1500.0
  }
}
```

✅ **Isso sincroniza o status local com o Asaas!**

---

## 📊 **PASSO 8: Verificar no Painel Admin**

### **8.1 - Verificar Pagamento**

1. Acesse: `https://locacoesgb.com.br/admin/payments`
2. Procure pelo pagamento que você criou
3. Verifique:
   - Status está correto?
   - Data de pagamento está preenchida?
   - Link para PDF do boleto funciona?

### **8.2 - Verificar Locação**

1. Acesse: `https://locacoesgb.com.br/admin/rentals`
2. Abra a locação que você usou
3. Verifique:
   - Se o pagamento aparece na lista
   - Se a locação foi ativada (status `ACTIVE`) após pagamento

---

## 🎯 **Checklist Final**

Marque cada item conforme você testa:

### **✅ Geração de Boleto**

- [ ] Requisição retornou Status 200
- [ ] Anotei o `payment.id`
- [ ] Anotei o `transactionId`
- [ ] Anotei a `digitableLine`
- [ ] Anotei o `pdfUrl`

### **✅ Webhook Pago**

- [ ] Webhook retornou `{"success": true}`
- [ ] Payment está como `PAID` no banco
- [ ] Locação foi ativada (se todos pagamentos pagos)

### **✅ Webhook Vencido**

- [ ] Webhook retornou `{"success": true}`
- [ ] Payment está como `OVERDUE` no banco

### **✅ Webhook Cancelado/Refund**

- [ ] Webhook retornou `{"success": true}`
- [ ] Payment está como `CANCELLED` ou `REFUNDED`

### **✅ Verificação Manual**

- [ ] Endpoint retornou Status 200
- [ ] Status foi sincronizado com Asaas

---

## 🚨 **Problemas Comuns e Soluções**

### **Erro 401 - Unauthorized**

**Causa:** Cookie expirado ou inválido

**Solução:**

1. Faça login novamente no navegador
2. Copie o novo cookie
3. Atualize o header na requisição

### **Erro 400 - Validation error**

**Causa:** Algum campo está faltando ou inválido

**Solução:**

1. Verifique se todos os campos obrigatórios estão preenchidos
2. Verifique se as datas estão no formato correto
3. Verifique se os valores numéricos estão corretos

### **Erro 404 - Payment not found (no webhook)**

**Causa:** `transactionId` não existe no banco

**Solução:**

1. Verifique se você usou o `transactionId` correto
2. Verifique se o boleto foi gerado com sucesso antes
3. Confira se o `transactionId` está salvo no banco

### **Webhook retorna 401 - Invalid webhook token**

**Causa:** Token `ASAAS_WEBHOOK_SECRET` incorreto

**Solução:**

1. Verifique se o token está correto no header
2. Confirme o valor da variável `ASAAS_WEBHOOK_SECRET` no servidor

---

## 💡 **Dicas Importantes**

1. **Sempre anote os IDs:** `payment.id` e `transactionId` são essenciais!
2. **Use o mesmo transactionId:** Nos webhooks, sempre use o `transactionId` do
   boleto gerado
3. **Verifique os logs:** Se algo der errado, verifique os logs do servidor
4. **Teste em ordem:** Siga a ordem dos passos para não se perder
5. **Salve suas requisições:** Use a Collection do Postman para organizar

---

## 📚 **Próximos Passos**

Depois de dominar estes testes básicos, você pode:

1. Testar outros eventos de webhook
2. Criar testes automatizados
3. Integrar com outros sistemas
4. Ler o guia avançado: `docs/guides/asaas-boleto-testing.md`

---

**Última atualização:** Dezembro 2025 **Versão:** 1.0.0 - Para Iniciantes
