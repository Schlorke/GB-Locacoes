import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CartSelectObjectSchema as CartSelectObjectSchema } from './objects/CartSelect.schema';
import { CartIncludeObjectSchema as CartIncludeObjectSchema } from './objects/CartInclude.schema';
import { CartWhereUniqueInputObjectSchema as CartWhereUniqueInputObjectSchema } from './objects/CartWhereUniqueInput.schema';
import { CartCreateInputObjectSchema as CartCreateInputObjectSchema } from './objects/CartCreateInput.schema';
import { CartUncheckedCreateInputObjectSchema as CartUncheckedCreateInputObjectSchema } from './objects/CartUncheckedCreateInput.schema';
import { CartUpdateInputObjectSchema as CartUpdateInputObjectSchema } from './objects/CartUpdateInput.schema';
import { CartUncheckedUpdateInputObjectSchema as CartUncheckedUpdateInputObjectSchema } from './objects/CartUncheckedUpdateInput.schema';

export const CartUpsertOneSchema: z.ZodType<Prisma.CartUpsertArgs> = z.object({ select: CartSelectObjectSchema.optional(), include: CartIncludeObjectSchema.optional(), where: CartWhereUniqueInputObjectSchema, create: z.union([ CartCreateInputObjectSchema, CartUncheckedCreateInputObjectSchema ]), update: z.union([ CartUpdateInputObjectSchema, CartUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.CartUpsertArgs>;

export const CartUpsertOneZodSchema = z.object({ select: CartSelectObjectSchema.optional(), include: CartIncludeObjectSchema.optional(), where: CartWhereUniqueInputObjectSchema, create: z.union([ CartCreateInputObjectSchema, CartUncheckedCreateInputObjectSchema ]), update: z.union([ CartUpdateInputObjectSchema, CartUncheckedUpdateInputObjectSchema ]) }).strict();