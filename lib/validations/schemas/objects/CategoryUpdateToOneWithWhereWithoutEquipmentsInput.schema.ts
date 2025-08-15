import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { CategoryWhereInputObjectSchema } from './CategoryWhereInput.schema'
import { CategoryUpdateWithoutEquipmentsInputObjectSchema } from './CategoryUpdateWithoutEquipmentsInput.schema'
import { CategoryUncheckedUpdateWithoutEquipmentsInputObjectSchema } from './CategoryUncheckedUpdateWithoutEquipmentsInput.schema'

export const CategoryUpdateToOneWithWhereWithoutEquipmentsInputObjectSchema: z.ZodType<
  Prisma.CategoryUpdateToOneWithWhereWithoutEquipmentsInput,
  Prisma.CategoryUpdateToOneWithWhereWithoutEquipmentsInput
> = z
  .object({
    where: z.lazy(() => CategoryWhereInputObjectSchema).optional(),
    data: z.union([
      z.lazy(() => CategoryUpdateWithoutEquipmentsInputObjectSchema),
      z.lazy(() => CategoryUncheckedUpdateWithoutEquipmentsInputObjectSchema),
    ]),
  })
  .strict()
export const CategoryUpdateToOneWithWhereWithoutEquipmentsInputObjectZodSchema =
  z
    .object({
      where: z.lazy(() => CategoryWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => CategoryUpdateWithoutEquipmentsInputObjectSchema),
        z.lazy(() => CategoryUncheckedUpdateWithoutEquipmentsInputObjectSchema),
      ]),
    })
    .strict()
