import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema'
import { EquipmentUpdateWithoutQuoteItemsInputObjectSchema } from './EquipmentUpdateWithoutQuoteItemsInput.schema'
import { EquipmentUncheckedUpdateWithoutQuoteItemsInputObjectSchema } from './EquipmentUncheckedUpdateWithoutQuoteItemsInput.schema'

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => EquipmentWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => EquipmentUpdateWithoutQuoteItemsInputObjectSchema),
        z.lazy(
          () => EquipmentUncheckedUpdateWithoutQuoteItemsInputObjectSchema
        ),
      ]),
    })
    .strict()
export const EquipmentUpdateToOneWithWhereWithoutQuoteItemsInputObjectSchema: z.ZodType<Prisma.EquipmentUpdateToOneWithWhereWithoutQuoteItemsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpdateToOneWithWhereWithoutQuoteItemsInput>
export const EquipmentUpdateToOneWithWhereWithoutQuoteItemsInputObjectZodSchema =
  makeSchema()
