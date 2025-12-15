# ⚠️ Regenerar Prisma Client após Novos Modelos

## Importante

Após adicionar novos modelos ao `prisma/schema.prisma`, **É OBRIGATÓRIO**
regenerar o Prisma Client para resolver erros de TypeScript.

## Passo a Passo

1. **Regenerar Prisma Client**

```bash
pnpm db:generate
```

Isso vai:

- Gerar tipos TypeScript para todos os novos modelos (Payment, Maintenance,
  Delivery, Contract, AuditLog, Permission, Vehicle, Driver)
- Atualizar o Prisma Client com o schema mais recente
- Resolver erros TS relacionados a modelos faltantes

2. **Aplicar mudanças no banco**

```bash
pnpm db:push
# ou criar migração
pnpm db:migrate dev --name add_saas_features
```

## Modelos Novos

- `Maintenance` — tracking de manutenção de equipamentos
- `Payment` — gestão de pagamentos e faturas
- `Delivery` — logística de entrega/retirada
- `Vehicle` — frota de veículos
- `Driver` — gestão de motoristas
- `Contract` — geração e assinatura de contratos
- `AuditLog` — trilha de auditoria
- `Permission` — permissões granulares

## O que esperar após regenerar

Erros em referências como `prisma.payment.*`, `prisma.maintenance.*`,
`prisma.delivery.*`, `prisma.contract.*`, `prisma.auditLog.*`,
`prisma.permission.*`, `prisma.vehicle.*`, `prisma.driver.*` serão resolvidos
automaticamente após `pnpm db:generate`.
