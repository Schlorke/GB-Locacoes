import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema'

export const IntNullableFilterObjectSchema: z.ZodType<
  Prisma.IntNullableFilter,
  Prisma.IntNullableFilter
> = z
  .object({
    equals: z.number().int().optional().nullable(),
    in: z.number().int().array().optional().nullable(),
    notIn: z.number().int().array().optional().nullable(),
    lt: z.number().int().optional(),
    lte: z.number().int().optional(),
    gt: z.number().int().optional(),
    gte: z.number().int().optional(),
    not: z
      .union([
        z.number().int(),
        z.lazy(() => NestedIntNullableFilterObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict()
export const IntNullableFilterObjectZodSchema = z
  .object({
    equals: z.number().int().optional().nullable(),
    in: z.number().int().array().optional().nullable(),
    notIn: z.number().int().array().optional().nullable(),
    lt: z.number().int().optional(),
    lte: z.number().int().optional(),
    gt: z.number().int().optional(),
    gte: z.number().int().optional(),
    not: z
      .union([
        z.number().int(),
        z.lazy(() => NestedIntNullableFilterObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict()
