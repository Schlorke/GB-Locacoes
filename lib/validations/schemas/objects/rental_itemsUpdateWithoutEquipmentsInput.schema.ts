import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema'
import { DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema'
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema'
import { rentalsUpdateOneRequiredWithoutRental_itemsNestedInputObjectSchema } from './rentalsUpdateOneRequiredWithoutRental_itemsNestedInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
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
        .nullish(),
      updatedat: z
        .union([
          z.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .nullish(),
      rentals: z
        .lazy(
          () =>
            rentalsUpdateOneRequiredWithoutRental_itemsNestedInputObjectSchema
        )
        .optional(),
    })
    .strict()
export const rental_itemsUpdateWithoutEquipmentsInputObjectSchema: z.ZodType<Prisma.rental_itemsUpdateWithoutEquipmentsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rental_itemsUpdateWithoutEquipmentsInput>
export const rental_itemsUpdateWithoutEquipmentsInputObjectZodSchema =
  makeSchema()
