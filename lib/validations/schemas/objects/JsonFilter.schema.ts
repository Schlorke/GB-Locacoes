import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QueryModeSchema } from '../enums/QueryMode.schema'

import { JsonValueSchema as jsonSchema } from './helpers/json-helpers'

export const JsonFilterObjectSchema: z.ZodType<
  Prisma.JsonFilter,
  Prisma.JsonFilter
> = z
  .object({
    equals: jsonSchema.optional(),
    path: z.string().array().optional(),
    mode: QueryModeSchema.optional(),
    string_contains: z.string().optional(),
    string_starts_with: z.string().optional(),
    string_ends_with: z.string().optional(),
    array_starts_with: jsonSchema.optional().nullable(),
    array_ends_with: jsonSchema.optional().nullable(),
    array_contains: jsonSchema.optional().nullable(),
    lt: jsonSchema.optional(),
    lte: jsonSchema.optional(),
    gt: jsonSchema.optional(),
    gte: jsonSchema.optional(),
    not: jsonSchema.optional(),
  })
  .strict()
export const JsonFilterObjectZodSchema = z
  .object({
    equals: jsonSchema.optional(),
    path: z.string().array().optional(),
    mode: QueryModeSchema.optional(),
    string_contains: z.string().optional(),
    string_starts_with: z.string().optional(),
    string_ends_with: z.string().optional(),
    array_starts_with: jsonSchema.optional().nullable(),
    array_ends_with: jsonSchema.optional().nullable(),
    array_contains: jsonSchema.optional().nullable(),
    lt: jsonSchema.optional(),
    lte: jsonSchema.optional(),
    gt: jsonSchema.optional(),
    gte: jsonSchema.optional(),
    not: jsonSchema.optional(),
  })
  .strict()
