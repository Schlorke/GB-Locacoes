import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { rental_itemsWhereUniqueInputObjectSchema } from './rental_itemsWhereUniqueInput.schema'
import { rental_itemsUpdateWithoutRentalsInputObjectSchema } from './rental_itemsUpdateWithoutRentalsInput.schema'
import { rental_itemsUncheckedUpdateWithoutRentalsInputObjectSchema } from './rental_itemsUncheckedUpdateWithoutRentalsInput.schema'

export const rental_itemsUpdateWithWhereUniqueWithoutRentalsInputObjectSchema: z.ZodType<
  Prisma.rental_itemsUpdateWithWhereUniqueWithoutRentalsInput,
  Prisma.rental_itemsUpdateWithWhereUniqueWithoutRentalsInput
> = z
  .object({
    where: z.lazy(() => rental_itemsWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => rental_itemsUpdateWithoutRentalsInputObjectSchema),
      z.lazy(() => rental_itemsUncheckedUpdateWithoutRentalsInputObjectSchema),
    ]),
  })
  .strict()
export const rental_itemsUpdateWithWhereUniqueWithoutRentalsInputObjectZodSchema =
  z
    .object({
      where: z.lazy(() => rental_itemsWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => rental_itemsUpdateWithoutRentalsInputObjectSchema),
        z.lazy(
          () => rental_itemsUncheckedUpdateWithoutRentalsInputObjectSchema
        ),
      ]),
    })
    .strict()
