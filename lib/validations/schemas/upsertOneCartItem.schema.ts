import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CartItemSelectObjectSchema as CartItemSelectObjectSchema } from './objects/CartItemSelect.schema';
import { CartItemIncludeObjectSchema as CartItemIncludeObjectSchema } from './objects/CartItemInclude.schema';
import { CartItemWhereUniqueInputObjectSchema as CartItemWhereUniqueInputObjectSchema } from './objects/CartItemWhereUniqueInput.schema';
import { CartItemCreateInputObjectSchema as CartItemCreateInputObjectSchema } from './objects/CartItemCreateInput.schema';
import { CartItemUncheckedCreateInputObjectSchema as CartItemUncheckedCreateInputObjectSchema } from './objects/CartItemUncheckedCreateInput.schema';
import { CartItemUpdateInputObjectSchema as CartItemUpdateInputObjectSchema } from './objects/CartItemUpdateInput.schema';
import { CartItemUncheckedUpdateInputObjectSchema as CartItemUncheckedUpdateInputObjectSchema } from './objects/CartItemUncheckedUpdateInput.schema';

export const CartItemUpsertOneSchema: z.ZodType<Prisma.CartItemUpsertArgs> = z.object({ select: CartItemSelectObjectSchema.optional(), include: CartItemIncludeObjectSchema.optional(), where: CartItemWhereUniqueInputObjectSchema, create: z.union([ CartItemCreateInputObjectSchema, CartItemUncheckedCreateInputObjectSchema ]), update: z.union([ CartItemUpdateInputObjectSchema, CartItemUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.CartItemUpsertArgs>;

export const CartItemUpsertOneZodSchema = z.object({ select: CartItemSelectObjectSchema.optional(), include: CartItemIncludeObjectSchema.optional(), where: CartItemWhereUniqueInputObjectSchema, create: z.union([ CartItemCreateInputObjectSchema, CartItemUncheckedCreateInputObjectSchema ]), update: z.union([ CartItemUpdateInputObjectSchema, CartItemUncheckedUpdateInputObjectSchema ]) }).strict();