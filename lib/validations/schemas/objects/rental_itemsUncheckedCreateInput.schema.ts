import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const rental_itemsUncheckedCreateInputObjectSchema: z.ZodType<Prisma.rental_itemsUncheckedCreateInput, Prisma.rental_itemsUncheckedCreateInput> = z.object({
  id: z.string(),
  rentalid: z.string(),
  equipmentid: z.string(),
  quantity: z.number().int().optional(),
  priceperday: z.number(),
  totaldays: z.number().int(),
  totalprice: z.number(),
  createdat: z.date().optional().nullable(),
  updatedat: z.date().optional().nullable()
}).strict();
export const rental_itemsUncheckedCreateInputObjectZodSchema = z.object({
  id: z.string(),
  rentalid: z.string(),
  equipmentid: z.string(),
  quantity: z.number().int().optional(),
  priceperday: z.number(),
  totaldays: z.number().int(),
  totalprice: z.number(),
  createdat: z.date().optional().nullable(),
  updatedat: z.date().optional().nullable()
}).strict();
