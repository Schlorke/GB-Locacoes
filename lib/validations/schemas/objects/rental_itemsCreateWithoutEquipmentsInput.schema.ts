import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { rentalsCreateNestedOneWithoutRental_itemsInputObjectSchema } from './rentalsCreateNestedOneWithoutRental_itemsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string(),
  quantity: z.number().int().optional(),
  priceperday: z.number(),
  totaldays: z.number().int(),
  totalprice: z.number(),
  createdat: z.date().nullish(),
  updatedat: z.date().nullish(),
  rentals: z.lazy(() => rentalsCreateNestedOneWithoutRental_itemsInputObjectSchema)
}).strict();
export const rental_itemsCreateWithoutEquipmentsInputObjectSchema: z.ZodType<Prisma.rental_itemsCreateWithoutEquipmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsCreateWithoutEquipmentsInput>;
export const rental_itemsCreateWithoutEquipmentsInputObjectZodSchema = makeSchema();
