import { z } from 'zod';
import { CartUpdateManyMutationInputObjectSchema } from './objects/CartUpdateManyMutationInput.schema';
import { CartWhereInputObjectSchema } from './objects/CartWhereInput.schema';

export const CartUpdateManySchema = z.object({ data: CartUpdateManyMutationInputObjectSchema, where: CartWhereInputObjectSchema.optional()  })