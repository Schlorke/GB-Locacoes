import { z } from 'zod';
import { CartSelectObjectSchema } from './objects/CartSelect.schema';
import { CartIncludeObjectSchema } from './objects/CartInclude.schema';
import { CartWhereUniqueInputObjectSchema } from './objects/CartWhereUniqueInput.schema';
import { CartCreateInputObjectSchema } from './objects/CartCreateInput.schema';
import { CartUncheckedCreateInputObjectSchema } from './objects/CartUncheckedCreateInput.schema';
import { CartUpdateInputObjectSchema } from './objects/CartUpdateInput.schema';
import { CartUncheckedUpdateInputObjectSchema } from './objects/CartUncheckedUpdateInput.schema';

export const CartUpsertSchema = z.object({ select: CartSelectObjectSchema.optional(), include: CartIncludeObjectSchema.optional(), where: CartWhereUniqueInputObjectSchema, create: z.union([ CartCreateInputObjectSchema, CartUncheckedCreateInputObjectSchema ]), update: z.union([ CartUpdateInputObjectSchema, CartUncheckedUpdateInputObjectSchema ])  })