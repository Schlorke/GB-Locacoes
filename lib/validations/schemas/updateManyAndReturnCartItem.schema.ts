import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CartItemSelectObjectSchema as CartItemSelectObjectSchema } from './objects/CartItemSelect.schema';
import { CartItemUpdateManyMutationInputObjectSchema as CartItemUpdateManyMutationInputObjectSchema } from './objects/CartItemUpdateManyMutationInput.schema';
import { CartItemWhereInputObjectSchema as CartItemWhereInputObjectSchema } from './objects/CartItemWhereInput.schema';

export const CartItemUpdateManyAndReturnSchema: z.ZodType<Prisma.CartItemUpdateManyAndReturnArgs> = z.object({ select: CartItemSelectObjectSchema.optional(), data: CartItemUpdateManyMutationInputObjectSchema, where: CartItemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CartItemUpdateManyAndReturnArgs>;

export const CartItemUpdateManyAndReturnZodSchema = z.object({ select: CartItemSelectObjectSchema.optional(), data: CartItemUpdateManyMutationInputObjectSchema, where: CartItemWhereInputObjectSchema.optional() }).strict();