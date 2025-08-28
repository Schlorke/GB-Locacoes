import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { UserCreateNestedOneWithoutRentalsInputObjectSchema } from './UserCreateNestedOneWithoutRentalsInput.schema'

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
      users: z.lazy(() => UserCreateNestedOneWithoutRentalsInputObjectSchema),
    })
    .strict()
export const rentalsCreateWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.rentalsCreateWithoutRental_itemsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateWithoutRental_itemsInput>
export const rentalsCreateWithoutRental_itemsInputObjectZodSchema = makeSchema()
