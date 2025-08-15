import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { rental_itemsUncheckedCreateNestedManyWithoutRentalsInputObjectSchema } from './rental_itemsUncheckedCreateNestedManyWithoutRentalsInput.schema'

export const rentalsUncheckedCreateWithoutUsersInputObjectSchema: z.ZodType<
  Prisma.rentalsUncheckedCreateWithoutUsersInput,
  Prisma.rentalsUncheckedCreateWithoutUsersInput
> = z
  .object({
    id: z.string(),
    startdate: z.date(),
    enddate: z.date(),
    total: z.number(),
    status: z.string().optional().nullable(),
    createdat: z.date().optional().nullable(),
    updatedat: z.date().optional().nullable(),
    rental_items: z
      .lazy(
        () =>
          rental_itemsUncheckedCreateNestedManyWithoutRentalsInputObjectSchema
      )
      .optional(),
  })
  .strict()
export const rentalsUncheckedCreateWithoutUsersInputObjectZodSchema = z
  .object({
    id: z.string(),
    startdate: z.date(),
    enddate: z.date(),
    total: z.number(),
    status: z.string().optional().nullable(),
    createdat: z.date().optional().nullable(),
    updatedat: z.date().optional().nullable(),
    rental_items: z
      .lazy(
        () =>
          rental_itemsUncheckedCreateNestedManyWithoutRentalsInputObjectSchema
      )
      .optional(),
  })
  .strict()
