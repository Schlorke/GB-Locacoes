import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsCreateNestedOneWithoutRental_itemsInputObjectSchema } from './rentalsCreateNestedOneWithoutRental_itemsInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  quantity: z.number().int().optional(),
  priceperday: z.number(),
  totaldays: z.number().int(),
  totalprice: z.number(),
  createdat: z.coerce.date().optional().nullable(),
  updatedat: z.coerce.date().optional().nullable(),
  rentals: z.lazy(() => rentalsCreateNestedOneWithoutRental_itemsInputObjectSchema)
}).strict();
export const rental_itemsCreateWithoutEquipmentsInputObjectSchema: z.ZodType<Prisma.rental_itemsCreateWithoutEquipmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsCreateWithoutEquipmentsInput>;
export const rental_itemsCreateWithoutEquipmentsInputObjectZodSchema = makeSchema();
