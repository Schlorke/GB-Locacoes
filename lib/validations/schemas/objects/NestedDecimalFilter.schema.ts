import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const NestedDecimalFilterObjectSchema: z.ZodType<
  Prisma.NestedDecimalFilter,
  Prisma.NestedDecimalFilter
> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedDecimalFilterObjectSchema)])
      .optional(),
  })
  .strict()
export const NestedDecimalFilterObjectZodSchema = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedDecimalFilterObjectSchema)])
      .optional(),
  })
  .strict()
