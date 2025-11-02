import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CartSelectObjectSchema as CartSelectObjectSchema } from './objects/CartSelect.schema';
import { CartUpdateManyMutationInputObjectSchema as CartUpdateManyMutationInputObjectSchema } from './objects/CartUpdateManyMutationInput.schema';
import { CartWhereInputObjectSchema as CartWhereInputObjectSchema } from './objects/CartWhereInput.schema';

export const CartUpdateManyAndReturnSchema: z.ZodType<Prisma.CartUpdateManyAndReturnArgs> = z.object({ select: CartSelectObjectSchema.optional(), data: CartUpdateManyMutationInputObjectSchema, where: CartWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CartUpdateManyAndReturnArgs>;

export const CartUpdateManyAndReturnZodSchema = z.object({ select: CartSelectObjectSchema.optional(), data: CartUpdateManyMutationInputObjectSchema, where: CartWhereInputObjectSchema.optional() }).strict();