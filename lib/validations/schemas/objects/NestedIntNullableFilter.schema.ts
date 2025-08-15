import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const NestedIntNullableFilterObjectSchema: z.ZodType<Prisma.NestedIntNullableFilter, Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().int().optional().nullable(),
  in: z.number().int().array().optional().nullable(),
  notIn: z.number().int().array().optional().nullable(),
  lt: z.number().int().optional(),
  lte: z.number().int().optional(),
  gt: z.number().int().optional(),
  gte: z.number().int().optional(),
  not: z.union([z.number().int(), z.lazy(() => NestedIntNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const NestedIntNullableFilterObjectZodSchema = z.object({
  equals: z.number().int().optional().nullable(),
  in: z.number().int().array().optional().nullable(),
  notIn: z.number().int().array().optional().nullable(),
  lt: z.number().int().optional(),
  lte: z.number().int().optional(),
  gt: z.number().int().optional(),
  gte: z.number().int().optional(),
  not: z.union([z.number().int(), z.lazy(() => NestedIntNullableFilterObjectSchema)]).optional().nullable()
}).strict();
