import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const NestedFloatNullableFilterObjectSchema: z.ZodType<Prisma.NestedFloatNullableFilter, Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().nullish(),
  in: z.number().array().nullish(),
  notIn: z.number().array().nullish(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatNullableFilterObjectSchema)]).nullish()
}).strict();
export const NestedFloatNullableFilterObjectZodSchema = z.object({
  equals: z.number().nullish(),
  in: z.number().array().nullish(),
  notIn: z.number().array().nullish(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatNullableFilterObjectSchema)]).nullish()
}).strict();
