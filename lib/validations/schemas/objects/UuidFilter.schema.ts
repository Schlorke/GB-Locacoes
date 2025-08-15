import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QueryModeSchema } from '../enums/QueryMode.schema'
import { NestedUuidFilterObjectSchema } from './NestedUuidFilter.schema'

export const UuidFilterObjectSchema: z.ZodType<
  Prisma.UuidFilter,
  Prisma.UuidFilter
> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    mode: QueryModeSchema.optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedUuidFilterObjectSchema)])
      .optional(),
  })
  .strict()
export const UuidFilterObjectZodSchema = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    mode: QueryModeSchema.optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedUuidFilterObjectSchema)])
      .optional(),
  })
  .strict()
