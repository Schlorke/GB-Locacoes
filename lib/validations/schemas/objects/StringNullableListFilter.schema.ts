import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const StringNullableListFilterObjectSchema: z.ZodType<
  Prisma.StringNullableListFilter,
  Prisma.StringNullableListFilter
> = z
  .object({
    equals: z.string().array().optional().nullable(),
    has: z.string().optional().nullable(),
    hasEvery: z.string().array().optional(),
    hasSome: z.string().array().optional(),
    isEmpty: z.boolean().optional(),
  })
  .strict()
export const StringNullableListFilterObjectZodSchema = z
  .object({
    equals: z.string().array().optional().nullable(),
    has: z.string().optional().nullable(),
    hasEvery: z.string().array().optional(),
    hasSome: z.string().array().optional(),
    isEmpty: z.boolean().optional(),
  })
  .strict()
