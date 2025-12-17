import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentFindManySchema as PaymentFindManySchema } from '../findManyPayment.schema';
import { QuoteItemFindManySchema as QuoteItemFindManySchema } from '../findManyQuoteItem.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { rentalsFindManySchema as rentalsFindManySchema } from '../findManyrentals.schema';
import { QuoteCountOutputTypeArgsObjectSchema as QuoteCountOutputTypeArgsObjectSchema } from './QuoteCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  payments: z.union([z.boolean(), z.lazy(() => PaymentFindManySchema)]).optional(),
  items: z.union([z.boolean(), z.lazy(() => QuoteItemFindManySchema)]).optional(),
  approvedByUser: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  rejectedByUser: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  rentals: z.union([z.boolean(), z.lazy(() => rentalsFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => QuoteCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const QuoteIncludeObjectSchema: z.ZodType<Prisma.QuoteInclude> = makeSchema() as unknown as z.ZodType<Prisma.QuoteInclude>;
export const QuoteIncludeObjectZodSchema = makeSchema();
