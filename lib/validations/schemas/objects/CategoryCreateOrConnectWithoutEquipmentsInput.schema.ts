/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { CategoryWhereUniqueInputObjectSchema as CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema'
import { CategoryCreateWithoutEquipmentsInputObjectSchema as CategoryCreateWithoutEquipmentsInputObjectSchema } from './CategoryCreateWithoutEquipmentsInput.schema'
import { CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema as CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema } from './CategoryUncheckedCreateWithoutEquipmentsInput.schema'

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => CategoryCreateWithoutEquipmentsInputObjectSchema),
        z.lazy(() => CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema),
      ]),
    })
    .strict()
export const CategoryCreateOrConnectWithoutEquipmentsInputObjectSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutEquipmentsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateOrConnectWithoutEquipmentsInput>
export const CategoryCreateOrConnectWithoutEquipmentsInputObjectZodSchema =
  makeSchema()
