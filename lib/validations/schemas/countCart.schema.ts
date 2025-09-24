import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CartOrderByWithRelationInputObjectSchema } from './objects/CartOrderByWithRelationInput.schema';
import { CartWhereInputObjectSchema } from './objects/CartWhereInput.schema';
import { CartWhereUniqueInputObjectSchema } from './objects/CartWhereUniqueInput.schema';
import { CartCountAggregateInputObjectSchema } from './objects/CartCountAggregateInput.schema';

export const CartCountSchema: z.ZodType<Prisma.CartCountArgs> = z.object({ orderBy: z.union([CartOrderByWithRelationInputObjectSchema, CartOrderByWithRelationInputObjectSchema.array()]).optional(), where: CartWhereInputObjectSchema.optional(), cursor: CartWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CartCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.CartCountArgs>;

export const CartCountZodSchema = z.object({ orderBy: z.union([CartOrderByWithRelationInputObjectSchema, CartOrderByWithRelationInputObjectSchema.array()]).optional(), where: CartWhereInputObjectSchema.optional(), cursor: CartWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CartCountAggregateInputObjectSchema ]).optional() }).strict();