import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { EquipmentCreateNestedManyWithoutCategoryInputObjectSchema } from './EquipmentCreateNestedManyWithoutCategoryInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string().nullish(),
      icon: z.string().nullish(),
      iconColor: z.string().optional(),
      bgColor: z.string().optional(),
      fontColor: z.string().optional(),
      slug: z.string(),
      createdAt: z.date().optional(),
      updatedAt: z.date().optional(),
      equipments: z
        .lazy(() => EquipmentCreateNestedManyWithoutCategoryInputObjectSchema)
        .optional(),
    })
    .strict()
export const CategoryCreateInputObjectSchema: z.ZodType<Prisma.CategoryCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateInput>
export const CategoryCreateInputObjectZodSchema = makeSchema()
