import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CartSelectObjectSchema as CartSelectObjectSchema } from './objects/CartSelect.schema';
import { CartIncludeObjectSchema as CartIncludeObjectSchema } from './objects/CartInclude.schema';
import { CartWhereUniqueInputObjectSchema as CartWhereUniqueInputObjectSchema } from './objects/CartWhereUniqueInput.schema';

export const CartFindUniqueOrThrowSchema: z.ZodType<Prisma.CartFindUniqueOrThrowArgs> = z.object({ select: CartSelectObjectSchema.optional(), include: CartIncludeObjectSchema.optional(), where: CartWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CartFindUniqueOrThrowArgs>;

export const CartFindUniqueOrThrowZodSchema = z.object({ select: CartSelectObjectSchema.optional(), include: CartIncludeObjectSchema.optional(), where: CartWhereUniqueInputObjectSchema }).strict();