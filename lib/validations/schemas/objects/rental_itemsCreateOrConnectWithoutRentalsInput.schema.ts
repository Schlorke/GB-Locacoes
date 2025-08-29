import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { rental_itemsWhereUniqueInputObjectSchema } from './rental_itemsWhereUniqueInput.schema'
import { rental_itemsCreateWithoutRentalsInputObjectSchema } from './rental_itemsCreateWithoutRentalsInput.schema'
import { rental_itemsUncheckedCreateWithoutRentalsInputObjectSchema } from './rental_itemsUncheckedCreateWithoutRentalsInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      where: z.lazy(() => rental_itemsWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => rental_itemsCreateWithoutRentalsInputObjectSchema),
        z.lazy(
          () => rental_itemsUncheckedCreateWithoutRentalsInputObjectSchema
        ),
      ]),
    })
    .strict()
export const rental_itemsCreateOrConnectWithoutRentalsInputObjectSchema: z.ZodType<Prisma.rental_itemsCreateOrConnectWithoutRentalsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rental_itemsCreateOrConnectWithoutRentalsInput>
export const rental_itemsCreateOrConnectWithoutRentalsInputObjectZodSchema =
  makeSchema()
