# Política de Segurança - GB Locações

## 🛡️ Versões Suportadas

Atualmente, estamos fornecendo atualizações de segurança para as seguintes
versões:

| Versão | Suportada | Status                    |
| ------ | --------- | ------------------------- |
| 0.1.x  | ✅ Sim    | Em desenvolvimento ativo  |
| < 0.1  | ❌ Não    | Versões de pré-lançamento |

## 🔐 Reportando uma Vulnerabilidade

A segurança dos nossos usuários é nossa prioridade máxima. Se você descobrir uma
vulnerabilidade de segurança no projeto GB Locações, pedimos que nos ajude
reportando-a de forma responsável.

### Como Reportar

**📧 Email de Segurança:** contato@locacoesgb.com.br (assunto: "VULNERABILIDADE
DE SEGURANÇA")

**Por favor, inclua:**

1. **Descrição detalhada** da vulnerabilidade
2. **Passos para reproduzir** o problema
3. **Impacto potencial** da vulnerabilidade
4. **Versão afetada** do projeto
5. **Possível solução** (se você tiver uma sugestão)

### O que Esperar

- ⏱️ **Confirmação de recebimento:** Dentro de **48 horas**
- 🔍 **Avaliação inicial:** Dentro de **7 dias úteis**
- 📊 **Atualizações regulares:** A cada **14 dias** enquanto investigamos
- 🚀 **Correção:** Dependendo da severidade
  - **Crítica:** 7-14 dias
  - **Alta:** 14-30 dias
  - **Média:** 30-60 dias
  - **Baixa:** 60-90 dias

### Processo de Resolução

1. **Triagem:** Analisamos e confirmamos a vulnerabilidade
2. **Desenvolvimento:** Criamos e testamos a correção
3. **Notificação:** Informamos sobre a correção antes do lançamento
4. **Lançamento:** Publicamos a atualização de segurança
5. **Divulgação:** Após a correção, publicamos detalhes (se apropriado)

### ⚠️ Diretrizes

**Por favor, NÃO:**

- ❌ Divulgue publicamente a vulnerabilidade antes de uma correção
- ❌ Explore a vulnerabilidade além do necessário para demonstrá-la
- ❌ Acesse, modifique ou delete dados de outros usuários
- ❌ Realize ataques de negação de serviço (DoS/DDoS)
- ❌ Envie spam ou phishing

**Por favor, FAÇA:**

- ✅ Reporte imediatamente qualquer vulnerabilidade descoberta
- ✅ Forneça informações técnicas detalhadas
- ✅ Mantenha a confidencialidade até a correção
- ✅ Permita tempo razoável para correção antes da divulgação

## 🏆 Reconhecimento

Agradecemos a todos que reportam vulnerabilidades de forma responsável. Com sua
permissão, reconheceremos sua contribuição em nosso Hall da Fama de Segurança.

## 🔒 Escopo de Segurança

### Em Escopo

- ✅ Aplicação web Next.js (frontend e backend)
- ✅ API endpoints (`/api/*`)
- ✅ Autenticação e autorização (NextAuth.js)
- ✅ Processamento de pagamentos (Stripe)
- ✅ Upload e armazenamento de arquivos
- ✅ Banco de dados (PostgreSQL + Prisma)

### Fora de Escopo

- ❌ Vulnerabilidades em dependências de terceiros (reporte ao projeto original)
- ❌ Ataques de engenharia social
- ❌ Problemas de configuração de infraestrutura (Vercel, AWS, etc.)
- ❌ Vulnerabilidades que requerem acesso físico
- ❌ Problemas de UX/UI que não apresentam risco de segurança

## 📚 Melhores Práticas

### Para Desenvolvedores

- 🔐 Use sempre variáveis de ambiente para dados sensíveis
- 🛡️ Implemente validação de entrada em todos os endpoints
- 🔒 Use HTTPS em produção
- 🔑 Implemente autenticação adequada
- 📊 Registre e monitore atividades suspeitas
- 🧪 Teste regularmente para vulnerabilidades conhecidas

### Para Usuários

- 🔐 Use senhas fortes e únicas
- 🔄 Ative autenticação de dois fatores (quando disponível)
- 🔒 Não compartilhe suas credenciais
- 🔍 Verifique URLs antes de inserir informações
- 📧 Reporte emails ou mensagens suspeitas

## 📖 Recursos Adicionais

- [Documentação de Segurança](./docs/architecture/security.md)
- [Guia de Desenvolvimento](./docs/getting-started/development.md)
- [Política de Privacidade](./app/privacidade/page.tsx)

## 📞 Contato

Para questões gerais de segurança que não sejam vulnerabilidades:

- **Email:** contato@locacoesgb.com.br
- **Telefone:** (51) 2313-6262
- **WhatsApp:** (51) 99820-5163
- **Endereço:** Travessa Doutor Heinzelmann, 365 - Humaitá, Porto Alegre/RS -
  CEP 90240-100

---

**Última atualização:** Janeiro 2025 **Versão da Política:** 1.0

Agradecemos sua contribuição para manter o GB Locações seguro! 🙏
