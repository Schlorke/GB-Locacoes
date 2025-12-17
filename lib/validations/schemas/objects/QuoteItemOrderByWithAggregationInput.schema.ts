import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { QuoteItemCountOrderByAggregateInputObjectSchema as QuoteItemCountOrderByAggregateInputObjectSchema } from './QuoteItemCountOrderByAggregateInput.schema';
import { QuoteItemAvgOrderByAggregateInputObjectSchema as QuoteItemAvgOrderByAggregateInputObjectSchema } from './QuoteItemAvgOrderByAggregateInput.schema';
import { QuoteItemMaxOrderByAggregateInputObjectSchema as QuoteItemMaxOrderByAggregateInputObjectSchema } from './QuoteItemMaxOrderByAggregateInput.schema';
import { QuoteItemMinOrderByAggregateInputObjectSchema as QuoteItemMinOrderByAggregateInputObjectSchema } from './QuoteItemMinOrderByAggregateInput.schema';
import { QuoteItemSumOrderByAggregateInputObjectSchema as QuoteItemSumOrderByAggregateInputObjectSchema } from './QuoteItemSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  quoteId: SortOrderSchema.optional(),
  equipmentId: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  days: SortOrderSchema.optional(),
  pricePerDay: SortOrderSchema.optional(),
  total: SortOrderSchema.optional(),
  startDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  endDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  includeWeekends: SortOrderSchema.optional(),
  appliedDiscount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  appliedPeriod: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  useDirectValue: SortOrderSchema.optional(),
  directValue: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => QuoteItemCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => QuoteItemAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => QuoteItemMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => QuoteItemMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => QuoteItemSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const QuoteItemOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.QuoteItemOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemOrderByWithAggregationInput>;
export const QuoteItemOrderByWithAggregationInputObjectZodSchema = makeSchema();
