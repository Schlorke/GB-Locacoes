import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import { AccountSelectObjectSchema } from './objects/AccountSelect.schema'
import { AccountIncludeObjectSchema } from './objects/AccountInclude.schema'
import { AccountWhereUniqueInputObjectSchema } from './objects/AccountWhereUniqueInput.schema'

export const AccountFindUniqueSchema: z.ZodType<Prisma.AccountFindUniqueArgs> =
  z
    .object({
      select: AccountSelectObjectSchema.optional(),
      include: AccountIncludeObjectSchema.optional(),
      where: AccountWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.AccountFindUniqueArgs>

export const AccountFindUniqueZodSchema = z
  .object({
    select: AccountSelectObjectSchema.optional(),
    include: AccountIncludeObjectSchema.optional(),
    where: AccountWhereUniqueInputObjectSchema,
  })
  .strict()
