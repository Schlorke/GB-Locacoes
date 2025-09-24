import { z } from 'zod';
import { CartSelectObjectSchema } from './objects/CartSelect.schema';
import { CartUpdateManyMutationInputObjectSchema } from './objects/CartUpdateManyMutationInput.schema';
import { CartWhereInputObjectSchema } from './objects/CartWhereInput.schema';

export const CartUpdateManyAndReturnSchema = z.object({ select: CartSelectObjectSchema.optional(), data: CartUpdateManyMutationInputObjectSchema, where: CartWhereInputObjectSchema.optional()  }).strict()