import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { NestedBoolFilterObjectSchema } from './NestedBoolFilter.schema'

export const BoolFilterObjectSchema: z.ZodType<
  Prisma.BoolFilter,
  Prisma.BoolFilter
> = z
  .object({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterObjectSchema)])
      .optional(),
  })
  .strict()
export const BoolFilterObjectZodSchema = z
  .object({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterObjectSchema)])
      .optional(),
  })
  .strict()
