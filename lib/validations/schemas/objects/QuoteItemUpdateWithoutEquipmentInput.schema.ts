/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema'
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema'
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'
import { QuoteUpdateOneRequiredWithoutItemsNestedInputObjectSchema as QuoteUpdateOneRequiredWithoutItemsNestedInputObjectSchema } from './QuoteUpdateOneRequiredWithoutItemsNestedInput.schema'

const makeSchema = () =>
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
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      quote: z
        .lazy(() => QuoteUpdateOneRequiredWithoutItemsNestedInputObjectSchema)
        .optional(),
    })
    .strict()
export const QuoteItemUpdateWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.QuoteItemUpdateWithoutEquipmentInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUpdateWithoutEquipmentInput>
export const QuoteItemUpdateWithoutEquipmentInputObjectZodSchema = makeSchema()
