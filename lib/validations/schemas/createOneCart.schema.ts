import { z } from 'zod';
import { CartSelectObjectSchema } from './objects/CartSelect.schema';
import { CartIncludeObjectSchema } from './objects/CartInclude.schema';
import { CartCreateInputObjectSchema } from './objects/CartCreateInput.schema';
import { CartUncheckedCreateInputObjectSchema } from './objects/CartUncheckedCreateInput.schema';

export const CartCreateOneSchema = z.object({ select: CartSelectObjectSchema.optional(), include: CartIncludeObjectSchema.optional(), data: z.union([CartCreateInputObjectSchema, CartUncheckedCreateInputObjectSchema])  })