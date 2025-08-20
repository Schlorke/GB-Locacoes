import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { rental_itemsWhereUniqueInputObjectSchema } from './rental_itemsWhereUniqueInput.schema'
import { rental_itemsUpdateWithoutEquipmentsInputObjectSchema } from './rental_itemsUpdateWithoutEquipmentsInput.schema'
import { rental_itemsUncheckedUpdateWithoutEquipmentsInputObjectSchema } from './rental_itemsUncheckedUpdateWithoutEquipmentsInput.schema'

export const rental_itemsUpdateWithWhereUniqueWithoutEquipmentsInputObjectSchema: z.ZodType<
  Prisma.rental_itemsUpdateWithWhereUniqueWithoutEquipmentsInput,
  Prisma.rental_itemsUpdateWithWhereUniqueWithoutEquipmentsInput
> = z
  .object({
    where: z.lazy(() => rental_itemsWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => rental_itemsUpdateWithoutEquipmentsInputObjectSchema),
      z.lazy(
        () => rental_itemsUncheckedUpdateWithoutEquipmentsInputObjectSchema
      ),
    ]),
  })
  .strict()
export const rental_itemsUpdateWithWhereUniqueWithoutEquipmentsInputObjectZodSchema =
  z
    .object({
      where: z.lazy(() => rental_itemsWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => rental_itemsUpdateWithoutEquipmentsInputObjectSchema),
        z.lazy(
          () => rental_itemsUncheckedUpdateWithoutEquipmentsInputObjectSchema
        ),
      ]),
    })
    .strict()
