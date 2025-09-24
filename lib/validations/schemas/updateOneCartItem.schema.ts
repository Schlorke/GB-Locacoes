import { z } from 'zod';
import { CartItemSelectObjectSchema } from './objects/CartItemSelect.schema';
import { CartItemIncludeObjectSchema } from './objects/CartItemInclude.schema';
import { CartItemUpdateInputObjectSchema } from './objects/CartItemUpdateInput.schema';
import { CartItemUncheckedUpdateInputObjectSchema } from './objects/CartItemUncheckedUpdateInput.schema';
import { CartItemWhereUniqueInputObjectSchema } from './objects/CartItemWhereUniqueInput.schema';

export const CartItemUpdateOneSchema = z.object({ select: CartItemSelectObjectSchema.optional(), include: CartItemIncludeObjectSchema.optional(), data: z.union([CartItemUpdateInputObjectSchema, CartItemUncheckedUpdateInputObjectSchema]), where: CartItemWhereUniqueInputObjectSchema  })