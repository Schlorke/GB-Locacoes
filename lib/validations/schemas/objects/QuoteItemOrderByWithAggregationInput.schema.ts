import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { QuoteItemCountOrderByAggregateInputObjectSchema } from './QuoteItemCountOrderByAggregateInput.schema'
import { QuoteItemAvgOrderByAggregateInputObjectSchema } from './QuoteItemAvgOrderByAggregateInput.schema'
import { QuoteItemMaxOrderByAggregateInputObjectSchema } from './QuoteItemMaxOrderByAggregateInput.schema'
import { QuoteItemMinOrderByAggregateInputObjectSchema } from './QuoteItemMinOrderByAggregateInput.schema'
import { QuoteItemSumOrderByAggregateInputObjectSchema } from './QuoteItemSumOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: SortOrderSchema.optional(),
      quoteId: SortOrderSchema.optional(),
      equipmentId: SortOrderSchema.optional(),
      quantity: SortOrderSchema.optional(),
      days: SortOrderSchema.optional(),
      pricePerDay: SortOrderSchema.optional(),
      total: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      _count: z
        .lazy(() => QuoteItemCountOrderByAggregateInputObjectSchema)
        .optional(),
      _avg: z
        .lazy(() => QuoteItemAvgOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => QuoteItemMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => QuoteItemMinOrderByAggregateInputObjectSchema)
        .optional(),
      _sum: z
        .lazy(() => QuoteItemSumOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict()
export const QuoteItemOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.QuoteItemOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteItemOrderByWithAggregationInput>
export const QuoteItemOrderByWithAggregationInputObjectZodSchema = makeSchema()
