/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { CategoryUpdateWithoutEquipmentsInputObjectSchema as CategoryUpdateWithoutEquipmentsInputObjectSchema } from './CategoryUpdateWithoutEquipmentsInput.schema'
import { CategoryUncheckedUpdateWithoutEquipmentsInputObjectSchema as CategoryUncheckedUpdateWithoutEquipmentsInputObjectSchema } from './CategoryUncheckedUpdateWithoutEquipmentsInput.schema'
import { CategoryCreateWithoutEquipmentsInputObjectSchema as CategoryCreateWithoutEquipmentsInputObjectSchema } from './CategoryCreateWithoutEquipmentsInput.schema'
import { CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema as CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema } from './CategoryUncheckedCreateWithoutEquipmentsInput.schema'
import { CategoryWhereInputObjectSchema as CategoryWhereInputObjectSchema } from './CategoryWhereInput.schema'

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => CategoryUpdateWithoutEquipmentsInputObjectSchema),
        z.lazy(() => CategoryUncheckedUpdateWithoutEquipmentsInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => CategoryCreateWithoutEquipmentsInputObjectSchema),
        z.lazy(() => CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema),
      ]),
      where: z.lazy(() => CategoryWhereInputObjectSchema).optional(),
    })
    .strict()
export const CategoryUpsertWithoutEquipmentsInputObjectSchema: z.ZodType<Prisma.CategoryUpsertWithoutEquipmentsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CategoryUpsertWithoutEquipmentsInput>
export const CategoryUpsertWithoutEquipmentsInputObjectZodSchema = makeSchema()
