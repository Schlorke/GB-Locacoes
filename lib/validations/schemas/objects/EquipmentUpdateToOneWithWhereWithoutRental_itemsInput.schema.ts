import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema'
import { EquipmentUpdateWithoutRental_itemsInputObjectSchema } from './EquipmentUpdateWithoutRental_itemsInput.schema'
import { EquipmentUncheckedUpdateWithoutRental_itemsInputObjectSchema } from './EquipmentUncheckedUpdateWithoutRental_itemsInput.schema'

const makeSchema = (): z.ZodObject<any> =>
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
