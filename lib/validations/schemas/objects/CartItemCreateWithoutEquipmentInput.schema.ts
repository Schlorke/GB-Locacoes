/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { CartCreateNestedOneWithoutItemsInputObjectSchema as CartCreateNestedOneWithoutItemsInputObjectSchema } from './CartCreateNestedOneWithoutItemsInput.schema'

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      quantity: z.number().int(),
      days: z.number().int(),
      pricePerDay: z.number(),
      finalPrice: z.number().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      cart: z.lazy(() => CartCreateNestedOneWithoutItemsInputObjectSchema),
    })
    .strict()
export const CartItemCreateWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.CartItemCreateWithoutEquipmentInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CartItemCreateWithoutEquipmentInput>
export const CartItemCreateWithoutEquipmentInputObjectZodSchema = makeSchema()
