import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumQuoteStatusFilterObjectSchema } from './NestedEnumQuoteStatusFilter.schema'

const nestedenumquotestatuswithaggregatesfilterSchema = z.object({
  equals: QuoteStatusSchema.optional(),
  in: QuoteStatusSchema.array().optional(),
  notIn: QuoteStatusSchema.array().optional(),
  not: z.union([QuoteStatusSchema, z.lazy(() => NestedEnumQuoteStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumQuoteStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumQuoteStatusFilterObjectSchema).optional()
}).strict();
export const NestedEnumQuoteStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumQuoteStatusWithAggregatesFilter> = nestedenumquotestatuswithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumQuoteStatusWithAggregatesFilter>;
export const NestedEnumQuoteStatusWithAggregatesFilterObjectZodSchema = nestedenumquotestatuswithaggregatesfilterSchema;
