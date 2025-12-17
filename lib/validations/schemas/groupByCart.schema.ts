import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CartWhereInputObjectSchema as CartWhereInputObjectSchema } from './objects/CartWhereInput.schema';
import { CartOrderByWithAggregationInputObjectSchema as CartOrderByWithAggregationInputObjectSchema } from './objects/CartOrderByWithAggregationInput.schema';
import { CartScalarWhereWithAggregatesInputObjectSchema as CartScalarWhereWithAggregatesInputObjectSchema } from './objects/CartScalarWhereWithAggregatesInput.schema';
import { CartScalarFieldEnumSchema } from './enums/CartScalarFieldEnum.schema';
import { CartCountAggregateInputObjectSchema as CartCountAggregateInputObjectSchema } from './objects/CartCountAggregateInput.schema';
import { CartMinAggregateInputObjectSchema as CartMinAggregateInputObjectSchema } from './objects/CartMinAggregateInput.schema';
import { CartMaxAggregateInputObjectSchema as CartMaxAggregateInputObjectSchema } from './objects/CartMaxAggregateInput.schema';

export const CartGroupBySchema: z.ZodType<Prisma.CartGroupByArgs> = z.object({ where: CartWhereInputObjectSchema.optional(), orderBy: z.union([CartOrderByWithAggregationInputObjectSchema, CartOrderByWithAggregationInputObjectSchema.array()]).optional(), having: CartScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(CartScalarFieldEnumSchema), _count: z.union([ z.literal(true), CartCountAggregateInputObjectSchema ]).optional(), _min: CartMinAggregateInputObjectSchema.optional(), _max: CartMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CartGroupByArgs>;

export const CartGroupByZodSchema = z.object({ where: CartWhereInputObjectSchema.optional(), orderBy: z.union([CartOrderByWithAggregationInputObjectSchema, CartOrderByWithAggregationInputObjectSchema.array()]).optional(), having: CartScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(CartScalarFieldEnumSchema), _count: z.union([ z.literal(true), CartCountAggregateInputObjectSchema ]).optional(), _min: CartMinAggregateInputObjectSchema.optional(), _max: CartMaxAggregateInputObjectSchema.optional() }).strict();