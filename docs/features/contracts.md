# Contratos de Locação - GB Locações

## Visão geral

Este módulo gera e gerencia o contrato vinculado a cada locação. O contrato é
produzido a partir dos dados da locação (cliente, itens, período e valores) e
fica relacionado via tabela `Contract` (Prisma) com status (`DRAFT`, `SENT`,
`SIGNED`).

## Fluxo atual

1. Admin abre `/admin/rentals` e seleciona uma locação.
2. No modal de detalhes, o botão **Gerar contrato** aciona
   `POST /api/admin/rentals/[id]/contract`.
3. O endpoint cria/atualiza o registro em `Contract` com template `default-v1`,
   grava o conteúdo e marca status `SENT`.
4. O modal exibe o status do contrato (e `signedAt/pdfUrl` se existirem).

## Endpoints

- `POST /api/admin/rentals/[id]/contract`
  - Requer ADMIN.
  - Gera ou atualiza o contrato da locação, preenchendo `template`, `content` e
    `status=SENT`.
  - Retorna `{ contract }`.
- `GET /api/admin/rentals/[id]/contract`
  - Requer ADMIN.
  - Retorna `{ contract }` ou 404 se não existir.

## Dados usados no contrato

- Cliente: nome, email, telefone.
- Período: `startdate` → `enddate`.
- Itens: nome, quantidade, dias, valor total por item.
- Total da locação.
- Endereço da empresa: Rua Travessa Doutor Heinzelmann, 365 - Humaitá, Porto
  Alegre - RS, Brasil.

## Próximos passos sugeridos

- Assinatura eletrônica (ZapSign) e persistir `signedAt`, `signedBy`, `pdfUrl`.
- Versão PDF armazenada em storage seguro.
- Personalização de cláusulas por tipo de contrato (PF/PJ, seguro, caução).
- Exposição do contrato na área do cliente para download/assinatura.
