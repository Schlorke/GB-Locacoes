import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema'
import { NestedStringFilterObjectSchema } from './NestedStringFilter.schema'

export const NestedUuidWithAggregatesFilterObjectSchema: z.ZodType<
  Prisma.NestedUuidWithAggregatesFilter,
  Prisma.NestedUuidWithAggregatesFilter
> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    not: z
      .union([
        z.string(),
        z.lazy(() => NestedUuidWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedStringFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedStringFilterObjectSchema).optional(),
  })
  .strict()
export const NestedUuidWithAggregatesFilterObjectZodSchema = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    not: z
      .union([
        z.string(),
        z.lazy(() => NestedUuidWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedStringFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedStringFilterObjectSchema).optional(),
  })
  .strict()
