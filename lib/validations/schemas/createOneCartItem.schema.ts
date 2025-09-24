import { z } from 'zod';
import { CartItemSelectObjectSchema } from './objects/CartItemSelect.schema';
import { CartItemIncludeObjectSchema } from './objects/CartItemInclude.schema';
import { CartItemCreateInputObjectSchema } from './objects/CartItemCreateInput.schema';
import { CartItemUncheckedCreateInputObjectSchema } from './objects/CartItemUncheckedCreateInput.schema';

export const CartItemCreateOneSchema = z.object({ select: CartItemSelectObjectSchema.optional(), include: CartItemIncludeObjectSchema.optional(), data: z.union([CartItemCreateInputObjectSchema, CartItemUncheckedCreateInputObjectSchema])  })