/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'
import { UserUpdateOneRequiredWithoutCartNestedInputObjectSchema as UserUpdateOneRequiredWithoutCartNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutCartNestedInput.schema'
import { CartItemUpdateManyWithoutCartNestedInputObjectSchema as CartItemUpdateManyWithoutCartNestedInputObjectSchema } from './CartItemUpdateManyWithoutCartNestedInput.schema'

const makeSchema = () =>
  z
    .object({
      id: z
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
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutCartNestedInputObjectSchema)
        .optional(),
      items: z
        .lazy(() => CartItemUpdateManyWithoutCartNestedInputObjectSchema)
        .optional(),
    })
    .strict()
export const CartUpdateInputObjectSchema: z.ZodType<Prisma.CartUpdateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CartUpdateInput>
export const CartUpdateInputObjectZodSchema = makeSchema()
