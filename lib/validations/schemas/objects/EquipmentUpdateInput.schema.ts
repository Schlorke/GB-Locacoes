import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema'
import { DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema'
import { EquipmentUpdateimagesInputObjectSchema } from './EquipmentUpdateimagesInput.schema'
import { BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema'
import { CategoryUpdateOneRequiredWithoutEquipmentsNestedInputObjectSchema } from './CategoryUpdateOneRequiredWithoutEquipmentsNestedInput.schema'
import { QuoteItemUpdateManyWithoutEquipmentNestedInputObjectSchema } from './QuoteItemUpdateManyWithoutEquipmentNestedInput.schema'
import { rental_itemsUpdateManyWithoutEquipmentsNestedInputObjectSchema } from './rental_itemsUpdateManyWithoutEquipmentsNestedInput.schema'

export const EquipmentUpdateInputObjectSchema: z.ZodType<
  Prisma.EquipmentUpdateInput,
  Prisma.EquipmentUpdateInput
> = z
  .object({
    name: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    description: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    pricePerDay: z
      .union([
        z.number(),
        z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    images: z
      .union([
        z.lazy(() => EquipmentUpdateimagesInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
    available: z
      .union([
        z.boolean(),
        z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    category_id: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    category: z
      .lazy(
        () => CategoryUpdateOneRequiredWithoutEquipmentsNestedInputObjectSchema
      )
      .optional(),
    quoteItems: z
      .lazy(() => QuoteItemUpdateManyWithoutEquipmentNestedInputObjectSchema)
      .optional(),
    rental_items: z
      .lazy(
        () => rental_itemsUpdateManyWithoutEquipmentsNestedInputObjectSchema
      )
      .optional(),
  })
  .strict()
export const EquipmentUpdateInputObjectZodSchema = z
  .object({
    name: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    description: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    pricePerDay: z
      .union([
        z.number(),
        z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    images: z
      .union([
        z.lazy(() => EquipmentUpdateimagesInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
    available: z
      .union([
        z.boolean(),
        z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    category_id: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    category: z
      .lazy(
        () => CategoryUpdateOneRequiredWithoutEquipmentsNestedInputObjectSchema
      )
      .optional(),
    quoteItems: z
      .lazy(() => QuoteItemUpdateManyWithoutEquipmentNestedInputObjectSchema)
      .optional(),
    rental_items: z
      .lazy(
        () => rental_itemsUpdateManyWithoutEquipmentsNestedInputObjectSchema
      )
      .optional(),
  })
  .strict()
