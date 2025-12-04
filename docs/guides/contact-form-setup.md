# 📧 Configuração do Formulário de Contato

> **Status**: ✅ Implementado (Dezembro 2024) **Funcionalidade**: Envio de
> orçamentos por email usando Resend

## 📋 Visão Geral

O formulário de contato agora captura todos os dados necessários para o negócio
de locação de equipamentos e envia automaticamente por email para
`contato@locacoesgb.com.br`.

## ✅ Campos Capturados

O formulário agora coleta:

- ✅ **Nome Completo** (obrigatório)
- ✅ **Email** (obrigatório)
- ✅ **Telefone** (obrigatório, com máscara)
- ✅ **Empresa/Construtora** (opcional)
- ✅ **Equipamento de Interesse** (opcional)
- ✅ **CPF** (opcional, mas obrigatório se CNPJ vazio)
- ✅ **CNPJ** (opcional, mas obrigatório se CPF vazio)
- ✅ **Mensagem** (obrigatório)

## 🔧 Configuração Obrigatória

### 1. Criar Conta no Resend

1. Acesse [https://resend.com](https://resend.com)
2. Crie uma conta gratuita
3. Verifique seu email

### 2. Adicionar e Verificar Domínio

**IMPORTANTE**: O Resend só permite enviar emails de domínios verificados.

1. No dashboard do Resend, vá em **Domains**
2. Clique em **Add Domain**
3. Adicione o domínio: `locacoesgb.com.br`
4. Configure os registros DNS conforme instruções do Resend:
   - **SPF Record** (TXT)
   - **DKIM Record** (TXT)
   - **DMARC Record** (TXT)
5. Aguarde verificação (pode levar até 48h)

### 3. Obter API Key

1. No dashboard do Resend, vá em **API Keys**
2. Clique em **Create API Key**
3. Dê um nome: "GB Locacoes Production"
4. Copie a chave (começa com `re_`)

### 4. Configurar Variáveis de Ambiente

Crie ou edite o arquivo `.env.local` na raiz do projeto:

```env
# Email Service (OBRIGATÓRIO)
RESEND_API_KEY="re_xxxxxxxxxxxxx"  # Substitua pela sua chave
FROM_EMAIL="contato@locacoesgb.com.br"  # Email verificado no Resend
```

**⚠️ IMPORTANTE**:

- O domínio de `FROM_EMAIL` DEVE estar verificado no Resend
- A API Key deve ter permissões de envio
- Nunca commite o arquivo `.env.local` no Git

### 5. Reiniciar Servidor

Após configurar as variáveis de ambiente:

```bash
# Parar o servidor (Ctrl+C)
# Iniciar novamente
pnpm dev
```

## 🧪 Testando a Funcionalidade

### Teste Local

1. Acesse: `http://localhost:3000/contato`
2. Preencha todos os campos obrigatórios
3. Informe pelo menos CPF ou CNPJ
4. Clique em "Enviar Solicitação"
5. Verifique:
   - ✅ Redirecionamento para `/contato/sucesso`
   - ✅ Email recebido em `contato@locacoesgb.com.br`

### Checklist de Validação

- [ ] Validação: Nome vazio mostra erro
- [ ] Validação: Email inválido mostra erro
- [ ] Validação: Telefone vazio mostra erro
- [ ] Validação: CPF e CNPJ vazios mostra erro
- [ ] Validação: Mensagem vazia mostra erro
- [ ] Máscara: Telefone formata para `(XX) XXXXX-XXXX`
- [ ] Máscara: CPF formata para `XXX.XXX.XXX-XX`
- [ ] Máscara: CNPJ formata para `XX.XXX.XXX/XXXX-XX`
- [ ] Email é enviado com todos os campos preenchidos
- [ ] Email possui formatação HTML bonita
- [ ] Página de sucesso é exibida após envio
- [ ] Rate limiting funciona (máx 10 requests/minuto)

## 📧 Formato do Email Enviado

O email é enviado com:

**Assunto**: `Novo Orçamento - [Nome do Cliente]`

**Conteúdo HTML**: Template profissional com:

- Cabeçalho laranja (identidade visual GB)
- Todos os campos organizados em cards
- Data/hora do recebimento
- Links clicáveis (email, telefone)
- Footer com instruções de resposta

## 🔒 Segurança

Implementações de segurança incluídas:

1. **Rate Limiting**: Máximo 10 requisições por minuto por IP
2. **Validação Zod**: Todos os campos validados no backend
3. **XSS Protection**: HTML escapado no email
4. **API Key**: Nunca exposta no frontend

## ❌ Troubleshooting

### Erro: "Serviço de email indisponível"

**Causa**: Variáveis de ambiente não configuradas

**Solução**:

1. Verifique se `.env.local` existe
2. Confirme que `RESEND_API_KEY` está preenchido
3. Confirme que `FROM_EMAIL` está preenchido
4. Reinicie o servidor

### Erro: "Domain not verified"

**Causa**: Domínio não está verificado no Resend

**Solução**:

1. Acesse dashboard do Resend
2. Vá em **Domains**
3. Verifique status do domínio `locacoesgb.com.br`
4. Se "Pending", aguarde até 48h
5. Se "Failed", reconfigure os registros DNS

### Email não chega

**Possíveis causas**:

1. **Spam**: Verifique a pasta de spam
2. **DNS**: Aguarde propagação DNS (até 48h)
3. **Quota**: Plano gratuito tem limite de 100 emails/dia
4. **API Key inválida**: Verifique se a chave está correta

**Debug**:

```bash
# Ver logs do servidor
pnpm dev

# Procure por:
# ✅ "Email sent successfully"
# ❌ "Failed to send email"
```

## 📊 Monitoramento

### Logs do Resend

1. Acesse [https://resend.com/emails](https://resend.com/emails)
2. Veja todos os emails enviados
3. Status: Delivered, Bounced, Complained
4. Detalhes de cada envio

### Logs do Sistema

Os logs do servidor mostram:

- ✅ Emails enviados com sucesso
- ❌ Erros de envio
- 🚫 Rate limiting ativado

## 🚀 Próximos Passos (Fase 1)

Após o formulário de contato funcionando:

1. **Dashboard de Orçamentos** (Fase 0.2)
   - Listar orçamentos no painel admin
   - Status: Novo, Em Negociação, Aprovado, Recusado

2. **Área do Cliente** (Fase 0.3)
   - "Meus Orçamentos" funcional
   - Cliente vê status dos seus orçamentos

3. **Contratos Digitais** (Fase 1.1)
   - Integração com ZapSign
   - Assinatura eletrônica

4. **Pagamentos Online** (Fase 1.2)
   - Stripe/Mercado Pago
   - Checkout seguro

## 📚 Referências

- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference/introduction)
- [Email Best Practices](https://resend.com/docs/dashboard/emails/best-practices)

---

**Última atualização**: Dezembro 2024 **Versão**: 1.0.0 **Autor**: GB Locações
Development Team
