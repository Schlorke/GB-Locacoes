/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { EquipmentArgsObjectSchema as EquipmentArgsObjectSchema } from './EquipmentArgs.schema'
import { rentalsArgsObjectSchema as rentalsArgsObjectSchema } from './rentalsArgs.schema'

const makeSchema = () =>
  z
    .object({
      id: z.boolean().optional(),
      rentalid: z.boolean().optional(),
      equipmentid: z.boolean().optional(),
      quantity: z.boolean().optional(),
      priceperday: z.boolean().optional(),
      totaldays: z.boolean().optional(),
      totalprice: z.boolean().optional(),
      createdat: z.boolean().optional(),
      updatedat: z.boolean().optional(),
      equipments: z
        .union([z.boolean(), z.lazy(() => EquipmentArgsObjectSchema)])
        .optional(),
      rentals: z
        .union([z.boolean(), z.lazy(() => rentalsArgsObjectSchema)])
        .optional(),
    })
    .strict()
export const rental_itemsSelectObjectSchema: z.ZodType<Prisma.rental_itemsSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.rental_itemsSelect>
export const rental_itemsSelectObjectZodSchema = makeSchema()
