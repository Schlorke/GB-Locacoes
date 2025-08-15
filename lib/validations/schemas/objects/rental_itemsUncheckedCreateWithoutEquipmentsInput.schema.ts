import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const rental_itemsUncheckedCreateWithoutEquipmentsInputObjectSchema: z.ZodType<Prisma.rental_itemsUncheckedCreateWithoutEquipmentsInput, Prisma.rental_itemsUncheckedCreateWithoutEquipmentsInput> = z.object({
  id: z.string(),
  rentalid: z.string(),
  quantity: z.number().int().optional(),
  priceperday: z.number(),
  totaldays: z.number().int(),
  totalprice: z.number(),
  createdat: z.date().optional().nullable(),
  updatedat: z.date().optional().nullable()
}).strict();
export const rental_itemsUncheckedCreateWithoutEquipmentsInputObjectZodSchema = z.object({
  id: z.string(),
  rentalid: z.string(),
  quantity: z.number().int().optional(),
  priceperday: z.number(),
  totaldays: z.number().int(),
  totalprice: z.number(),
  createdat: z.date().optional().nullable(),
  updatedat: z.date().optional().nullable()
}).strict();
