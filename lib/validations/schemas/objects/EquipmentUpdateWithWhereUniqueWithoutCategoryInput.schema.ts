import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema'
import { EquipmentUpdateWithoutCategoryInputObjectSchema } from './EquipmentUpdateWithoutCategoryInput.schema'
import { EquipmentUncheckedUpdateWithoutCategoryInputObjectSchema } from './EquipmentUncheckedUpdateWithoutCategoryInput.schema'

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => EquipmentWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => EquipmentUpdateWithoutCategoryInputObjectSchema),
        z.lazy(() => EquipmentUncheckedUpdateWithoutCategoryInputObjectSchema),
      ]),
    })
    .strict()
export const EquipmentUpdateWithWhereUniqueWithoutCategoryInputObjectSchema: z.ZodType<Prisma.EquipmentUpdateWithWhereUniqueWithoutCategoryInput> =
  makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpdateWithWhereUniqueWithoutCategoryInput>
export const EquipmentUpdateWithWhereUniqueWithoutCategoryInputObjectZodSchema =
  makeSchema()
