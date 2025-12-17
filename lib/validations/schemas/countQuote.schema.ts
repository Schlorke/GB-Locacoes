import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { QuoteOrderByWithRelationInputObjectSchema as QuoteOrderByWithRelationInputObjectSchema } from './objects/QuoteOrderByWithRelationInput.schema';
import { QuoteWhereInputObjectSchema as QuoteWhereInputObjectSchema } from './objects/QuoteWhereInput.schema';
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './objects/QuoteWhereUniqueInput.schema';
import { QuoteCountAggregateInputObjectSchema as QuoteCountAggregateInputObjectSchema } from './objects/QuoteCountAggregateInput.schema';

export const QuoteCountSchema: z.ZodType<Prisma.QuoteCountArgs> = z.object({ orderBy: z.union([QuoteOrderByWithRelationInputObjectSchema, QuoteOrderByWithRelationInputObjectSchema.array()]).optional(), where: QuoteWhereInputObjectSchema.optional(), cursor: QuoteWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), QuoteCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.QuoteCountArgs>;

export const QuoteCountZodSchema = z.object({ orderBy: z.union([QuoteOrderByWithRelationInputObjectSchema, QuoteOrderByWithRelationInputObjectSchema.array()]).optional(), where: QuoteWhereInputObjectSchema.optional(), cursor: QuoteWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), QuoteCountAggregateInputObjectSchema ]).optional() }).strict();