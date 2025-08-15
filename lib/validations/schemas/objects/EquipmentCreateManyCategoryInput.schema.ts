import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { EquipmentCreateimagesInputObjectSchema } from './EquipmentCreateimagesInput.schema'

export const EquipmentCreateManyCategoryInputObjectSchema: z.ZodType<
  Prisma.EquipmentCreateManyCategoryInput,
  Prisma.EquipmentCreateManyCategoryInput
> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    pricePerDay: z.number(),
    images: z
      .union([
        z.lazy(() => EquipmentCreateimagesInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
    available: z.boolean().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    category_id: z.string().optional().nullable(),
  })
  .strict()
export const EquipmentCreateManyCategoryInputObjectZodSchema = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    pricePerDay: z.number(),
    images: z
      .union([
        z.lazy(() => EquipmentCreateimagesInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
    available: z.boolean().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    category_id: z.string().optional().nullable(),
  })
  .strict()
