import { z } from 'zod'
export const QuoteFindManyResultSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      phone: z.string(),
      company: z.string().optional(),
      message: z.string().optional(),
      total: z.number(),
      status: z.unknown(),
      userId: z.string().optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
      items: z.array(z.unknown()),
      user: z.unknown().optional(),
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
