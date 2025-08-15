import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema'
import { DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema'
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema'
import { rentalsUpdateOneRequiredWithoutRental_itemsNestedInputObjectSchema } from './rentalsUpdateOneRequiredWithoutRental_itemsNestedInput.schema'

export const rental_itemsUpdateWithoutEquipmentsInputObjectSchema: z.ZodType<
  Prisma.rental_itemsUpdateWithoutEquipmentsInput,
  Prisma.rental_itemsUpdateWithoutEquipmentsInput
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
    rentals: z
      .lazy(
        () => rentalsUpdateOneRequiredWithoutRental_itemsNestedInputObjectSchema
      )
      .optional(),
  })
  .strict()
export const rental_itemsUpdateWithoutEquipmentsInputObjectZodSchema = z
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
    rentals: z
      .lazy(
        () => rentalsUpdateOneRequiredWithoutRental_itemsNestedInputObjectSchema
      )
      .optional(),
  })
  .strict()
