import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountFindManySchema as AccountFindManySchema } from '../findManyAccount.schema';
import { AddressFindManySchema as AddressFindManySchema } from '../findManyAddress.schema';
import { AuditLogFindManySchema as AuditLogFindManySchema } from '../findManyAuditLog.schema';
import { CartArgsObjectSchema as CartArgsObjectSchema } from './CartArgs.schema';
import { QuoteFindManySchema as QuoteFindManySchema } from '../findManyQuote.schema';
import { rentalsFindManySchema as rentalsFindManySchema } from '../findManyrentals.schema';
import { SessionFindManySchema as SessionFindManySchema } from '../findManySession.schema';
import { UserCountOutputTypeArgsObjectSchema as UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  accounts: z.union([z.boolean(), z.lazy(() => AccountFindManySchema)]).optional(),
  addresses: z.union([z.boolean(), z.lazy(() => AddressFindManySchema)]).optional(),
  auditLogs: z.union([z.boolean(), z.lazy(() => AuditLogFindManySchema)]).optional(),
  cart: z.union([z.boolean(), z.lazy(() => CartArgsObjectSchema)]).optional(),
  approvedQuotes: z.union([z.boolean(), z.lazy(() => QuoteFindManySchema)]).optional(),
  rejectedQuotes: z.union([z.boolean(), z.lazy(() => QuoteFindManySchema)]).optional(),
  quotes: z.union([z.boolean(), z.lazy(() => QuoteFindManySchema)]).optional(),
  rentals: z.union([z.boolean(), z.lazy(() => rentalsFindManySchema)]).optional(),
  sessions: z.union([z.boolean(), z.lazy(() => SessionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const UserIncludeObjectSchema: z.ZodType<Prisma.UserInclude> = makeSchema() as unknown as z.ZodType<Prisma.UserInclude>;
export const UserIncludeObjectZodSchema = makeSchema();
