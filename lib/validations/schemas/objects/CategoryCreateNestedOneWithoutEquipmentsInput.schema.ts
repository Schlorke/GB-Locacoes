import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { CategoryCreateWithoutEquipmentsInputObjectSchema } from './CategoryCreateWithoutEquipmentsInput.schema'
import { CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema } from './CategoryUncheckedCreateWithoutEquipmentsInput.schema'
import { CategoryCreateOrConnectWithoutEquipmentsInputObjectSchema } from './CategoryCreateOrConnectWithoutEquipmentsInput.schema'
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema'

export const CategoryCreateNestedOneWithoutEquipmentsInputObjectSchema: z.ZodType<
  Prisma.CategoryCreateNestedOneWithoutEquipmentsInput,
  Prisma.CategoryCreateNestedOneWithoutEquipmentsInput
> = z
  .object({
    create: z
      .union([
        z.lazy(() => CategoryCreateWithoutEquipmentsInputObjectSchema),
        z.lazy(() => CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => CategoryCreateOrConnectWithoutEquipmentsInputObjectSchema)
      .optional(),
    connect: z.lazy(() => CategoryWhereUniqueInputObjectSchema).optional(),
  })
  .strict()
export const CategoryCreateNestedOneWithoutEquipmentsInputObjectZodSchema = z
  .object({
    create: z
      .union([
        z.lazy(() => CategoryCreateWithoutEquipmentsInputObjectSchema),
        z.lazy(() => CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => CategoryCreateOrConnectWithoutEquipmentsInputObjectSchema)
      .optional(),
    connect: z.lazy(() => CategoryWhereUniqueInputObjectSchema).optional(),
  })
  .strict()
