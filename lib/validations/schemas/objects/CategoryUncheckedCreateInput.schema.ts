import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { EquipmentUncheckedCreateNestedManyWithoutCategoryInputObjectSchema } from './EquipmentUncheckedCreateNestedManyWithoutCategoryInput.schema'

export const CategoryUncheckedCreateInputObjectSchema: z.ZodType<
  Prisma.CategoryUncheckedCreateInput,
  Prisma.CategoryUncheckedCreateInput
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
      .lazy(
        () => EquipmentUncheckedCreateNestedManyWithoutCategoryInputObjectSchema
      )
      .optional(),
  })
  .strict()
export const CategoryUncheckedCreateInputObjectZodSchema = z
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
      .lazy(
        () => EquipmentUncheckedCreateNestedManyWithoutCategoryInputObjectSchema
      )
      .optional(),
  })
  .strict()
