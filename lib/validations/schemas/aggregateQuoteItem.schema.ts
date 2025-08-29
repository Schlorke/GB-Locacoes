import { z } from 'zod';
import { QuoteItemOrderByWithRelationInputObjectSchema } from './objects/QuoteItemOrderByWithRelationInput.schema';
import { QuoteItemWhereInputObjectSchema } from './objects/QuoteItemWhereInput.schema';
import { QuoteItemWhereUniqueInputObjectSchema } from './objects/QuoteItemWhereUniqueInput.schema';
import { QuoteItemCountAggregateInputObjectSchema } from './objects/QuoteItemCountAggregateInput.schema';
import { QuoteItemMinAggregateInputObjectSchema } from './objects/QuoteItemMinAggregateInput.schema';
import { QuoteItemMaxAggregateInputObjectSchema } from './objects/QuoteItemMaxAggregateInput.schema';
import { QuoteItemAvgAggregateInputObjectSchema } from './objects/QuoteItemAvgAggregateInput.schema';
import { QuoteItemSumAggregateInputObjectSchema } from './objects/QuoteItemSumAggregateInput.schema';

export const QuoteItemAggregateSchema = z.object({ orderBy: z.union([QuoteItemOrderByWithRelationInputObjectSchema, QuoteItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: QuoteItemWhereInputObjectSchema.optional(), cursor: QuoteItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), QuoteItemCountAggregateInputObjectSchema ]).optional(), _min: QuoteItemMinAggregateInputObjectSchema.optional(), _max: QuoteItemMaxAggregateInputObjectSchema.optional(), _avg: QuoteItemAvgAggregateInputObjectSchema.optional(), _sum: QuoteItemSumAggregateInputObjectSchema.optional() })