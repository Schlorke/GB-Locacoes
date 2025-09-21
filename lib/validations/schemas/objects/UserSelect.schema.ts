import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountFindManySchema } from '../findManyAccount.schema';
import { QuoteFindManySchema } from '../findManyQuote.schema';
import { rentalsFindManySchema } from '../findManyrentals.schema';
import { SessionFindManySchema } from '../findManySession.schema';
import { UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  role: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  accounts: z.union([z.boolean(), z.lazy(() => AccountFindManySchema)]).optional(),
  quotes: z.union([z.boolean(), z.lazy(() => QuoteFindManySchema)]).optional(),
  rentals: z.union([z.boolean(), z.lazy(() => rentalsFindManySchema)]).optional(),
  sessions: z.union([z.boolean(), z.lazy(() => SessionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const UserSelectObjectSchema: z.ZodType<Prisma.UserSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserSelect>;
export const UserSelectObjectZodSchema = makeSchema();
