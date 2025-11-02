import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CartItemSelectObjectSchema as CartItemSelectObjectSchema } from './objects/CartItemSelect.schema';
import { CartItemIncludeObjectSchema as CartItemIncludeObjectSchema } from './objects/CartItemInclude.schema';
import { CartItemUpdateInputObjectSchema as CartItemUpdateInputObjectSchema } from './objects/CartItemUpdateInput.schema';
import { CartItemUncheckedUpdateInputObjectSchema as CartItemUncheckedUpdateInputObjectSchema } from './objects/CartItemUncheckedUpdateInput.schema';
import { CartItemWhereUniqueInputObjectSchema as CartItemWhereUniqueInputObjectSchema } from './objects/CartItemWhereUniqueInput.schema';

export const CartItemUpdateOneSchema: z.ZodType<Prisma.CartItemUpdateArgs> = z.object({ select: CartItemSelectObjectSchema.optional(), include: CartItemIncludeObjectSchema.optional(), data: z.union([CartItemUpdateInputObjectSchema, CartItemUncheckedUpdateInputObjectSchema]), where: CartItemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CartItemUpdateArgs>;

export const CartItemUpdateOneZodSchema = z.object({ select: CartItemSelectObjectSchema.optional(), include: CartItemIncludeObjectSchema.optional(), data: z.union([CartItemUpdateInputObjectSchema, CartItemUncheckedUpdateInputObjectSchema]), where: CartItemWhereUniqueInputObjectSchema }).strict();