import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CartOrderByWithRelationInputObjectSchema as CartOrderByWithRelationInputObjectSchema } from './objects/CartOrderByWithRelationInput.schema';
import { CartWhereInputObjectSchema as CartWhereInputObjectSchema } from './objects/CartWhereInput.schema';
import { CartWhereUniqueInputObjectSchema as CartWhereUniqueInputObjectSchema } from './objects/CartWhereUniqueInput.schema';
import { CartCountAggregateInputObjectSchema as CartCountAggregateInputObjectSchema } from './objects/CartCountAggregateInput.schema';

export const CartCountSchema: z.ZodType<Prisma.CartCountArgs> = z.object({ orderBy: z.union([CartOrderByWithRelationInputObjectSchema, CartOrderByWithRelationInputObjectSchema.array()]).optional(), where: CartWhereInputObjectSchema.optional(), cursor: CartWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CartCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.CartCountArgs>;

export const CartCountZodSchema = z.object({ orderBy: z.union([CartOrderByWithRelationInputObjectSchema, CartOrderByWithRelationInputObjectSchema.array()]).optional(), where: CartWhereInputObjectSchema.optional(), cursor: CartWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CartCountAggregateInputObjectSchema ]).optional() }).strict();