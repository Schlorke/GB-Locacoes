import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema'
import { DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema'
import { EquipmentUpdateOneRequiredWithoutQuoteItemsNestedInputObjectSchema } from './EquipmentUpdateOneRequiredWithoutQuoteItemsNestedInput.schema'
import { QuoteUpdateOneRequiredWithoutItemsNestedInputObjectSchema } from './QuoteUpdateOneRequiredWithoutItemsNestedInput.schema'

export const QuoteItemUpdateInputObjectSchema: z.ZodType<
  Prisma.QuoteItemUpdateInput,
  Prisma.QuoteItemUpdateInput
> = z
  .object({
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
    equipment: z
      .lazy(
        () => EquipmentUpdateOneRequiredWithoutQuoteItemsNestedInputObjectSchema
      )
      .optional(),
    quote: z
      .lazy(() => QuoteUpdateOneRequiredWithoutItemsNestedInputObjectSchema)
      .optional(),
  })
  .strict()
export const QuoteItemUpdateInputObjectZodSchema = z
  .object({
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
    equipment: z
      .lazy(
        () => EquipmentUpdateOneRequiredWithoutQuoteItemsNestedInputObjectSchema
      )
      .optional(),
    quote: z
      .lazy(() => QuoteUpdateOneRequiredWithoutItemsNestedInputObjectSchema)
      .optional(),
  })
  .strict()
