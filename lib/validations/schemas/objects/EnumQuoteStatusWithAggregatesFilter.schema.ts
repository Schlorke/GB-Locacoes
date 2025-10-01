/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema';
import { NestedEnumQuoteStatusWithAggregatesFilterObjectSchema as NestedEnumQuoteStatusWithAggregatesFilterObjectSchema } from './NestedEnumQuoteStatusWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumQuoteStatusFilterObjectSchema as NestedEnumQuoteStatusFilterObjectSchema } from './NestedEnumQuoteStatusFilter.schema'

const makeSchema = () => z.object({
  equals: QuoteStatusSchema.optional(),
  in: QuoteStatusSchema.array().optional(),
  notIn: QuoteStatusSchema.array().optional(),
  not: z.union([QuoteStatusSchema, z.lazy(() => NestedEnumQuoteStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumQuoteStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumQuoteStatusFilterObjectSchema).optional()
}).strict();
export const EnumQuoteStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumQuoteStatusWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumQuoteStatusWithAggregatesFilter>;
export const EnumQuoteStatusWithAggregatesFilterObjectZodSchema = makeSchema();
