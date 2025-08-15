import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const rental_itemsCreateManyRentalsInputObjectSchema: z.ZodType<Prisma.rental_itemsCreateManyRentalsInput, Prisma.rental_itemsCreateManyRentalsInput> = z.object({
  id: z.string(),
  equipmentid: z.string(),
  quantity: z.number().int().optional(),
  priceperday: z.number(),
  totaldays: z.number().int(),
  totalprice: z.number(),
  createdat: z.date().optional().nullable(),
  updatedat: z.date().optional().nullable()
}).strict();
export const rental_itemsCreateManyRentalsInputObjectZodSchema = z.object({
  id: z.string(),
  equipmentid: z.string(),
  quantity: z.number().int().optional(),
  priceperday: z.number(),
  totaldays: z.number().int(),
  totalprice: z.number(),
  createdat: z.date().optional().nullable(),
  updatedat: z.date().optional().nullable()
}).strict();
