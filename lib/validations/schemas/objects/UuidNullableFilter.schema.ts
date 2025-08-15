import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { QueryModeSchema } from '../enums/QueryMode.schema';
import { NestedUuidNullableFilterObjectSchema } from './NestedUuidNullableFilter.schema'

export const UuidNullableFilterObjectSchema: z.ZodType<Prisma.UuidNullableFilter, Prisma.UuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: QueryModeSchema.optional(),
  not: z.union([z.string(), z.lazy(() => NestedUuidNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const UuidNullableFilterObjectZodSchema = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: QueryModeSchema.optional(),
  not: z.union([z.string(), z.lazy(() => NestedUuidNullableFilterObjectSchema)]).optional().nullable()
}).strict();
