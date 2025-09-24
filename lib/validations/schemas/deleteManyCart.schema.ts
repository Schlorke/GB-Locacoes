import { z } from 'zod';
import { CartWhereInputObjectSchema } from './objects/CartWhereInput.schema';

export const CartDeleteManySchema = z.object({ where: CartWhereInputObjectSchema.optional()  })