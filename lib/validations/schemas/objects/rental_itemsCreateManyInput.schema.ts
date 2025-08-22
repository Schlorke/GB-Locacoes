import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const rental_itemsCreateManyInputObjectSchema: z.ZodType<Prisma.rental_itemsCreateManyInput, Prisma.rental_itemsCreateManyInput> = z.object({
  id: z.string(),
  rentalid: z.string(),
  equipmentid: z.string(),
  quantity: z.number().int().optional(),
  priceperday: z.number(),
  totaldays: z.number().int(),
  totalprice: z.number(),
  createdat: z.date().nullish(),
  updatedat: z.date().nullish()
}).strict();
export const rental_itemsCreateManyInputObjectZodSchema = z.object({
  id: z.string(),
  rentalid: z.string(),
  equipmentid: z.string(),
  quantity: z.number().int().optional(),
  priceperday: z.number(),
  totaldays: z.number().int(),
  totalprice: z.number(),
  createdat: z.date().nullish(),
  updatedat: z.date().nullish()
}).strict();
