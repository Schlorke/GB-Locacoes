/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { rental_itemsWhereInputObjectSchema as rental_itemsWhereInputObjectSchema } from './objects/rental_itemsWhereInput.schema';

export const rental_itemsDeleteManySchema: z.ZodType<Prisma.rental_itemsDeleteManyArgs> = z.object({ where: rental_itemsWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.rental_itemsDeleteManyArgs>;

export const rental_itemsDeleteManyZodSchema = z.object({ where: rental_itemsWhereInputObjectSchema.optional() }).strict();