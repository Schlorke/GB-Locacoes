import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { NestedDateTimeFilterObjectSchema } from './NestedDateTimeFilter.schema'

export const DateTimeFilterObjectSchema: z.ZodType<
  Prisma.DateTimeFilter,
  Prisma.DateTimeFilter
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
      .union([z.date(), z.lazy(() => NestedDateTimeFilterObjectSchema)])
      .optional(),
  })
  .strict()
export const DateTimeFilterObjectZodSchema = z
  .object({
    equals: z.date().optional(),
    in: z.union([z.date().array(), z.iso.datetime().array()]).optional(),
    notIn: z.union([z.date().array(), z.iso.datetime().array()]).optional(),
    lt: z.date().optional(),
    lte: z.date().optional(),
    gt: z.date().optional(),
    gte: z.date().optional(),
    not: z
      .union([z.date(), z.lazy(() => NestedDateTimeFilterObjectSchema)])
      .optional(),
  })
  .strict()
