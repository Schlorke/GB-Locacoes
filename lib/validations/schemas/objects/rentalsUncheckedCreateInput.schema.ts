import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { rental_itemsUncheckedCreateNestedManyWithoutRentalsInputObjectSchema } from './rental_itemsUncheckedCreateNestedManyWithoutRentalsInput.schema'

export const rentalsUncheckedCreateInputObjectSchema: z.ZodType<
  Prisma.rentalsUncheckedCreateInput,
  Prisma.rentalsUncheckedCreateInput
> = z
  .object({
    id: z.string(),
    startdate: z.date(),
    enddate: z.date(),
    total: z.number(),
    status: z.string().optional().nullable(),
    userid: z.string(),
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
export const rentalsUncheckedCreateInputObjectZodSchema = z
  .object({
    id: z.string(),
    startdate: z.date(),
    enddate: z.date(),
    total: z.number(),
    status: z.string().optional().nullable(),
    userid: z.string(),
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
