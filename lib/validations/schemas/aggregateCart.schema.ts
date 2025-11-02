import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CartOrderByWithRelationInputObjectSchema as CartOrderByWithRelationInputObjectSchema } from './objects/CartOrderByWithRelationInput.schema';
import { CartWhereInputObjectSchema as CartWhereInputObjectSchema } from './objects/CartWhereInput.schema';
import { CartWhereUniqueInputObjectSchema as CartWhereUniqueInputObjectSchema } from './objects/CartWhereUniqueInput.schema';
import { CartCountAggregateInputObjectSchema as CartCountAggregateInputObjectSchema } from './objects/CartCountAggregateInput.schema';
import { CartMinAggregateInputObjectSchema as CartMinAggregateInputObjectSchema } from './objects/CartMinAggregateInput.schema';
import { CartMaxAggregateInputObjectSchema as CartMaxAggregateInputObjectSchema } from './objects/CartMaxAggregateInput.schema';

export const CartAggregateSchema: z.ZodType<Prisma.CartAggregateArgs> = z.object({ orderBy: z.union([CartOrderByWithRelationInputObjectSchema, CartOrderByWithRelationInputObjectSchema.array()]).optional(), where: CartWhereInputObjectSchema.optional(), cursor: CartWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), CartCountAggregateInputObjectSchema ]).optional(), _min: CartMinAggregateInputObjectSchema.optional(), _max: CartMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CartAggregateArgs>;

export const CartAggregateZodSchema = z.object({ orderBy: z.union([CartOrderByWithRelationInputObjectSchema, CartOrderByWithRelationInputObjectSchema.array()]).optional(), where: CartWhereInputObjectSchema.optional(), cursor: CartWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), CartCountAggregateInputObjectSchema ]).optional(), _min: CartMinAggregateInputObjectSchema.optional(), _max: CartMaxAggregateInputObjectSchema.optional() }).strict();