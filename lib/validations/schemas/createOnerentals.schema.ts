/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { rentalsSelectObjectSchema as rentalsSelectObjectSchema } from './objects/rentalsSelect.schema'
import { rentalsIncludeObjectSchema as rentalsIncludeObjectSchema } from './objects/rentalsInclude.schema'
import { rentalsCreateInputObjectSchema as rentalsCreateInputObjectSchema } from './objects/rentalsCreateInput.schema'
import { rentalsUncheckedCreateInputObjectSchema as rentalsUncheckedCreateInputObjectSchema } from './objects/rentalsUncheckedCreateInput.schema'

export const rentalsCreateOneSchema: z.ZodType<Prisma.rentalsCreateArgs> = z
  .object({
    select: rentalsSelectObjectSchema.optional(),
    include: rentalsIncludeObjectSchema.optional(),
    data: z.union([
      rentalsCreateInputObjectSchema,
      rentalsUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict() as unknown as z.ZodType<Prisma.rentalsCreateArgs>

export const rentalsCreateOneZodSchema = z
  .object({
    select: rentalsSelectObjectSchema.optional(),
    include: rentalsIncludeObjectSchema.optional(),
    data: z.union([
      rentalsCreateInputObjectSchema,
      rentalsUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict()
