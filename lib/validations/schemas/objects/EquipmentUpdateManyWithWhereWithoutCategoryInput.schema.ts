/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { EquipmentScalarWhereInputObjectSchema as EquipmentScalarWhereInputObjectSchema } from './EquipmentScalarWhereInput.schema'
import { EquipmentUpdateManyMutationInputObjectSchema as EquipmentUpdateManyMutationInputObjectSchema } from './EquipmentUpdateManyMutationInput.schema'
import { EquipmentUncheckedUpdateManyWithoutCategoryInputObjectSchema as EquipmentUncheckedUpdateManyWithoutCategoryInputObjectSchema } from './EquipmentUncheckedUpdateManyWithoutCategoryInput.schema'

const makeSchema = () =>
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
