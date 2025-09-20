import { z } from 'zod'
import type { Prisma } from '@prisma/client'

const makeSchema = () =>
  z
    .object({
      id: z.string(),
      rentalid: z.string(),
      equipmentid: z.string(),
      quantity: z.number().int().optional(),
      priceperday: z.number(),
      totaldays: z.number().int(),
      totalprice: z.number(),
      createdat: z.coerce.date().optional().nullable(),
      updatedat: z.coerce.date().optional().nullable(),
    })
    .strict()
export const rental_itemsCreateManyInputObjectSchema: z.ZodType<Prisma.rental_itemsCreateManyInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rental_itemsCreateManyInput>
export const rental_itemsCreateManyInputObjectZodSchema = makeSchema()
