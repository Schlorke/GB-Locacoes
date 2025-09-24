import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CartWhereInputObjectSchema } from './objects/CartWhereInput.schema';
import { CartOrderByWithAggregationInputObjectSchema } from './objects/CartOrderByWithAggregationInput.schema';
import { CartScalarWhereWithAggregatesInputObjectSchema } from './objects/CartScalarWhereWithAggregatesInput.schema';
import { CartScalarFieldEnumSchema } from './enums/CartScalarFieldEnum.schema';
import { CartCountAggregateInputObjectSchema } from './objects/CartCountAggregateInput.schema';
import { CartMinAggregateInputObjectSchema } from './objects/CartMinAggregateInput.schema';
import { CartMaxAggregateInputObjectSchema } from './objects/CartMaxAggregateInput.schema';

export const CartGroupBySchema: z.ZodType<Prisma.CartGroupByArgs> = z.object({ where: CartWhereInputObjectSchema.optional(), orderBy: z.union([CartOrderByWithAggregationInputObjectSchema, CartOrderByWithAggregationInputObjectSchema.array()]).optional(), having: CartScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(CartScalarFieldEnumSchema), _count: z.union([ z.literal(true), CartCountAggregateInputObjectSchema ]).optional(), _min: CartMinAggregateInputObjectSchema.optional(), _max: CartMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CartGroupByArgs>;

export const CartGroupByZodSchema = z.object({ where: CartWhereInputObjectSchema.optional(), orderBy: z.union([CartOrderByWithAggregationInputObjectSchema, CartOrderByWithAggregationInputObjectSchema.array()]).optional(), having: CartScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(CartScalarFieldEnumSchema), _count: z.union([ z.literal(true), CartCountAggregateInputObjectSchema ]).optional(), _min: CartMinAggregateInputObjectSchema.optional(), _max: CartMaxAggregateInputObjectSchema.optional() }).strict();