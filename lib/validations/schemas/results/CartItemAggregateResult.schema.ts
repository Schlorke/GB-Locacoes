/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
export const CartItemAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      cartId: z.number(),
      cart: z.number(),
      equipmentId: z.number(),
      equipment: z.number(),
      quantity: z.number(),
      days: z.number(),
      pricePerDay: z.number(),
      finalPrice: z.number(),
      createdAt: z.number(),
    })
    .optional(),
  _sum: z
    .object({
      quantity: z.number().nullable(),
      days: z.number().nullable(),
      pricePerDay: z.number().nullable(),
      finalPrice: z.number().nullable(),
    })
    .nullable()
    .optional(),
  _avg: z
    .object({
      quantity: z.number().nullable(),
      days: z.number().nullable(),
      pricePerDay: z.number().nullable(),
      finalPrice: z.number().nullable(),
    })
    .nullable()
    .optional(),
  _min: z
    .object({
      id: z.string().nullable(),
      cartId: z.string().nullable(),
      equipmentId: z.string().nullable(),
      quantity: z.number().int().nullable(),
      days: z.number().int().nullable(),
      pricePerDay: z.number().nullable(),
      finalPrice: z.number().nullable(),
      createdAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      id: z.string().nullable(),
      cartId: z.string().nullable(),
      equipmentId: z.string().nullable(),
      quantity: z.number().int().nullable(),
      days: z.number().int().nullable(),
      pricePerDay: z.number().nullable(),
      finalPrice: z.number().nullable(),
      createdAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
})
