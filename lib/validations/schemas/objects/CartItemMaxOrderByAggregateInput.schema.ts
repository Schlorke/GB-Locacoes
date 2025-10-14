/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      cartId: SortOrderSchema.optional(),
      equipmentId: SortOrderSchema.optional(),
      quantity: SortOrderSchema.optional(),
      days: SortOrderSchema.optional(),
      pricePerDay: SortOrderSchema.optional(),
      finalPrice: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
    })
    .strict()
export const CartItemMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CartItemMaxOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CartItemMaxOrderByAggregateInput>
export const CartItemMaxOrderByAggregateInputObjectZodSchema = makeSchema()
