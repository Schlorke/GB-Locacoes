import { z } from 'zod';
import { CartItemSelectObjectSchema } from './objects/CartItemSelect.schema';
import { CartItemUpdateManyMutationInputObjectSchema } from './objects/CartItemUpdateManyMutationInput.schema';
import { CartItemWhereInputObjectSchema } from './objects/CartItemWhereInput.schema';

export const CartItemUpdateManyAndReturnSchema = z.object({ select: CartItemSelectObjectSchema.optional(), data: CartItemUpdateManyMutationInputObjectSchema, where: CartItemWhereInputObjectSchema.optional()  }).strict()