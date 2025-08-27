import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: z.string(),
      equipmentid: z.string(),
      quantity: z.number().int().optional(),
      priceperday: z.number(),
      totaldays: z.number().int(),
      totalprice: z.number(),
      createdat: z.date().nullish(),
      updatedat: z.date().nullish(),
    })
    .strict()
export const rental_itemsUncheckedCreateWithoutRentalsInputObjectSchema: z.ZodType<Prisma.rental_itemsUncheckedCreateWithoutRentalsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rental_itemsUncheckedCreateWithoutRentalsInput>
export const rental_itemsUncheckedCreateWithoutRentalsInputObjectZodSchema =
  makeSchema()
