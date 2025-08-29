import type { Prisma } from '../../../node_modules/.prisma/client';
import { z } from 'zod';
import { QuoteItemOrderByWithRelationInputObjectSchema } from './objects/QuoteItemOrderByWithRelationInput.schema';
import { QuoteItemWhereInputObjectSchema } from './objects/QuoteItemWhereInput.schema';
import { QuoteItemWhereUniqueInputObjectSchema } from './objects/QuoteItemWhereUniqueInput.schema';
import { QuoteItemCountAggregateInputObjectSchema } from './objects/QuoteItemCountAggregateInput.schema';

export const QuoteItemCountSchema: z.ZodType<Prisma.QuoteItemCountArgs> = z.object({ orderBy: z.union([QuoteItemOrderByWithRelationInputObjectSchema, QuoteItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: QuoteItemWhereInputObjectSchema.optional(), cursor: QuoteItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), QuoteItemCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.QuoteItemCountArgs>;

export const QuoteItemCountZodSchema = z.object({ orderBy: z.union([QuoteItemOrderByWithRelationInputObjectSchema, QuoteItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: QuoteItemWhereInputObjectSchema.optional(), cursor: QuoteItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), QuoteItemCountAggregateInputObjectSchema ]).optional() }).strict();