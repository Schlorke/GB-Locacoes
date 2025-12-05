# 📧 Templates de Email - GB Locações

## 🎯 Como Usar Este Template

### **Passo 1: Visualizar no Navegador**

Abra o arquivo no seu navegador:

```
http://localhost:3000/email-templates/quote-template.html
```

Ou abra diretamente o arquivo:

```
public/email-templates/quote-template.html
```

---

### **Passo 2: Editar Visualmente**

1. Abra `quote-template.html` no seu editor
2. Modifique:
   - **Cores** (seção `<style>`)
   - **Textos** (dentro das tags HTML)
   - **Espaçamentos** (padding, margin, gap)
   - **Fontes** (font-size, font-weight)
3. Salve e recarregue o navegador
4. Repita até ficar perfeito

---

### **Passo 3: Aplicar nos Arquivos de API**

Quando terminar as edições, copie o HTML e atualize nos arquivos:

#### **1. Formulário de Contato** (`/api/contact`)

```
Arquivo: app/api/contact/route.ts
Função: Linha 49 (dentro do resend.emails.send)
```

#### **2. Formulário da Homepage** (`/api/orcamentos`)

```
Arquivo: app/api/orcamentos/route.ts
Função: generateQuoteEmailHTML() (linha ~120)
```

#### **3. Formulário de Orçamento** (`/api/quotes`)

```
Arquivo: app/api/quotes/route.ts
Função: generateQuoteEmailHTML() (linha ~305)
```

---

## 🎨 Seções do Template

### **📌 Seções Sempre Presentes:**

- Header (Logo + Título + Data)
- Dados do Cliente (Nome, Email, Telefone)
- Mensagem do Cliente
- Footer (Instruções + Copyright)

### **📌 Seções Condicionais:**

- Informações Adicionais (Empresa, Equipamento)
- Documentação (CPF, CNPJ)
- Equipamentos Solicitados (Tabela) - _Só orçamentos completos_
- Valor Total - _Só orçamentos completos_

---

## 🔧 Customizações Comuns

### **Mudar Cor do Header:**

```css
.header {
  background: linear-gradient(135deg, #NOVA_COR_1 0%, #NOVA_COR_2 100%);
}
```

### **Mudar Cores dos Cards:**

```css
.info-card.primary {
  background: linear-gradient(135deg, #COR_1 0%, #COR_2 100%);
  border-color: #COR_BORDA;
}
```

### **Mudar Tamanho da Fonte do Total:**

```css
.total-value {
  font-size: 40px; /* Era 32px */
}
```

### **Adicionar Nova Seção:**

```html
<div class="divider"></div>
<div class="section-title">🆕 Sua Nova Seção</div>
<div class="info-grid">
  <div class="info-card">
    <div class="info-label">Novo Campo</div>
    <div class="info-value">Valor aqui</div>
  </div>
</div>
```

---

## 🚀 Workflow Recomendado

```
1. Editar quote-template.html
   ↓
2. Visualizar no navegador
   ↓
3. Ajustar até ficar perfeito
   ↓
4. Copiar HTML do <body> até </body>
   ↓
5. Colar nas funções generateQuoteEmailHTML()
   ↓
6. Substituir dados estáticos por variáveis ${...}
   ↓
7. Testar enviando formulário
   ↓
8. Verificar email recebido
   ↓
9. Repetir se necessário
```

---

## 📝 Variáveis Disponíveis

### **Dados do Cliente:**

- `${validatedData.name}` - Nome completo
- `${validatedData.email}` - Email
- `${validatedData.phone}` - Telefone
- `${validatedData.company}` - Empresa (opcional)
- `${validatedData.equipment}` - Equipamento (opcional)
- `${validatedData.cpf}` - CPF (opcional)
- `${validatedData.cnpj}` - CNPJ (opcional)
- `${validatedData.message}` - Mensagem

### **Equipamentos** (só orçamentos completos):

```javascript
${equipments.map(eq => `
  <tr class="equipment-row">
    <td>
      <div class="equipment-name">${eq.name}</div>
      <div class="equipment-category">📂 ${eq.category}</div>
      <div class="equipment-details">
        ${eq.quantity}x · ${eq.days} dia(s) · ${formatCurrency(eq.pricePerDay)}/dia
      </div>
    </td>
    <td>
      <div class="equipment-price">${formatCurrency(eq.total)}</div>
    </td>
  </tr>
`).join('')}
```

### **Valores:**

- `${formatCurrency(totalAmount)}` - Valor total formatado
- `${new Date().toLocaleString('pt-BR')}` - Data/hora atual
- `${quoteId.slice(-8).toUpperCase()}` - ID curto do orçamento

---

## 🎯 Dicas de Edição

1. **Teste responsividade**: Reduza a janela do browser para ver no mobile
2. **Use dados reais**: Os exemplos no template são realistas
3. **Preserve classes**: Não remova classes CSS, só ajuste valores
4. **Mantenha estrutura**: A estrutura de seções funciona bem
5. **Teste em clientes**: Gmail, Outlook, Apple Mail podem renderizar diferente

---

## 🔍 Testando Mudanças

Depois de aplicar as mudanças, teste enviando os formulários:

1. **http://localhost:3000/contato**
2. **http://localhost:3000/** (formulário da home)
3. **http://localhost:3000/orcamento**

Veja os emails chegando em: `contato@locacoesgb.com.br`

---

**Última atualização**: Dezembro 2024 **Versão**: 1.0.0
