import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CartSelectObjectSchema } from './objects/CartSelect.schema';
import { CartIncludeObjectSchema } from './objects/CartInclude.schema';
import { CartWhereUniqueInputObjectSchema } from './objects/CartWhereUniqueInput.schema';

export const CartFindUniqueSchema: z.ZodType<Prisma.CartFindUniqueArgs> = z.object({ select: CartSelectObjectSchema.optional(), include: CartIncludeObjectSchema.optional(), where: CartWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CartFindUniqueArgs>;

export const CartFindUniqueZodSchema = z.object({ select: CartSelectObjectSchema.optional(), include: CartIncludeObjectSchema.optional(), where: CartWhereUniqueInputObjectSchema }).strict();