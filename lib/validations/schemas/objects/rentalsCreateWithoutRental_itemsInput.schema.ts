/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { UserCreateNestedOneWithoutRentalsInputObjectSchema as UserCreateNestedOneWithoutRentalsInputObjectSchema } from './UserCreateNestedOneWithoutRentalsInput.schema'

const makeSchema = () =>
  z
    .object({
      id: z.string(),
      startdate: z.coerce.date(),
      enddate: z.coerce.date(),
      total: z.number(),
      status: z.string().optional().nullable(),
      createdat: z.coerce.date().optional().nullable(),
      updatedat: z.coerce.date().optional().nullable(),
      users: z.lazy(() => UserCreateNestedOneWithoutRentalsInputObjectSchema),
    })
    .strict()
export const rentalsCreateWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.rentalsCreateWithoutRental_itemsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateWithoutRental_itemsInput>
export const rentalsCreateWithoutRental_itemsInputObjectZodSchema = makeSchema()
