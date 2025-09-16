import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string(),
  rentalid: z.string(),
  quantity: z.number().int().optional(),
  priceperday: z.number(),
  totaldays: z.number().int(),
  totalprice: z.number(),
  createdat: z.coerce.date().optional().nullable(),
  updatedat: z.coerce.date().optional().nullable()
}).strict();
export const rental_itemsCreateManyEquipmentsInputObjectSchema: z.ZodType<Prisma.rental_itemsCreateManyEquipmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsCreateManyEquipmentsInput>;
export const rental_itemsCreateManyEquipmentsInputObjectZodSchema = makeSchema();
