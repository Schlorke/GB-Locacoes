import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const NestedUuidFilterObjectSchema: z.ZodType<
  Prisma.NestedUuidFilter,
  Prisma.NestedUuidFilter
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
      .union([z.string(), z.lazy(() => NestedUuidFilterObjectSchema)])
      .optional(),
  })
  .strict()
export const NestedUuidFilterObjectZodSchema = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedUuidFilterObjectSchema)])
      .optional(),
  })
  .strict()
