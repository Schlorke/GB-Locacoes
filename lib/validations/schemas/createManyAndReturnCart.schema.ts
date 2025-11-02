import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CartSelectObjectSchema as CartSelectObjectSchema } from './objects/CartSelect.schema';
import { CartCreateManyInputObjectSchema as CartCreateManyInputObjectSchema } from './objects/CartCreateManyInput.schema';

export const CartCreateManyAndReturnSchema: z.ZodType<Prisma.CartCreateManyAndReturnArgs> = z.object({ select: CartSelectObjectSchema.optional(), data: z.union([ CartCreateManyInputObjectSchema, z.array(CartCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CartCreateManyAndReturnArgs>;

export const CartCreateManyAndReturnZodSchema = z.object({ select: CartSelectObjectSchema.optional(), data: z.union([ CartCreateManyInputObjectSchema, z.array(CartCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();