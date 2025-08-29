import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string(),
  rentalid: z.string(),
  quantity: z.number().int().optional(),
  priceperday: z.number(),
  totaldays: z.number().int(),
  totalprice: z.number(),
  createdat: z.date().nullish(),
  updatedat: z.date().nullish()
}).strict();
export const rental_itemsUncheckedCreateWithoutEquipmentsInputObjectSchema: z.ZodType<Prisma.rental_itemsUncheckedCreateWithoutEquipmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsUncheckedCreateWithoutEquipmentsInput>;
export const rental_itemsUncheckedCreateWithoutEquipmentsInputObjectZodSchema = makeSchema();
