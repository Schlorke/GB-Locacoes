import { z } from 'zod';
import { CartSelectObjectSchema } from './objects/CartSelect.schema';
import { CartCreateManyInputObjectSchema } from './objects/CartCreateManyInput.schema';

export const CartCreateManyAndReturnSchema = z.object({ select: CartSelectObjectSchema.optional(), data: z.union([ CartCreateManyInputObjectSchema, z.array(CartCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()