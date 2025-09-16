import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { QuoteWhereInputObjectSchema } from './objects/QuoteWhereInput.schema';
import { QuoteOrderByWithAggregationInputObjectSchema } from './objects/QuoteOrderByWithAggregationInput.schema';
import { QuoteScalarWhereWithAggregatesInputObjectSchema } from './objects/QuoteScalarWhereWithAggregatesInput.schema';
import { QuoteScalarFieldEnumSchema } from './enums/QuoteScalarFieldEnum.schema';
import { QuoteCountAggregateInputObjectSchema } from './objects/QuoteCountAggregateInput.schema';
import { QuoteMinAggregateInputObjectSchema } from './objects/QuoteMinAggregateInput.schema';
import { QuoteMaxAggregateInputObjectSchema } from './objects/QuoteMaxAggregateInput.schema';
import { QuoteAvgAggregateInputObjectSchema } from './objects/QuoteAvgAggregateInput.schema';
import { QuoteSumAggregateInputObjectSchema } from './objects/QuoteSumAggregateInput.schema';

export const QuoteGroupBySchema: z.ZodType<Prisma.QuoteGroupByArgs> = z.object({ where: QuoteWhereInputObjectSchema.optional(), orderBy: z.union([QuoteOrderByWithAggregationInputObjectSchema, QuoteOrderByWithAggregationInputObjectSchema.array()]).optional(), having: QuoteScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(QuoteScalarFieldEnumSchema), _count: z.union([ z.literal(true), QuoteCountAggregateInputObjectSchema ]).optional(), _min: QuoteMinAggregateInputObjectSchema.optional(), _max: QuoteMaxAggregateInputObjectSchema.optional(), _avg: QuoteAvgAggregateInputObjectSchema.optional(), _sum: QuoteSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.QuoteGroupByArgs>;

export const QuoteGroupByZodSchema = z.object({ where: QuoteWhereInputObjectSchema.optional(), orderBy: z.union([QuoteOrderByWithAggregationInputObjectSchema, QuoteOrderByWithAggregationInputObjectSchema.array()]).optional(), having: QuoteScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(QuoteScalarFieldEnumSchema), _count: z.union([ z.literal(true), QuoteCountAggregateInputObjectSchema ]).optional(), _min: QuoteMinAggregateInputObjectSchema.optional(), _max: QuoteMaxAggregateInputObjectSchema.optional(), _avg: QuoteAvgAggregateInputObjectSchema.optional(), _sum: QuoteSumAggregateInputObjectSchema.optional() }).strict();