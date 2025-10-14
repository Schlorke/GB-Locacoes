/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { rentalsWhereInputObjectSchema as rentalsWhereInputObjectSchema } from './rentalsWhereInput.schema'
import { rentalsUpdateWithoutRental_itemsInputObjectSchema as rentalsUpdateWithoutRental_itemsInputObjectSchema } from './rentalsUpdateWithoutRental_itemsInput.schema'
import { rentalsUncheckedUpdateWithoutRental_itemsInputObjectSchema as rentalsUncheckedUpdateWithoutRental_itemsInputObjectSchema } from './rentalsUncheckedUpdateWithoutRental_itemsInput.schema'

const makeSchema = () =>
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
