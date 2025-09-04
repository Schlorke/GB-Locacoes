import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NestedDecimalNullableFilterObjectSchema } from './NestedDecimalNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.number().nullish(),
  in: z.number().array().nullish(),
  notIn: z.number().array().nullish(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedDecimalNullableFilterObjectSchema)]).nullish()
}).strict();
export const DecimalNullableFilterObjectSchema: z.ZodType<Prisma.DecimalNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.DecimalNullableFilter>;
export const DecimalNullableFilterObjectZodSchema = makeSchema();
