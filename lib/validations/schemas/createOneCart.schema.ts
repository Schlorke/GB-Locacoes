import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CartSelectObjectSchema as CartSelectObjectSchema } from './objects/CartSelect.schema';
import { CartIncludeObjectSchema as CartIncludeObjectSchema } from './objects/CartInclude.schema';
import { CartCreateInputObjectSchema as CartCreateInputObjectSchema } from './objects/CartCreateInput.schema';
import { CartUncheckedCreateInputObjectSchema as CartUncheckedCreateInputObjectSchema } from './objects/CartUncheckedCreateInput.schema';

export const CartCreateOneSchema: z.ZodType<Prisma.CartCreateArgs> = z.object({ select: CartSelectObjectSchema.optional(), include: CartIncludeObjectSchema.optional(), data: z.union([CartCreateInputObjectSchema, CartUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.CartCreateArgs>;

export const CartCreateOneZodSchema = z.object({ select: CartSelectObjectSchema.optional(), include: CartIncludeObjectSchema.optional(), data: z.union([CartCreateInputObjectSchema, CartUncheckedCreateInputObjectSchema]) }).strict();