import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CartItemWhereInputObjectSchema as CartItemWhereInputObjectSchema } from './objects/CartItemWhereInput.schema';

export const CartItemDeleteManySchema: z.ZodType<Prisma.CartItemDeleteManyArgs> = z.object({ where: CartItemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CartItemDeleteManyArgs>;

export const CartItemDeleteManyZodSchema = z.object({ where: CartItemWhereInputObjectSchema.optional() }).strict();