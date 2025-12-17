import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CartUpdateManyMutationInputObjectSchema as CartUpdateManyMutationInputObjectSchema } from './objects/CartUpdateManyMutationInput.schema';
import { CartWhereInputObjectSchema as CartWhereInputObjectSchema } from './objects/CartWhereInput.schema';

export const CartUpdateManySchema: z.ZodType<Prisma.CartUpdateManyArgs> = z.object({ data: CartUpdateManyMutationInputObjectSchema, where: CartWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CartUpdateManyArgs>;

export const CartUpdateManyZodSchema = z.object({ data: CartUpdateManyMutationInputObjectSchema, where: CartWhereInputObjectSchema.optional() }).strict();