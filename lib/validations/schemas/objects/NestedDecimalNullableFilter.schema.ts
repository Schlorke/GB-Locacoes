/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'

const nesteddecimalnullablefilterSchema = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([
        z.number(),
        z.lazy(() => NestedDecimalNullableFilterObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict()
export const NestedDecimalNullableFilterObjectSchema: z.ZodType<Prisma.NestedDecimalNullableFilter> =
  nesteddecimalnullablefilterSchema as unknown as z.ZodType<Prisma.NestedDecimalNullableFilter>
export const NestedDecimalNullableFilterObjectZodSchema =
  nesteddecimalnullablefilterSchema
