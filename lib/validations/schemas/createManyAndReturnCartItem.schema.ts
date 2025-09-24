import { z } from 'zod';
import { CartItemSelectObjectSchema } from './objects/CartItemSelect.schema';
import { CartItemCreateManyInputObjectSchema } from './objects/CartItemCreateManyInput.schema';

export const CartItemCreateManyAndReturnSchema = z.object({ select: CartItemSelectObjectSchema.optional(), data: z.union([ CartItemCreateManyInputObjectSchema, z.array(CartItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()