import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const NestedDateTimeNullableFilterObjectSchema: z.ZodType<
  Prisma.NestedDateTimeNullableFilter,
  Prisma.NestedDateTimeNullableFilter
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
      .union([z.date(), z.lazy(() => NestedDateTimeNullableFilterObjectSchema)])
      .optional()
      .nullable(),
  })
  .strict()
export const NestedDateTimeNullableFilterObjectZodSchema = z
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
      .union([z.date(), z.lazy(() => NestedDateTimeNullableFilterObjectSchema)])
      .optional()
      .nullable(),
  })
  .strict()
