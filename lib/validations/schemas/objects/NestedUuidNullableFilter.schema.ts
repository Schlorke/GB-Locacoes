import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const NestedUuidNullableFilterObjectSchema: z.ZodType<Prisma.NestedUuidNullableFilter, Prisma.NestedUuidNullableFilter> = z.object({
  equals: z.string().nullish(),
  in: z.string().array().nullish(),
  notIn: z.string().array().nullish(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedUuidNullableFilterObjectSchema)]).nullish()
}).strict();
export const NestedUuidNullableFilterObjectZodSchema = z.object({
  equals: z.string().nullish(),
  in: z.string().array().nullish(),
  notIn: z.string().array().nullish(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedUuidNullableFilterObjectSchema)]).nullish()
}).strict();
