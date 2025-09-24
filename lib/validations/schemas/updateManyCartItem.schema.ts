import { z } from 'zod';
import { CartItemUpdateManyMutationInputObjectSchema } from './objects/CartItemUpdateManyMutationInput.schema';
import { CartItemWhereInputObjectSchema } from './objects/CartItemWhereInput.schema';

export const CartItemUpdateManySchema = z.object({ data: CartItemUpdateManyMutationInputObjectSchema, where: CartItemWhereInputObjectSchema.optional()  })