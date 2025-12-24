# Recuperacao de Senha - Fluxo

> Status: Implementado Ultima atualizacao: 2025-12-24

## Objetivo

Permitir que usuarios redefinam a senha via email com token temporario, sem
expor se o email existe no sistema.

## Paginas

- `/recuperar-senha`: solicita o envio do link de recuperacao.
- `/reset-password`: define uma nova senha usando o token.

## Endpoints

### POST `/api/auth/forgot-password`

**Body**

```json
{
  "email": "usuario@dominio.com"
}
```

**Comportamento**

- Retorna **200** mesmo se o email nao existir (anti-enumeracao).
- Gera token com expiração de 1 hora.
- Envia email se `RESEND_API_KEY` e `FROM_EMAIL` estiverem configurados.

### POST `/api/auth/reset-password`

**Body**

```json
{
  "token": "uuid",
  "password": "novaSenha"
}
```

**Comportamento**

- Valida token e expiração.
- Atualiza a senha (bcrypt, strength 12).
- Remove o token após uso.

## Token de Recuperacao

- Tabela: `verificationtokens`
- Campos: `identifier` (email), `token`, `expires`
- Expiracao: 1 hora

## Email

- Subject: `Recuperacao de senha - GB Locacoes`
- Link: `${NEXTAUTH_URL}/reset-password?token=...`
- Remetente: `FROM_EMAIL`

## Validacoes de UI

- Senha minima: 6 caracteres
- Confirmacao obrigatoria e deve coincidir
- Erros exibidos no formulario
- Sucesso exibe CTA para login

## OAuth

- Usuarios criados via OAuth podem definir senha local usando o fluxo de
  recuperacao (se o email existir).

## Como Validar

1. Acesse `/recuperar-senha` e informe um email existente.
2. Abra o email recebido e clique no link de redefinicao.
3. Defina a nova senha e conclua.
4. Faca login com a nova senha.

## Arquivos Relacionados

- `app/recuperar-senha/page.tsx`
- `app/reset-password/page.tsx`
- `app/api/auth/forgot-password/route.ts`
- `app/api/auth/reset-password/route.ts`
- `prisma/schema.prisma`
