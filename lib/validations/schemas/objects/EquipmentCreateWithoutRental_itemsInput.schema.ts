import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { EquipmentCreateimagesInputObjectSchema } from './EquipmentCreateimagesInput.schema'
import { CategoryCreateNestedOneWithoutEquipmentsInputObjectSchema } from './CategoryCreateNestedOneWithoutEquipmentsInput.schema'
import { QuoteItemCreateNestedManyWithoutEquipmentInputObjectSchema } from './QuoteItemCreateNestedManyWithoutEquipmentInput.schema'

export const EquipmentCreateWithoutRental_itemsInputObjectSchema: z.ZodType<
  Prisma.EquipmentCreateWithoutRental_itemsInput,
  Prisma.EquipmentCreateWithoutRental_itemsInput
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
    category: z.lazy(
      () => CategoryCreateNestedOneWithoutEquipmentsInputObjectSchema
    ),
    quoteItems: z
      .lazy(() => QuoteItemCreateNestedManyWithoutEquipmentInputObjectSchema)
      .optional(),
  })
  .strict()
export const EquipmentCreateWithoutRental_itemsInputObjectZodSchema = z
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
    category: z.lazy(
      () => CategoryCreateNestedOneWithoutEquipmentsInputObjectSchema
    ),
    quoteItems: z
      .lazy(() => QuoteItemCreateNestedManyWithoutEquipmentInputObjectSchema)
      .optional(),
  })
  .strict()
