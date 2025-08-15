import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { QuoteCountOrderByAggregateInputObjectSchema } from './QuoteCountOrderByAggregateInput.schema'
import { QuoteAvgOrderByAggregateInputObjectSchema } from './QuoteAvgOrderByAggregateInput.schema'
import { QuoteMaxOrderByAggregateInputObjectSchema } from './QuoteMaxOrderByAggregateInput.schema'
import { QuoteMinOrderByAggregateInputObjectSchema } from './QuoteMinOrderByAggregateInput.schema'
import { QuoteSumOrderByAggregateInputObjectSchema } from './QuoteSumOrderByAggregateInput.schema'

export const QuoteOrderByWithAggregationInputObjectSchema: z.ZodType<
  Prisma.QuoteOrderByWithAggregationInput,
  Prisma.QuoteOrderByWithAggregationInput
> = z
  .object({
    id: SortOrderSchema.optional(),
    name: SortOrderSchema.optional(),
    email: SortOrderSchema.optional(),
    phone: SortOrderSchema.optional(),
    company: z
      .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
      .optional(),
    message: z
      .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
      .optional(),
    total: SortOrderSchema.optional(),
    status: SortOrderSchema.optional(),
    userId: z
      .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
      .optional(),
    createdAt: SortOrderSchema.optional(),
    updatedAt: SortOrderSchema.optional(),
    _count: z
      .lazy(() => QuoteCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z.lazy(() => QuoteAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => QuoteMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => QuoteMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => QuoteSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict()
export const QuoteOrderByWithAggregationInputObjectZodSchema = z
  .object({
    id: SortOrderSchema.optional(),
    name: SortOrderSchema.optional(),
    email: SortOrderSchema.optional(),
    phone: SortOrderSchema.optional(),
    company: z
      .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
      .optional(),
    message: z
      .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
      .optional(),
    total: SortOrderSchema.optional(),
    status: SortOrderSchema.optional(),
    userId: z
      .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
      .optional(),
    createdAt: SortOrderSchema.optional(),
    updatedAt: SortOrderSchema.optional(),
    _count: z
      .lazy(() => QuoteCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z.lazy(() => QuoteAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => QuoteMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => QuoteMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => QuoteSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict()
