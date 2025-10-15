/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string(),
  equipmentid: z.string(),
  quantity: z.number().int().optional(),
  priceperday: z.number(),
  totaldays: z.number().int(),
  totalprice: z.number(),
  createdat: z.coerce.date().optional().nullable(),
  updatedat: z.coerce.date().optional().nullable()
}).strict();
export const rental_itemsCreateManyRentalsInputObjectSchema: z.ZodType<Prisma.rental_itemsCreateManyRentalsInput> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsCreateManyRentalsInput>;
export const rental_itemsCreateManyRentalsInputObjectZodSchema = makeSchema();
