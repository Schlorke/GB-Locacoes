import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { NestedDateTimeNullableFilterObjectSchema } from './NestedDateTimeNullableFilter.schema'

export const DateTimeNullableFilterObjectSchema: z.ZodType<Prisma.DateTimeNullableFilter, Prisma.DateTimeNullableFilter> = z.object({
  equals: z.date().optional().nullable(),
  in: z.union([z.date().array(), z.iso.datetime().array()]).optional().nullable(),
  notIn: z.union([z.date().array(), z.iso.datetime().array()]).optional().nullable(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const DateTimeNullableFilterObjectZodSchema = z.object({
  equals: z.date().optional().nullable(),
  in: z.union([z.date().array(), z.iso.datetime().array()]).optional().nullable(),
  notIn: z.union([z.date().array(), z.iso.datetime().array()]).optional().nullable(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeNullableFilterObjectSchema)]).optional().nullable()
}).strict();
