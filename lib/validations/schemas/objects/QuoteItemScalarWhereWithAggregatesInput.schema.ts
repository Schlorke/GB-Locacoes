import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema'

export const QuoteItemScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.QuoteItemScalarWhereWithAggregatesInput, Prisma.QuoteItemScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => QuoteItemScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => QuoteItemScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => QuoteItemScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => QuoteItemScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => QuoteItemScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  quoteId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  equipmentId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  days: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  pricePerDay: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.number()]).optional(),
  total: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.number()]).optional()
}).strict();
export const QuoteItemScalarWhereWithAggregatesInputObjectZodSchema = z.object({
  AND: z.union([z.lazy(() => QuoteItemScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => QuoteItemScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => QuoteItemScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => QuoteItemScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => QuoteItemScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  quoteId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  equipmentId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  days: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  pricePerDay: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.number()]).optional(),
  total: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.number()]).optional()
}).strict();
