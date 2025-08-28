import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema'
import { CategoryCreateWithoutEquipmentsInputObjectSchema } from './CategoryCreateWithoutEquipmentsInput.schema'
import { CategoryUncheckedCreateWithoutEquipmentsInputObjectSchema } from './CategoryUncheckedCreateWithoutEquipmentsInput.schema'

const makeSchema = (): z.ZodObject<any> =>
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
