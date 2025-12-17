import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CartItemUpdateManyMutationInputObjectSchema as CartItemUpdateManyMutationInputObjectSchema } from './objects/CartItemUpdateManyMutationInput.schema';
import { CartItemWhereInputObjectSchema as CartItemWhereInputObjectSchema } from './objects/CartItemWhereInput.schema';

export const CartItemUpdateManySchema: z.ZodType<Prisma.CartItemUpdateManyArgs> = z.object({ data: CartItemUpdateManyMutationInputObjectSchema, where: CartItemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CartItemUpdateManyArgs>;

export const CartItemUpdateManyZodSchema = z.object({ data: CartItemUpdateManyMutationInputObjectSchema, where: CartItemWhereInputObjectSchema.optional() }).strict();