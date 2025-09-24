import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CartItemOrderByWithRelationInputObjectSchema } from './objects/CartItemOrderByWithRelationInput.schema';
import { CartItemWhereInputObjectSchema } from './objects/CartItemWhereInput.schema';
import { CartItemWhereUniqueInputObjectSchema } from './objects/CartItemWhereUniqueInput.schema';
import { CartItemCountAggregateInputObjectSchema } from './objects/CartItemCountAggregateInput.schema';

export const CartItemCountSchema: z.ZodType<Prisma.CartItemCountArgs> = z.object({ orderBy: z.union([CartItemOrderByWithRelationInputObjectSchema, CartItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: CartItemWhereInputObjectSchema.optional(), cursor: CartItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CartItemCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.CartItemCountArgs>;

export const CartItemCountZodSchema = z.object({ orderBy: z.union([CartItemOrderByWithRelationInputObjectSchema, CartItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: CartItemWhereInputObjectSchema.optional(), cursor: CartItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CartItemCountAggregateInputObjectSchema ]).optional() }).strict();