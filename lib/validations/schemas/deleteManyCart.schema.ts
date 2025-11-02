import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CartWhereInputObjectSchema as CartWhereInputObjectSchema } from './objects/CartWhereInput.schema';

export const CartDeleteManySchema: z.ZodType<Prisma.CartDeleteManyArgs> = z.object({ where: CartWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CartDeleteManyArgs>;

export const CartDeleteManyZodSchema = z.object({ where: CartWhereInputObjectSchema.optional() }).strict();