import { z } from 'zod';
import { CartItemWhereInputObjectSchema } from './objects/CartItemWhereInput.schema';

export const CartItemDeleteManySchema = z.object({ where: CartItemWhereInputObjectSchema.optional()  })