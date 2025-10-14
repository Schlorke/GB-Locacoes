/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { EquipmentWhereInputObjectSchema as EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema'
import { EquipmentUpdateWithoutRental_itemsInputObjectSchema as EquipmentUpdateWithoutRental_itemsInputObjectSchema } from './EquipmentUpdateWithoutRental_itemsInput.schema'
import { EquipmentUncheckedUpdateWithoutRental_itemsInputObjectSchema as EquipmentUncheckedUpdateWithoutRental_itemsInputObjectSchema } from './EquipmentUncheckedUpdateWithoutRental_itemsInput.schema'

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => EquipmentWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => EquipmentUpdateWithoutRental_itemsInputObjectSchema),
        z.lazy(
          () => EquipmentUncheckedUpdateWithoutRental_itemsInputObjectSchema
        ),
      ]),
    })
    .strict()
export const EquipmentUpdateToOneWithWhereWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.EquipmentUpdateToOneWithWhereWithoutRental_itemsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpdateToOneWithWhereWithoutRental_itemsInput>
export const EquipmentUpdateToOneWithWhereWithoutRental_itemsInputObjectZodSchema =
  makeSchema()
