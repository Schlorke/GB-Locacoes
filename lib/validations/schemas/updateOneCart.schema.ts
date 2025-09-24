import { z } from 'zod';
import { CartSelectObjectSchema } from './objects/CartSelect.schema';
import { CartIncludeObjectSchema } from './objects/CartInclude.schema';
import { CartUpdateInputObjectSchema } from './objects/CartUpdateInput.schema';
import { CartUncheckedUpdateInputObjectSchema } from './objects/CartUncheckedUpdateInput.schema';
import { CartWhereUniqueInputObjectSchema } from './objects/CartWhereUniqueInput.schema';

export const CartUpdateOneSchema = z.object({ select: CartSelectObjectSchema.optional(), include: CartIncludeObjectSchema.optional(), data: z.union([CartUpdateInputObjectSchema, CartUncheckedUpdateInputObjectSchema]), where: CartWhereUniqueInputObjectSchema  })