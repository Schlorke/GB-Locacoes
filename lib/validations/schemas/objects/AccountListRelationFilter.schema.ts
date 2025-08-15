import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { AccountWhereInputObjectSchema } from './AccountWhereInput.schema'

export const AccountListRelationFilterObjectSchema: z.ZodType<
  Prisma.AccountListRelationFilter,
  Prisma.AccountListRelationFilter
> = z
  .object({
    every: z.lazy(() => AccountWhereInputObjectSchema).optional(),
    some: z.lazy(() => AccountWhereInputObjectSchema).optional(),
    none: z.lazy(() => AccountWhereInputObjectSchema).optional(),
  })
  .strict()
export const AccountListRelationFilterObjectZodSchema = z
  .object({
    every: z.lazy(() => AccountWhereInputObjectSchema).optional(),
    some: z.lazy(() => AccountWhereInputObjectSchema).optional(),
    none: z.lazy(() => AccountWhereInputObjectSchema).optional(),
  })
  .strict()
