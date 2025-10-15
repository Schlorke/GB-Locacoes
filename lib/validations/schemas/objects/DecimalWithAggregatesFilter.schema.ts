/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NestedDecimalWithAggregatesFilterObjectSchema as NestedDecimalWithAggregatesFilterObjectSchema } from './NestedDecimalWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedDecimalFilterObjectSchema as NestedDecimalFilterObjectSchema } from './NestedDecimalFilter.schema'

const makeSchema = () => z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedDecimalWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _avg: z.lazy(() => NestedDecimalFilterObjectSchema).optional(),
  _sum: z.lazy(() => NestedDecimalFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedDecimalFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedDecimalFilterObjectSchema).optional()
}).strict();
export const DecimalWithAggregatesFilterObjectSchema: z.ZodType<Prisma.DecimalWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.DecimalWithAggregatesFilter>;
export const DecimalWithAggregatesFilterObjectZodSchema = makeSchema();
