import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { EquipmentCreateNestedOneWithoutRental_itemsInputObjectSchema } from './EquipmentCreateNestedOneWithoutRental_itemsInput.schema';
import { rentalsCreateNestedOneWithoutRental_itemsInputObjectSchema } from './rentalsCreateNestedOneWithoutRental_itemsInput.schema'

export const rental_itemsCreateInputObjectSchema: z.ZodType<Prisma.rental_itemsCreateInput, Prisma.rental_itemsCreateInput> = z.object({
  id: z.string(),
  quantity: z.number().int().optional(),
  priceperday: z.number(),
  totaldays: z.number().int(),
  totalprice: z.number(),
  createdat: z.date().optional().nullable(),
  updatedat: z.date().optional().nullable(),
  equipments: z.lazy(() => EquipmentCreateNestedOneWithoutRental_itemsInputObjectSchema),
  rentals: z.lazy(() => rentalsCreateNestedOneWithoutRental_itemsInputObjectSchema)
}).strict();
export const rental_itemsCreateInputObjectZodSchema = z.object({
  id: z.string(),
  quantity: z.number().int().optional(),
  priceperday: z.number(),
  totaldays: z.number().int(),
  totalprice: z.number(),
  createdat: z.date().optional().nullable(),
  updatedat: z.date().optional().nullable(),
  equipments: z.lazy(() => EquipmentCreateNestedOneWithoutRental_itemsInputObjectSchema),
  rentals: z.lazy(() => rentalsCreateNestedOneWithoutRental_itemsInputObjectSchema)
}).strict();
