import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { EquipmentCreateNestedManyWithoutCategoryInputObjectSchema } from './EquipmentCreateNestedManyWithoutCategoryInput.schema'

export const CategoryCreateInputObjectSchema: z.ZodType<
  Prisma.CategoryCreateInput,
  Prisma.CategoryCreateInput
> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    icon: z.string().optional().nullable(),
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
export const CategoryCreateInputObjectZodSchema = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    icon: z.string().optional().nullable(),
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
