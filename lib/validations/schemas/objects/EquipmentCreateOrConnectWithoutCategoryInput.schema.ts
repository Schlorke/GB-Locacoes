import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema'
import { EquipmentCreateWithoutCategoryInputObjectSchema } from './EquipmentCreateWithoutCategoryInput.schema'
import { EquipmentUncheckedCreateWithoutCategoryInputObjectSchema } from './EquipmentUncheckedCreateWithoutCategoryInput.schema'

export const EquipmentCreateOrConnectWithoutCategoryInputObjectSchema: z.ZodType<
  Prisma.EquipmentCreateOrConnectWithoutCategoryInput,
  Prisma.EquipmentCreateOrConnectWithoutCategoryInput
> = z
  .object({
    where: z.lazy(() => EquipmentWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => EquipmentCreateWithoutCategoryInputObjectSchema),
      z.lazy(() => EquipmentUncheckedCreateWithoutCategoryInputObjectSchema),
    ]),
  })
  .strict()
export const EquipmentCreateOrConnectWithoutCategoryInputObjectZodSchema = z
  .object({
    where: z.lazy(() => EquipmentWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => EquipmentCreateWithoutCategoryInputObjectSchema),
      z.lazy(() => EquipmentUncheckedCreateWithoutCategoryInputObjectSchema),
    ]),
  })
  .strict()
