import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { NestedDateTimeNullableWithAggregatesFilterObjectSchema } from './NestedDateTimeNullableWithAggregatesFilter.schema'
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema'
import { NestedDateTimeNullableFilterObjectSchema } from './NestedDateTimeNullableFilter.schema'

export const DateTimeNullableWithAggregatesFilterObjectSchema: z.ZodType<
  Prisma.DateTimeNullableWithAggregatesFilter,
  Prisma.DateTimeNullableWithAggregatesFilter
> = z
  .object({
    equals: z.date().optional().nullable(),
    in: z
      .union([z.date().array(), z.iso.datetime().array()])
      .optional()
      .nullable(),
    notIn: z
      .union([z.date().array(), z.iso.datetime().array()])
      .optional()
      .nullable(),
    lt: z.date().optional(),
    lte: z.date().optional(),
    gt: z.date().optional(),
    gte: z.date().optional(),
    not: z
      .union([
        z.date(),
        z.lazy(() => NestedDateTimeNullableWithAggregatesFilterObjectSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedDateTimeNullableFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedDateTimeNullableFilterObjectSchema).optional(),
  })
  .strict()
export const DateTimeNullableWithAggregatesFilterObjectZodSchema = z
  .object({
    equals: z.date().optional().nullable(),
    in: z
      .union([z.date().array(), z.iso.datetime().array()])
      .optional()
      .nullable(),
    notIn: z
      .union([z.date().array(), z.iso.datetime().array()])
      .optional()
      .nullable(),
    lt: z.date().optional(),
    lte: z.date().optional(),
    gt: z.date().optional(),
    gte: z.date().optional(),
    not: z
      .union([
        z.date(),
        z.lazy(() => NestedDateTimeNullableWithAggregatesFilterObjectSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedDateTimeNullableFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedDateTimeNullableFilterObjectSchema).optional(),
  })
  .strict()
