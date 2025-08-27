import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'
import { DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema'
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema'
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema'
import { rental_itemsUncheckedUpdateManyWithoutRentalsNestedInputObjectSchema } from './rental_itemsUncheckedUpdateManyWithoutRentalsNestedInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      startdate: z
        .union([
          z.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      enddate: z
        .union([
          z.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      total: z
        .union([
          z.number(),
          z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      status: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .nullish(),
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
      rental_items: z
        .lazy(
          () =>
            rental_itemsUncheckedUpdateManyWithoutRentalsNestedInputObjectSchema
        )
        .optional(),
    })
    .strict()
export const rentalsUncheckedUpdateWithoutUsersInputObjectSchema: z.ZodType<Prisma.rentalsUncheckedUpdateWithoutUsersInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rentalsUncheckedUpdateWithoutUsersInput>
export const rentalsUncheckedUpdateWithoutUsersInputObjectZodSchema =
  makeSchema()
