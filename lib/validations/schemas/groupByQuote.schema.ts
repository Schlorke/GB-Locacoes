import { z } from 'zod';
import { QuoteWhereInputObjectSchema } from './objects/QuoteWhereInput.schema';
import { QuoteOrderByWithAggregationInputObjectSchema } from './objects/QuoteOrderByWithAggregationInput.schema';
import { QuoteScalarWhereWithAggregatesInputObjectSchema } from './objects/QuoteScalarWhereWithAggregatesInput.schema';
import { QuoteScalarFieldEnumSchema } from './enums/QuoteScalarFieldEnum.schema';
import { QuoteCountAggregateInputObjectSchema } from './objects/QuoteCountAggregateInput.schema';
import { QuoteMinAggregateInputObjectSchema } from './objects/QuoteMinAggregateInput.schema';
import { QuoteMaxAggregateInputObjectSchema } from './objects/QuoteMaxAggregateInput.schema';

export const QuoteGroupBySchema = z.object({ where: QuoteWhereInputObjectSchema.optional(), orderBy: z.union([QuoteOrderByWithAggregationInputObjectSchema, QuoteOrderByWithAggregationInputObjectSchema.array()]).optional(), having: QuoteScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(QuoteScalarFieldEnumSchema), _count: z.union([ z.literal(true), QuoteCountAggregateInputObjectSchema ]).optional(), _min: QuoteMinAggregateInputObjectSchema.optional(), _max: QuoteMaxAggregateInputObjectSchema.optional() })