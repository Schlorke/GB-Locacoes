# ⚠️ PRISMA CLIENT REGENERATION REQUIRED

## Important Notice

After adding new models to the Prisma schema, you **MUST** regenerate the Prisma
client before the TypeScript errors will be resolved.

## Steps to Fix TypeScript Errors

1. **Regenerate Prisma Client:**

   ```bash
   pnpm db:generate
   ```

2. **This will:**
   - Generate TypeScript types for all new models (Payment, Maintenance,
     Delivery, Contract, AuditLog, Permission, Vehicle, Driver)
   - Update the Prisma client with the new database schema
   - Resolve all TypeScript errors related to missing Prisma models

## New Models Added

The following models were added to `prisma/schema.prisma`:

- `Maintenance` - Equipment maintenance tracking
- `Payment` - Payment and invoice management
- `Delivery` - Delivery and pickup logistics
- `Vehicle` - Vehicle fleet management
- `Driver` - Driver management
- `Contract` - Contract generation and signing
- `AuditLog` - Audit trail
- `Permission` - Granular permissions

## After Regeneration

Once you run `pnpm db:generate`, all TypeScript errors related to:

- `prisma.payment.*`
- `prisma.maintenance.*`
- `prisma.delivery.*`
- `prisma.contract.*`
- `prisma.auditLog.*`
- `prisma.permission.*`
- `prisma.vehicle.*`
- `prisma.driver.*`

Will be automatically resolved.

## Database Migration

After regenerating the client, you'll also need to apply the schema changes to
your database:

```bash
pnpm db:push
# or create a migration:
pnpm db:migrate dev --name add_saas_features
```
