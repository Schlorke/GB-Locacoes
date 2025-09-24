import { z } from 'zod';
import { CartItemSelectObjectSchema } from './objects/CartItemSelect.schema';
import { CartItemIncludeObjectSchema } from './objects/CartItemInclude.schema';
import { CartItemWhereUniqueInputObjectSchema } from './objects/CartItemWhereUniqueInput.schema';
import { CartItemCreateInputObjectSchema } from './objects/CartItemCreateInput.schema';
import { CartItemUncheckedCreateInputObjectSchema } from './objects/CartItemUncheckedCreateInput.schema';
import { CartItemUpdateInputObjectSchema } from './objects/CartItemUpdateInput.schema';
import { CartItemUncheckedUpdateInputObjectSchema } from './objects/CartItemUncheckedUpdateInput.schema';

export const CartItemUpsertSchema = z.object({ select: CartItemSelectObjectSchema.optional(), include: CartItemIncludeObjectSchema.optional(), where: CartItemWhereUniqueInputObjectSchema, create: z.union([ CartItemCreateInputObjectSchema, CartItemUncheckedCreateInputObjectSchema ]), update: z.union([ CartItemUpdateInputObjectSchema, CartItemUncheckedUpdateInputObjectSchema ])  })