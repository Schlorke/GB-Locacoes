/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
export const CartDeleteResultSchema = z.nullable(
  z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    items: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
)
