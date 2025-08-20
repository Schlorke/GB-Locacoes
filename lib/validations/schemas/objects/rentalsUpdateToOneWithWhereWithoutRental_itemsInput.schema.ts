import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { rentalsWhereInputObjectSchema } from './rentalsWhereInput.schema'
import { rentalsUpdateWithoutRental_itemsInputObjectSchema } from './rentalsUpdateWithoutRental_itemsInput.schema'
import { rentalsUncheckedUpdateWithoutRental_itemsInputObjectSchema } from './rentalsUncheckedUpdateWithoutRental_itemsInput.schema'

export const rentalsUpdateToOneWithWhereWithoutRental_itemsInputObjectSchema: z.ZodType<
  Prisma.rentalsUpdateToOneWithWhereWithoutRental_itemsInput,
  Prisma.rentalsUpdateToOneWithWhereWithoutRental_itemsInput
> = z
  .object({
    where: z.lazy(() => rentalsWhereInputObjectSchema).optional(),
    data: z.union([
      z.lazy(() => rentalsUpdateWithoutRental_itemsInputObjectSchema),
      z.lazy(() => rentalsUncheckedUpdateWithoutRental_itemsInputObjectSchema),
    ]),
  })
  .strict()
export const rentalsUpdateToOneWithWhereWithoutRental_itemsInputObjectZodSchema =
  z
    .object({
      where: z.lazy(() => rentalsWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => rentalsUpdateWithoutRental_itemsInputObjectSchema),
        z.lazy(
          () => rentalsUncheckedUpdateWithoutRental_itemsInputObjectSchema
        ),
      ]),
    })
    .strict()
