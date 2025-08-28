import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema'
import { DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema'
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'
import { EquipmentUpdateOneRequiredWithoutQuoteItemsNestedInputObjectSchema } from './EquipmentUpdateOneRequiredWithoutQuoteItemsNestedInput.schema'

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
      days: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      pricePerDay: z
        .union([
          z.number(),
          z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      total: z
        .union([
          z.number(),
          z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      equipment: z
        .lazy(
          () =>
            EquipmentUpdateOneRequiredWithoutQuoteItemsNestedInputObjectSchema
        )
        .optional(),
    })
    .strict()
export const QuoteItemUpdateWithoutQuoteInputObjectSchema: z.ZodType<Prisma.QuoteItemUpdateWithoutQuoteInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUpdateWithoutQuoteInput>
export const QuoteItemUpdateWithoutQuoteInputObjectZodSchema = makeSchema()
