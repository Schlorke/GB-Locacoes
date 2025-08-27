import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedDecimalFilterObjectSchema } from './NestedDecimalFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(makeSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _avg: z.lazy(() => NestedDecimalFilterObjectSchema).optional(),
  _sum: z.lazy(() => NestedDecimalFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedDecimalFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedDecimalFilterObjectSchema).optional()
}).strict();
export const NestedDecimalWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedDecimalWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedDecimalWithAggregatesFilter>;
export const NestedDecimalWithAggregatesFilterObjectZodSchema = makeSchema();
