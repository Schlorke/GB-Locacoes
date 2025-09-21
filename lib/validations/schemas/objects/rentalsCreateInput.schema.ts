import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { rental_itemsCreateNestedManyWithoutRentalsInputObjectSchema } from './rental_itemsCreateNestedManyWithoutRentalsInput.schema'
import { UserCreateNestedOneWithoutRentalsInputObjectSchema } from './UserCreateNestedOneWithoutRentalsInput.schema'

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
      rental_items: z.lazy(
        () => rental_itemsCreateNestedManyWithoutRentalsInputObjectSchema
      ),
      users: z.lazy(() => UserCreateNestedOneWithoutRentalsInputObjectSchema),
    })
    .strict()
export const rentalsCreateInputObjectSchema: z.ZodType<Prisma.rentalsCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateInput>
export const rentalsCreateInputObjectZodSchema = makeSchema()
