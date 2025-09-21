import { z } from 'zod'
export const QuoteGroupByResultSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    company: z.string(),
    message: z.string(),
    total: z.number(),
    userId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    _count: z
      .object({
        id: z.number(),
        name: z.number(),
        email: z.number(),
        phone: z.number(),
        company: z.number(),
        message: z.number(),
        total: z.number(),
        status: z.number(),
        userId: z.number(),
        createdAt: z.number(),
        updatedAt: z.number(),
        items: z.number(),
        user: z.number(),
      })
      .optional(),
    _sum: z
      .object({
        total: z.number().nullable(),
      })
      .nullable()
      .optional(),
    _avg: z
      .object({
        total: z.number().nullable(),
      })
      .nullable()
      .optional(),
    _min: z
      .object({
        id: z.string().nullable(),
        name: z.string().nullable(),
        email: z.string().nullable(),
        phone: z.string().nullable(),
        company: z.string().nullable(),
        message: z.string().nullable(),
        total: z.number().nullable(),
        userId: z.string().nullable(),
        createdAt: z.date().nullable(),
        updatedAt: z.date().nullable(),
      })
      .nullable()
      .optional(),
    _max: z
      .object({
        id: z.string().nullable(),
        name: z.string().nullable(),
        email: z.string().nullable(),
        phone: z.string().nullable(),
        company: z.string().nullable(),
        message: z.string().nullable(),
        total: z.number().nullable(),
        userId: z.string().nullable(),
        createdAt: z.date().nullable(),
        updatedAt: z.date().nullable(),
      })
      .nullable()
      .optional(),
  })
)
