import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CartItemSelectObjectSchema as CartItemSelectObjectSchema } from './objects/CartItemSelect.schema';
import { CartItemCreateManyInputObjectSchema as CartItemCreateManyInputObjectSchema } from './objects/CartItemCreateManyInput.schema';

export const CartItemCreateManyAndReturnSchema: z.ZodType<Prisma.CartItemCreateManyAndReturnArgs> = z.object({ select: CartItemSelectObjectSchema.optional(), data: z.union([ CartItemCreateManyInputObjectSchema, z.array(CartItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CartItemCreateManyAndReturnArgs>;

export const CartItemCreateManyAndReturnZodSchema = z.object({ select: CartItemSelectObjectSchema.optional(), data: z.union([ CartItemCreateManyInputObjectSchema, z.array(CartItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();