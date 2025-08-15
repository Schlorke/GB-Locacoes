import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { rental_itemsCreateNestedManyWithoutRentalsInputObjectSchema } from './rental_itemsCreateNestedManyWithoutRentalsInput.schema'
import { UserCreateNestedOneWithoutRentalsInputObjectSchema } from './UserCreateNestedOneWithoutRentalsInput.schema'

export const rentalsCreateInputObjectSchema: z.ZodType<
  Prisma.rentalsCreateInput,
  Prisma.rentalsCreateInput
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
      .lazy(() => rental_itemsCreateNestedManyWithoutRentalsInputObjectSchema)
      .optional(),
    users: z.lazy(() => UserCreateNestedOneWithoutRentalsInputObjectSchema),
  })
  .strict()
export const rentalsCreateInputObjectZodSchema = z
  .object({
    id: z.string(),
    startdate: z.date(),
    enddate: z.date(),
    total: z.number(),
    status: z.string().optional().nullable(),
    createdat: z.date().optional().nullable(),
    updatedat: z.date().optional().nullable(),
    rental_items: z
      .lazy(() => rental_itemsCreateNestedManyWithoutRentalsInputObjectSchema)
      .optional(),
    users: z.lazy(() => UserCreateNestedOneWithoutRentalsInputObjectSchema),
  })
  .strict()
