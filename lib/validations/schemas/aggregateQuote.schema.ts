import { z } from 'zod'
import { QuoteOrderByWithRelationInputObjectSchema } from './objects/QuoteOrderByWithRelationInput.schema'
import { QuoteWhereInputObjectSchema } from './objects/QuoteWhereInput.schema'
import { QuoteWhereUniqueInputObjectSchema } from './objects/QuoteWhereUniqueInput.schema'
import { QuoteCountAggregateInputObjectSchema } from './objects/QuoteCountAggregateInput.schema'
import { QuoteMinAggregateInputObjectSchema } from './objects/QuoteMinAggregateInput.schema'
import { QuoteMaxAggregateInputObjectSchema } from './objects/QuoteMaxAggregateInput.schema'
import { QuoteAvgAggregateInputObjectSchema } from './objects/QuoteAvgAggregateInput.schema'
import { QuoteSumAggregateInputObjectSchema } from './objects/QuoteSumAggregateInput.schema'

export const QuoteAggregateSchema = z.object({
  orderBy: z
    .union([
      QuoteOrderByWithRelationInputObjectSchema,
      QuoteOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: QuoteWhereInputObjectSchema.optional(),
  cursor: QuoteWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), QuoteCountAggregateInputObjectSchema])
    .optional(),
  _min: QuoteMinAggregateInputObjectSchema.optional(),
  _max: QuoteMaxAggregateInputObjectSchema.optional(),
  _avg: QuoteAvgAggregateInputObjectSchema.optional(),
  _sum: QuoteSumAggregateInputObjectSchema.optional(),
})
