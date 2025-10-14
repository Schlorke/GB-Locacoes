/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'
import { CartItemUncheckedUpdateManyWithoutCartNestedInputObjectSchema as CartItemUncheckedUpdateManyWithoutCartNestedInputObjectSchema } from './CartItemUncheckedUpdateManyWithoutCartNestedInput.schema'

const makeSchema = () =>
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
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
      items: z
        .lazy(
          () => CartItemUncheckedUpdateManyWithoutCartNestedInputObjectSchema
        )
        .optional(),
    })
    .strict()
export const CartUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.CartUncheckedUpdateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CartUncheckedUpdateInput>
export const CartUncheckedUpdateInputObjectZodSchema = makeSchema()
