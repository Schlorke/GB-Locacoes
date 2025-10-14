/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { rental_itemsWhereUniqueInputObjectSchema as rental_itemsWhereUniqueInputObjectSchema } from './rental_itemsWhereUniqueInput.schema'
import { rental_itemsUpdateWithoutRentalsInputObjectSchema as rental_itemsUpdateWithoutRentalsInputObjectSchema } from './rental_itemsUpdateWithoutRentalsInput.schema'
import { rental_itemsUncheckedUpdateWithoutRentalsInputObjectSchema as rental_itemsUncheckedUpdateWithoutRentalsInputObjectSchema } from './rental_itemsUncheckedUpdateWithoutRentalsInput.schema'
import { rental_itemsCreateWithoutRentalsInputObjectSchema as rental_itemsCreateWithoutRentalsInputObjectSchema } from './rental_itemsCreateWithoutRentalsInput.schema'
import { rental_itemsUncheckedCreateWithoutRentalsInputObjectSchema as rental_itemsUncheckedCreateWithoutRentalsInputObjectSchema } from './rental_itemsUncheckedCreateWithoutRentalsInput.schema'

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => rental_itemsWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => rental_itemsUpdateWithoutRentalsInputObjectSchema),
        z.lazy(
          () => rental_itemsUncheckedUpdateWithoutRentalsInputObjectSchema
        ),
      ]),
      create: z.union([
        z.lazy(() => rental_itemsCreateWithoutRentalsInputObjectSchema),
        z.lazy(
          () => rental_itemsUncheckedCreateWithoutRentalsInputObjectSchema
        ),
      ]),
    })
    .strict()
export const rental_itemsUpsertWithWhereUniqueWithoutRentalsInputObjectSchema: z.ZodType<Prisma.rental_itemsUpsertWithWhereUniqueWithoutRentalsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rental_itemsUpsertWithWhereUniqueWithoutRentalsInput>
export const rental_itemsUpsertWithWhereUniqueWithoutRentalsInputObjectZodSchema =
  makeSchema()
