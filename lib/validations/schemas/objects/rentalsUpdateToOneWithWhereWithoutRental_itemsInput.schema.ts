import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { rentalsWhereInputObjectSchema } from './rentalsWhereInput.schema'
import { rentalsUpdateWithoutRental_itemsInputObjectSchema } from './rentalsUpdateWithoutRental_itemsInput.schema'
import { rentalsUncheckedUpdateWithoutRental_itemsInputObjectSchema } from './rentalsUncheckedUpdateWithoutRental_itemsInput.schema'

const makeSchema = (): z.ZodObject<any> =>
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
export const rentalsUpdateToOneWithWhereWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.rentalsUpdateToOneWithWhereWithoutRental_itemsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rentalsUpdateToOneWithWhereWithoutRental_itemsInput>
export const rentalsUpdateToOneWithWhereWithoutRental_itemsInputObjectZodSchema =
  makeSchema()
