import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CartCreateManyInputObjectSchema as CartCreateManyInputObjectSchema } from './objects/CartCreateManyInput.schema';

export const CartCreateManySchema: z.ZodType<Prisma.CartCreateManyArgs> = z.object({ data: z.union([ CartCreateManyInputObjectSchema, z.array(CartCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CartCreateManyArgs>;

export const CartCreateManyZodSchema = z.object({ data: z.union([ CartCreateManyInputObjectSchema, z.array(CartCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();