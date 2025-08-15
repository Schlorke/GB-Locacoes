import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { AccountFindManySchema } from '../findManyAccount.schema'
import { QuoteFindManySchema } from '../findManyQuote.schema'
import { RentalsFindManySchema } from '../findManyrentals.schema'
import { SessionFindManySchema } from '../findManySession.schema'
import { UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

export const UserIncludeObjectSchema: z.ZodType<
  Prisma.UserInclude,
  Prisma.UserInclude
> = z
  .object({
    accounts: z
      .union([z.boolean(), z.lazy(() => AccountFindManySchema)])
      .optional(),
    quotes: z
      .union([z.boolean(), z.lazy(() => QuoteFindManySchema)])
      .optional(),
    rentals: z
      .union([z.boolean(), z.lazy(() => RentalsFindManySchema)])
      .optional(),
    sessions: z
      .union([z.boolean(), z.lazy(() => SessionFindManySchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)])
      .optional(),
  })
  .strict()
export const UserIncludeObjectZodSchema = z
  .object({
    accounts: z
      .union([z.boolean(), z.lazy(() => AccountFindManySchema)])
      .optional(),
    quotes: z
      .union([z.boolean(), z.lazy(() => QuoteFindManySchema)])
      .optional(),
    rentals: z
      .union([z.boolean(), z.lazy(() => RentalsFindManySchema)])
      .optional(),
    sessions: z
      .union([z.boolean(), z.lazy(() => SessionFindManySchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)])
      .optional(),
  })
  .strict()
