/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateNestedOneWithoutRental_itemsInputObjectSchema as EquipmentCreateNestedOneWithoutRental_itemsInputObjectSchema } from './EquipmentCreateNestedOneWithoutRental_itemsInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  quantity: z.number().int().optional(),
  priceperday: z.number(),
  totaldays: z.number().int(),
  totalprice: z.number(),
  createdat: z.coerce.date().optional().nullable(),
  updatedat: z.coerce.date().optional().nullable(),
  equipments: z.lazy(() => EquipmentCreateNestedOneWithoutRental_itemsInputObjectSchema)
}).strict();
export const rental_itemsCreateWithoutRentalsInputObjectSchema: z.ZodType<Prisma.rental_itemsCreateWithoutRentalsInput> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsCreateWithoutRentalsInput>;
export const rental_itemsCreateWithoutRentalsInputObjectZodSchema = makeSchema();
