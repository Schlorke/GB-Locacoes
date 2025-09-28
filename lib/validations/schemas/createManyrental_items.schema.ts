/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rental_itemsCreateManyInputObjectSchema as rental_itemsCreateManyInputObjectSchema } from './objects/rental_itemsCreateManyInput.schema';

export const rental_itemsCreateManySchema: z.ZodType<Prisma.rental_itemsCreateManyArgs> = z.object({ data: z.union([ rental_itemsCreateManyInputObjectSchema, z.array(rental_itemsCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.rental_itemsCreateManyArgs>;

export const rental_itemsCreateManyZodSchema = z.object({ data: z.union([ rental_itemsCreateManyInputObjectSchema, z.array(rental_itemsCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();