import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CartItemSelectObjectSchema } from './objects/CartItemSelect.schema';
import { CartItemIncludeObjectSchema } from './objects/CartItemInclude.schema';
import { CartItemWhereUniqueInputObjectSchema } from './objects/CartItemWhereUniqueInput.schema';

export const CartItemFindUniqueSchema: z.ZodType<Prisma.CartItemFindUniqueArgs> = z.object({ select: CartItemSelectObjectSchema.optional(), include: CartItemIncludeObjectSchema.optional(), where: CartItemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CartItemFindUniqueArgs>;

export const CartItemFindUniqueZodSchema = z.object({ select: CartItemSelectObjectSchema.optional(), include: CartItemIncludeObjectSchema.optional(), where: CartItemWhereUniqueInputObjectSchema }).strict();