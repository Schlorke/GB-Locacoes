import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema';
import { NestedEnumQuoteStatusWithAggregatesFilterObjectSchema } from './NestedEnumQuoteStatusWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumQuoteStatusFilterObjectSchema } from './NestedEnumQuoteStatusFilter.schema'

export const EnumQuoteStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumQuoteStatusWithAggregatesFilter, Prisma.EnumQuoteStatusWithAggregatesFilter> = z.object({
  equals: QuoteStatusSchema.optional(),
  in: QuoteStatusSchema.array().optional(),
  notIn: QuoteStatusSchema.array().optional(),
  not: z.union([QuoteStatusSchema, z.lazy(() => NestedEnumQuoteStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumQuoteStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumQuoteStatusFilterObjectSchema).optional()
}).strict();
export const EnumQuoteStatusWithAggregatesFilterObjectZodSchema = z.object({
  equals: QuoteStatusSchema.optional(),
  in: QuoteStatusSchema.array().optional(),
  notIn: QuoteStatusSchema.array().optional(),
  not: z.union([QuoteStatusSchema, z.lazy(() => NestedEnumQuoteStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumQuoteStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumQuoteStatusFilterObjectSchema).optional()
}).strict();
