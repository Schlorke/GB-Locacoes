import { z } from 'zod';
import { CartItemCreateManyInputObjectSchema } from './objects/CartItemCreateManyInput.schema';

export const CartItemCreateManySchema = z.object({ data: z.union([ CartItemCreateManyInputObjectSchema, z.array(CartItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() })