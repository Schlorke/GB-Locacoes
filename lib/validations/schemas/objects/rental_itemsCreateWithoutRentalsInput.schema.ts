import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { EquipmentCreateNestedOneWithoutRental_itemsInputObjectSchema } from './EquipmentCreateNestedOneWithoutRental_itemsInput.schema'

export const rental_itemsCreateWithoutRentalsInputObjectSchema: z.ZodType<
  Prisma.rental_itemsCreateWithoutRentalsInput,
  Prisma.rental_itemsCreateWithoutRentalsInput
> = z
  .object({
    id: z.string(),
    quantity: z.number().int().optional(),
    priceperday: z.number(),
    totaldays: z.number().int(),
    totalprice: z.number(),
    createdat: z.date().optional().nullable(),
    updatedat: z.date().optional().nullable(),
    equipments: z.lazy(
      () => EquipmentCreateNestedOneWithoutRental_itemsInputObjectSchema
    ),
  })
  .strict()
export const rental_itemsCreateWithoutRentalsInputObjectZodSchema = z
  .object({
    id: z.string(),
    quantity: z.number().int().optional(),
    priceperday: z.number(),
    totaldays: z.number().int(),
    totalprice: z.number(),
    createdat: z.date().optional().nullable(),
    updatedat: z.date().optional().nullable(),
    equipments: z.lazy(
      () => EquipmentCreateNestedOneWithoutRental_itemsInputObjectSchema
    ),
  })
  .strict()
