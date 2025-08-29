import { z } from 'zod'
import type { Prisma } from '@prisma/client'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: z.string(),
      startdate: z.date(),
      enddate: z.date(),
      total: z.number(),
      status: z.string().nullish(),
      userid: z.string(),
      createdat: z.date().nullish(),
      updatedat: z.date().nullish(),
    })
    .strict()
export const rentalsUncheckedCreateWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.rentalsUncheckedCreateWithoutRental_itemsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rentalsUncheckedCreateWithoutRental_itemsInput>
export const rentalsUncheckedCreateWithoutRental_itemsInputObjectZodSchema =
  makeSchema()
