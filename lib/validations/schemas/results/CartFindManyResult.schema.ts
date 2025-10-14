/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
export const CartFindManyResultSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      userId: z.string(),
      user: z.unknown(),
      items: z.array(z.unknown()),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
  pagination: z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
})
