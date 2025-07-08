# GB Locações

Plataforma de locação de equipamentos construída com Next.js 15, Tailwind e Prisma.

## Requisitos

- Node.js 20+
- PNPM
- Banco de dados PostgreSQL (Supabase ou Docker local)

## Desenvolvimento

1. Copie `.env.example` ou `.env.docker` para `.env` e ajuste as variáveis.
2. Instale dependências:
   ```bash
   pnpm install
   ```
3. Gere o cliente Prisma:
   ```bash
   pnpm exec prisma generate
   ```
4. Inicie o banco de dados (opcional) com Docker:
   ```bash
   docker-compose up -d db
   ```
5. Execute a aplicação:
   ```bash
   pnpm dev
   ```

## Testes e Lint

```bash
pnpm lint
pnpm test
```

## Docker

Para executar toda a aplicação via Docker:

```bash
docker-compose up --build
```

Isso iniciará o contêiner do PostgreSQL e a aplicação em `http://localhost:3000`.
