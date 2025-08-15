import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema'
import { NestedDateTimeFilterObjectSchema } from './NestedDateTimeFilter.schema'

export const NestedDateTimeWithAggregatesFilterObjectSchema: z.ZodType<
  Prisma.NestedDateTimeWithAggregatesFilter,
  Prisma.NestedDateTimeWithAggregatesFilter
> = z
  .object({
    equals: z.date().optional(),
    in: z.union([z.date().array(), z.iso.datetime().array()]).optional(),
    notIn: z.union([z.date().array(), z.iso.datetime().array()]).optional(),
    lt: z.date().optional(),
    lte: z.date().optional(),
    gt: z.date().optional(),
    gte: z.date().optional(),
    not: z
      .union([
        z.date(),
        z.lazy(() => NestedDateTimeWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterObjectSchema).optional(),
  })
  .strict()
export const NestedDateTimeWithAggregatesFilterObjectZodSchema = z
  .object({
    equals: z.date().optional(),
    in: z.union([z.date().array(), z.iso.datetime().array()]).optional(),
    notIn: z.union([z.date().array(), z.iso.datetime().array()]).optional(),
    lt: z.date().optional(),
    lte: z.date().optional(),
    gt: z.date().optional(),
    gte: z.date().optional(),
    not: z
      .union([
        z.date(),
        z.lazy(() => NestedDateTimeWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterObjectSchema).optional(),
  })
  .strict()
