import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { CategoryCreateWithoutEquipmentsInputObjectSchema } from './CategoryCreateWithoutEquipmentsInput.schema'
import { CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema } from './CategoryUncheckedCreateWithoutEquipmentsInput.schema'
import { CategoryCreateOrConnectWithoutEquipmentsInputObjectSchema } from './CategoryCreateOrConnectWithoutEquipmentsInput.schema'
import { CategoryUpsertWithoutEquipmentsInputObjectSchema } from './CategoryUpsertWithoutEquipmentsInput.schema'
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema'
import { CategoryUpdateToOneWithWhereWithoutEquipmentsInputObjectSchema } from './CategoryUpdateToOneWithWhereWithoutEquipmentsInput.schema'
import { CategoryUpdateWithoutEquipmentsInputObjectSchema } from './CategoryUpdateWithoutEquipmentsInput.schema'
import { CategoryUncheckedUpdateWithoutEquipmentsInputObjectSchema } from './CategoryUncheckedUpdateWithoutEquipmentsInput.schema'

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => CategoryCreateWithoutEquipmentsInputObjectSchema),
          z.lazy(
            () => CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => CategoryCreateOrConnectWithoutEquipmentsInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => CategoryUpsertWithoutEquipmentsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => CategoryWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => CategoryUpdateToOneWithWhereWithoutEquipmentsInputObjectSchema
          ),
          z.lazy(() => CategoryUpdateWithoutEquipmentsInputObjectSchema),
          z.lazy(
            () => CategoryUncheckedUpdateWithoutEquipmentsInputObjectSchema
          ),
        ])
        .optional(),
    })
    .strict()
export const CategoryUpdateOneRequiredWithoutEquipmentsNestedInputObjectSchema: z.ZodType<Prisma.CategoryUpdateOneRequiredWithoutEquipmentsNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CategoryUpdateOneRequiredWithoutEquipmentsNestedInput>
export const CategoryUpdateOneRequiredWithoutEquipmentsNestedInputObjectZodSchema =
  makeSchema()
