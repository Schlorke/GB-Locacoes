/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema'
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema'
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema'

const makeSchema = () =>
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      rentalid: z
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
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      updatedat: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict()
export const rental_itemsUncheckedUpdateWithoutEquipmentsInputObjectSchema: z.ZodType<Prisma.rental_itemsUncheckedUpdateWithoutEquipmentsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rental_itemsUncheckedUpdateWithoutEquipmentsInput>
export const rental_itemsUncheckedUpdateWithoutEquipmentsInputObjectZodSchema =
  makeSchema()
