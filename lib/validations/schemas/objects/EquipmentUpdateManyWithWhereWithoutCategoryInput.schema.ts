import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { EquipmentScalarWhereInputObjectSchema } from './EquipmentScalarWhereInput.schema'
import { EquipmentUpdateManyMutationInputObjectSchema } from './EquipmentUpdateManyMutationInput.schema'
import { EquipmentUncheckedUpdateManyWithoutCategoryInputObjectSchema } from './EquipmentUncheckedUpdateManyWithoutCategoryInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      where: z.lazy(() => EquipmentScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => EquipmentUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => EquipmentUncheckedUpdateManyWithoutCategoryInputObjectSchema
        ),
      ]),
    })
    .strict()
export const EquipmentUpdateManyWithWhereWithoutCategoryInputObjectSchema: z.ZodType<Prisma.EquipmentUpdateManyWithWhereWithoutCategoryInput> =
  makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpdateManyWithWhereWithoutCategoryInput>
export const EquipmentUpdateManyWithWhereWithoutCategoryInputObjectZodSchema =
  makeSchema()
