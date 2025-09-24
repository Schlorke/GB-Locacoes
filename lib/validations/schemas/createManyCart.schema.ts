import { z } from 'zod';
import { CartCreateManyInputObjectSchema } from './objects/CartCreateManyInput.schema';

export const CartCreateManySchema = z.object({ data: z.union([ CartCreateManyInputObjectSchema, z.array(CartCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() })