import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CartItemSelectObjectSchema as CartItemSelectObjectSchema } from './objects/CartItemSelect.schema';
import { CartItemIncludeObjectSchema as CartItemIncludeObjectSchema } from './objects/CartItemInclude.schema';
import { CartItemWhereUniqueInputObjectSchema as CartItemWhereUniqueInputObjectSchema } from './objects/CartItemWhereUniqueInput.schema';

export const CartItemFindUniqueOrThrowSchema: z.ZodType<Prisma.CartItemFindUniqueOrThrowArgs> = z.object({ select: CartItemSelectObjectSchema.optional(), include: CartItemIncludeObjectSchema.optional(), where: CartItemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CartItemFindUniqueOrThrowArgs>;

export const CartItemFindUniqueOrThrowZodSchema = z.object({ select: CartItemSelectObjectSchema.optional(), include: CartItemIncludeObjectSchema.optional(), where: CartItemWhereUniqueInputObjectSchema }).strict();