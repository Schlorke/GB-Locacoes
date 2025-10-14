/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema'
import { NestedDecimalNullableFilterObjectSchema as NestedDecimalNullableFilterObjectSchema } from './NestedDecimalNullableFilter.schema'

const nesteddecimalnullablewithaggregatesfilterSchema = z
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
        z.lazy(() => NestedDecimalNullableWithAggregatesFilterObjectSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
    _avg: z.lazy(() => NestedDecimalNullableFilterObjectSchema).optional(),
    _sum: z.lazy(() => NestedDecimalNullableFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedDecimalNullableFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedDecimalNullableFilterObjectSchema).optional(),
  })
  .strict()
export const NestedDecimalNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedDecimalNullableWithAggregatesFilter> =
  nesteddecimalnullablewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedDecimalNullableWithAggregatesFilter>
export const NestedDecimalNullableWithAggregatesFilterObjectZodSchema =
  nesteddecimalnullablewithaggregatesfilterSchema
