import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import { AccountSelectObjectSchema } from './objects/AccountSelect.schema'
import { AccountIncludeObjectSchema } from './objects/AccountInclude.schema'
import { AccountWhereUniqueInputObjectSchema } from './objects/AccountWhereUniqueInput.schema'

export const AccountFindUniqueOrThrowSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> =
  z
    .object({
      select: AccountSelectObjectSchema.optional(),
      include: AccountIncludeObjectSchema.optional(),
      where: AccountWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.AccountFindUniqueOrThrowArgs>

export const AccountFindUniqueOrThrowZodSchema = z
  .object({
    select: AccountSelectObjectSchema.optional(),
    include: AccountIncludeObjectSchema.optional(),
    where: AccountWhereUniqueInputObjectSchema,
  })
  .strict()
