import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountFindManySchema } from '../findManyAccount.schema';
import { QuoteFindManySchema } from '../findManyQuote.schema';
import { rentalsFindManySchema } from '../findManyrentals.schema';
import { SessionFindManySchema } from '../findManySession.schema';
import { UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  accounts: z.union([z.boolean(), z.lazy(() => AccountFindManySchema)]).optional(),
  quotes: z.union([z.boolean(), z.lazy(() => QuoteFindManySchema)]).optional(),
  rentals: z.union([z.boolean(), z.lazy(() => rentalsFindManySchema)]).optional(),
  sessions: z.union([z.boolean(), z.lazy(() => SessionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const UserIncludeObjectSchema: z.ZodType<Prisma.UserInclude> = makeSchema() as unknown as z.ZodType<Prisma.UserInclude>;
export const UserIncludeObjectZodSchema = makeSchema();
