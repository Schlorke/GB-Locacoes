/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { EquipmentWhereUniqueInputObjectSchema as EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema'
import { EquipmentUpdateWithoutCategoryInputObjectSchema as EquipmentUpdateWithoutCategoryInputObjectSchema } from './EquipmentUpdateWithoutCategoryInput.schema'
import { EquipmentUncheckedUpdateWithoutCategoryInputObjectSchema as EquipmentUncheckedUpdateWithoutCategoryInputObjectSchema } from './EquipmentUncheckedUpdateWithoutCategoryInput.schema'
import { EquipmentCreateWithoutCategoryInputObjectSchema as EquipmentCreateWithoutCategoryInputObjectSchema } from './EquipmentCreateWithoutCategoryInput.schema'
import { EquipmentUncheckedCreateWithoutCategoryInputObjectSchema as EquipmentUncheckedCreateWithoutCategoryInputObjectSchema } from './EquipmentUncheckedCreateWithoutCategoryInput.schema'

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => EquipmentWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => EquipmentUpdateWithoutCategoryInputObjectSchema),
        z.lazy(() => EquipmentUncheckedUpdateWithoutCategoryInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => EquipmentCreateWithoutCategoryInputObjectSchema),
        z.lazy(() => EquipmentUncheckedCreateWithoutCategoryInputObjectSchema),
      ]),
    })
    .strict()
export const EquipmentUpsertWithWhereUniqueWithoutCategoryInputObjectSchema: z.ZodType<Prisma.EquipmentUpsertWithWhereUniqueWithoutCategoryInput> =
  makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpsertWithWhereUniqueWithoutCategoryInput>
export const EquipmentUpsertWithWhereUniqueWithoutCategoryInputObjectZodSchema =
  makeSchema()
