/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateNestedOneWithoutRental_itemsInputObjectSchema as EquipmentCreateNestedOneWithoutRental_itemsInputObjectSchema } from './EquipmentCreateNestedOneWithoutRental_itemsInput.schema';
import { rentalsCreateNestedOneWithoutRental_itemsInputObjectSchema as rentalsCreateNestedOneWithoutRental_itemsInputObjectSchema } from './rentalsCreateNestedOneWithoutRental_itemsInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  quantity: z.number().int().optional(),
  priceperday: z.number(),
  totaldays: z.number().int(),
  totalprice: z.number(),
  createdat: z.coerce.date().optional().nullable(),
  updatedat: z.coerce.date().optional().nullable(),
  equipments: z.lazy(() => EquipmentCreateNestedOneWithoutRental_itemsInputObjectSchema),
  rentals: z.lazy(() => rentalsCreateNestedOneWithoutRental_itemsInputObjectSchema)
}).strict();
export const rental_itemsCreateInputObjectSchema: z.ZodType<Prisma.rental_itemsCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsCreateInput>;
export const rental_itemsCreateInputObjectZodSchema = makeSchema();
