import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema'
import { DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema'
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema'
import { EquipmentUpdateOneRequiredWithoutRental_itemsNestedInputObjectSchema } from './EquipmentUpdateOneRequiredWithoutRental_itemsNestedInput.schema'
import { rentalsUpdateOneRequiredWithoutRental_itemsNestedInputObjectSchema } from './rentalsUpdateOneRequiredWithoutRental_itemsNestedInput.schema'

export const rental_itemsUpdateInputObjectSchema: z.ZodType<
  Prisma.rental_itemsUpdateInput,
  Prisma.rental_itemsUpdateInput
> = z
  .object({
    quantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    priceperday: z
      .union([
        z.number(),
        z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    totaldays: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    totalprice: z
      .union([
        z.number(),
        z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    createdat: z
      .union([
        z.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    updatedat: z
      .union([
        z.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    equipments: z
      .lazy(
        () =>
          EquipmentUpdateOneRequiredWithoutRental_itemsNestedInputObjectSchema
      )
      .optional(),
    rentals: z
      .lazy(
        () => rentalsUpdateOneRequiredWithoutRental_itemsNestedInputObjectSchema
      )
      .optional(),
  })
  .strict()
export const rental_itemsUpdateInputObjectZodSchema = z
  .object({
    quantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    priceperday: z
      .union([
        z.number(),
        z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    totaldays: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    totalprice: z
      .union([
        z.number(),
        z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    createdat: z
      .union([
        z.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    updatedat: z
      .union([
        z.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    equipments: z
      .lazy(
        () =>
          EquipmentUpdateOneRequiredWithoutRental_itemsNestedInputObjectSchema
      )
      .optional(),
    rentals: z
      .lazy(
        () => rentalsUpdateOneRequiredWithoutRental_itemsNestedInputObjectSchema
      )
      .optional(),
  })
  .strict()
