import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { rental_itemsCreateNestedManyWithoutRentalsInputObjectSchema } from './rental_itemsCreateNestedManyWithoutRentalsInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: z.string(),
      startdate: z.date(),
      enddate: z.date(),
      total: z.number(),
      status: z.string().nullish(),
      createdat: z.date().nullish(),
      updatedat: z.date().nullish(),
      rental_items: z
        .lazy(() => rental_itemsCreateNestedManyWithoutRentalsInputObjectSchema)
        .optional(),
    })
    .strict()
export const rentalsCreateWithoutUsersInputObjectSchema: z.ZodType<Prisma.rentalsCreateWithoutUsersInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateWithoutUsersInput>
export const rentalsCreateWithoutUsersInputObjectZodSchema = makeSchema()
