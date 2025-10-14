/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
export const rental_itemsAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      rentalid: z.number(),
      equipmentid: z.number(),
      quantity: z.number(),
      priceperday: z.number(),
      totaldays: z.number(),
      totalprice: z.number(),
      createdat: z.number(),
      updatedat: z.number(),
      equipments: z.number(),
      rentals: z.number(),
    })
    .optional(),
  _sum: z
    .object({
      quantity: z.number().nullable(),
      priceperday: z.number().nullable(),
      totaldays: z.number().nullable(),
      totalprice: z.number().nullable(),
    })
    .nullable()
    .optional(),
  _avg: z
    .object({
      quantity: z.number().nullable(),
      priceperday: z.number().nullable(),
      totaldays: z.number().nullable(),
      totalprice: z.number().nullable(),
    })
    .nullable()
    .optional(),
  _min: z
    .object({
      id: z.string().nullable(),
      rentalid: z.string().nullable(),
      equipmentid: z.string().nullable(),
      quantity: z.number().int().nullable(),
      priceperday: z.number().nullable(),
      totaldays: z.number().int().nullable(),
      totalprice: z.number().nullable(),
      createdat: z.date().nullable(),
      updatedat: z.date().nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      id: z.string().nullable(),
      rentalid: z.string().nullable(),
      equipmentid: z.string().nullable(),
      quantity: z.number().int().nullable(),
      priceperday: z.number().nullable(),
      totaldays: z.number().int().nullable(),
      totalprice: z.number().nullable(),
      createdat: z.date().nullable(),
      updatedat: z.date().nullable(),
    })
    .nullable()
    .optional(),
})
