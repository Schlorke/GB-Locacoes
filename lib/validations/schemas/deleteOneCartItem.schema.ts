import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CartItemSelectObjectSchema as CartItemSelectObjectSchema } from './objects/CartItemSelect.schema';
import { CartItemIncludeObjectSchema as CartItemIncludeObjectSchema } from './objects/CartItemInclude.schema';
import { CartItemWhereUniqueInputObjectSchema as CartItemWhereUniqueInputObjectSchema } from './objects/CartItemWhereUniqueInput.schema';

export const CartItemDeleteOneSchema: z.ZodType<Prisma.CartItemDeleteArgs> = z.object({ select: CartItemSelectObjectSchema.optional(), include: CartItemIncludeObjectSchema.optional(), where: CartItemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CartItemDeleteArgs>;

export const CartItemDeleteOneZodSchema = z.object({ select: CartItemSelectObjectSchema.optional(), include: CartItemIncludeObjectSchema.optional(), where: CartItemWhereUniqueInputObjectSchema }).strict();