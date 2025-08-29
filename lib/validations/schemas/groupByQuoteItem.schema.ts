import { z } from 'zod';
import { QuoteItemWhereInputObjectSchema } from './objects/QuoteItemWhereInput.schema';
import { QuoteItemOrderByWithAggregationInputObjectSchema } from './objects/QuoteItemOrderByWithAggregationInput.schema';
import { QuoteItemScalarWhereWithAggregatesInputObjectSchema } from './objects/QuoteItemScalarWhereWithAggregatesInput.schema';
import { QuoteItemScalarFieldEnumSchema } from './enums/QuoteItemScalarFieldEnum.schema';
import { QuoteItemCountAggregateInputObjectSchema } from './objects/QuoteItemCountAggregateInput.schema';
import { QuoteItemMinAggregateInputObjectSchema } from './objects/QuoteItemMinAggregateInput.schema';
import { QuoteItemMaxAggregateInputObjectSchema } from './objects/QuoteItemMaxAggregateInput.schema';

export const QuoteItemGroupBySchema = z.object({ where: QuoteItemWhereInputObjectSchema.optional(), orderBy: z.union([QuoteItemOrderByWithAggregationInputObjectSchema, QuoteItemOrderByWithAggregationInputObjectSchema.array()]).optional(), having: QuoteItemScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(QuoteItemScalarFieldEnumSchema), _count: z.union([ z.literal(true), QuoteItemCountAggregateInputObjectSchema ]).optional(), _min: QuoteItemMinAggregateInputObjectSchema.optional(), _max: QuoteItemMaxAggregateInputObjectSchema.optional() })