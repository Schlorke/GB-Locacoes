import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const rental_itemsCreateManyEquipmentsInputObjectSchema: z.ZodType<Prisma.rental_itemsCreateManyEquipmentsInput, Prisma.rental_itemsCreateManyEquipmentsInput> = z.object({
  id: z.string(),
  rentalid: z.string(),
  quantity: z.number().int().optional(),
  priceperday: z.number(),
  totaldays: z.number().int(),
  totalprice: z.number(),
  createdat: z.date().optional().nullable(),
  updatedat: z.date().optional().nullable()
}).strict();
export const rental_itemsCreateManyEquipmentsInputObjectZodSchema = z.object({
  id: z.string(),
  rentalid: z.string(),
  quantity: z.number().int().optional(),
  priceperday: z.number(),
  totaldays: z.number().int(),
  totalprice: z.number(),
  createdat: z.date().optional().nullable(),
  updatedat: z.date().optional().nullable()
}).strict();
