import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CartSelectObjectSchema as CartSelectObjectSchema } from './objects/CartSelect.schema';
import { CartIncludeObjectSchema as CartIncludeObjectSchema } from './objects/CartInclude.schema';
import { CartWhereUniqueInputObjectSchema as CartWhereUniqueInputObjectSchema } from './objects/CartWhereUniqueInput.schema';

export const CartFindUniqueSchema: z.ZodType<Prisma.CartFindUniqueArgs> = z.object({ select: CartSelectObjectSchema.optional(), include: CartIncludeObjectSchema.optional(), where: CartWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CartFindUniqueArgs>;

export const CartFindUniqueZodSchema = z.object({ select: CartSelectObjectSchema.optional(), include: CartIncludeObjectSchema.optional(), where: CartWhereUniqueInputObjectSchema }).strict();