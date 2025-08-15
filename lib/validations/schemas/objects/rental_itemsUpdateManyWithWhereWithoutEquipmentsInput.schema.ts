import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { rental_itemsScalarWhereInputObjectSchema } from './rental_itemsScalarWhereInput.schema'
import { rental_itemsUpdateManyMutationInputObjectSchema } from './rental_itemsUpdateManyMutationInput.schema'
import { rental_itemsUncheckedUpdateManyWithoutEquipmentsInputObjectSchema } from './rental_itemsUncheckedUpdateManyWithoutEquipmentsInput.schema'

export const rental_itemsUpdateManyWithWhereWithoutEquipmentsInputObjectSchema: z.ZodType<
  Prisma.rental_itemsUpdateManyWithWhereWithoutEquipmentsInput,
  Prisma.rental_itemsUpdateManyWithWhereWithoutEquipmentsInput
> = z
  .object({
    where: z.lazy(() => rental_itemsScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => rental_itemsUpdateManyMutationInputObjectSchema),
      z.lazy(
        () => rental_itemsUncheckedUpdateManyWithoutEquipmentsInputObjectSchema
      ),
    ]),
  })
  .strict()
export const rental_itemsUpdateManyWithWhereWithoutEquipmentsInputObjectZodSchema =
  z
    .object({
      where: z.lazy(() => rental_itemsScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => rental_itemsUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            rental_itemsUncheckedUpdateManyWithoutEquipmentsInputObjectSchema
        ),
      ]),
    })
    .strict()
