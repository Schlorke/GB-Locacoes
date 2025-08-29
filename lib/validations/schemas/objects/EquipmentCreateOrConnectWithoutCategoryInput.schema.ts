import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema'
import { EquipmentCreateWithoutCategoryInputObjectSchema } from './EquipmentCreateWithoutCategoryInput.schema'
import { EquipmentUncheckedCreateWithoutCategoryInputObjectSchema } from './EquipmentUncheckedCreateWithoutCategoryInput.schema'

const makeSchema = (): z.ZodObject<any> =>
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
