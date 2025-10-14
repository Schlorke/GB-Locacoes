/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { EquipmentWhereUniqueInputObjectSchema as EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema'
import { EquipmentCreateWithoutCategoryInputObjectSchema as EquipmentCreateWithoutCategoryInputObjectSchema } from './EquipmentCreateWithoutCategoryInput.schema'
import { EquipmentUncheckedCreateWithoutCategoryInputObjectSchema as EquipmentUncheckedCreateWithoutCategoryInputObjectSchema } from './EquipmentUncheckedCreateWithoutCategoryInput.schema'

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => EquipmentWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => EquipmentCreateWithoutCategoryInputObjectSchema),
        z.lazy(() => EquipmentUncheckedCreateWithoutCategoryInputObjectSchema),
      ]),
    })
    .strict()
export const EquipmentCreateOrConnectWithoutCategoryInputObjectSchema: z.ZodType<Prisma.EquipmentCreateOrConnectWithoutCategoryInput> =
  makeSchema() as unknown as z.ZodType<Prisma.EquipmentCreateOrConnectWithoutCategoryInput>
export const EquipmentCreateOrConnectWithoutCategoryInputObjectZodSchema =
  makeSchema()
